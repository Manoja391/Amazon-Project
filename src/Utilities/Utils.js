export const IsEmailValid = (email) => { 
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export const CheckUserLoginStatus = () => {
    let userData = localStorage.getItem('UserData');
    if(userData != undefined) {
        return true;
    }
    else{   
        return false;
    }
}