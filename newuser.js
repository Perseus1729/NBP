const button = document.querySelector('button');
document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    const pass = document.querySelector('#password').value;
    console.log(pass);
    const rpass = document.querySelector('#r-password').value;
    console.log(rpass);
    if (pass == rpass) {
        localStorage.setItem("password",pass);
        const maticweb3 = new Web3(new Web3.providers.HttpProvider("https://rpc-mumbai.maticvigil.com"));
        const wallet =  maticweb3.eth.accounts.wallet.create(0, '54674321§3456764321§345674321§3453647544±±±§±±±!!!43534534534534');
        const account= maticweb3.eth.accounts.create();
        wallet.add(account);
        localStorage.setItem("Wallet",wallet);
        const address= account.address;
        console.log(address);
        localStorage.setItem("Address",address);
        const passw=account.privateKey;
        const passphrase = pass;
        const encrypttext= CryptoJS.AES.encrypt(passw, passphrase).toString();
        localStorage.setItem("PrivKey",encrypttext);
//        window.location.replace('./login.html');
    }    
    else {
        document.querySelector('#password').placeholder = "Password not Matching.";
        document.querySelector('#password').style.backgroundColor = 'red';
        document.querySelector('#password').classList.add('white_placeholder');
        document.querySelector('#r-password').placeholder = "Password not Matching.";
        document.querySelector('#r-password').style.backgroundColor = 'red';
        document.querySelector('#r-password').classList.add('white_placeholder');
    }
});
