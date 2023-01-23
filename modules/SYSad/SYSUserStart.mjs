//import { UserLogin } from "./UserLogin.mjs";
//import { UserRegister } from "./UserRegister.mjs";
//import { UserErrorChecker } from "./Errors.mjs";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { firebaseConfig } from "../database.mjs"
import { getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {getDatabase, ref, set, update} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

const SYSUserStart = () => { // works, needs css/bootstrap

    const UserRegLogin = document.createElement('div')
    UserRegLogin.setAttribute('id', 'UserRegLogin')

    //Email
    const Email_label = document.createElement('label')
    Email_label.textContent = "Email Adresss"
    const Email = document.createElement('input')
    Email.setAttribute('type', 'email')
    Email.setAttribute('placeholder', 'Enter your Email')

    //Passwd
    const Passwd_label = document.createElement('label')
    Passwd_label.textContent = "Password"
    const Passwd = document.createElement('input')
    Passwd.setAttribute('type', 'password')
    Passwd.setAttribute('placeholder', 'Enter your Password')

    //Btns
    const RegBTN = document.createElement('button')
    RegBTN.textContent = "Register"

    const root = document.getElementById('root') //base
    const TextError = document.createElement('p') //Error box

    //Rolls
    const RollDatalist = document.createElement('select')
    const USERoption = document.createElement('option')
    USERoption.innerText = "USER"
    const ADMINoption = document.createElement('option')
    ADMINoption.innerText = "ADMIN"
    RollDatalist.appendChild(USERoption)
    RollDatalist.appendChild(ADMINoption)


    root.appendChild(UserRegLogin)
    UserRegLogin.appendChild(TextError)
    UserRegLogin.appendChild(Email_label)
    UserRegLogin.appendChild(Email)
    UserRegLogin.appendChild(Passwd_label)
    UserRegLogin.appendChild(Passwd)
    UserRegLogin.appendChild(RollDatalist)
    UserRegLogin.appendChild(RegBTN)

    const UserRegister = () => {

        if (/(?=.*[a-zA-Z0-9])/.test(Passwd.value) === true){ //(?=.*\d)
            if(Passwd.value.length > 7){
                createUserWithEmailAndPassword(auth, Email.value, Passwd.value)
                .then((userCredential)  => {
                    const user = userCredential.user;
                    const loginTime = new Date()
                    set(ref(db, 'users/' + user.uid),{
                        user_email: Email.value,
                        last_login: `${loginTime}`,
                        Roll: RollDatalist.value
                    }).then(
                        set(ref(db, 'Rolls/' + `/${RollDatalist.value}/` + user.uid),{
                            user_email: Email.value
                    })).then(
                        alert("Register Succesful")                //turn off when done
                    ) 
                })
                .catch((error) => {
                    //const errorCode = error.code;
                    //const errorMessage = error.message;
                    console.log(error.message);                      //turn off when done
                    //console.log(error.code);
                    //TextError.textContent = UserErrorChecker(error.code)
                });
            }
            else{
                TextError.textContent = "Your Password isn't the minimum lenght of 8"
            }
        }
        else{
            TextError.textContent = "Your password has to contain both letter and numbers" // rewrite it
        }
    }

    RegBTN.addEventListener("click", UserRegister)

}

export { SYSUserStart }