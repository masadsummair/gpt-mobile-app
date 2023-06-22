import { API_URL } from "../utils/constant";


async function Generate(context, signal) {
    try {
        console.log(context)
        const response = await fetch(API_URL + "/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: context }),
            signal
        });
        const result = await response.json();
        console.log(result)
        if(!result.ok)throw("Something went wrong")
        return { status: true,  result:result.result }
    } catch (error) {
        console.log(error)
        return { status: false,error }
    }
}

export const chatApi = { Generate };