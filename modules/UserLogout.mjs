import { firebaseConfig } from "./database.mjs"
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";


const auth = getAuth();

const UserLogout = () => {

    const root = document.getElementById('root')
    
    const signout = document.createElement('button')
    const li = document.createElement('li')
    li.classList.add("bi", "bi-person-dash-fill")
    
    root.appendChild(signout)
    signout.appendChild(li)

    const logout = () => {
        signOut(auth).then(() => {
            console.log("Logout successful");
            signout.remove()
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error.message)
        })
    
    }

    signout.addEventListener("click", logout)
}

export { UserLogout }