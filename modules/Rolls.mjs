import { firebaseConfig } from "./database.mjs";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {getDatabase, ref, get} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

import { categorypage } from "./Categories.mjs";
import { ProductPage } from "./ProductPage.mjs";
//import { SYSUserStart } from "./modules/SYSad/SYSUserStart.mjs";
import { ProductAds } from "./ProductAds.mjs";
import { FavoritedPage } from "./FavoritedPage.mjs";

//Seperation on login works may need to be redone later if something breaks

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

const RollChecker = (x) => {

    const nav = document.getElementById('nav')

    //console.log('Roll checker working1')

    get(ref(db, 'users/' + x)).then((snapshot2) => {  //this *mess* checks if the person login in is a user or admin and is supposed to redirect to diffrent pages
        //console.log('Roll checker working2')
        get(ref(db, 'Rolls/')).then((snapshot) => {
            //console.log('Roll checker working3')
            for(let i in snapshot.val()){
                //console.log('Roll checker working4')
                //console.log(i)
                if(i === snapshot2.val().Roll && i === "ADMIN"){
                    //console.log('Roll checker working5')
                    //console.log('works')
                    for(let j in snapshot.val()[i]){
                        //console.log('Roll checker working6')
                        //console.log(j)
                        if(j === x){
                            //console.log('Roll checker working7')
                            const nav1btn = document.createElement('button')
                            nav1btn.classList.add("btn", "btn-outline-dark", "col-md-3", "offset-md-1")
                            nav1btn.innerText = 'Categories'
                            nav1btn.setAttribute('id', 'navbtn1')
                            const nav2btn = document.createElement('button')
                            nav2btn.classList.add("btn", "btn-outline-dark", "col-md-3", "m-1")
                            nav2btn.innerText = 'Users'
                            nav2btn.setAttribute('id', 'navbtn2')
                            const nav3btn = document.createElement('button')
                            nav3btn.classList.add("btn", "btn-outline-dark", "col-md-3")
                            nav3btn.innerText = 'Products'
                            nav3btn.setAttribute('id', 'navbtn3')

                            nav.appendChild(nav1btn)
                            nav.appendChild(nav2btn)
                            nav.appendChild(nav3btn)

                            nav1btn.addEventListener('click', function(){
                                document.getElementById('mainPage').remove()
                                categorypage()})

                            categorypage()
                        }
                        else{
                            continue
                        }
                    }
                }else if(i === snapshot2.val().Roll && i === "USER"){
                    //console.log('Roll checker working8')
                    //console.log('works')
                    for(let j in snapshot.val()[i]){
                        //console.log('Roll checker working9')
                        //console.log(j)
                        if(j === x){
                            //console.log('Roll checker working10')
                            const nav4btn = document.createElement('button')
                            nav4btn.classList.add("btn", "btn-outline-dark", "col-md-3", "offset-md-1")
                            nav4btn.innerText = 'Home'
                            nav4btn.setAttribute('id', 'navbtn4')
                            const nav5btn = document.createElement('button')
                            nav5btn.classList.add("btn", "btn-outline-dark", "col-md-3", "m-1")
                            nav5btn.innerText = 'Products'
                            nav5btn.setAttribute('id', 'navbtn5')
                            const nav6btn = document.createElement('button')
                            nav6btn.classList.add("btn", "btn-outline-dark", "col-md-3")
                            nav6btn.innerText = 'Favorited'
                            nav6btn.setAttribute('id', 'navbtn6')

                            nav.appendChild(nav4btn)
                            nav.appendChild(nav5btn)
                            nav.appendChild(nav6btn)

                            ProductPage()

                            nav4btn.addEventListener('click', function(){
                                document.getElementById('mainPage').remove()
                                ProductPage()})
                            nav5btn.addEventListener('click', function(){
                                document.getElementById('mainPage').remove()
                                ProductAds()})
                            nav6btn.addEventListener('click', function(){
                                document.getElementById('mainPage').remove()
                                FavoritedPage()})
                        }
                        else{
                            continue
                        }
                    }
                }
            }
        })

    })
}

export {RollChecker}