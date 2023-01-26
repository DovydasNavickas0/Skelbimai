import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { firebaseConfig } from "./database.mjs"
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {getDatabase, ref, get, push, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// category creation and deletion works needs bootstrap

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

const categorypage = () => {

    //console.log('summoned');

    const cat = document.createElement('div');
    const root = document.getElementById('root');
    cat.setAttribute('id', 'mainPage');


    
    //errors
    const errorDiv = document.createElement('div');
    errorDiv.classList.add("row", "col-md-8", "offset-md-2", "text-center", 
                            "p-1", "mb-2", "bg-gradient"); //"bg-secondary",
    errorDiv.setAttribute('style', '--bs-bg-opacity: .45;');
    const errorP = document.createElement('p');

    const divRow = document.createElement('div');
    divRow.classList.add("row");



    //create
    const divCreate1 = document.createElement('div');
    divCreate1.classList.add("offset-md-2", "pt-5", "col-md-4");

    const divCreate2 = document.createElement('div');
    divCreate2.classList.add("px-3");

    const divCreate3 = document.createElement('div');
    divCreate3.classList.add("mb-3", "text-center");

    const label = document.createElement('label');
    label.textContent = "Category name"
    label.classList.add("form-label");

    const catName = document.createElement('input');
    catName.classList.add("form-control", "mb-3");

    const createbtn = document.createElement('button');
    createbtn.textContent = "Add";
    createbtn.classList.add("btn", "btn-outline-dark", "mb-5");



    //delete
    const divDelete1 = document.createElement('div');
    divDelete1.classList.add("pt-5", "col-md-4");
    const divDelete2 = document.createElement('div');
    divDelete2.classList.add("px-3");

    const divDelete3 = document.createElement('div');
    divDelete3.classList.add("mb-3", "text-center");

    const labelCategory = document.createElement('label');
    labelCategory.innerText = "Select category";
    labelCategory.classList.add("form-label");

    const selectCategory = document.createElement('select');
    selectCategory.classList.add("form-select", "mb-3");

    const optionExtra =document.createElement('option');
    selectCategory.appendChild(optionExtra)

    const deletebtn = document.createElement('button');
    deletebtn.textContent = "Delete";
    deletebtn.classList.add("btn", "btn-outline-dark");
    
    //Categories datalist options
    get(ref(db, 'categories/')).then((snapshot) => {
        for(let i in snapshot.val()){
            const option = document.createElement('option');
            option.innerText = snapshot.val()[i].Name;
            option.setAttribute('id', `${snapshot.val()[i]}`);
            selectCategory.appendChild(option);
        }
    })


    root.appendChild(cat)

    cat.appendChild(errorDiv)
    errorDiv.appendChild(errorP)

    cat.appendChild(divRow)

    divRow.appendChild(divCreate1)
    divCreate1.appendChild(divCreate2)
    divCreate2.appendChild(divCreate3)
    divCreate3.appendChild(label)
    divCreate3.appendChild(catName)
    divCreate3.appendChild(createbtn)

    divRow.appendChild(divDelete1)
    divDelete1.appendChild(divDelete2)
    divDelete2.appendChild(divDelete3)
    divDelete3.appendChild(labelCategory)
    divDelete3.appendChild(selectCategory)
    divDelete3.appendChild(deletebtn)

    const createCatagory = () => {

        let s = 0

        //console.log('function')

        //const uniqueId = Math.random().toString(36).substr(2, 9)

        get(ref(db, 'categories/')).then((snapshot) => {
            //console.log('stuff1')

            for(let i in snapshot.val()){

                console.log(i)
                if(snapshot.val()[i].Name == catName.value){
                    errorP.innerText = "A category like that already exists"
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
                    window.location.reload();
                }).catch((error) => {
                    errorP.innerText = "something has gone wrong. Please try later"
                    console.log(error);   
                })
            }
        }, '200')
        
    }

    const deleteCategory = (x) => {

        //console.log('function1')

        get(ref(db, 'categories/')).then((snapshot) => {

            //console.log('stuff1')
            for(let i in snapshot.val()){

                //console.log('stuff2' + i)

                if( snapshot.val()[i].Name === x){

                    //console.log('stuff3')
                    
                    remove(ref(db, 'categories/' + i))
                    .then(() => {
                        alert("Data has been successfully deleted");
                        window.location.reload();
                    })
                    .catch((error) => {
                        errorP.innerText = "something has gone wrong. Please try later"
                        console.log(error);   
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