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
    const LoginBTN = document.createElement('button')
    LoginBTN.textContent = "Login"
    const RegBTN = document.createElement('button')
    RegBTN.textContent = "Register"

    const root = document.getElementById('root') //base
    const TextError = document.createElement('p') //Error box

    root.appendChild(UserRegLogin)
    UserRegLogin.appendChild(TextError)
    UserRegLogin.appendChild(Email_label)
    UserRegLogin.appendChild(Email)
    UserRegLogin.appendChild(Passwd_label)
    UserRegLogin.appendChild(Passwd)
    UserRegLogin.appendChild(LoginBTN)
    UserRegLogin.appendChild(RegBTN)

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
            const errorCode = error.code;
            const errorMessage = error.message;
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
                        Roll: 'user'
                })
                    console.log("Register Succesful")                //turn off when done
                    UserRegLogin.remove()
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
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