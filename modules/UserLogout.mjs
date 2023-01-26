import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// need to make it so when logging out it clears the screen.
// Future self. It partialy kinda. All divs with the id of mainPage get deleted so remember that.

const auth = getAuth();

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
        signOut(auth).then(() => {
            console.log("Logout successful");
            signout.remove()
            document.getElementById('mainPage').remove()
            document.getElementById('navbtn1').remove()
            document.getElementById('navbtn2').remove()
            document.getElementById('navbtn3').remove()
            document.getElementById('navbtn4').remove()
            document.getElementById('navbtn5').remove()
            document.getElementById('navbtn6').remove()
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            //alert(error.message)
        })
    
    }

    signout.addEventListener("click", logout)
}

export { UserLogout }