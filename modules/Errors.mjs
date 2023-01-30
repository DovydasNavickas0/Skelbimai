const UserErrorChecker = (x) => {
    switch(x){
        case "auth/invalid-email":
            let Explanation1 = 'The email is invalid'
            return Explanation1

        case "auth/user-not-found":
            let Explanation2 = 'No user with those credentials was found'
            return Explanation2

        case "auth/email-already-exists":
            let Explanation3 = 'The email is already in use'
            return Explanation3

        case "auth/internal-error":
            let Explanation4 = 'Something when wrong. Please try again later'
            return Explanation4
        
        case "auth/invalid-password":
            let Explanation5 = 'Your password is invalid' //something went very wrong
            return Explanation5

        case "auth/operation-not-allowed":
            let Explanation6 = 'You do not have the permissions to do that'
            return Explanation6
    }
}

export {UserErrorChecker}