import { createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import { appSlice } from '../slices/AppSlice';
import generateUniqueId from '../../helper/GenerateUniqueId';

export const askQuestion = createAsyncThunk(
    'chatSlice/askQuestion',
    async ({question,index}, { signal,rejectWithValue, dispatch, getState }) => {
        try {
            const { chatSlice: { chat }, userSlice: { user } } = getState();
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
            const response = await fetch("https://lenania.com/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: context }),
                signal
            });

            const result = await response.json();
            if (!response.ok) throw ("")

            if (chat[index][1].slice(0, -2).length == 0) {

                const threat = await firestore().collection('chat').doc(user.id).collection("threat").add({
                    chatMessages: [{ type: "question", message: question }, { type: "answer", message: result.result+"\nIf you are not happy with the answer, try to give more details. I am still learning and improving with every user feedback. Thank you for your kind patience 😀", like: true }],
                    createdAt: new Date(),
                });
                return {
                    new: true,
                    id: threat.id,
                    index,
                    answer: result.result +"\nIf you are not happy with the answer, try to give more details. I am still learning and improving with every user feedback. Thank you for your kind patience 😀"
                }
            } else {
                await firestore().collection('chat').doc(user.id).collection("threat").doc(chat[index][0].id).set({
                    chatMessages: [...chat[index][1].slice(0, -2), { type: "question", message: question }, { type: "answer", message: result.result, like: true }],
                    createdAt: new Date(),
                });
                return {
                    new: false,
                    index,
                    answer: result.result
                }
            }

        } catch (error) {
            console.log(error)
            if(error.name === 'AbortError')
            {
                return rejectWithValue('cancelled');
            }
            let message = `We're experiencing exceptionally high demand. Please hang tight as we work on scaling our systems.`;
            dispatch(appSlice.actions.setAlert({ message,mode:"warning" }));
            return rejectWithValue('Something went worng');
        }
    },
);

export const initChats = createAsyncThunk(
    'chatSlice/initChats',
    async (_, { rejectWithValue, dispatch, getState }) => {
        try {
            const { userSlice: { user } } = getState();
            const chats = await firestore().collection("chat").doc(user.id).collection("threat").orderBy("createdAt","asc").get();
            if (chats) {
                let tempChat = [];
                chats.docs.map((item) => {
                    tempChat.push([{ id: item.id }, item.data().chatMessages])
                })
                return [[{ id: generateUniqueId() }, []], ...tempChat.reverse()];
            }
            return [[{ id: generateUniqueId() }, []]]
        } catch (error) {

            let message = 'Something went wrong!';
            dispatch(appSlice.actions.setAlert({ message }));
            return rejectWithValue({index});
        }
    },
);

function createNewThreat(state, action) {

    if (state.chat[0][1].length > 0) {
        state.chat = [[{ id: generateUniqueId() }, [],], ...state.chat]
    }
    state.selectedThreat = 0
}
function setSelectedThreat(state, action) {
    state.selectedThreat = action.payload;
}
const ChatAction = { createNewThreat, setSelectedThreat };

export default ChatAction;
