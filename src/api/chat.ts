import { IContext } from "../store/action/ChatAction";
import { API_URL } from "../utils/constant";


async function Generate(context: IContext[], signal: AbortSignal): Promise<IAPI_Response> {
    try {
        const response = await fetch(API_URL + "/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: context }),
            signal
        });
        const result = await response.json();
        if (!result.ok) throw ("Something went wrong")
        return { status: true, result: result.result }
    } catch (error) {
        console.log(error)
        return { status: false, error }
    }
}

export const chatApi = { Generate };