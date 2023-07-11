import axios from "axios"

export const postLogin = async (email, password) => {
    const user = {
        email: email,
        pw: password
    }

    const response = await axios.post("/api/user/login", user)
    
    return response.data.token;
}

export const postSignIn = async (email, pw, userName, phoneNumber) => {
    const user = {
        email: email,
        pw: pw,
        userName: userName,
        phoneNumber: phoneNumber,
    }

    const response = await axios.post("/api/user/signin", user)

    return response.data
}