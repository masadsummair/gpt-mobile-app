import { createSlice } from '@reduxjs/toolkit';
import ChatAction, { askQuestion, initChats } from '../action/ChatAction';
import generateUniqueId from '../../helper/GenerateUniqueId';

export interface IChat {
  type: string,
  like?: boolean,
  message: string
}

export interface IThreat {
  0:
  {
      id?: string
  }
  ;
  1: IChat[]
}

export interface IChatSlice {
  chat: IThreat[];
  selectedThreat: number;
  isLoading: boolean;
  isTyping: boolean;
}

const initialState: IChatSlice = {
  chat: [
    [{ id: generateUniqueId() }, []]
  ],
  selectedThreat: 0,
  isLoading: true,
  isTyping: false,
}

export const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers: ChatAction,
  extraReducers: builder => {
    builder.addCase(askQuestion.pending, (state, { meta }) => {
      state.chat[meta.arg.index][1].push({ message: meta.arg.question, type: "question" }, { message: "", type: "answer" })
      state.isTyping = true;
    });
    builder.addCase(askQuestion.fulfilled, (state, action) => {
      if (action.payload.new) {
        state.chat[action.payload.index][0].id = action.payload.id;
      }
      state.chat[action.payload.index][1][state.chat[action.payload.index][1].length - 1].message = action.payload.answer;
      state.isTyping = false;
    });
    builder.addCase(askQuestion.rejected, (state, { meta }) => {
      state.isTyping = false;
      state.chat[meta.arg.index][1].pop();
      state.chat[meta.arg.index][1].pop()
    });
    builder.addCase(initChats.pending, (state, { meta }) => {
      state.isLoading = true;
    });
    builder.addCase(initChats.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chat = action.payload;
    });
    builder.addCase(initChats.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default chatSlice.reducer;
