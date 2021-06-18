const button1 = document.getElementById('accounts');
button1.addEventListener('click', () => {
    window.location.replace('./account.html');
});
const button2 = document.getElementById('verify');
button2.addEventListener('click', () => {
    window.location.replace('./verit-verify.html');
});
const button3 = document.getElementById('transactions');
button3.addEventListener('click', () => {
    window.location.replace('./transactions.html');
});

/*
const init = async () =>{
    var web3 = window.web3;
    define(function (require){
        const Web3=require('web3');
   })
    const VeritIdentityTable = require('./ssi-verit/contracts/build/contracts/VeritIdentityTable.json');
    const VeritTraceRecords = require('./ssi-verit/contracts/build/contracts/VeritTraceRecords.json');
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
//    console.log(web3);
    const id= await web3.eth.net.getId();
//    console.log(id);
    const deployedNetwork = VeritIdentityTable.networks[id];
//    console.log(deployedNetwork);
    const contract = new web3.eth.Contract(
        VeritIdentityTable.abi,
        deployedNetwork.address
    );
//    console.log(contract);
    const RecordsNetwork = VeritTraceRecords.networks[id];
    const record_contract = new web3.eth.Contract(
        VeritTraceRecords.abi,
        RecordsNetwork.address
    );
//    console.log(record_contract);
    //contract  Initiating Adding User
let owner = "0xA71A9AEe3b0d8027e7A654aA7ddf8a3D882C64F5";
let owner_privKey = "0xbcfbe70f344d492288500c017f0530a8ecd78766ad71d099e37e30ebc45242e2";
let address2 = "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2";
let address2_privKey = "7e5bfb82febc4c2c8529167104271ceec190eafdca277314912eaabdb67c6e5f";
let signat = web3.eth.accounts.sign(web3.utils.keccak256(web3.utils.encodePacked("Verit Platform Registration\n", address2)), owner_privKey);

let sign  = signat.signature;

let result = await contract.methods.registerAddress("User", [], sign).call();
//console.log(result);
//Adding Attestation
let platformHandle = "atharv";
signat = web3.eth.accounts.sign(web3.utils.keccak256(web3.utils.encodePacked("Verit Platform Attestation\n", platformHandle + "\n", address2)), owner_privKey);
sign  = signat.signature;

result = contract.methods.addAttestation(["Twitter", "twitter.com", sign, "atharv"]).call();

//Adding record
let platformIdentifier = "Twitter";
let inputMessage = '0xcedf45072aa31710694cc8d8ff2f1697900077d7ebba2622d600771f1104f101';
let bgpage = chrome.extension.getBackgroundPage();
let word = bgpage.word.trim();
//console.log(word);
let index = 1;
let dataIndexHash = '0xb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6';
let timeStamp = '123456';
let platformSignature = "12";
let platformMetadata = "12";
while((word!="Sign")&&(word!="")){
//    inputMessage = web3.utils.keccak256(web3.utils.encodePacked(word));
//    dataIndexHash = web3.utils.keccak256(web3.utils.encodePacked(index));
    var new_signat = web3.eth.accounts.sign(web3.utils.keccak256(web3.utils.encodePacked("Verit Trace Records\n", platformIdentifier + "\n", inputMessage, dataIndexHash, timeStamp)), address2_privKey);
    console.log(new_signat);
    sign = new_signat.signature;
    console.log(sign);
    let record = [dataIndexHash,sign,platformHandle,inputMessage,timeStamp,platformIdentifier,platformSignature,platformMetadata];
    console.log(record);
    result = record_contract.methods.addRecord(record).call();
    index = index + 1;
    word="Sign";
//    alert("Adding the The transaction");
    localStorage.setItem("Localrecord", record_contract); 
}
    //Verify Data
//    const verifyer = record_contract.verifyRecord(dataIndexHash, messageHash, platformIdentifier).call();
const verifyer = record_contract.methods.verifyRecord(dataIndexHash, inputMessage, platformIdentifier).call();
console.log(verifyer);
if(verifyer){
    alert("Correct Message");
}
} 
init();
*/
/*
const CryptoJS = require("crypto-js");

const encryptWithAES = (text) => {
  const passphrase = "123";
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};

const decryptWithAES = (ciphertext) => {
  const passphrase = "123";
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
*/
/*
//https://www.geeksforgeeks.org/how-to-access-variables-from-another-file-using-javascript/#:~:text=In%20JavaScript%2C%20variables%20can%20be,file%20in%20an%20HTML%20file.
module.exports = {Student};
const {Student} = require('./module1.js');
//https://stackoverflow.com/questions/41255861/how-to-pass-variable-from-one-javascript-to-another-javascript-file
var globalVariable={
    x: 'sachin'
 };
 alert(globalVariable.x);
 //Get And Set Variable Values From One JavaScript File To ...https://www.c-sharpcorner.com › blogs › get-and-set-va...
 A.js var variableOne = "valueOne";  
B.js var variableTwo; 
 localStorage.setItem("vOneLocalStorage", variableOne); 
 var vOneLS = localStorage.getItem("vOneLocalStorage ");  
 var variableTwo = vOneLS;  
*/
