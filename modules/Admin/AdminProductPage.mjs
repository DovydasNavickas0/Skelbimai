import { firebaseConfig } from "../database.mjs";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {getDatabase, ref, get, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { AdminIndividualProd } from "./AdminIndividualProd.mjs";
import { AdminProductEdit } from "./AdminProductEdit.mjs";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

const AdminProductPage = () => {

    const user = auth.currentUser

    const root = document.getElementById('root')

    const AdsPage = document.createElement('div')
    AdsPage.setAttribute('id', 'mainPage')

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
    listDescription.classList.add("col-md-2")
    
    const listImg = document.createElement('th');
    listImg.innerText = "Image";
    listImg.classList.add("col-md-2")
    
    root.appendChild(AdsPage)
    AdsPage.appendChild(divextra3)
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


    const ProductsDeletion = (x) => {

        remove(ref(db, "Products/" + x))
        .then(() => {
            alert("Data has been successfully deleted");
            window.location.reload();
        })
        .catch((error) => {
            console.log(error);   
        })
    }


    //The table creater
        get(ref(db, 'Products/'))
            .then((snapshot) => {
                if(snapshot.exists()) {
                    for(let ID in snapshot.val()){

                        if(snapshot.val()[ID].User === user.uid){
                            continue
                        }
                        else{
                            const rowproduct = document.createElement('tr');

                            const colname = document.createElement('td');
                            colname.textContent = snapshot.val()[ID].Name;

                            const colbtn = document.createElement('td')
                            colbtn.setAttribute('align', 'center')

                            const colcategory = document.createElement('td');
                            colcategory.textContent = snapshot.val()[ID].Category;


                            const coldate = document.createElement('td');
                            coldate.textContent = snapshot.val()[ID].CreationDate


                            const colprice = document.createElement('td');
                            colprice.textContent = snapshot.val()[ID].Price;


                            const ColDesc = document.createElement('td');
                            ColDesc.textContent = snapshot.val()[ID].Description;


                            const colimage = document.createElement('td');
                            const imgsrc = document.createElement('img');
                            imgsrc.src = snapshot.val()[ID].ImgLink;
                            imgsrc.classList.add("w-100");


                            const deletebtn = document.createElement('button')
                            const iTrash = document.createElement('i')
                            iTrash.classList.add("bi", "bi-trash3")
                            deletebtn.appendChild(iTrash)
                            deletebtn.classList.add("col-md-4", "p-3", "btn", "btn-outline-dark", "mb-2", "mt-5", "d-grid", "gap-0")


                            const editbtn = document.createElement('button')
                            editbtn.classList.add("col-md-4", "p-3", "btn", "btn-outline-dark", "me-2")
                            const iPencil = document.createElement('i')
                            iPencil.classList.add("bi", "bi-pencil")
                            editbtn.appendChild(iPencil)


                            const Commentbtn = document.createElement("button")
                            Commentbtn.classList.add("col-md-4", "p-3", "btn", "btn-outline-dark")
                            const CommentI = document.createElement('i')
                            CommentI.classList.add("bi", "bi-chat-right-text")

                            
                            tbody.appendChild(rowproduct);
                            colimage.appendChild(imgsrc);
                            rowproduct.appendChild(colbtn);
                            rowproduct.appendChild(colname);
                            rowproduct.appendChild(colcategory);
                            rowproduct.appendChild(coldate);
                            rowproduct.appendChild(colprice);
                            rowproduct.appendChild(ColDesc);
                            rowproduct.appendChild(colimage);
                            colbtn.appendChild(deletebtn);
                            colbtn.appendChild(editbtn);
                            colbtn.appendChild(Commentbtn);
                            editbtn.appendChild(iPencil);
                            Commentbtn.appendChild(CommentI);
                            deletebtn.appendChild(iTrash);


                            deletebtn.addEventListener('click', function(){
                                ProductsDeletion(ID)
                                window.location.reload();
                            })
                            editbtn.addEventListener('click', function(){
                                document.getElementById('mainPage').remove()
                                AdminProductEdit(ID)
                            })
                            Commentbtn.addEventListener('click', function(){
                                document.getElementById('mainPage').remove()
                                AdminIndividualProd(ID)})
                        }
                    }
                }

            })
            .catch((error) => {
                console.log(error);
            })
}

export { AdminProductPage }