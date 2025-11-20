// https://ffxivcollect.com/api/mounts/1?language=fr

// WARNING: For GET requests, body is set to null by browsers.

//var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;
// let bigString = "";

// hooks up event handler to window onload
window.onload = (e) => { document.querySelector("#search").onclick = searchButtonClicked };
let displayTerm = ""; // stores what user will search for

function searchButtonClicked() {
  console.log("searchButtonClicked() called");

  //1
  const FFXIV_URL = "https://ffxivcollect.com/api/relics";

  //2 - public API key
  // let GIPHY_KEY = "5PuWjWVnwpHUQPZK866vd7wQ2qeCeqg7";

  //3 - build our url string
  let url = FFXIV_URL;
  // url += "api_key=" + GIPHY_KEY;

  //4 parse user entered term so we can search it
  let term = document.querySelector("#searchterm").value; // .value gives us the wtv is in the text input field
  displayTerm = term;

  //5 - clean it up
  term = term.trim();

  //6 - encode spaces and spc chars
  // ex, a space becomes %20
  term = encodeURIComponent(term);

  //7 - if no term to search then stop!
  if (term.length < 1) return;

  //8 - append search term to url
  // api does a /api/minions/.../ format
  // url += "&name_en_cont=" + term;

  //9 - grab user chosen search limit from the select and append it to url
  let limit = document.querySelector("#limit").value;
  // parameters are formated as name=value and separated by ampersands.
  url += "?limit=" + limit;
  url += "&name_en_cont=" + term;

  //10 - update ui
  document.querySelector("#status").innerHTML = "<b>Searching for '" + displayTerm + "'</b>";

  //11 - lets see the url!
  console.log(url);
  // we get back a JSON - JS object literal
  // now we will download data with an XMLHTTPRequest, known as XHR

  // 12 Request data!
  getData(url);
}

function getData(url) {
  // 1 - create XHR object
  let xhr = new XMLHttpRequest();

  //2 - set the onload handler
  xhr.onload = dataLoaded;

  //3 - set onerror handler
  xhr.onerror = dataError;

  //4 - open connection, send request
  xhr.open("GET", url);
  xhr.send();
}

function dataLoaded(e) {
  // target is the xhr obj
  let xhr = e.target;
  // response is the JSON file we just downloaded
 // console.log(xhr.responseText);

  // 7 - turn text into parsable js obj
  let obj = JSON.parse(xhr.responseText);

  // 8 - condition for if no results, print msg and bail
  // console.log(obj.count);

  if (!obj.results || obj.count == 0) {
    document.querySelector("#status").innerHTML = "<b>No results found for '" + displayTerm + "'</b>";
    return;
  }

  // let my_results = obj;
  console.log("results.length = " + obj.count);
  let bigString = "";

  for (let i = 0; i < obj.count; i++) {
    // let id = results[1];
    let result = obj.results[i];
    // console.log(result[i]);

    let id = result.id;
    let name = result.name;
    // will need to do some checking to see if they have stuff like descs, owned, icons, stuff 
    // exclusive to one category...
    console.log(name + " " + id);
    let line = `<div class='result'>ID = ${id}<br>Name = ${name}<br></brf></div>`;
    bigString += line;
  }
  document.querySelector("#content").innerHTML = bigString;
  document.querySelector("#status").innerHTML = "<b>Success!</b><p><i>Here are " + obj.count + " results for '" + displayTerm + "'</i></p>";
}

function dataError(e) {
    console.log("Error occurred!");
}
