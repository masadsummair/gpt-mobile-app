import { API_URL } from "../utils/constant";


async function sendWelcomeEmail(email, url) {
    console.log(email,url)
    try {
        const response = await fetch(API_URL + '/sendWelcomeEmail', {
            method: 'POST',
            body: JSON.stringify({
                email, url
            })
        })
        const result = await response.json();

        if (!result.ok) throw ("Email was not send")
        return { status: true }
    } catch (error) {
        console.log(error)
        return { status: false }
    }
}

async function sendVerificationEmail(email, url) {
    try {
        const response = await fetch(API_URL + '/sendVerificationEmail', {
            method: 'POST',
            body: JSON.stringify({
                email: email, url, platform: "app"
            })
        })
        const result = await response.json();
        if (!result.ok) throw ("Email was not send")
        return { status: true }
    } catch (error) {
        console.log(error)
        return { status: false }
    }
}

export const userApi = { sendWelcomeEmail, sendVerificationEmail };