import { UserErrorChecker } from "./Errors.mjs";
import { firebaseConfig } from "./database.mjs";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {getDatabase, ref, get, set, child, update, remove, push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

const ProductAds = () => {

    const user = auth.currentUser

    const root = document.getElementById('root')

    const AdsPage = document.createElement('div')
    AdsPage.setAttribute('id', 'mainPage')

    const divextra3 = document.createElement('div')
    const divextra4 = document.createElement('div')
    
    const Displaytable = document.createElement('table');

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
    
    root.appendChild(AdsPage)
    AdsPage.appendChild(divextra3)
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


    const FavouriteDB = (x) => {

        console.log('FavouriteDB active')
        console.log(x)

        const fav = document.getElementById(`fav ${x}`)

        get(ref(db, 'Products/' + x)).then((snapshotProduct) => {
            console.log('get product working')

            if(fav.textContent === "favorite"){

                console.log('favorite working')

                push(ref(db, 'Favorites/' + user.uid), {
                    Product_ID: x,
                    Product_Name: snapshotProduct.val().Name
                }).then(alert("Item favorited"))
                .catch((error) => {
                    console.log(error);
                })
                fav.innerText = 'favorited'
            }
            else if(fav.textContent === 'favorited'){

                console.log('favorited working1')

                get(ref(db, 'Favorites/' + user.uid)).then((snapshotFav) => {
                    for(let i in snapshotFav.val()){
                        console.log('favorited working2')
                        console.log(i)

                        if(snapshotFav.val()[i].Product_ID === x){
                            console.log('favorited working4')
                            remove(ref(db, "Favorites/" + user.uid + i)).then(
                                fav.innerText = 'favorite'
                            )
                        }
                    }
                })
            }

        })
        .catch((error) => {
            console.log(error);
        })
    }

    
        get(ref(db, 'Products/'))
            .then((snapshot) => {
                if(snapshot.exists()) {
                    //console.log(snapshot.val());
                    for(let ID in snapshot.val()){

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
                        colimage.style.border = "thin solid #000000";

                        const favbtn = document.createElement('button')
                        favbtn.setAttribute('id', `fav ${ID}`)

                        const fav = () => {
                            
                            let s = 0

                            get(ref(db, 'Favorites/' + user.uid)).then((snapshotFavorite) => {
                                //console.log('get favorite active')
                                for(let i in snapshotFavorite.val()){
                                    //console.log(snapshotFavourite.val()[i].Product_ID)
                                    if(snapshotFavorite.val()[i].Product_ID === ID){
                                        s -= 1000
                                    }
                                    else{
                                        s += 1
                                    }
                                    //console.log(s)
                                }
                            }).then(
                                setTimeout(() => {
                                    if(s>0){
                                        favbtn.innerText = 'favorite'
                                    }
                                    else{
                                        favbtn.innerText = 'favorited'
                                    }
                                },0)
                            )
    
                        }
                        fav()
                        
                        colimage.appendChild(imgsrc);
                        rowproduct.appendChild(colname);
                        rowproduct.appendChild(colcategory);
                        rowproduct.appendChild(colprice);
                        rowproduct.appendChild(ColDesc);
                        rowproduct.appendChild(colimage);
                        tbody.appendChild(rowproduct)
                        rowproduct.appendChild(favbtn)

                        favbtn.addEventListener('click', function(){FavouriteDB(ID)})
                    }
                }

            })
            .catch((error) => {
                console.log(error);
            })

}

export { ProductAds }