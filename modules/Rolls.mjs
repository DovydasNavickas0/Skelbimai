import { firebaseConfig } from "./database.mjs";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {getDatabase, ref, get} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

import { categorypage } from "./Categories.mjs";
import { ProductPage } from "./ProductPage.mjs";
//import { SYSUserStart } from "./modules/SYSad/SYSUserStart.mjs";


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

const RollChecker = (x) => {

    get(ref(db, 'users/' + x)).then((snapshot2) => {  //this *mess* checks if the person legin in is a user or admin and is supposed to redirect to diffrent pages
        get(ref(db, 'Rolls/')).then((snapshot) => {
            for(let i in snapshot.val()){
                //console.log(i)
                if(i === snapshot2.val().Roll && i === "ADMIN"){
                    //console.log('works')
                    for(let j in snapshot.val()[i]){
                        //console.log(j)
                        if(j === x){
                            //console.log('da spagheti works')

                            categorypage()
                        }
                        else{
                            return
                        }
                    }
                }else if(i === snapshot2.val().Roll && i === "USER"){
                    //console.log('works')
                    for(let j in snapshot.val()[i]){
                        //console.log(j)
                        if(j === x){
                            //console.log('da spagheti works2')

                            ProductPage()
                        }
                        else{
                            return
                        }
                    
                    }
                }
            }
        })

    })
}

export {RollChecker}