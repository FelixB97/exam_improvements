const progress = document.getElementById("progress");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const circles = document.querySelectorAll(".circle");

//add event to payment button
document.querySelector("#next").addEventListener("click", function(){
    window.location.href="./payment.html";
})

let currentActive = 1;

next.addEventListener("click", () => {
    currentActive++;
    if (currentActive > circles.length) {
        currentActive = circles.length;
    }
    update();
});
prev.addEventListener("click", () => {
    currentActive--;
    if (currentActive < 1) {
        currentActive = 1;
    }
    update();
});


function update() {
    circles.forEach((circle, i) => {
        if (i < currentActive) {
            circle.classList.add("active");
        } else {
            circle.classList.remove("active");
        }
    });
    const actives = document.querySelectorAll(".active");
    /* console.log((actives.length /circles.length) * 100); */
    progress.style.width = ((actives.length - 1) / (circles.length - 1)) * 100 + "%";
}


function loadInformation() {
    const behandlingsnavn = window.localStorage.getItem("behandlingsnavn");
    const pris = window.localStorage.getItem("pris");
    const varighed = window.localStorage.getItem("varighed");
    console.log(behandlingsnavn + pris + varighed);

    document.querySelector(".behandling_navn").textContent = behandlingsnavn;
    document.querySelector(".behandling_varighed").textContent = varighed + " min";
    document.querySelector(".behandling_pris").textContent = pris + " kr.";
    if (varighed === "") {
        document.querySelector(".behandling_varighed").textContent = "";
    }
}


function loadBestilling() {
    const htmlElement = document.querySelectorAll(".dycalendar-month-container .dycalendar-body table tr td");
    console.log("loaded");
    console.log(htmlElement);
    
    htmlElement.forEach(element => {
        element.addEventListener("click", () =>{
            console.log("clicked");
            htmlElement.forEach(element => {
                element.classList.remove("dycalendar-target-date");
            });
            element.classList.add("dycalendar-target-date");
        })
    });
    addClick();
    
}

function addClick() {
    document.querySelector(".next-btn").addEventListener("click", refresh);
    document.querySelector(".prev-btn").addEventListener("click", refresh);
    
}

function refresh() {
    setTimeout(loadBestilling, 1000);
}
setTimeout(loadBestilling, 1000);
loadInformation();