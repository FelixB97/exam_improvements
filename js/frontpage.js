"use strict";

export default function loadFrontpage() {
    console.log("Frontpage Code Loading..");
    getReviews();
}

async function getReviews() {
    console.log("getting reviews..")

    const reviewData = await fetchReviews("http://felixbryld.dk/kea/final_exam//wp-json/wp/v2/trustpilot?");

    addReviewsToDom(reviewData);
}

async function fetchReviews(url) {
    console.log("fetching reviews..");
    const data = await fetch(url);
    const reviews = await data.json();

    return reviews;
}

function addReviewsToDom(reviewData) {
    console.log("writing reviews in HTML")
    const container = document.querySelector(".trustpilotC");
    const template = document.querySelector("#reviewTemplate");
    console.log(reviewData);
    container.innerHTML = "";

    reviewData.forEach( (review) => {

        const klon = template.cloneNode(true).content;

        klon.querySelector(".shortReview").innerHTML = review.title.rendered;
        klon.querySelector(".longReview").innerHTML = review.beskrivelse;
        klon.querySelector(".reviewer").innerHTML = review.navn;

        //star selector
        const starAmount = parseInt(review.stjerner);
        const starSelector = klon.querySelectorAll(`.starContainer div:nth-child(-n+${starAmount})`);
        starSelector.forEach((selector)=> {
            selector.classList.remove("hidden");
        })
        
        container.appendChild(klon);
    })

}