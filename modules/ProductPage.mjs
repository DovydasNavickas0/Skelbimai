import { firebaseConfig } from "./database.mjs";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {getDatabase, ref, get, set, child, update, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

const ProductPage = () => {

    const ProductPage = document.createElement('div')

    const divextra1 = document.createElement('div')

    const divextra2 = document.createElement('div')

    //Names
    const divName = document.createElement('div')
    const labelName = document.createElement('label')
    labelName.innerText = "Products Name"
    const inputName = document.createElement('input')
    labelName.setAttribute('type', 'text')
    labelName.setAttribute('placeholder', 'Enter the name')

    //Categorys
    const divCategory = document.createElement('div')
    const labelCategory = document.createElement('label')
    labelCategory.innerText = "Products category"
    const inputCategory = document.createElement('datalist') //figure out how to add the options from the db

    //Prices
    const divPrice = document.createElement('div')
    const labelPrice = document.createElement('label')
    labelPrice.innerText = "Products Price"
    const inputPrice = document.createElement('input')
    labelName.setAttribute('type', 'number')
    labelName.setAttribute('placeholder', 'Enter the price')

    //Description
    const divDescription = document.createElement('div')
    const labelDescription = document.createElement('label')
    labelDescription.innerText = "Products Description"
    const inputDescription = document.createElement('textarea')
    labelName.setAttribute('rows', '3')

    //Img
    const divImg = document.createElement('div')
    const labelImg = document.createElement('label')
    labelImg.innerText = "Products image"
    const inputImg = document.createElement('input')
    labelName.setAttribute('type', 'text')
    labelName.setAttribute('placeholder', 'Add a Image')

    //The buttons
    const divBtn = document.createElement('div')
    const insertbtn = document.createElement('button')
    insertbtn.innerText = "Insert"
    const updaterbtn = document.createElement('button')
    updaterbtn.innerText = "Update"

    //const deletebtn = document.createElement('button')
    //deletebtn.innerText = "Products image"

    const root = document.getElementById('root')
    const TextError = document.createElement('p')

    root.appendChild(TextError)
    root.appendChild(ProductPage)

    
}


