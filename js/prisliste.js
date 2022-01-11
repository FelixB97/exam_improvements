//FILTER
// let filter = "alle";
let produkter;
const temp = document.querySelector("template");

const link = "http://felixbryld.dk/kea/final_exam//wp-json/wp/v2/prisliste?per_page=100";

//Load Site + function

export default function loadPrisliste() {
  console.log("loading prisliste js..");
  hentData();
}

// document.addEventListener("DOMContentLoaded", hentData);

async function hentData() {
  const respons = await fetch(link);
  produkter = await respons.json();
  addEventListenersToButtons();
  vis(produkter);
}

function vis(produkter) {
    //Løber igennem array "produkter" fra JSON (WP)
    // container.innerHTML = "";
    //forEach Loop
    produkter.reverse().forEach((produkt) => {
        // console.log(produkt.categories[0]);
        const container = document.querySelector(`.category${produkt.categories[0]}`);
        // console.log(produkt);
        const klon = temp.cloneNode(true).content;
        klon.querySelector(".behandlingsnavn").textContent = produkt.behandlingsnavn;
        klon.querySelector(".behandlingspris").textContent = produkt.pris + " kr.";
        if (produkt.varighed == "") {
          klon.querySelector(".varighed").textContent = "";  
        } else {
          klon.querySelector(".varighed").textContent = produkt.varighed + " min";  
        }
              
        container.appendChild(klon);
  });
}

//ikke brugt længere
function addEventListenersToButtons() {
  document.querySelectorAll(".filter").forEach((btn) => {
    btn.addEventListener("click", filterBTNs);
  });
}

