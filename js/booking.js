//FILTER
let filter = "alle";
let produkter;
let container = document.querySelector("#booking_container");
let temp = document.querySelector("template");

//URL + ID
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const link = "http://felixbryld.dk/kea/final_exam//wp-json/wp/v2/prisliste?per_page=100";

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
        if (filter == "alle" || filter == produkt.categories) {
            console.log(produkt);
            const klon = temp.cloneNode(true).content;
            klon.querySelector(".behandling_navn").textContent = produkt.behandlingsnavn;
            klon.querySelector(".behandling_pris").textContent = produkt.pris + " kr.";
            if (produkt.billede !== false) {
                klon.querySelector(".behandling_billede").src = produkt.billede.guid;
            }
          klon.querySelector(".button_container").addEventListener("click", () => transfer(produkt));

          container.appendChild(klon);
        }
    });
    //Alle produkters ID
    produkter.forEach((produkt) => {
        if (id == produkt.id) {
            transfer(produkt);
         }
    });
}

//Location.href til Transfer
function transfer(produkt) {
  window.localStorage.setItem("behandlingsnavn", produkt.behandlingsnavn);
  window.localStorage.setItem("pris", produkt.pris);
  window.localStorage.setItem("varighed", produkt.varighed);
}

//Kommer fra hentData
function addEventListenersToButtons() {
  document.querySelectorAll(".filter").forEach((btn) => {
    btn.addEventListener("click", filterBTNs);
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