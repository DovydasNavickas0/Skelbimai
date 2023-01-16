import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { firebaseConfig } from "./database.mjs"
import { getAuth, createUserWithEmailAndPassword, 
    signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {getDatabase, ref, set, update} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

const UserRegLogin = () => { // works need css/bootstrap work also add a minimum req to passwd

    const UserRegLogin = document.createElement('div')
    UserRegLogin.setAttribute('id', 'UserRegLogin')

    const Email_label = document.createElement('label')
    Email_label.textContent = "Email Adresss"
    const Email = document.createElement('input')
    const Passwd_label = document.createElement('label')
    Passwd_label.textContent = "Password"
    const Passwd = document.createElement('input')

    const LoginBTN = document.createElement('button')
    LoginBTN.textContent = "Login"
    const RegBTN = document.createElement('button')
    RegBTN.textContent = "Register"

    const root = document.getElementById('root')

    root.appendChild(UserRegLogin)

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
            console.log(error.message);
        });

    }

    const UserRegister = () => {
        createUserWithEmailAndPassword(auth, Email.value, Passwd.value)
        .then((userCredential)  => {
            const user = userCredential.user;
            const loginTime = new Date()
            set(ref(db, 'users/' + user.uid),{
                user_email: Email.value,
				last_login: `${loginTime}`,
                Role: 'user'
            })
            console.log("Register Succesful")
            UserRegLogin.remove()
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error.message)
        });
    }

    LoginBTN.addEventListener("click", UserLogin)
    RegBTN.addEventListener("click", UserRegister)
}

export { UserRegLogin }