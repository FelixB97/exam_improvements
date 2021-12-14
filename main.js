"use strict";
import './style/style.scss';

import loadFrontpage from '/js/frontpage.js';
import loadMailApp from '/js/components/emailer.js';
import loadPrisliste from '/js/prisliste.js';
import burgerMenu from '/js/components/burgermenu.js';

init();

function init() {
//init start
burgerMenu();
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



