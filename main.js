"use strict";
import './style/style.scss';

import loadFrontpage from '/js/frontpage.js';
import loadMailApp from '/js/components/emailer.js';
import loadPrisliste from '/js/prisliste.js';

init();

function init() {
//init start

//determine site page
const path = window.location.pathname;
const page = path.split("/").pop();
loadCorrectPageCode(page);
}

function loadCorrectPageCode(title) {
    console.log("currently on " + title);

    if (title == "index.html") {
        loadFrontpage();
        }
    if (title == "kontakt.html") {
        loadMailApp();
        }
    if (title == "prisliste.html") {
        loadPrisliste();
        }
    
    
    
}



