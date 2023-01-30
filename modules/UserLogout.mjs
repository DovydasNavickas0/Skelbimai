import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { firebaseConfig } from "./database.mjs"
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {getDatabase, ref, get} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// need to make it so when logging out it clears the screen.
// Future self. It partialy kinda. All divs with the id of mainPage get deleted so remember that.

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

const UserLogout = () => {

    const root = document.getElementById('header')

    const extradiv = document.createElement('div')
    extradiv.classList.add("col-md-1", "mx-0", "p-0", "m-3", 'd-flex', 'justify-content-around')
    
    const signout = document.createElement('button')                            //the button itself
    signout.classList.add("p-1", 'btn', 'btn-outline-dark', 'ps-2', 'pe-2')

    const icon = document.createElement('i')                                     //the symbol
    icon.classList.add("bi-person-dash-fill", 'list-unstyled')
    
    root.appendChild(extradiv)
    extradiv.appendChild(signout)
    signout.appendChild(icon)


    const logout = () => {

        const user = auth.currentUser
        
        get(ref(db, "users/" + user.uid)).then((snapshot) => {
            if(snapshot.exists()){
                if(snapshot.val().Roll === "ADMIN"){
                    document.getElementById('navbtn1').remove();
                    document.getElementById('navbtn2').remove();
                    document.getElementById('navbtn3').remove();
                }
                else if(snapshot.val().Roll === "USER"){
                    document.getElementById('navbtn4').remove();
                    document.getElementById('navbtn5').remove();
                    document.getElementById('navbtn6').remove();
                }
            }
        }).then(
            signOut(auth).then(() => {
                console.log("Logout successful");
                extradiv.remove();
                document.getElementById('mainPage').remove();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                //alert(error.message)
            })
        )
    
    }

    signout.addEventListener("click", logout)
}

export { UserLogout }