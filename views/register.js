import setScreen from './index.js';
import loginScreen from './login.js';
import authController from "../controllers/authController.js";
import {responseCode} from "../controllers/response.js";

const screen = `
<div id="register-screen" class="width-100 height-100">
    <div class="card">
        <form id="js-formRegister" action="">
        <h4 class="align-center">MindX Chat Register</h4>
            <div class="input-group">
                <label for="">Name</label>
                <input type="text" id="name">
            </div>
            <div class="input-group">
                <label for="">Email</label>
                <input type="email" id="email">
            </div>
            <div class="input-group">
                <label for="">Password</label>
                <input type="password" id="password">
            </div>
            <div class="input-group">
                <label for="">Confirm Password</label>
                <input type="password" id="retypePassword">
            </div>
            <div class="input-group">
                <button class="btn btn-primary" type="submit">Register</button>
                <button class="btn" id="js-btnBackToLogin" type="button">Back to Login</button>
            </div>
        </form>
    </div>
</div>
`;

function onLoad() {
    const btnBackToLogin = document.getElementById("js-btnBackToLogin");
    const formRegister = document.getElementById("js-formRegister");
    formRegister.addEventListener("submit", async function(event) {
        event.preventDefault();
        const request = {
            name: formRegister.name.value,
            email: formRegister.email.value,
            password: formRegister.password.value,
            retypePassword: formRegister.retypePassword.value
        };
        const response = await authController.register(request)
        console.log(response);
        switch (response.code) {
            case responseCode.auth.register_success :
                alert("Register successfully! Login to enjoy!")
                return; 
        }
    });

    btnBackToLogin.addEventListener("click", function() {
        //alert("Move to register page")
        setScreen(loginScreen)
    })
}

export default {
    ui: screen,
    onLoad: onLoad
}