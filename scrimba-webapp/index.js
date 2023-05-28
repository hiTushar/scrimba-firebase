import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://scrimba-cee4a-default-rtdb.firebaseio.com/" // realtime db url
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const ul = document.getElementById("shopping-list")


addButtonEl.addEventListener("click", function() {
  let inputValue = inputFieldEl.value
  if(inputValue.length) {
    push(shoppingListInDB, inputValue); /**  */
  }
})

function getValue() {
  console.log("getValue");
  let data = [];
  onValue(shoppingListInDB, (snapshot) => { // it is an event listener; runs everytime realtime DB changes
    ul.innerHTML = "";
    if(snapshot.exists()) { /**  */
      data = Object.entries(snapshot.val()); /**  */
      data.forEach(item => {
        appendItem(item, ul);
      })
    }
    else {
      ul.innerHTML = "no list items";
    }
  })
}

function appendItem(item, node) {
  let li = document.createElement("li");
  li.addEventListener("dblclick", () => {
    console.log({ item })
    let itemRef = ref(database, `shoppingList/${item[0]}`) /**  */
    remove(itemRef); /**  */
  })
  li.textContent = item[1];
  ul.append(li);
}

function init() {
  console.log("init");
  getValue();
}

init();
