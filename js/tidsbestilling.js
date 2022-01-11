
export default function tidsbestillingInit() {
    paymentButtonEvent();
    setTimeout(loadBestilling, 1000);
    loadInformation();
}



//add event to payment button
function paymentButtonEvent() {
document.querySelector("#next").addEventListener("click", function(){
    window.location.href="./payment.html";
})
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
