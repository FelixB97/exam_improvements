"use strict";

export default function Progressinit() {
    //determine site page
    const path = window.location.pathname;
    const page = path.split("/").pop();

    loadCorrectPageCode(page);
}

function loadCorrectPageCode(title) {
    console.log("currently on " + title);

    if (title == "payment.html") {
        setTimeout(() => {
            secondStep();
        }, 1);
        
        document.querySelector(".payment-button").addEventListener("click",thirdStep);
        }   
}

function secondStep() {
    document.querySelector(".space1").classList.add("progressAnimation");
    setTimeout(() => {
        document.querySelector(".Point2").classList.add("progressAnimation");
    }, 700);
    
}

function thirdStep() {
    document.querySelector(".space2").classList.add("progressAnimation");
    setTimeout(() => {
        document.querySelector(".Point3").classList.add("progressAnimation");
    }, 700);
}