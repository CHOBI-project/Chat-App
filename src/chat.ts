import { v4 as uuidv4 } from "uuid";
import { Message } from "./types";
import { addMessage, getMessage } from "./api";


const timer: HTMLSpanElement           = <HTMLSpanElement>document.getElementById('timer');
const form: HTMLFormElement            = <HTMLFormElement>document.getElementById('form');
const message: HTMLInputElement        = <HTMLInputElement>document.getElementById('message');
const messageContainer: HTMLDivElement = <HTMLDivElement>document.getElementById('message-container');


//load時、発火
const messageList = await getMessage();
updateMessage(messageList);

setInterval(() => {
    const currentTime = getTime();
    timer.innerHTML = currentTime;
}, 1000);


//メッセージ送信時に発火
function submitHandle(e: SubmitEvent) {
    e.preventDefault();
    
    const ID   = uuidv4();
    const text = message.value; 
    const time = getTime();
    
    if (text === "") {
        alert("入力しないで送信することはできません");
        return;
    }
    createMessage(text);
    
    const messageData: Message = { id: ID, text: text, time: time };
    addMessage(messageData);

    message.value = "";
}
form.addEventListener('submit', submitHandle);


//メッセージボックスを作成
function createMessage(message: string) {
    const time    = getTime();

    const div = document.createElement('div');
    div.classList.add("message-frame");
    div.innerHTML = `
    <p class="who"></p>
    <p class="message">${message}</p>
    <p class="time" id="time">${time}</p>`;

    messageContainer.appendChild(div);
}


//リロード時にJsonの中にあるメッセージを全て表示
function updateMessage(messageJson: Message[]) {
    const message = messageJson.map((message) => message.text);
    const time    = getTime();

    message.forEach((elm) => {
        const div = document.createElement('div');
        div.classList.add("message-frame");
        div.innerHTML = `
        <p class="who"></p>
        <p class="message">${elm}</p>
        <p class="time" id="time">${time}</p>`;
    
        messageContainer.appendChild(div);
    });
}


//現在時間取得
function getTime() {
    const date    = new Date();
    const year    = date.getFullYear();
    const month   = (date.getMonth() + 1).toString().padStart(2, "0");
    const day     = date.getDate().toString().padStart(2, "0");
    const hour    = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const returnTime = `${year}-${month}-${day} | ${hour}:${minutes}`;
    
    return returnTime;
}
