// https://ffxivcollect.com/api/mounts/1?language=fr

// WARNING: For GET requests, body is set to null by browsers.

var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;
let results = "";

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    // console.log(this.responseText);
    console.log(xhr.responseText);
    let obj = JSON.parse(xhr.responseText);
    results = obj.data;

    // console.log("results.length = " + results.length);
    let bigString = "";
    // let line = results;
    // string1 += line;
    // for (let i = 0; i < results.length; i++) {
      // let result = results[i];
      let id = results.id;
      let name = results.name;
      let line= `<div class='result'>ID='${id}' title='${name}'</div>`;
      bigstring += line;
document.querySelector("#content").innerHTML = bigString;

    // }
  }
});

// xhr.open("GET", "https://ffxivcollect.com/api/spells");
xhr.open("GET", "https://ffxivcollect.com/api/relics/1675");
// document.querySelector("#content").innerHTML = bigString;
xhr.send();