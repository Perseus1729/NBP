let signIn=false;
let user_signed_in=false;
chrome.browserAction.onClicked.addListener(function () {
    console.log(user_signed_in);
    console.log('Hello');
    if (!user_signed_in) {
        chrome.browserAction.setPopup({popup: './login.html'});

    } else {
        chrome.browserAction.setPopup({popup: './home.html'});

    }
});
function flip_user_status(signIn, user_info) {
    if (signIn) {
        return fetch('http://localhost:3000/login', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + btoa(`${user_info.pass}`)
            }
        })
            .then(res => {
                return new Promise(resolve => {
                    if (res.status !== 200) resolve('fail');

                    chrome.storage.local.set({ userStatus: signIn, user_info }, function (response) {
                        if (chrome.runtime.lastError) resolve('fail');

                        user_signed_in = signIn;
                        
                        resolve('success');
                    });
                })
            })
            .catch(err => console.log(err)); 
    } else if (!signIn) {
    // fetch the localhost:3000/logout route
    return new Promise(resolve => {
        chrome.storage.local.get(['userStatus', 'user_info'], function (response) {
            console.log(response);
            if (chrome.runtime.lastError) resolve('fail');

            if (response.userStatus === undefined) resolve('fail');

            fetch('http://localhost:3000/logout', {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + btoa(`${response.user_info.pass}`)
                }
            })
                .then(res => {
                    console.log(res);
                    if (res.status !== 200) resolve('fail');

                    chrome.storage.local.set({ userStatus: signIn, user_info: {} }, function (response) {
                        if (chrome.runtime.lastError) resolve('fail');

                        user_signed_in = signIn;
                        resolve('success');
                    });
                })
                .catch(err => console.log(err));
        });
    });
}
}
window.word = 'Hashing Text';
console.log(word);
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'login') {
        flip_user_status(true, request.payload)
            .then(res => sendResponse(res))
            .catch(err => console.log(err));
        return true;
    } else if (request.message === 'logout') {
        flip_user_status(false, null)
            .then(res => sendResponse(res))
            .catch(err => console.log(err));
        return true;
    } else{
        console.log(request.text);
        word = request.text;
    }
});