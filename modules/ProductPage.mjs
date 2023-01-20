import { UserErrorChecker } from "./Errors.mjs";
import { firebaseConfig } from "./database.mjs";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {getDatabase, ref, get, set, child, update, remove, push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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

    //Categories
    const divCategory = document.createElement('div')
    const labelCategory = document.createElement('label')
    labelCategory.innerText = "Products category"
    const selectCategory = document.createElement('select')
    const selectempty = document.createElement('option')
    selectempty.innerText = '            '
    selectCategory.appendChild(selectempty)
    
    //Categories datalist options
    get(ref(db, 'categories/')).then((snapshot) => {
        for(let i in snapshot.val()){
            const option = document.createElement('option')
            option.innerText = snapshot.val()[i].Name
            option.setAttribute('id', `${snapshot.val()[i]}`)
            selectCategory.appendChild(option)
        }
    })

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

    ProductPage.appendChild(divextra1)
    divextra1.appendChild(divextra2)

    divextra2.appendChild(divName)
    divextra2.appendChild(divCategory)
    divextra2.appendChild(divPrice)
    divextra2.appendChild(divDescription)
    divextra2.appendChild(divImg)
    divextra2.appendChild(divBtn)

    divName.appendChild(labelName)
    divName.appendChild(inputName)

    divCategory.appendChild(labelCategory)
    divCategory.appendChild(selectCategory)

    divPrice.appendChild(labelPrice)
    divPrice.appendChild(inputPrice)

    divDescription.appendChild(labelDescription)
    divDescription.appendChild(inputDescription)

    divImg.appendChild(labelImg)
    divImg.appendChild(inputImg)
    
    divBtn.appendChild(insertbtn)
    divBtn.appendChild(updaterbtn)

    const user = auth.currentUser

    const insertProduct = (evt) => {

        evt.preventDefault();
         
        if(inputName.value === ""){
            alert("Name not found");
            return
        }
        if(inputPrice.value <= 0){
            alert("Price too low");
            return
        }
        if(inputDescription.value === ""){
            alert("Description not found");
            return
        }
        if(inputImg.value === ""){
            alert("Link not found");
            return
        }

        push(ref(db, 'Products/'), {
            User: user.uid,
            Name: inputName.value,                  
            Category: selectCategory.value,
            Price: inputPrice.value,
            Description: inputDescription.value,
            ImgLink: inputImg.value 
        })
        .then(() => {
            alert("Data added succesfullty");
        })
        .catch((error) => {
            console.log(error.message);          
        })
    }

    insertbtn.addEventListener('click', insertProduct)
}


export {ProductPage}

