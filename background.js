window.word = 'Hashing Text';
console.log(word);
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request.text);
    word = request.text;
});

