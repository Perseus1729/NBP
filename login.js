const button = document.querySelector('button');
document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    const pass = document.querySelector('#password').value;
    if (pass) {
        // send message to background script with email and password
        const localpassword= localStorage.getItem("password");
        if(pass == localpassword){
            window.location.replace('./home.html');
        }
           
    } else {
        document.querySelector('#password').placeholder = "Enter a password.";
        document.querySelector('#password').style.backgroundColor = 'red';
        document.querySelector('#password').classList.add('white_placeholder');
    }
});
