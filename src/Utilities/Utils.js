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

export const GetLoggedInUserID = () => {
    let userData = localStorage.getItem('UserData');
    if(userData != undefined) {
        userData=JSON.parse(userData);
        return userData.id;
    }
    else{   
        return null;
    }
} 