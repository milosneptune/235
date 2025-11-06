 // 1
        // this hooks up an event handler to window.onload event
        // doesnt need to be wrapped in arrow function
        // arrows let you skip some syntax for functions
        window.onload = (e) => { document.querySelector("#search").onclick = searchButtonClicked };

        // 2
        // store what user has searched for.
        // here so we can access it from outside searchButtonClicked function
        let displayTerm = "";

        // 3
        // called when button is clicked
        function searchButtonClicked() {
            console.log("searchButtonClicked() called");

            //1
            const GIPHY_URL = "https://api.giphy.com/v1/gifs/search?";

            //2 - public API key
            let GIPHY_KEY = "5PuWjWVnwpHUQPZK866vd7wQ2qeCeqg7";

            //3 - build our url string
            let url = GIPHY_URL;
            url += "api_key=" + GIPHY_KEY;

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
            // the web service requires this parameter name to be q
            url += "&q=" + term;

            //9 - grab user chosen search limit from the select and append it to url
            let limit = document.querySelector("#limit").value;
            // parameters are formated as name=value and separated by ampersands.
            url += "&limit=" + limit;

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
            // 5 - target is the xhr obj
            let xhr = e.target;
            // 6 response is the JSON file we just downloaded
            console.log(xhr.responseText);

            // 7 - turn text into parsable js obj
            let obj = JSON.parse(xhr.responseText);
            // 8 - condition for if no results, print msg and bail
            if (!obj.data || obj.data.length == 0) {
                document.querySelector("#status").innerHTML = "<b>No results found for '" + displayTerm + "'</b>";
                return;
            }

            //9 - start buiilding html string to display to user
            let results = obj.data;
            console.log("results.length = " + results.length);
            let bigString = "";

            //10 - loop through results array
            for (let i = 0; i < results.length; i++) {
                let result = results[i];

                // 11 - get the url to the gif
                let smallURL = result.images.fixed_width_downsampled.url;
                if (result.images.fixed_width_downsampled.height > 100) { smallURL = result.images.fixed_height_downsampled.url; }
                if (!smallURL) smallURL - "images/no-image-found.png";

                //12 - get the url to giphy page
                let url = result.url;

                //13 build a div to hold each result
                //ES6 string templating
                // let rating = result.rating.toUpperCase();
                let rating = (result.rating ? result.rating : "NA").toUpperCase();

                let line = `<div class='result'><img src='${smallURL}' title='${result.id}' />`;
                    line += `<span><a target='_blank' href='${url}'>View on Giphy</a><p>Rating: ${rating}</p> </span>`;
                    line += `</div>`;
                    // 15
                    bigString += line;
            }

            // 16 - show to user
            document.querySelector("#content").innerHTML = bigString;
            document.querySelector("#status").innerHTML = "<b>Success!</b><p><i>Here are " + results.length + " results for '" + displayTerm + "'</i></p>";
        }
        function dataError(e) {
            console.log("Error occurred!");
        }
