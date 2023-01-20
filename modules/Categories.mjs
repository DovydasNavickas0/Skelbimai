import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { firebaseConfig } from "./database.mjs"
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {getDatabase, ref, get, push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

const categorypage = () => {

    let s = 0

    console.log('summoned')

    const cat = document.createElement('div')

    const label = document.createElement('label')
    label.textContent = "Category name"

    const catName = document.createElement('input')

    const btn = document.createElement('button')
    btn.textContent = "Add"

    const root = document.getElementById('root')

    root.appendChild(cat)
    cat.appendChild(label)
    cat.appendChild(catName)
    cat.appendChild(btn)

    const createCatagory = () => {

        console.log('function')

        //const uniqueId = Math.random().toString(36).substr(2, 9)

        get(ref(db, 'categories/')).then((snapshot) => {
            //console.log(snapshot.val())
            for(let i in snapshot.val()){
                //console.log(snapshot.val()[i].Name)
                //console.log(snapshot.val()[i])
                if(snapshot.val()[i].Name == catName.value){
                    alert("A category like that already exists")
                    s -= 1000
                }
                else{
                    s += 1
                }
            }
        })

        if(s > 0){
            push(ref(db, 'categories/'), {
                Name: catName.value,
            }).then(() =>{
                alert("data added succesfully")
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
            })
        }

    }
    btn.addEventListener("click", createCatagory)
}

export {categorypage}

//snapshot().val
// + uniqueId