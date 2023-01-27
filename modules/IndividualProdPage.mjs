import { UserErrorChecker } from "./Errors.mjs";
import { firebaseConfig } from "./database.mjs";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {getDatabase, ref, get, set, child, update, remove, push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { ProductAds } from "./ProductAds.mjs";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();


const IndividualProductPage = (x) => {

    const user = auth.currentUser

    const ProdPage = document.createElement('div')
    ProdPage.setAttribute('id', 'mainPage')

    const root = document.getElementById('root')

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
    listName.classList.add("col-md-1")

    const listCategory = document.createElement('th');
    listCategory.innerText = "Category";
    listCategory.classList.add("col-md-1")

    const listDate = document.createElement('th');
    listDate.innerText = "Creation Date"
    listDate.classList.add("col-md-1")
    
    const listPrice = document.createElement('th');
    listPrice.innerText = "Price";
    listPrice.classList.add("col-md-1")
    
    const listDescription = document.createElement('th');
    listDescription.innerText = "Description";
    listDescription.classList.add("col-md-4")
    
    const listImg = document.createElement('th');
    listImg.innerText = "Image";
    listImg.classList.add("col-md-3")
    
    root.appendChild(ProdPage)
    ProdPage.appendChild(divextra3)
    divextra3.appendChild(divextra4)
    divextra4.appendChild(Displaytable);
    Displaytable.appendChild(thead);
    Displaytable.appendChild(tbody)
    thead.appendChild(rowheader);
    rowheader.appendChild(listBtn)
    rowheader.appendChild(listName);
    rowheader.appendChild(listCategory);
    rowheader.appendChild(listDate);
    rowheader.appendChild(listPrice);
    rowheader.appendChild(listDescription);
    rowheader.appendChild(listImg);

    const getTable = () => {
        
        get(ref(db, "Products/")).then((snapshotProduct) => {
            if(snapshotProduct.exists()){

                const rowproduct = document.createElement('tr');
        
                const colname = document.createElement('td');
                colname.textContent = snapshotProduct.val()[x].Name;

                const colbtn = document.createElement('td')

                const colcategory = document.createElement('td');
                colcategory.textContent = snapshotProduct.val()[x].Category;

                const coldate = document.createElement('td');
                coldate.textContent = snapshotProduct.val()[x].CreationDate;

                const colprice = document.createElement('td');
                colprice.textContent = snapshotProduct.val()[x].Price;

                const ColDesc = document.createElement('td');
                ColDesc.textContent = snapshotProduct.val()[x].Description;

                const colimage = document.createElement('td');
                const imgsrc = document.createElement('img');
                imgsrc.src = snapshotProduct.val()[x].ImgLink;
                imgsrc.classList.add("img-fluid");


                const BackBtn = document.createElement('button');
                BackBtn.classList.add("btn", "btn-outline-dark")
                const BackI = document.createElement('i')
                BackI.classList.add("bi", "bi-backspace")

                tbody.appendChild(rowproduct);
                colimage.appendChild(imgsrc);
                rowproduct.appendChild(colbtn)
                rowproduct.appendChild(colname);
                rowproduct.appendChild(colcategory);
                rowproduct.appendChild(coldate)
                rowproduct.appendChild(colprice);
                rowproduct.appendChild(ColDesc);
                rowproduct.appendChild(colimage);
                BackBtn.appendChild(BackI)
                colbtn.appendChild(BackBtn)

                BackBtn.addEventListener("click", function(){
                    document.getElementById('mainPage').remove()
                    ProductAds()
                })
            }
        })
    }
    getTable()

    const CommDiv = document.createElement('div')

    const CommLabel = document.createElement('label')
    CommLabel.innerText = "Type your comments here"
       
    const Comm = document.createElement('textarea')

    const Commbtn = document.createElement('button')
    Commbtn.innerText = "Comment"

    ProdPage.appendChild(CommDiv)
    CommDiv.appendChild(CommLabel)
    CommDiv.appendChild(Comm)
    CommDiv.appendChild(Commbtn)

    const CommentTable = () => {

        get(ref(db, "Comments/" + x)).then((snapshot) =>{
            if(snapshot.exists()){

                const Displaytable = document.createElement('table');
                Displaytable.classList.add("table", "table-striped", "table-bordered", "m-3")
            
                const thead = document.createElement('thead')
                const tbody = document.createElement('tbody')
            
                const rowheader = document.createElement('tr');
                
            }
            else{
                return
            }
        })
    }

    const CommentDB = () => { 

        console.log("CommentDB activated")

        push(ref(db, "Comments/" + x), {
            User_ID: user.uid,
            Comment: Comm.value
        })
    }

    Commbtn.addEventListener('click', CommentDB)

}

export {IndividualProductPage}