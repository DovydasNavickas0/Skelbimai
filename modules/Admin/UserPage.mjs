import { firebaseConfig } from "../database.mjs";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {getDatabase, ref, get, update, remove, push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

const UserPage = () => {

    const user = auth.currentUser

    const root = document.getElementById('root')

    const AdsPage = document.createElement('div')
    AdsPage.setAttribute('id', 'mainPage')

    const divextra3 = document.createElement('div')
    divextra3.classList.add("row", "col-sm-12", "col-md-12", "pt-5", "mt-5", "p-3")

    const divextra4 = document.createElement('div')
    divextra4.classList.add("mt-5")
    
    const Displaytable = document.createElement('table');
    Displaytable.classList.add("table", "table-striped", "table-bordered", "m-3")

    const thead = document.createElement('thead')
    const tbody = document.createElement('tbody')

    const rowheader = document.createElement('tr');

    const listBtn = document.createElement('th')
    listBtn.classList.add("col-md-1")

    const tUID = document.createElement('th');
    tUID.innerText = "UID";
    tUID.classList.add("col-md-1")

    const tEmail = document.createElement('th');
    tEmail.innerText = "Email";
    tEmail.classList.add("col-md-1")

    const tRole = document.createElement('th');
    tRole.innerText = "Roles";
    tRole.classList.add("col-md-1")

    const tDate = document.createElement('th');
    tDate.innerText = "Last login date"
    tDate.classList.add("col-md-1")
    
    root.appendChild(AdsPage)
    AdsPage.appendChild(divextra3)
    divextra3.appendChild(divextra4)
    divextra4.appendChild(Displaytable);
    Displaytable.appendChild(thead);
    Displaytable.appendChild(tbody)
    thead.appendChild(rowheader);
    rowheader.appendChild(listBtn)
    rowheader.appendChild(tUID);
    rowheader.appendChild(tEmail);
    rowheader.appendChild(tRole)
    rowheader.appendChild(tDate);

    const deleteUser = (x) => {

        document.getElementById(`colText ${x}`).innerText = "DELETED"

        remove(ref(db, "users/" + x)).then(
            alert("User deleted")
            (function(){
                document.getElementById(`Delete ${x}`).disabled = true;
                document.getElementById(`Ban ${x}`).disabled = true;
            })()
        )
        
    }

    const banUser = (x) => {

        get(ref(db, 'users/' + x)).then((snapshot) =>{
            if(snapshot.exists()){
                if(snapshot.val().Roll === "DISABLED"){
                    document.getElementById(`colText ${x}`).innerText = "DISABLED"

                    update(ref(db, "users/" + x), {
                        Roll: "USER"
                    }).then(
                        alert("User enabled")
                    )
                }
            }
            else{
                document.getElementById(`colText ${x}`).innerText = "USER"

                update(ref(db, "users/" + x), {
                    Roll: "DISABLED"
                }).then(
                    alert("User disabled")
                )
            }
        })
    }

    (() => {
        get(ref(db, "users/")).then((snapshot) => {
            if(snapshot.exists()){

                for(let i in snapshot.val()){

                    if(snapshot.val()[i].Roll === "ADMIN"){
                        continue
                    }
                    
                    const rowproduct = document.createElement('tr');

                    const colUID = document.createElement('td');
                    colUID.textContent = i;

                    const colbtn = document.createElement('td')
                    colbtn.setAttribute('align', 'center')

                    const colEmail = document.createElement('td');
                    colEmail.textContent = snapshot.val()[i].user_email;

                    const colRole = document.createElement('td');
                    colRole.innerText = snapshot.val()[i].Roll
                    colRole.setAttribute('id', `colText ${i}`)

                    const coldate = document.createElement('td');
                    coldate.textContent = snapshot.val()[i].last_login

                    const deletebtn = document.createElement('button')
                    deletebtn.classList.add("col-md-4", "p-3", "btn", "btn-outline-dark", "mb-5", "mt-5", "d-grid", "gap-5")
                    deletebtn.setAttribute('id', `Delete ${i}`)
                    const iTrash = document.createElement('i')
                    iTrash.classList.add("bi", "bi-trash3")
                    deletebtn.appendChild(iTrash)
                    //deletebtn.setAttribute('id', `fav ${ID}`)

                    const Banbtn = document.createElement("button")
                    Banbtn.classList.add("col-md-4", "p-3", "btn", "btn-outline-dark")
                    Banbtn.setAttribute('id', `Ban ${i}`)
                    const BanI = document.createElement('i')
                    if(snapshot.val()[i].Roll === "DISABLED"){
                        BanI.classList.add("bi", "bi-unlock")
                    }
                    else{
                        BanI.classList.add("bi", "bi-lock")
                    }
                    Banbtn.appendChild(BanI)

                    rowproduct.appendChild(colbtn)
                    colbtn.appendChild(deletebtn)
                    colbtn.appendChild(Banbtn)
                    rowproduct.appendChild(colUID);
                    rowproduct.appendChild(colEmail);
                    rowproduct.appendChild(colRole)
                    rowproduct.appendChild(coldate);
                    tbody.appendChild(rowproduct)

                    deletebtn.addEventListener('click', function(){
                        deleteUser(i)
                    })
                    Banbtn.addEventListener('click', function(){
                        banUser(i)
                    })

                }
            }
        })
    })()

}

export{ UserPage }