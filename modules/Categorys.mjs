import { UserErrorChecker } from "./Errors.mjs";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { firebaseConfig } from "./database.mjs"
import { getAuth, createUserWithEmailAndPassword, 
    signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {getDatabase, ref, set, update} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";