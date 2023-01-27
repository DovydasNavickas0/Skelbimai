import { UserErrorChecker } from "./Errors.mjs";
import { firebaseConfig } from "./database.mjs";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {getDatabase, ref, get, set, child, update, remove, push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { IndividualProductPage } from "./IndividualProdPage.mjs";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

const ProductAds = () => {

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


    const FavouriteDB = (x) => {

        const fav = document.getElementById(`fav ${x}`)

        get(ref(db, 'Products/' + x)).then((snapshotProduct) => {

            if(fav.className == "bi-star"){ // add to favorite

                //console.log('works1')

                push(ref(db, 'Favorites/' + user.uid), {
                    Product_ID: x,
                    Product_Name: snapshotProduct.val().Name
                })
                .catch((error) => {
                    console.log(error);
                })
                fav.classList.remove("bi-star")
                fav.classList.add('bi-star-fill')
            }
            else if(fav.className == 'bi-star-fill'){ //remove from favorite

                //console.log('works2')

                get(ref(db, 'Favorites/' + user.uid)).then((snapshotFav) => {
                    for(let i in snapshotFav.val()){

                        //console.log('works3')
                        //console.log(i)

                        if(snapshotFav.val()[i].Product_ID === x){
                            remove(ref(db, "Favorites/" + user.uid + `/${i}` )).then(
                                (function(){
                                    fav.classList.remove('bi-star-fill');
                                    fav.classList.add("bi-star");
                                })()
                            )
                        }
                    }
                })
            }
            else{
                //console.log("FavouriteDB broke")
                return
            }

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


                            const favbtn = document.createElement('button')
                            favbtn.classList.add("col-md-4", "p-3", "btn", "btn-outline-dark", "mb-5", "mt-5", "d-grid", "gap-5")
                            const favI = document.createElement('i')
                            favI.setAttribute('id', `fav ${ID}`)


                            const Commentbtn = document.createElement("button")
                            Commentbtn.classList.add("col-md-4", "p-3", "btn", "btn-outline-dark")
                            const CommentI = document.createElement('i')
                            CommentI.classList.add("bi", "bi-chat-right-text")


                            const fav = () => {
                            
                                let s = 0
    
                                get(ref(db, 'Favorites/' + user.uid)).then((snapshot) => {
                                    //console.log('get favorite active')

                                    for(let i in snapshot.val()){
                                        //console.log(snapshot.val()[i].Product_ID)

                                        if(snapshot.val()[i].Product_ID === ID){
                                            s -= 1000
                                        }
                                        else{
                                            s += 1
                                        }
                                        //console.log(s)
                                    }
                                }).then(
                                    setTimeout(() => {
                                        if(s>=0){
                                            favI.classList.add("bi-star")
                                        }
                                        else{
                                            favI.classList.add('bi-star-fill')
                                        }
                                    },50)
                                )
        
                            }
                            fav()
                            
                            tbody.appendChild(rowproduct);
                            colimage.appendChild(imgsrc);
                            rowproduct.appendChild(colbtn);
                            rowproduct.appendChild(colname);
                            rowproduct.appendChild(colcategory);
                            rowproduct.appendChild(coldate);
                            rowproduct.appendChild(colprice);
                            rowproduct.appendChild(ColDesc);
                            rowproduct.appendChild(colimage);
                            colbtn.appendChild(favbtn);
                            colbtn.appendChild(Commentbtn)
                            favbtn.appendChild(favI);
                            Commentbtn.appendChild(CommentI)
    
                            favbtn.addEventListener('click', function(){FavouriteDB(ID)})
                            Commentbtn.addEventListener('click', function(){
                                document.getElementById('mainPage').remove()
                                IndividualProductPage(ID)})
                        }
                    }
                }

            })
            //.catch((error) => {
            //    console.log(error);
            //})

}

export { ProductAds }