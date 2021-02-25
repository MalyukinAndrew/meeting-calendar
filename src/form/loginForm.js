import { currentUser } from "../index"
import {render} from "../table/table"

const loginFormBack = document.querySelector(".login-form-back")
export const loginForm = document.querySelector(".login-form")
const loginButton = document.getElementById("login-btn")
const createEventButton = document.getElementById('create-event');
const error = document.querySelector('.login-error');

function login(e) {
    e.preventDefault();
    if (!currentUser) {
        error.innerText = "Please choose user";
    }
    else {
        if (currentUser[0].role === "user") {
            error.innerText = ""
            createEventButton.style.display = "none"
            loginFormBack.classList.remove("show")
            loginForm.classList.remove("show")
            render();
        }
        else {loginFormBack.classList.remove("show")
        loginForm.classList.remove("show")}
        render();
    }
}

loginForm.addEventListener("submit", login)
