import chatController from "../controllers/chatController.js";
import conversationController from "../controllers/conversationController.js";
import {activeConversation, listenConversation} from "../models/conversation.js";
import user from "../models/user.js"

const ui = `
<div class="flex-container height-100">
        <div class="element grow-1">
            <div id="js-conversationHeader">              
            </div>
            <div id="js-conFrame">
            </div>
        </div>
        <div class="flex-container flex-column grow-3">
            <div class="element">
                <h4>Title</h4>
            </div>
            <div class="flex-container element grow-1 vertical-scroll">
            <div class="element grow-3 flex-container flex-column">
                <div class="element grow-1 vertical-scroll" id="js-chatFrame">
                   
                </div>
                <div class="element">
                    <form id="js-formChat">
                        <div class="flex-container">
                            <div class="grow-1">
                                <input type="text" class="width-100" id="js-userInput">
                            </div>
                            <div>
                                <button>Send</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div> 
            <div class="element grow-1">
                <div id="js-listUserFrame">
                </div>
                <div>
                    <form id="js-formAddUser">
                        <input type="text" class="" placeholder="Type email here ..." id="js-inputAddUser">
                    </form>
                </div>
            </div>  
            </div>
        </div>
    </div>
`;

const formCreateHTML = `
<form id="js-formCreate">
    <div>Name:</div>
    <div><input id="js-conName" type="text" class="width-100"/></div>
    <div>Email:</div>
    <div><input id="js-conEmail" type="text" class="width-100"/></div>
    <div><button class="width-100">Create</button></div>
</form>
`

const btnShowHTML = `
    <button class="width-100" id="js-btnShow">Create new conversation</button>
`

function onLoad() {
    // subscribe(chatScreen);
    const formChat = document.getElementById("js-formChat");
    const formAddUser = document.getElementById("js-formAddUser");
    const conFrame = document.getElementById("js-conFrame");
    conFrame.addEventListener("click", function(event) {       
        chatController.changeActiveCon(event.target.id);
    })

    formChat.addEventListener("submit", function (event) {
        event.preventDefault();
        chatController.sendMessage(formChat["js-userInput"].value);
        formChat["js-userInput"].value=""
    });
    formAddUser.addEventListener("submit", function (event) {
        event.preventDefault();
        chatController.addUser(formAddUser["js-inputAddUser"].value)
        formAddUser["js-inputAddUser"].value=""
    });
    addBtnShow();
    listenConversation();
}

// function update(message) {
//     addMessage(message.content, "host");
// }

function addBtnShow() {
    const conHeader = document.getElementById("js-conversationHeader");
    conHeader.innerHTML = btnShowHTML;
    const btnShow = document.getElementById("js-btnShow");
    btnShow.addEventListener("click", function () {
        addFormCreate();
    })
}

function addFormCreate() {
    const conHeader = document.getElementById("js-conversationHeader");
    conHeader.innerHTML = formCreateHTML;
    const formCreate = document.getElementById("js-formCreate");
    formCreate.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = formCreate["js-conName"].value;
        const email = formCreate["js-conEmail"].value;
        conversationController.createConversation(name, email);
        addBtnShow();
    })
}

function addMessage(message) {
    const owner = message.user === user.authedUser.email ? "host" : "guest";
    
    const msg = `
    <div class="vertical-10"></div>
    <div class="flex-container ${owner === "host" ? "justify-end" : ""}">
        <small>${message.user}</small>
        <br/>
        <span class="msg msg-${owner}">${message.content}</span>
    </div>
    `;
    const chatFrame = document.getElementById("js-chatFrame");
    chatFrame.insertAdjacentHTML('beforeend',msg);
}

function addBulkMessages(messages) {
    messages.forEach(function(message) {
        addMessage(message);
    });
}

function addCon(conversation) {
    const con = `
        <div id="${conversation.id}" class="chat-con-item ${conversation.id === activeConversation ? "active" : null}">
            ${conversation.name}
        </div>
    `;
    const conFrame = document.getElementById("js-conFrame");
    conFrame.insertAdjacentHTML('beforeend',con);
}

function updateUserList(listUser) {
    console.log(listUser)
    const userListFrame = document.getElementById("js-listUserFrame");
    userListFrame.innerHTML = "";
    let listUserHtml = "";
    for (let i = 0; i < listUser.length; i++) {
        listUserHtml += `
        <div>${listUser[i]}</div>
        `
    }
    userListFrame.insertAdjacentHTML('beforeend',listUserHtml);
}

function updateActiveCon(oldConId) {
    if (oldConId !== null) {
        const currentActiveCon = document.getElementById(oldConId);
        currentActiveCon.classList.remove("active");
    }
    const nextActiveCon = document.getElementById(activeConversation);
    nextActiveCon.classList.add("active");
}

function clearMessages() {
    const chatFrame = document.getElementById('js-chatFrame');
    chatFrame.innerHTML = ""
}

const chatScreen = {
    ui: ui,
    onLoad: onLoad,
    addMessage: addMessage,
    addCon: addCon,
    updateUserList: updateUserList,
    updateActiveCon: updateActiveCon,
    clearMessages: clearMessages,
    addBulkMessages: addBulkMessages
    // update: update
}

export default chatScreen;