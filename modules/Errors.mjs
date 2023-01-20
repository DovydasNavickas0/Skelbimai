const UserErrorChecker = (x) => {
    switch(x){                                          //this need to have all
        case "auth/invalid-email":                      //https://firebase.google.com/docs/auth/admin/errors
            let Explanation1 = 'error1 caught'          //in here
            return Explanation1
        case "auth/user-not-found":
            let Explanation2 = 'error2 caught'
            return Explanation2
    }
}

export {UserErrorChecker}