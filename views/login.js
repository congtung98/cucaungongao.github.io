import setScreen from './index.js';
import registerScreen from './register.js';
import authController from "../controllers/authController.js";
import chatScreen from "./chat.js";
import {responseCode} from "../controllers/response.js"

const form = `
<div id="login-screen" class="width-100 height-100 flex-container">
    <div class="card">
        <form id="js-loginForm">
            <h4 class="align-center">MindX Chat</h4>
            <div class="input-group">       
                <label for="">Email</label>
                <input type="email" id="email">
            </div>
            <div class="input-group">
                <label for="">Password</label>
                <input type="password" id="password">
            </div>
            <div class="input-group">
                <button class="btn btn-primary" type="submit">Login</button>
                <button class="btn" id="js-btnMoveToRegister" type="button">Register now</button>
            </div>
        </form>
    </div>

</div>
`
function onLoad() {
    const formLogin = document.getElementById("js-loginForm");
    formLogin.addEventListener("submit", async function(event) {
        event.preventDefault();
        const request = {
            email: formLogin.email.value,
            password: formLogin.password.value
        };

        const response = await authController.login(request);
        switch (response.code) {
            case responseCode.auth.email_not_verified :
                alert("Account not actived! Check your inbox!")
                return;
            case responseCode.auth.login_success :
                setScreen(chatScreen);
                return;
        }
    });
    const btnMoveToRegister = document.getElementById("js-btnMoveToRegister");
    btnMoveToRegister.addEventListener("click", function() {
        //alert("Move to register page")
        setScreen(registerScreen)
    })
}

export default {
    ui: form,
    onLoad: onLoad
}