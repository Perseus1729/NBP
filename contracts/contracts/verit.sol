// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// contract VeritTraceRecords {
    
//     struct Record {
//         string signature;
//         string inputMessage;
//         string timeStamp;
//         string platformIdentifier;
//         string platformSignature;
//         string platformMetadata;
//     }

//     mapping (string => Record) records;
    
//     address private owner;
    
//     modifier isOwner() {
//         require(msg.sender == owner, "Caller is not owner");
//         _;
//     }
    
//     constructor() public {
//         owner = tx.origin;
//     }
// }

contract VeritIdentityTable {
    
    // Structure for storing the attestations
    struct Attestation {
        string platformIdentifier;
        string platformURL;
        bytes signature;
        string platformHandle;
    }
    
    // Structure for storing User information
    struct User {
        mapping (string => Attestation) attestations; // maps from platformIdentifier to Attestation.
        string userType;
        address userAddress;
    }
    
    mapping (address => User) users; // maps from userAddress to User
    
    address private owner; // Currently is hardcoded to store an address representing Twitter's Blockchain address
    
    event Register(string userType, address _address, bytes signature);
    event Attest(address _address, Attestation attestation);
    
    modifier isOwner() { // modifier (might come in handy later)
        
        require(msg.sender == owner, "Caller is not owner");
        _;
    }
    
    constructor() {
        
        owner = 0xA71A9AEe3b0d8027e7A654aA7ddf8a3D882C64F5; // hardcoded temporary public key
    }
    
    // Internal functions for sign verification using ecrecover and keccak256.
    // To get the correct sign in web3, follow the instructions as in the bottom of the contract
    function getEthSignedMessageHash(bytes32 _messageHash) pure internal returns (bytes32) {

        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", _messageHash));
    }

    function verifySign ( address _signer, bytes32 messageHash , bytes memory signature) pure internal returns (bool) {
        
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);
        return recoverSigner(ethSignedMessageHash, signature) == _signer;
    }

    function recoverSigner(bytes32 _ethSignedMessageHash, bytes memory _signature) pure internal returns (address) {
        
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);
        return ecrecover(_ethSignedMessageHash, v, r, s);
    }

    function splitSignature(bytes memory sig) pure internal returns (bytes32 r, bytes32 s, uint8 v) {
        require(sig.length == 65, "invalid signature length");

        assembly {
            // first 32 bytes, after the length prefix
            r := mload(add(sig, 32))
            // second 32 bytes
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(sig, 96)))
        }

        // implicitly return (r, s, v)
    }
    
    // Add an address to the mapping
    function registerAddress (string memory userType, address _address, Attestation[] memory attestations, bytes memory signature) public returns (bool added) {
        
        bytes32 messageHash = keccak256(abi.encodePacked("Verit Platform Registration\n", _address)); // Hash used for sign
        bool verify = verifySign(owner, messageHash, signature); // verify signature
        if(!verify) return verify;

        User storage user = users[_address];
        
        if(user.userAddress == _address) // If address already has a mapping, then it can not be directly modified, only attestations can be added
            return false;
            
        user.userType = userType;
        user.userAddress = _address;
        
        // add Attestations to the address
        for(uint i = 0; i < attestations.length; ++i) {
            addAttestation(_address, attestations[i]);
        }
        
        emit Register(userType, _address, signature);
        return verify;
    }
    
    // function to add attestations to a given address. Can be called from regisetAddress and also on it own
    function addAttestation (address _address, Attestation memory attestation) public returns (bool attested) {
    
        require(users[_address].userAddress == _address, "address not present"); // Returns an error if the address does not have a mapping already.
        
        bytes32 messageHash = keccak256(abi.encodePacked("Verit Platform Attestation\n", attestation.platformHandle, "\n", _address)); // Hash used for sign
        bool verify = verifySign(owner, messageHash, attestation.signature); // verify signature
        if(verify)
        {
            users[_address].attestations[attestation.platformIdentifier] = attestation;
            emit Attest(_address, attestation);
        }
        return verify;
    }
}

/*
message hash:
web3.utils.keccak256(web3.utils.encodePacked(inputs))
Payload:
web3.eth.accounts.sign(messageHash, privateKey)
web3.eth.accounts.sign(web3.utils.keccak256(web3.utils.encodePacked(<input>), privKey)
privKey for owner: 
0xbcfbe70f344d492288500c017f0530a8ecd78766ad71d099e37e30ebc45242e2

for register: 
messageHash = 
0xfca1c8a31656f98a5d6201c1484f8d6e666ffe4bee1297761c52a5a2aaa2c21e
address = 
0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
sign = 
0x0f776f643953603649fd845e2b81066e5efbcb7c42d87634deb3f4d503a871406713e9cdc0efdef8f27097c593e1d774578f3df34f9848fa0abdcd62209c3d331c
to get sign, use:
web3.eth.accounts.sign(web3.utils.keccak256(web3.utils.encodePacked("Verit Platform Registration\n", _address), privKey)



address2=
0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
sign=
0xb8cc4a3285ebb98d7033f1ad1300cd682f72bbae48733e201ddb6080137ad89766e613940708c467a8e472ebb6f390c8a95d35d97fec7403f26235cc4b39aef71c
attestation = 
[
["Twitter", "twitter.com", "0xc16c84364652f7b0e0b17ec3319b46110aae44865702ad3a7c85486f4b64ce3a6966a1bfe1bb41239ee151502b7281b0b82397b98d2cf28a76ecb0a1bcc57f141c", "atharv"]
]
to get attestation sign use
web3.eth.accounts.sign(web3.utils.keccak256(web3.utils.encodePacked("Verit Platform Attestation\n", platformHandle + "\n", _address), privKey)

*/