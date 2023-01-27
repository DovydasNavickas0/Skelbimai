import { UserErrorChecker } from "./Errors.mjs";
import { firebaseConfig } from "./database.mjs";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {getDatabase, ref, get, set, child, update, remove, push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

//Insert works
//Delete works
//Edit works
//Product table works
//Looks good

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

const ProductPage = () => {

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
    const insertbtn = document.createElement('button')
    insertbtn.innerText = "Insert"
    insertbtn.classList.add("btn", "btn-outline-dark")
    const updaterbtn = document.createElement('button')
    updaterbtn.innerText = "Update"
    updaterbtn.classList.add("btn", "btn-outline-dark")
    updaterbtn.style.visibility = "hidden"

    const root = document.getElementById('root')

    root.appendChild(ProductPage)

    ProductPage.appendChild(divextra1)
    divextra1.appendChild(errorDiv)
    errorDiv.appendChild(errorP)
    divextra1.appendChild(divextra2)
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

        const loginTime = new Date()

        push(ref(db, 'Products/'), {
            User: user.uid,
            Name: inputName.value,                  
            Category: selectCategory.value,
            Price: inputPrice.value,
            Description: inputDescription.value,
            ImgLink: inputImg.value,
            CreationDate: `${loginTime}`
        })
        .then(() => {
            alert("Data added succesfullty");
            window.location.reload();
        })
        .catch((error) => {
            errorP.innerText = "something has gone wrong. Please try later"
            errorDiv.classList.add("bg-warning")
            console.log(error);         
        })
    }

    const ProductsDeletion = (x) => {
        console.log(x)

        remove(ref(db, "Products/" + x))
        .then(() => {
            alert("Data has been successfully deleted");
            window.location.reload();
        })
        .catch((error) => {
            errorP.innerText = "something has gone wrong. Please try later"
            console.log(error);   
        })
    }

    const ProductEdit = (x) => {

        insertbtn.disabled = true;

        updaterbtn.style.visibility = "visible"
        
        document.documentElement.scrollTop = 0;

        errorDiv.classList.add("bg-secondary")

        const loginTime = new Date()

        get(ref(db, 'Products/' + x))
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

    (function DisplayData(){
        //console.log(findID.value);

        const divextra3 = document.createElement('div')
        divextra3.classList.add("row", "col-sm-12", "col-md-12", "pt-5", "mt-5", "p-3")

        const divextra4 = document.createElement('div')
        divextra4.classList.add("mt-5")
    
        const Displaytable = document.createElement('table');
        Displaytable.classList.add("table", "table-striped", "table-bordered", "m-3")

        const thead = document.createElement('thead')
        const tbody = document.createElement('tbody')

        const rowheader = document.createElement('tr');

        const listBtn = document.createElement('th')
        listBtn.classList.add("col-md-1")
        
        const listName = document.createElement('th');
        listName.innerText = "Name";
        listName.classList.add("col-md-2")

        const listCategory = document.createElement('th');
        listCategory.innerText = "Category";
        listCategory.classList.add("col-md-2")
    
        const listPrice = document.createElement('th');
        listPrice.innerText = "Price";
        listPrice.classList.add("col-md-1")
    
        const listDescription = document.createElement('th');
        listDescription.innerText = "Description";
        listDescription.classList.add("col-md-3")
    
        const listImg = document.createElement('th');
        listImg.innerText = "Image";
        listImg.classList.add("col-md-3")
    
        ProductPage.appendChild(divextra3);
        divextra3.appendChild(divextra4);
        divextra4.appendChild(Displaytable);
        Displaytable.appendChild(thead);
        Displaytable.appendChild(tbody);
        thead.appendChild(rowheader);
        rowheader.appendChild(listBtn);
        rowheader.appendChild(listName);
        rowheader.appendChild(listCategory);
        rowheader.appendChild(listPrice);
        rowheader.appendChild(listDescription);
        rowheader.appendChild(listImg);

    
        get(ref(db, 'Products/'))
            .then((snapshot) => {
                if(snapshot.exists()) {
                    //console.log(snapshot.val());
                    for(let ID in snapshot.val()){
                        //console.log(snapshot.val());
                        //console.log(snapshot.val()[4534]);
                        //console.log(filter(snapshot.val()[ID].ID === findID));
                        //console.log(snapshot.val()[ID].Quantity);
                        //console.log(snapshot.val()[findID.value].Description)

                        //console.log(snapshot.val()[ID]);
                        //console.log(snapshot.val()[ID].User);
    
                        if(snapshot.val()[ID].User === user.uid){
                            const rowproduct = document.createElement('tr');

                            const colbtn = document.createElement('td');
                            //colbtn.classList.add()
                            colbtn.setAttribute('align', 'center')
    
                            const colname = document.createElement('td');
                            colname.textContent = snapshot.val()[ID].Name;

                            const colcategory = document.createElement('td');
                            colcategory.textContent = snapshot.val()[ID].Category;
    
                            const colprice = document.createElement('td');
                            colprice.textContent = snapshot.val()[ID].Price;
    
                            const ColDesc = document.createElement('td');
                            ColDesc.textContent = snapshot.val()[ID].Description;
    
                            const colimage = document.createElement('td');
                            const imgsrc = document.createElement('img');
                            imgsrc.src = snapshot.val()[ID].ImgLink;
                            imgsrc.classList.add("w-100");

                            const editbtn = document.createElement('button')
                            editbtn.classList.add("col-md-6", "p-3", "btn", "btn-outline-dark")
                            const iPencil = document.createElement('i')
                            iPencil.classList.add("bi", "bi-pencil")
                            editbtn.appendChild(iPencil)

                            const deletebtn = document.createElement('button')
                            const iTrash = document.createElement('i')
                            iTrash.classList.add("bi", "bi-trash3")
                            deletebtn.appendChild(iTrash)
                            deletebtn.classList.add("col-md-6", "p-3", "btn", "btn-outline-dark", "mb-5", "mt-5", "d-grid", "gap-5")
    
                            colimage.appendChild(imgsrc);
                            rowproduct.appendChild(colbtn)
                            colbtn.appendChild(deletebtn)
                            colbtn.appendChild(editbtn)
                            rowproduct.appendChild(colname);
                            rowproduct.appendChild(colcategory);
                            rowproduct.appendChild(colprice);
                            rowproduct.appendChild(ColDesc);
                            rowproduct.appendChild(colimage);
                            tbody.appendChild(rowproduct)

                            deletebtn.addEventListener('click', function() {ProductsDeletion(ID)})
                            editbtn.addEventListener('click', function(){ProductEdit(ID)})
                        }
                    }
                }

            })
            .catch((error) => {
                errorP.innerText = "something has gone wrong. Please try later"
                errorDiv.classList.add("bg-warning")
                console.log(error);  
            })

    })()

    insertbtn.addEventListener('click', insertProduct)
    
}


export {ProductPage}

