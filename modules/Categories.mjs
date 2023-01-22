import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { firebaseConfig } from "./database.mjs"
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {getDatabase, ref, get, push, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

const categorypage = () => {

    console.log('summoned')

    const cat = document.createElement('div')
    const root = document.getElementById('root')


    //create
    const creatediv = document.createElement('div')
    const label = document.createElement('label')
    label.textContent = "Category name"
    const catName = document.createElement('input')
    const createbtn = document.createElement('button')
    createbtn.textContent = "Add"


    //delete
    const deletediv = document.createElement('div')
    const labelCategory = document.createElement('label')
    labelCategory.innerText = "Select category"
    const selectCategory = document.createElement('select')
    const deletebtn = document.createElement('button')
    deletebtn.textContent = "Delete"
    
    //Categories datalist options
    get(ref(db, 'categories/')).then((snapshot) => {
        for(let i in snapshot.val()){
            const option = document.createElement('option')
            option.innerText = snapshot.val()[i].Name
            option.setAttribute('id', `${snapshot.val()[i]}`)
            selectCategory.appendChild(option)
        }
    })


    root.appendChild(cat)
    cat.appendChild(creatediv)
    cat.appendChild(deletediv)
    creatediv.appendChild(label)
    creatediv.appendChild(catName)
    creatediv.appendChild(createbtn)
    deletediv.appendChild(labelCategory)
    deletediv.appendChild(selectCategory)
    deletediv.appendChild(deletebtn)

    const createCatagory = () => {

        let s = 0

        //console.log('function')

        //const uniqueId = Math.random().toString(36).substr(2, 9)

        get(ref(db, 'categories/')).then((snapshot) => {
            //console.log('stuff1')

            for(let i in snapshot.val()){

                console.log(i)
                if(snapshot.val()[i].Name == catName.value){
                    alert("A category like that already exists")
                    s -= 1000
                    //console.log(s)
                }
                else{
                    s += 1
                    //console.log(s)
                }
            }
        })

        setTimeout(() => {
            if(s > 0){

                //console.log('stuff2')
            
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
        }, '200')
        
    }

    const deleteCategory = (x) => {

        console.log('function1')

        get(ref(db, 'categories/')).then((snapshot) => {

            console.log('stuff1')
            for(let i in snapshot.val()){

                console.log('stuff2' + i)

                if( snapshot.val()[i].Name === x){

                    console.log('stuff3')
                    
                    remove(ref(db, 'categories/' + i))
                    .then(() => {
                        alert("Data has been successfully deleted");
                    })
                    .catch((error) => {
                        console.log(error.message);   
                    })
                }
                else{
                    continue
                }
            }
        })
    }

    createbtn.addEventListener("click", createCatagory)
    deletebtn.addEventListener("click", function() { deleteCategory(selectCategory.value) })
}

export {categorypage}

//snapshot().val
// + uniqueId