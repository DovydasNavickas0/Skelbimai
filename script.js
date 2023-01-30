import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { firebaseConfig } from "./modules/database.mjs"
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase, ref, get} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { UserStart } from "./modules/UserStart.mjs";
import { UserLogout } from "./modules/UserLogout.mjs";
import { RollChecker } from "./modules/Rolls.mjs";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log("User is active");
        UserLogout()
        setTimeout(() => {
            RollChecker(uid)
        }, 100);
    }
    else{
        console.log("User is inactive");
        UserStart()
    }
})


//Admin login
// johndoe@skb.lt
// 12345678lt
//User login
// test@dn.lt
// 123456lt
//RootRegister
// dn@dn.lt
// 123456dn