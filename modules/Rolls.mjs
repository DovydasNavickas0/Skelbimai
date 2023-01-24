import { firebaseConfig } from "./database.mjs";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {getDatabase, ref, get} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

import { categorypage } from "./Categories.mjs";
import { ProductPage } from "./ProductPage.mjs";
//import { SYSUserStart } from "./modules/SYSad/SYSUserStart.mjs";
import { ProductAds } from "./ProductAds.mjs";


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

const RollChecker = (x) => {

    //console.log('Roll checker working1')

    get(ref(db, 'users/' + x)).then((snapshot2) => {  //this *mess* checks if the person legin in is a user or admin and is supposed to redirect to diffrent pages
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

                            ProductAds()
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