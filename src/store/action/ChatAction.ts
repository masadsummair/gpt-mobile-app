import { createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import { appSlice } from '../slices/AppSlice';
import generateUniqueId from '../../helper/GenerateUniqueId';
import { chatApi } from '../../api/chat';
import { IChatSlice, IThreat } from '../slices/ChatSlice';
import { RootState } from '../Store';


export const askQuestion = createAsyncThunk<
    {
        new: boolean,
        id?: string,
        index: number,
        answer: string
    },
    { question: string; index: number },
    { state: RootState; rejectValue: any; signal: any; getState: () => RootState, dispatch: any }
>('chatSlice/askQuestion', async ({ question, index }, { signal, rejectWithValue, getState, dispatch }) => {

    try {

        const { chatSlice: { chat }, userSlice: { user } } = getState();
        if (!user) throw ("User not found")
        let context = [];
        context.push({
            "role": "system",
            "content": "You are AI-powered parenting and pregnancy assistant and specialize in answering questions related to parenting and pregnancy topics only, such as child development, pregnancy symptoms, breastfeeding, and more.You can only answer questions related to parenting and pregnancy topics only and use emojis to create a friendly and relatable connection with the user."
        });
        context.push({ "role": "user", "content": "My name is " + user?.firstname + " " + user?.lastname + "." + user?.question1 + " and " + user?.question2 + ".Who are you?" })
        context.push({ "role": "assistant", "content": "My name is " + user?.expert + " created by Lena&Nia." })
        if (chat[index][1].length > 1) {

            const arrayLength = chat[index][1].length;
            for (let i = 0; i < arrayLength - 2; i++) {
                const item = chat[index][1][i];
                if (item.type == "answer") {
                    context.push({ "role": "assistant", "content": item.message });
                } else {
                    context.push({ "role": "user", "content": item.message });
                }
            }

        }
        context.push({ "role": "user", "content": `${question}.` })
        const { status, result, error } = await chatApi.Generate(context, signal)
        if (!status) throw (error)
        if (chat[index][1].slice(0, -2).length == 0) {

            const threat = await firestore().collection('chat').doc(user.id).collection("threat").add({
                chatMessages: [{ type: "question", message: question }, { type: "answer", message: result + "\nIf you are not happy with the answer, try to give more details. I am still learning and improving with every user feedback. Thank you for your kind patience 😀", like: true }],
                createdAt: new Date(),
            });
            return {
                new: true,
                id: threat.id,
                index,
                answer: result + "\nIf you are not happy with the answer, try to give more details. I am still learning and improving with every user feedback. Thank you for your kind patience 😀"
            }
        } else {
            await firestore().collection('chat').doc(user.id).collection("threat").doc(chat[index][0].id).set({
                chatMessages: [...chat[index][1].slice(0, -2), { type: "question", message: question }, { type: "answer", message: result, like: true }],
                createdAt: new Date(),
            });
            return {
                new: false,
                index,
                answer: result
            }
        }

    } catch (error: any) {
        console.log(error)
        if (error.name === 'AbortError') {
            return rejectWithValue('cancelled');
        }
        let message = `We're experiencing exceptionally high demand. Please hang tight as we work on scaling our systems.`;
        dispatch(appSlice.actions.setAlert({ message, mode: "warning" }));
        return rejectWithValue('Something went worng');
    }
},
);

export const initChats = createAsyncThunk<
    IThreat[],
    void,
    { state: RootState; rejectValue: any; getState: () => RootState, dispatch: any }
>('chatSlice/initChats', async (_, { rejectWithValue, getState, dispatch }) => {

    try {
        const { userSlice: { user } } = getState();
        if (!user) throw "User not find"
        const chats = await firestore().collection("chat").doc(user.id).collection("threat").orderBy("createdAt", "asc").get();
        if (chats) {
            let tempChat: IThreat[] = [];
            chats.docs.map((item) => {
                tempChat.push([{ id: item.id }, item.data().chatMessages])
            })
            return [[{ id: generateUniqueId() }, []], ...tempChat.reverse()];
        }
        return [[{ id: generateUniqueId() }, []]]
    } catch (error: any) {

        let message = 'Something went wrong!';
        dispatch(appSlice.actions.setAlert({ message }));
        return rejectWithValue("Something went wrong!");
    }
},
);

function createNewThreat(state: IChatSlice) {

    if (state.chat[0][1].length > 0) {
        state.chat = [[{ id: generateUniqueId() }, [],], ...state.chat]
    }
    state.selectedThreat = 0
}
function setSelectedThreat(state: IChatSlice, action: { payload: number }) {
    state.selectedThreat = action.payload;
}
const ChatAction = { createNewThreat, setSelectedThreat };

export default ChatAction;
