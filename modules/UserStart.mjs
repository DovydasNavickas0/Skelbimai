//import { UserLogin } from "./UserLogin.mjs";
//import { UserRegister } from "./UserRegister.mjs";
import { UserErrorChecker } from "./Errors.mjs";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { firebaseConfig } from "./database.mjs"
import { getAuth, createUserWithEmailAndPassword, 
    signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {getDatabase, ref, set, update} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

const UserStart = () => { // works, needs css/bootstrap

    const UserRegLogin = document.createElement('div')
    UserRegLogin.setAttribute('id', 'mainPage')


    //Error window
    const errorDiv = document.createElement('div');
    errorDiv.classList.add("row", "col-md-8", "offset-md-2", "text-center", 
                            "p-1", "mb-2", "bg-gradient"); //"bg-secondary",
    errorDiv.setAttribute('style', '--bs-bg-opacity: .45;');
    const errorP = document.createElement('p');


    //extra divs
    const extraDiv1 = document.createElement('div')
    extraDiv1.classList.add("row", "mx-5", "pt-5")

    const extraDiv2 = document.createElement('div')
    extraDiv2.classList.add("px-3", "col-md-4", "offset-md-4")

    const EmailDiv = document.createElement('div')
    EmailDiv.classList.add("mb-3", "text-center")

    const PasswdDiv = document.createElement('div')
    PasswdDiv.classList.add("mb-3", "text-center")

    const BtnDiv = document.createElement('div')
    BtnDiv.classList.add("pt-5", "d-grid", "gap-4", "col-3", "mx-auto")


    //Email
    const Email_label = document.createElement('label')
    Email_label.textContent = "Email Adresss"
    Email_label.classList.add("form-label")
    const Email = document.createElement('input')
    Email.classList.add("form-control")
    Email.setAttribute('type', 'email')
    Email.setAttribute('placeholder', 'Enter your Email')


    //Passwd
    const Passwd_label = document.createElement('label')
    Passwd_label.textContent = "Password"
    Passwd_label.classList.add("form-label")
    const Passwd = document.createElement('input')
    Passwd.classList.add("form-control")
    Passwd.setAttribute('type', 'password')
    Passwd.setAttribute('placeholder', 'Enter your Password')


    //Btns
    const LoginBTN = document.createElement('button')
    LoginBTN.textContent = "Login"
    LoginBTN.classList.add("btn", "btn-outline-dark")
    const RegBTN = document.createElement('button')
    RegBTN.textContent = "Register"
    RegBTN.classList.add("btn", "btn-outline-dark")
    const h2extra = document.createElement('h2')
    h2extra.innerText = "OR"
    h2extra.classList.add("offset-md-3", "col-md-6", "pt-2", "pb-3", "text-center", 
                    "border", "border-dark", "bg-dark", "rounded-circle", "text-white")

    const root = document.getElementById('root') //base
    const TextError = document.createElement('p') //Error box

    root.appendChild(UserRegLogin)

    UserRegLogin.appendChild(errorDiv)
    errorDiv.appendChild(errorP)

    UserRegLogin.appendChild(extraDiv1)
    extraDiv1.appendChild(extraDiv2)
 
    extraDiv2.appendChild(EmailDiv)
    EmailDiv.appendChild(Email_label)
    EmailDiv.appendChild(Email)

    extraDiv2.appendChild(PasswdDiv)
    PasswdDiv.appendChild(Passwd_label)
    PasswdDiv.appendChild(Passwd)

    extraDiv2.appendChild(BtnDiv)
    BtnDiv.appendChild(LoginBTN)
    BtnDiv.appendChild(h2extra)
    BtnDiv.appendChild(RegBTN)

    const UserLogin = () => {   
        signInWithEmailAndPassword(auth, Email.value, Passwd.value)
        .then((userCredential) => {
            const user = userCredential.user;
            const loginTime = new Date()
            update(ref(db, 'users/' + user.uid), {
                last_login: `${loginTime}`
            });
            console.log("Login Succesful")
            UserRegLogin.remove()
        })
        .catch((error) => {
            //const errorCode = error.code;
            //const errorMessage = error.message;
            TextError.textContent = UserErrorChecker(error.code)
        });
    
    }

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
                        Roll: "USER"
                }).then(
                    set(ref(db, 'Rolls/' + `/USER/` + user.uid),{
                        user_email: Email.value
                }))
                    console.log("Register Succesful")                //turn off when done
                    UserRegLogin.remove()
                })
                .catch((error) => {
                    //const errorCode = error.code;
                    //const errorMessage = error.message;
                    console.log(error.message);                      //turn off when done
                    console.log(error.code);
                    TextError.textContent = UserErrorChecker(error.code)
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

    LoginBTN.addEventListener("click", UserLogin)
    RegBTN.addEventListener("click", UserRegister)

}

export { UserStart }