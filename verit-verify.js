const init = async () =>{
    const button1 = document.getElementById('transactions');
    button1.addEventListener('click', () => {
        window.location.replace('./transactions.html');
    });
    document.getElementById("home").addEventListener("click", function() {
        window.location.replace('./home.html');
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
let address2 = localStorage.getItem("Address");
let ciphertext=localStorage.getItem("PrivKey");
let passphrase=localStorage.getItem("password");
let address2_privKey = CryptoJS.AES.decrypt(ciphertext, passphrase).toString(CryptoJS.enc.Utf8);
const acc = maticweb3.eth.accounts.privateKeyToAccount(address2_privKey);
//console.log(acc);
maticweb3.eth.accounts.wallet.add(acc);
let bgpage = chrome.extension.getBackgroundPage();
let word = bgpage.word.trim();
console.log(word);

document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    var index = document.getElementById('index').value;
//    console.log(index);
    var message = document.getElementById('message').value;
//    console.log(message);
    var n_platformIdentifier = document.getElementById('platform').value;
//    console.log(n_platformIdentifier);
    const init2 = async () =>{
//        var output = await record_contract.methods.verifyRecord(dataIndexHash,inputMessage,platformIdentifier).call({from: address2, gas:900000 });
//        console.log(output);
        var n_dataIndexHash = maticweb3.utils.keccak256(maticweb3.utils.encodePacked(index));
        var n_inputMessage = maticweb3.utils.keccak256(maticweb3.utils.encodePacked(message));
        output = await record_contract.methods.verifyRecord(n_dataIndexHash,n_inputMessage,n_platformIdentifier).call({from: address2, gas:900000 });
        console.log(output);
        if(output){
            alert('Correct Message');
        }
        else{
            alert('Wrong Message');
        }
    }
    init2();
});

} 

init();
