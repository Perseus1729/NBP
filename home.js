const init = async () =>{
    var count=2;
    const button1 = document.getElementById('transactions');
    button1.addEventListener('click', () => {
        window.location.replace('./transactions.html');
    });

    const button2 = document.getElementById('verify');
    button2.addEventListener('click', () => {
        window.location.replace('./verit-verify.html');
    });

//    const button3 = document.getElementById('record');

    const VeritTraceRecords = require('./contracts/build/contracts/VeritTraceRecords.json');
    const VeritIdentityTable = require('./contracts/build/contracts/VeritIdentityTable.json');
    const maticweb3 = new Web3(new Web3.providers.HttpProvider('https://rpc-mumbai.maticvigil.com'));
    console.log(maticweb3);

    const contract = new maticweb3.eth.Contract(
        VeritIdentityTable.abi,
        '0xD86A4b3021c4095397A9923e99F728943925CBe8'
    );
    console.log(contract);
    const record_contract = new maticweb3.eth.Contract(
        VeritTraceRecords.abi,
        '0xA18d955d14B6F618156b358533D43C2E4e763789'
    );
let owner = "0xA71A9AEe3b0d8027e7A654aA7ddf8a3D882C64F5";
let owner_privKey = "0xbcfbe70f344d492288500c017f0530a8ecd78766ad71d099e37e30ebc45242e2";

let address2 = localStorage.getItem("Address");
let ciphertext=localStorage.getItem("PrivKey");
let passphrase=localStorage.getItem("password");
let address2_privKey = CryptoJS.AES.decrypt(ciphertext, passphrase).toString(CryptoJS.enc.Utf8);
const acc = maticweb3.eth.accounts.privateKeyToAccount(address2_privKey);
//console.log(acc);
maticweb3.eth.accounts.wallet.add(acc);

document.getElementById("text_address").innerHTML=address2;

var wallet=localStorage.getItem("Wallet");
console.log(wallet);
var account= maticweb3.eth.accounts.create();

var encrypttext= CryptoJS.AES.encrypt(address2_privKey, passphrase).toString();
localStorage.setItem("PrivKey",encrypttext);
let signat = maticweb3.eth.accounts.sign(maticweb3.utils.keccak256(maticweb3.utils.encodePacked("Verit Platform Registration\n", address2)), owner_privKey);
//console.log(signat);
let sign  = signat.signature;
var result =  await contract.methods.registerAddress("User", [], sign).send({from: address2, gas:100000 });
//console.log(result);
//Adding Attestation
let platformHandle = "atharv";
signat = maticweb3.eth.accounts.sign(maticweb3.utils.keccak256(maticweb3.utils.encodePacked("Verit Platform Attestation\n", platformHandle + "\n", address2)), owner_privKey);
sign  = signat.signature;

result = await contract.methods.addAttestation(["Twitter", "twitter.com", sign, "atharv"]).send({from: address2, gas:800000 });
//console.log(result);
//Adding record
$(function() {
    $('#record').click(function(){
        console.log("Clicked Button");
        account= maticweb3.eth.accounts.create();
      var newDiv = $('<div class="card"><div class="card-body"><p class="card-text">Account Number '+count+' </p><div class="card-header">Account address <p id="text"> '+account.address+'</p></div></div></div>');
      $('#body').append(newDiv);
      maticweb3.eth.accounts.wallet.add(account);
      address2=account.address;
      localStorage.setItem("Address",address2);
      address2_privKey=account.privateKey;
      encrypttext= CryptoJS.AES.encrypt(address2_privKey, passphrase).toString();
      localStorage.setItem("PrivKey",encrypttext);
      count++;
    });
});




} 


init();
