import { getUser } from "./api";


const loginForm: HTMLFormElement = <HTMLFormElement>document.getElementById('login-form');
const loginID: HTMLInputElement = <HTMLInputElement>document.getElementById('login-id');
const loginPass: HTMLInputElement = <HTMLInputElement>document.getElementById('login-pass');


const users = await getUser();


function certificationHandle(e: SubmitEvent) {
    e.preventDefault();
    
    const ID   = loginID.value;
    const PASS = loginPass.value;
    
    const registrantID   = users.find((user) => user.id === ID )?.id;
    const registrantPass = users.find((user) => user.pass === PASS)?.pass;
    
    
    if (ID === registrantID && PASS === registrantPass) {
        location.href = '../chat.html';
        alert('Login Success! Welcom to Chat App!! ( ˶ˆ ᗜ ˆ˵ )');
    } else {
        alert('Login Fail! Please try again.');
    }
}
window.history.pushState(null, "", window.location.href);

loginForm.addEventListener('submit', certificationHandle);


