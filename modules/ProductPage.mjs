import { UserErrorChecker } from "./Errors.mjs";
import { firebaseConfig } from "./database.mjs";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {getDatabase, ref, get, set, child, update, remove, push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

//Insert works
//Delete works
//Edit works
//Product table works
//Needs a makeup

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

const ProductPage = () => {

    const ProductPage = document.createElement('div')
    ProductPage.setAttribute('id', 'mainPage')

    const divextra1 = document.createElement('div')

    const divextra2 = document.createElement('div')

    const textinfo = document.createElement('p')


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

    updaterbtn.style.visibility = "hidden"

    //const deletebtn = document.createElement('button')
    //deletebtn.innerText = "Products image"

    const root = document.getElementById('root')
    const TextError = document.createElement('p')

    root.appendChild(TextError)
    root.appendChild(ProductPage)

    ProductPage.appendChild(divextra1)
    divextra1.appendChild(textinfo)
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

    const ProductsDeletion = (x) => {
        console.log(x)

        remove(ref(db, "Products/" + x))
        .then(() => {
            alert("Data has been successfully deleted");
        })
        .catch((error) => {
            console.log(error.message);   
        })
    }

    const ProductEdit = (x) => {

        insertbtn.disabled = true;

        updaterbtn.style.visibility = "visible"

        get(ref(db, 'Products/' + x))
            .then((snapshot) => {
                textinfo.innerText = `${snapshot.val().Name} has been selected to edit`
                inputName.value = snapshot.val().Name
                selectCategory.valuet = snapshot.val().Category
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
                ImgLink: inputImg.value 
            })
                .then(() => {
                    alert("Data has been update successfull")
                    updaterbtn.style.visibility = "hidden"
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        updaterbtn.addEventListener("click", function(){updater(x)})

    }

    (function DisplayData(){
        //console.log(findID.value);

        const divextra3 = document.createElement('div')
        const divextra4 = document.createElement('div')
    
        const Displaytable = document.createElement('table');
        //Displaytable.classList.add('table')
        //Displaytable.setAttribute('style', 'width:35%')

        const thead = document.createElement('thead')
        const tbody = document.createElement('tbody')

        const rowheader = document.createElement('tr');
        rowheader.style.border = "medium solid #000000";
        
        const listName = document.createElement('th');
        listName.innerText = "Name";
        listName.style.border = "thin solid #000000";

        const listCategory = document.createElement('th');
        listCategory.innerText = "Category";
        listCategory.style.border = "thin solid #000000";
    
        const listPrice = document.createElement('th');
        listPrice.innerText = "Price";
        listPrice.style.border = "thin solid #000000";
    
        const listDescription = document.createElement('th');
        listDescription.innerText = "Description";
        listDescription.style.border = "thin solid #000000";
    
        const listImg = document.createElement('th');
        listImg.innerText = "Image";
        listImg.style.border = "thin solid #000000";
    
        ProductPage.appendChild(divextra3)
        divextra3.appendChild(divextra4)
        divextra4.appendChild(Displaytable);
        Displaytable.appendChild(thead);
        Displaytable.appendChild(tbody)
        thead.appendChild(rowheader)
        rowheader.appendChild(listName);
        rowheader.appendChild(listCategory)
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
                            rowproduct.style.border = "medium solid #000000";
    
                            const colname = document.createElement('td');
                            colname.textContent = snapshot.val()[ID].Name;
                            colname.style.border = "thin solid #000000";

                            const colcategory = document.createElement('td');
                            colcategory.textContent = snapshot.val()[ID].Category;
                            colcategory.style.border = "thin solid #000000";
    
                            const colprice = document.createElement('td');
                            colprice.textContent = snapshot.val()[ID].Price;
                            colprice.style.border = "thin solid #000000";
    
                            const ColDesc = document.createElement('td');
                            ColDesc.textContent = snapshot.val()[ID].Description;
                            ColDesc.style.border = "thin solid #000000";
    
                            const colimage = document.createElement('td');
                            const imgsrc = document.createElement('img');
                            imgsrc.src = snapshot.val()[ID].ImgLink;
                            imgsrc.classList.add("img-fluid");
                            //imgsrc.setAttribute('width', '500');
                            //imgsrc.setAttribute('height', '600');
                            colimage.style.border = "thin solid #000000";

                            const editbtn = document.createElement('button')
                            editbtn.innerText = "Edit"
                            const deletebtn = document.createElement('button')
                            deletebtn.innerText = "Delete"
    
                            colimage.appendChild(imgsrc);
                            rowproduct.appendChild(colname);
                            rowproduct.appendChild(colcategory);
                            rowproduct.appendChild(colprice);
                            rowproduct.appendChild(ColDesc);
                            rowproduct.appendChild(colimage);
                            tbody.appendChild(rowproduct)
                            rowproduct.appendChild(deletebtn)
                            rowproduct.appendChild(editbtn)

                            deletebtn.addEventListener('click', function() {ProductsDeletion(ID)})
                            editbtn.addEventListener('click', function(){ProductEdit(ID)})
                        }
                    }
                }

            })
            .catch((error) => {
                console.log(error);
            })

    })()


    insertbtn.addEventListener('click', insertProduct)
    
}


export {ProductPage}

