window.addEventListener('mouseup', wordSelected);
function wordSelected() {
  let selectedText = window
    .getSelection()
    .toString()
    .trim();
  console.log(selectedText);
  
  if (selectedText.length > 0) {
    let message = {
      text: selectedText
    };
    if(typeof chrome.app.isInstalled!=='undefined'){
    chrome.runtime.sendMessage(message);
    } 
  }
}
/*
// this part is "twitter specific"- this used to catch the tweet which is written
var x= document.getElementsByClassName("public-DraftStyleDefault-block public-DraftStyleDefault-ltr")[0].textContent;
console.log(x);
// this part is used to catch clicking action of "Tweet" button in twitter
$('[data-testid="tweetButtonInline"]').click(function(){
  console.log("hello");
//  var x= document.getElementsByClassName("public-DraftStyleDefault-block public-DraftStyleDefault-ltr")[0].textContent;
    console.log(x);
});
var new_but=document.getElementsByClassName("css-1dbjc4n r-urgr8i r-42olwf r-sdzlij r-1phboty r-rs99b7 r-19u6a5r r-ero68b r-vkv6oe r-icoktb r-1ny4l3l r-1fneopy r-o7ynqc r-6416eg r-lrvibr")[0];
new_but.addEventListener('click', () => {
    var x= document.getElementsByClassName("public-DraftStyleDefault-block public-DraftStyleDefault-ltr")[0].textContent;
    console.log(x);
});
*/