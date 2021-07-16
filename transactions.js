var count=1;
var data={
    transaction_id: '123456',
    platform: 'twitter',
    tweet_id: '456909876543'
  };
const init = async () =>{
    const button1 = document.getElementById('home');
    button1.addEventListener('click', () => {
        console.log("Hello");
        window.location.replace('./home.html');
    });

    const button2 = document.getElementById('verify');
    button2.addEventListener('click', () => {
        console.log("Hello");
        window.location.replace('./verit-verify.html');
    });
    $(function() {
        $('#btnAddtoList').click(function(){
         
        });
    });

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
    
    let platformIdentifier = "Twitter";
let inputMessage = '0xcedf45072aa31710694cc8d8ff2f1697900077d7ebba2622d600771f1104f101';
let signat = maticweb3.eth.accounts.sign(maticweb3.utils.keccak256(maticweb3.utils.encodePacked("Verit Platform Registration\n", address2)), owner_privKey);
//console.log(signat);
let sign  = signat.signature;
//var result =  await contract.methods.registerAddress("User", [], sign).send({from: address2, gas:100000 });
//console.log(result);
//Adding Attestation
let platformHandle = "atharv";
 signat = maticweb3.eth.accounts.sign(maticweb3.utils.keccak256(maticweb3.utils.encodePacked("Verit Platform Attestation\n", platformHandle + "\n", address2)), owner_privKey);
 sign  = signat.signature;

//result = await contract.methods.addAttestation(["Twitter", "twitter.com", sign, "atharv"]).send({from: address2, gas:800000 });

let index = 1;
let dataIndexHash = '0xb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6';
let timeStamp = '123456';
let platformSignature = "12";
let platformMetadata = "12";

let input_index="1406255228861648897";
dataIndexHash = maticweb3.utils.keccak256(maticweb3.utils.encodePacked(input_index));
//let platformHandle = "atharv";
    const button3 = document.getElementById('btnAddtoList');
    button3.addEventListener('click', () => {
    let bgpage = chrome.extension.getBackgroundPage();
    let word = bgpage.word.trim();
    inputMessage = maticweb3.utils.keccak256(maticweb3.utils.encodePacked(word));
    console.log(word);
//    window.location.replace('./transactions.html'); 
    console.log("Hi");
    if((word!="Sign")&&(word!="")){
    //    dataIndexHash = maticweb3.utils.keccak256(maticweb3.utils.encodePacked(index));
    var new_signat = maticweb3.eth.accounts.sign(maticweb3.utils.keccak256(maticweb3.utils.encodePacked("Verit Trace Records\n", platformIdentifier + "\n", inputMessage, dataIndexHash, timeStamp)), address2_privKey);
//    console.log(new_signat);
    var sign = new_signat.signature;
    console.log(sign);
    let record = [dataIndexHash,sign,platformHandle,inputMessage,timeStamp,platformIdentifier,platformSignature,platformMetadata];
    console.log(record);

        const init1 = async () =>{
            console.log("Hello");
            const new_result = await record_contract.methods.addRecord(record).send({from: address2, gas:1000000 });
            console.log(new_result);
            const output = await record_contract.methods.verifyRecord(dataIndexHash,inputMessage,platformIdentifier).call({from: address2, gas:1000000 });
        console.log(output);
            index = index + 1;
            word="Sign";
            console.log("Hi");
        var transaction_id=new_result.transactionHash;
        var newDiv = $('<div class="card"><div class="card-body"><h4 class="card-title">Transaction </h4><p class="card-text">Number '+count+' </p><div class="card-header">Transaction Id <p id="text"> '+transaction_id+'</p></div><div class="card-body">From<p> '+new_result.from+'</p></div></div></div>');
        count++;
        $('#closed').append(newDiv);  
        //    alert("Adding the The transaction");
        //    localStorage.setItem("Localrecord", record_contract);     
        }    
        init1();  
        
    
    }
});
} 
init();
