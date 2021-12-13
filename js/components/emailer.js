"use strict";
import{ init } from 'emailjs-com';
import emailjs from 'emailjs-com';

export default function loadMailApp() {
    init("user_0u0tmnrcbXhVuxm60rDOs");
    // console.log("mail app active!");
    clearValues();
    document.querySelector("#submit_email").addEventListener("click", sendTheMail);
    getFormImput();
    window.hasSentMail = false

};

function clearValues() {
    document.querySelector("#username").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#message").value = "";
}

let templateParams = {
    name: '',
    message: '',
    reply_email: ''
};


function sendTheMail() {

    templateParams.name = document.querySelector("#username").value;
    templateParams.reply_email = document.querySelector("#email").value;
    templateParams.message = document.querySelector("#message").value;
    
    const isNameValid = document.querySelector("#username").checkValidity();
    const isEmailValid = document.querySelector("#email").checkValidity();
    const isMessageValid = document.querySelector("#message").checkValidity();

    if (isNameValid == true && isEmailValid == true && isMessageValid == true && hasSentMail == false) {
        console.log("Sending Email...")
        document.querySelector("#submit_email").removeEventListener("click", sendTheMail);
        hasSentMail = true;
        const iconLoading = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#46F591" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M2.5 2v6h6M21.5 22v-6h-6"/><path d="M22 11.5A10 10 0 0 0 3.2 7.2M2 12.5a10 10 0 0 0 18.8 4.2"/></svg>';
        const iconComplete = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#212323" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        
        document.querySelector("#submit_email").classList.add("button_success");
        document.querySelector("#submit_email").innerHTML = iconLoading;

        
        
        

        emailjs.send('service_jm3mgin','template_w1hu8ih', templateParams)
	.then(function(response) {
	   console.log('Email Sent Successfully', response.status, response.text);
       document.querySelector("#submit_email").classList.remove("button_success");
       displaySuccessMessage(iconComplete);
	}, function(err) {
	   console.log('FAILED...', err);
	});
    }
    else {
        //error message
        console.log("email form isnt valid...");
        document.querySelector("#submit_email").classList.add("button_error");
        setTimeout(() => {
            document.querySelector("#submit_email").classList.remove("button_error");
        }, 400);
        if (isNameValid == false) {
            document.querySelector("#username").style.borderColor="#c1272d";
        }
        if (isEmailValid == false) {
            document.querySelector("#email").style.borderColor="#c1272d";
        }
        if (isMessageValid == false) {
            document.querySelector("#message").style.borderColor="#c1272d";
        }
    }
    
}

function getFormImput() {
    //update imput fields to templateParams
     
        const theName = document.querySelector("#username");
        const email = document.querySelector("#email");
        const message = document.querySelector("#message");

        theName.addEventListener("input", function(){
            updateValues(theName, "name");
        });
        email.addEventListener("input", function(){
            updateValues(email, "reply_email");
        });
        message.addEventListener("input", function(){
            updateValues(message, "message");
        });
}


function updateValues(imputPath, templateName) {
    if (templateName == "name") {
        templateParams.name = imputPath.value;
        imputPath.style.borderColor="";
    }
    if (templateName == "reply_email") {
        templateParams.name = imputPath.value;
        imputPath.style.borderColor="";
    }
    if (templateName == "message") {
        templateParams.name = imputPath.value;
        imputPath.style.borderColor="";
    }

    const isNameValid = document.querySelector("#username").checkValidity();
    const isEmailValid = document.querySelector("#email").checkValidity();
    const isMessageValid = document.querySelector("#message").checkValidity();
    
    if (isNameValid == true && isEmailValid == true && isMessageValid == true) {
        document.querySelector("#send_email").style.borderColor = "#46F591";
        document.querySelector("#send_email h2").style.color = "#46F591";
    }
    if (isNameValid == false || isEmailValid == false || isMessageValid == false) {
        document.querySelector("#send_email").style.borderColor = "#c1272d";
        document.querySelector("#send_email h2").style.color = "#c1272d";
    }
    
    
}

function displaySuccessMessage(iconComplete) {
    //do something
    document.querySelector("#submit_email").classList.remove("button_success");
    document.querySelector("#submit_email").classList.add("post_success");
    document.querySelector("#submit_email").innerHTML = iconComplete;
    document.querySelector("#submit_email svg").classList.add("fading_out_animation");
    setTimeout(() => {
        document.querySelector("#submit_email svg").classList.remove("fading_out_animation");
        document.querySelector("#submit_email").classList.remove("post_success");
        document.querySelector("#submit_email").innerHTML = "Email Sent!";
        document.querySelector("#submit_email").classList.add("fading_in_animation");
        setTimeout(() => {
            document.querySelector("#submit_email").classList.remove("fading_in_animation");
            document.querySelector("#submit_email").addEventListener("click", sendTheMail);
        }, 1000);
    }, 1500);
    setTimeout( HideAndDisplayPostEmail, 5000 );
}

function HideAndDisplayPostEmail() {
    //Thank you for sending a message i will get back to you about your inquery asap
}