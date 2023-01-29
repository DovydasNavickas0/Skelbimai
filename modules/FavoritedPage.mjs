import { firebaseConfig } from "./database.mjs";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {getDatabase, ref, get, remove, push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

const FavoritedPage = () => {

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
    
    root.appendChild(AdsPage)
    AdsPage.appendChild(divextra3)
    divextra3.appendChild(divextra4)
    divextra4.appendChild(Displaytable);
    Displaytable.appendChild(thead);
    Displaytable.appendChild(tbody)
    thead.appendChild(rowheader);
    rowheader.appendChild(listBtn)
    rowheader.appendChild(listName);
    rowheader.appendChild(listCategory)
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

    //The table creater also the filter for favorited is here
        get(ref(db, 'Products/'))
            .then((snapshotProduct) => {
                if(snapshotProduct.exists()) {
                    for(let ProdID in snapshotProduct.val()){
                            
                        get(ref(db, "Favorites/" + user.uid)).then((snapshotFavorites) =>{
                            if(snapshotFavorites.exists()){
                                for(let FavID in snapshotFavorites.val()){
                                    //console.log(snapshotFavorites.val()[FavID].Product_ID)
                                    if(ProdID === snapshotFavorites.val()[FavID].Product_ID){
                                        //console.log(FavID)

                                        const rowproduct = document.createElement('tr');
        
                                        const colname = document.createElement('td');
                                        colname.textContent = snapshotProduct.val()[ProdID].Name;
        
                                        const colbtn = document.createElement('td')
        
                                        const colcategory = document.createElement('td');
                                        colcategory.textContent = snapshotProduct.val()[ProdID].Category;
        
        
                                        const colprice = document.createElement('td');
                                        colprice.textContent = snapshotProduct.val()[ProdID].Price;
        
        
                                        const ColDesc = document.createElement('td');
                                        ColDesc.textContent = snapshotProduct.val()[ProdID].Description;
        
        
                                        const colimage = document.createElement('td');
                                        const imgsrc = document.createElement('img');
                                        imgsrc.src = snapshotProduct.val()[ProdID].ImgLink;
                                        imgsrc.classList.add("img-fluid");
        
        
                                        const favbtn = document.createElement('button')
                                        favbtn.classList.add("btn", "btn-outline-dark")
                                        const favI = document.createElement('i')
                                        favI.setAttribute('id', `fav ${ProdID}`)
        
                                        const fav = () => {
                                    
                                            let s = 0
            
                                            get(ref(db, 'Favorites/' + user.uid)).then((snapshot) => {
                                                //console.log('get favorite active')
                                                for(let i in snapshot.val()){
                                                    //console.log(snapshot.val()[i].Product_ID)
                                                    if(snapshot.val()[i].Product_ID === ProdID){
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
                                    
                                        tbody.appendChild(rowproduct)
                                        colimage.appendChild(imgsrc);
                                        rowproduct.appendChild(colbtn)
                                        rowproduct.appendChild(colname);
                                        rowproduct.appendChild(colcategory);
                                        rowproduct.appendChild(colprice);
                                        rowproduct.appendChild(ColDesc);
                                        rowproduct.appendChild(colimage);
                                        colbtn.appendChild(favbtn)
                                        favbtn.appendChild(favI)
            
                                        favbtn.addEventListener('click', function(){FavouriteDB(ProdID)})
                                    }
                                    else{
                                        continue
                                    }
                                }
                            }
                        }) 
                    }
                }
            })
}

export { FavoritedPage }