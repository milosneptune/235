// https://ffxivcollect.com/api/mounts/1?language=fr

// WARNING: For GET requests, body is set to null by browsers.

//var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;
// let bigString = "";

// hooks up event handler to window onload
window.onload = (e) => {
  document.querySelector("#search").onclick = searchButtonClicked;
  loadLastSearchTerm(); // Load the last search term when page loads
};

let displayTerm = ""; // stores what user will search for

function loadLastSearchTerm() {
  // load the last search term from localStorage and populate the input field
  const lastSearchTerm = localStorage.getItem("lastSearchTerm");
  if (lastSearchTerm) {
    document.querySelector("#searchterm").value = lastSearchTerm;
  }
  document.querySelector("#history").innerHTML = "Last Searched: " + lastSearchTerm;
}

function searchButtonClicked() {
  console.log("searchButtonClicked() called");

  const FFXIV_URL = "https://ffxivcollect.com/api";

  // build our url string
  let url = FFXIV_URL;

  // parse user entered term so we can search it
  let term = document.querySelector("#searchterm").value; // .value gives us the wtv is in the text input field
  displayTerm = term;
  term = term.trim();

  // save the search term to localStorage
  localStorage.setItem("lastSearchTerm", term);

  // encode spaces and spc chars
  // ex, a space becomes %20
  term = encodeURIComponent(term);

  // if no term to search then stop!
  if (term.length < 1) return;

  // grab user chosen search limit from the select and append it to url
  let limit = document.querySelector("#limit").value;
  let cat = document.querySelector("#category").value;

  // parameters are formated as name=value and separated by ampersands.
  // append search term to url
  url += "/" + cat;
  url += "?limit=" + limit;
  url += "&name_en_cont=" + term;

  // update ui
  document.querySelector("#status").innerHTML = "<b>Searching for '" + displayTerm + "'</b>";

  // see the url
  console.log(url);
  // we get back a JSON - JS object literal
  // now we will download data with an XMLHTTPRequest, known as XHR

  // Request data!
  getData(url);
}

function getData(url) {
  // create XHR object
  let xhr = new XMLHttpRequest();

  // set the onload handler
  xhr.onload = dataLoaded;

  // set onerror handler
  xhr.onerror = dataError;

  // open connection, send request
  xhr.open("GET", url);
  xhr.send();
}

function dataLoaded(e) {
  // target is the xhr obj
  let xhr = e.target;
  // response is the JSON file we just downloaded
  // console.log(xhr.responseText);

  // turn text into parsable js obj
  let obj = JSON.parse(xhr.responseText);

  // condition for if no results, print msg and bail
  // console.log(obj.count);

  if (!obj.results || obj.count == 0) {
    document.querySelector("#status").innerHTML = "<b>No results found for '" + displayTerm + "'</b>";
    return;
  }

  console.log("results.length = " + obj.count);
  let bigString = "";

  for (let i = 0; i < obj.count; i++) {
    let result = obj.results[i];
    // console.log(result[i]);

    let id = result.id;
    let name = result.name;

    // will need to do some checking to see if they have stuff like descs, owned, icons, stuff 
    // exclusive to one category...
    console.log(name + " " + id);
    let line = `<div class='result'>${name} (${id})<br></brf></div>`;
    bigString += line;
  }
  document.querySelector("#content").innerHTML = bigString;
  document.querySelector("#status").innerHTML = "<b>Success!</b><p><i>Here are " + obj.count + " results for '" + displayTerm + "'</i></p>";
}

function dataError(e) {
  console.log("Error occurred!");
}