//FILTER
let filter = document.querySelector("#default_filter").dataset.item;

let produkter;
let container = document.querySelector("#container");
let temp = document.querySelector("template");

//URL + ID
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const link = "http://felixbryld.dk/kea/final_exam//wp-json/wp/v2/galleri?per_page=100";

//Load Site + function
document.addEventListener("DOMContentLoaded", hentData);

async function hentData() {
  const respons = await fetch(link);
  produkter = await respons.json();
  addEventListenersToButtons();
  vis(produkter);
}

function vis(produkter) {
  //Løber igennem array "produkter" fra JSON (WP)
  container.innerHTML = "";
  //forEach Loop
  produkter.forEach((produkt) => {
    if (filter ==  ".filter[data-item='12']" || filter == produkt.categories) {
      console.log(produkt);
      const klon = temp.cloneNode(true).content;
      klon.querySelector(".singleview-navn").textContent = produkt.titel;
      klon.querySelector(".singleview-beskrivelse").textContent = produkt.beskrivelse;
      klon.querySelector(".singleview-varighed").textContent = "Varighed: " + produkt.varighed + "min";
      klon.querySelector(".singleview-pris").textContent = produkt.pris + " kr.";
      klon.querySelector(".default").src = produkt.billede1.guid;
      klon.querySelector(".billede1").src = produkt.billede1.guid;
      klon.querySelector(".billede2").src = produkt.billede2.guid;
      klon.querySelector(".billede3").src = produkt.billede3.guid;
      klon.querySelector(".billede4").src = produkt.billede4.guid;

      //EventListener "click" -> Booking
      klon.querySelector("button").addEventListener("click", () => booking());

      container.appendChild(klon);
    }
  });
  //Alle produkters ID
  produkter.forEach((produkt) => {
    if (id == produkt.id) {
      visDetaljer(produkt);
    }
  });

  imageGallery();
}

//Location.href til Booking
function booking() {
  location.href = `/html/booking.html`;
}

//Kommer fra hentData
function addEventListenersToButtons() {
  document.querySelectorAll(".filter").forEach((btn) => {
    btn.addEventListener("click", filterBTNs);
  });
  document.querySelectorAll(".single2").forEach((btn) => {
    btn.addEventListener("click", topFunction);
  });
}

//tilføj kategori til knap
function filterBTNs() {
  filter = this.dataset.item;
  document.querySelectorAll(".filter").forEach((btn) => {
    btn.classList.remove("valgt");
  });

  this.classList.add("valgt");
  vis(produkter);
}

//Galleri
function imageGallery() {
    const highlight = document.querySelector(".gallery-highlight");
    const previews = document.querySelectorAll(".room-preview img");

    //          For hvert preview går den igennem loop og indsætte en eventlistener
    previews.forEach((preview) => {
      //              For hvert eventlistener lytter den til klik
      preview.addEventListener("click", function () {
        const smallSrc = this.src;
        // small bliver erstattet med big
        const bigSrc = smallSrc.replace("small", "big");
        highlight.src = bigSrc;
        console.log(bigSrc);
        previews.forEach((preview) => preview.classList.remove("room-active"));
        preview.classList.add("room-active");
      });
    });
  }

//Scroll to top after click
// from W3Schools - https://www.w3schools.com/howto/howto_js_scroll_to_top.asp 
function topFunction() {
  console.log("clicked");
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}