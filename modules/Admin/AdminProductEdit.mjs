import { firebaseConfig } from "../database.mjs";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { AdminProductPage } from "./AdminProductPage.mjs";

//Insert works
//Delete works
//Edit works
//Product table works
//Looks good

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

const AdminProductEdit = (x) => {

    const ProductPage = document.createElement('div');
    ProductPage.setAttribute('id', 'mainPage');

    const divextra1 = document.createElement('div');
    divextra1.classList.add("row", "pt-2");

    const divextra2 = document.createElement('div');
    divextra2.classList.add("row", "col-sm-12", "col-md-5", "mx-5", "p-3");

    const divextra5 = document.createElement('div');
    divextra5.classList.add("px-3", "offset-8");

    //errors
    const errorDiv = document.createElement('div');
    errorDiv.classList.add("row", "col-md-6", "offset-md-3", "text-center", "p-0", "mb-5", "bg-gradient"); //"bg-secondary",
    errorDiv.setAttribute('style', '--bs-bg-opacity: .45;');
    const errorP = document.createElement('p');


    //Names
    const divName = document.createElement('div');
    divName.classList.add("mb-3");
    const labelName = document.createElement('label');
    labelName.innerText = "Products Name";
    labelName.classList.add("form-label")
    const inputName = document.createElement('input');
    inputName.classList.add("form-control")
    labelName.setAttribute('type', 'text');
    labelName.setAttribute('placeholder', 'Enter the name');


    //Categories
    const divCategory = document.createElement('div')
    divCategory.classList.add("mb-3")
    const labelCategory = document.createElement('label')
    labelCategory.innerText = "Products category"
    labelCategory.classList.add("form-label")
    const selectCategory = document.createElement('select')
    selectCategory.classList.add("form-select")
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
    divPrice.classList.add("mb-3")
    const labelPrice = document.createElement('label')
    labelPrice.innerText = "Products Price"
    labelPrice.classList.add("form-label")
    const inputPrice = document.createElement('input')
    inputPrice.classList.add("form-control")
    labelName.setAttribute('type', 'number')
    labelName.setAttribute('placeholder', 'Enter the price')


    //Description
    const divDescription = document.createElement('div')
    divDescription.classList.add("mb-3")
    const labelDescription = document.createElement('label')
    labelDescription.innerText = "Products Description"
    labelDescription.classList.add("form-label")
    const inputDescription = document.createElement('textarea')
    inputDescription.classList.add("form-control")
    labelName.setAttribute('rows', '3')


    //Img
    const divImg = document.createElement('div')
    divImg.classList.add("mb-3")
    const labelImg = document.createElement('label')
    labelImg.innerText = "Products image"
    labelImg.classList.add("form-label")
    const inputImg = document.createElement('input')
    inputImg.classList.add("form-control")
    labelName.setAttribute('type', 'text')
    labelName.setAttribute('placeholder', 'Add a Image')


    //The buttons
    const divBtn = document.createElement('div')
    divBtn.classList.add("mb-3", "justify-content-around", "align-items-center", "d-grid", "gap-2", "mx-auto")
    const updaterbtn = document.createElement('button')
    updaterbtn.innerText = "Update"
    updaterbtn.classList.add("btn", "btn-outline-dark")


    //Go back
    const BackBtn = document.createElement('button');
    BackBtn.classList.add("btn", "btn-outline-dark", "col-md-1")
    const BackI = document.createElement('i')
    BackI.classList.add("bi", "bi-backspace")

    const root = document.getElementById('root')

    root.appendChild(ProductPage)

    ProductPage.appendChild(divextra1)
    divextra1.appendChild(errorDiv)
    errorDiv.appendChild(errorP)
    divextra1.appendChild(divextra2)
    divextra2.appendChild(BackBtn)
    BackBtn.appendChild(BackI)
    divextra2.appendChild(divextra5)

    divextra5.appendChild(divName)
    divextra5.appendChild(divCategory)
    divextra5.appendChild(divPrice)
    divextra5.appendChild(divDescription)
    divextra5.appendChild(divImg)
    divextra5.appendChild(divBtn)

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
    
    divBtn.appendChild(updaterbtn)

    const ProductEdit = (j) => {

        errorDiv.classList.add("bg-secondary")

        const loginTime = new Date()

        get(ref(db, 'Products/' + j))
            .then((snapshot) => {
                errorP.innerText = `${snapshot.val().Name} has been selected to edit`
                inputName.value = snapshot.val().Name
                selectCategory.value = snapshot.val().Category
                inputPrice.value = snapshot.val().Price
                inputDescription.value = snapshot.val().Description
                inputImg.value = snapshot.val().ImgLink
            })

        const updater = (i) => {
            update(ref(db, "/Products/" + i), {
                Name: inputName.value,                  
                Category: selectCategory.value,
                Price: inputPrice.value,
                Description: inputDescription.value,
                ImgLink: inputImg.value,
                CreationDate: `${loginTime}`
            })
                .then(() => {
                    alert("Data has been update successfull")
                    updaterbtn.style.visibility = "hidden"
                    window.location.reload();
                })
                .catch((error) => {
                    errorP.innerText = "something has gone wrong. Please try later"
                    errorDiv.classList.add("bg-warning")
                    console.log(error);  
                })
        }

        updaterbtn.addEventListener("click", function(){updater(x)})
    }

    ProductEdit(x)

    BackBtn.addEventListener('click', function(){
        document.getElementById('mainPage').remove()
        AdminProductPage()
    })
    
}


export {AdminProductEdit}

