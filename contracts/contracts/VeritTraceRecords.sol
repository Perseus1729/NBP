// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VeritIdentityTable.sol";

contract VeritTraceRecords {
    
    // Structure for storing records
    struct Record {
        bytes32 dataIndexHash;
        bytes signature;
        string platformHandle;
        bytes32 inputMessage;
        uint256 timeStamp;
        string platformIdentifier;
        string platformSignature;
        string platformMetadata;
    }
    
    // Identity table
    VeritIdentityTable veritIdentityTable;
    
    event RecordAdded(Record record);
    event ErrorLog(string reason);
    
    // maps from Hash(dataIndexHash + platformIdentifier) => Record
    mapping (bytes32 => Record) records;
    
    // Initialize with an existing veritIdentityTable contract
    constructor(address _address) {
        veritIdentityTable = VeritIdentityTable(_address);
    }
    
    // Adds a record to the mapping
    // The address is taken from msg.sender
    function addRecord (Record memory record) public returns (bool added) {
        
        if(msg.sender != veritIdentityTable.getUserAddress(msg.sender)) {
            emit ErrorLog("Message Sender not a registered address");
            return false;
        }
        
        if (keccak256(abi.encodePacked(record.platformHandle)) != veritIdentityTable.getPlatformHandleHash(msg.sender, record.platformIdentifier)) {
            emit ErrorLog("Platform Handle not attested");
            return false;
        }
        
        bytes32 messageHash = keccak256(abi.encodePacked("Verit Trace Records\n", record.platformIdentifier, "\n", record.inputMessage, record.dataIndexHash, record.timeStamp));
        bool verify = veritIdentityTable.verifySign(msg.sender, messageHash, record.signature);
        
        if(!verify) {
            // emit ErrorLog(abi.encodePacked("Verit Trace Records\n", record.platformIdentifier, "\n", record.inputMessage, record.dataIndexHash, record.timeStamp));
            emit ErrorLog("Signature not verified");
            return false;
        }
        
        bytes32 index = keccak256(abi.encodePacked(record.dataIndexHash, record.platformIdentifier));
        records[index] = record;
        emit RecordAdded(record);
        return true;
    }
    
    // Used to verify an alread added record
    function verifyRecord (bytes32 dataIndexHash, bytes32 messageHash, string memory platformIdentifier) public view returns (bool correct) {
        bytes32 index = keccak256(abi.encodePacked(dataIndexHash, platformIdentifier));
        if(records[index].inputMessage == messageHash)
            return true;
        return false;
    }
}

/*

address2= 
0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
privKey = 
7e5bfb82febc4c2c8529167104271ceec190eafdca277314912eaabdb67c6e5f

record:
bytes32 dataIndexHash;
0xb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6
bytes signature;
0xd0f894d264e782274071aa79663660153570ee9bca0192010aa573879ad092cf6f67d39c816ce923273643e5be1815c880aca00621c15709ea260e649c319a161c
use:
web3.eth.accounts.sign(web3.utils.soliditySha3(web3.utils.encodePacked("Verit Trace Records\n", platformIdentifier + "\n", inputMessage, dataIndexHash, timeStamp)), privKey)

string platformHandle;
"atharv"
bytes32 inputMessage;
0xcedf45072aa31710694cc8d8ff2f1697900077d7ebba2622d600771f1104f101
uint256 timeStamp;
123456
string platformIdentifier;
"Twitter"
string platformSignature;
"12"
string platformMetadata;
"12"

[ "0xb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6", "0x78c4d8bb06495815c80649dff9b1c970e1ca32243841c1b469d408af8f01d7fc521c8b041fd97d455fd405682b6065c6cf1dd1bd29c76a19b9f29792158c99a41b", "atharv", "0xcedf45072aa31710694cc8d8ff2f1697900077d7ebba2622d600771f1104f101", 123456, "Twitter", "12", "12"]
*/