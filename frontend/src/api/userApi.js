import axios from "axios"

export const postSignIn = (email, password) => {
    const user = {
        email: email,
        password: password
    }

    axios.post("/api/user/signin", user).then((res) => {
        return res.data.token;
    })
}