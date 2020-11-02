/*
 * Page-Specific Scripts Here 
 */


 // Road Trip Script Import

let articleArray;
let activeBtn = "atlanta"; // this is the button active upon page load
const btnList = document.querySelector(".art-nav-list"); // as in Article Buttons
const articleHTML = document.querySelector(".long-article");

fetch('../scripts/json/road-trip.json') // fetch road-trip json info 
  .then(response => {
    return response.json();
  })
  .then(data => {
    articleArray = data['articles'];
  })

function changeArticle(targetID) {  // the target's ID is passed through
  let target = document.querySelector(`#${targetID}`); // selects element that was targeted
  for(let i = 0; i < articleArray.length; i++) { // loops through the articles in the article array, which was fetched
    if (articleArray[i].id == targetID) {
      document.querySelector(`#${activeBtn}`).className = "button-title"; // reset active button
      target.className = "button-title button-title-active"; // apply active to new target
      activeBtn = targetID; // new target becomes active button
      articleHTML.innerHTML = `${fromASCII(articleArray[i].html)}`;
    }
  }
}

function fromASCII(array){ //returns a string from an ascii array
let asciiString = '';
  for (let i = 0; i < array.length; i++) {
    asciiString += String.fromCharCode(array[i]);
  }
  return asciiString;
}


btnList.addEventListener('click', (element) => { 
  if(element.target.nodeName == "SPAN") { // if user clicks SPAN and not the LI button
    let parentTarget = element.target.parentNode;
    changeArticle(parentTarget.id); // selects the spans parent, which has the correct ID
  } else {
    changeArticle(element.target.id); // selects the parent directly
  }
});

