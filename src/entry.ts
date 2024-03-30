import { User } from "./types";
import { addUser, getUser } from "./api";


const entryForm: HTMLFormElement  = <HTMLFormElement>document.getElementById('entry-form');
const entryID: HTMLInputElement   = <HTMLInputElement>document.getElementById('entry-id'); 
const entryPass: HTMLInputElement = <HTMLInputElement>document.getElementById('entry-pass'); 

const users = await getUser();

function userAddHandle(e: SubmitEvent) {
  e.preventDefault();
  
  const ID   = entryID.value;
  const PASS = entryPass.value;
  
  const registrantID = users.find((user) => user.id === ID )?.id;
  
  if (ID === "" || PASS === "") {
    alert('Please enter ID and Password. <(_ _)>');
    return;
  }
  
  if (ID === registrantID) {
    alert("This is a registered ID. <(_ _)>");
    return;
  } 
  
  const user: User = { id: ID, pass: PASS };
  addUser(user);
  
  alert('Your registration is complete. Please login now!（σﾟ∀ﾟ）σ');
  location.href = '../index.html';
}

entryForm.addEventListener('submit', userAddHandle);