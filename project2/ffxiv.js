// https://ffxivcollect.com/api/mounts/1?language=fr

// WARNING: For GET requests, body is set to null by browsers.

var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;
let results = "";

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(xhr.responseText);
    let obj = JSON.parse(xhr.responseText);
    // results = obj.data;

    let bigString = "";

    // for (let i = 0; i < results.length; i++) {
    // let id = results[1];
    // }

    let id = obj.id;
    let name = obj.name;
    let cat = obj.type.category;

    let line = `<div class='result'>ID = ${id}<br>Name = ${name}<br>${cat}</brf></div>`;
    bigString += line;
    document.querySelector("#content").innerHTML = bigString;
  }
});

// xhr.open("GET", "https://ffxivcollect.com/api/spells");
xhr.open("GET", "https://ffxivcollect.com/api/relics/1675");
// document.querySelector("#content").innerHTML = bigString;
xhr.send();