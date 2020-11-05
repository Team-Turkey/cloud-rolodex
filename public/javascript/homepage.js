// const { response } = require("express");

function loginFormHandler(event) {
    console.log("login function")
    event.preventDefault();
    document.location.replace("/login")
};

function signupFormHandler(event) {
    event.preventDefault();
    document.location.replace("/signup")
};

document.addEventListener("click", loginFormHandler)

document.addEventListener("click", signupFormHandler)


// document.onClick("#signup").addEventListener("submit", signupFormHandler)