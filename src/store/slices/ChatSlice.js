import { createSlice } from '@reduxjs/toolkit';
import ChatAction, { askQuestion, initChats } from '../action/ChatAction';
import generateUniqueId from '../../helper/GenerateUniqueId';

export const chatSlice = createSlice({
  name: 'chatSlice',
  initialState: {
    chat: [
      [{ id: generateUniqueId() }, []]
    ],
    selectedThreat: 0,
    isLoading: true,
    isTyping: false,
  },
  reducers: ChatAction,
  extraReducers: builder => {
    builder.addCase(askQuestion.pending, (state, { meta }) => {
      state.chat[state.selectedThreat][1].push({ message: meta.arg, type: "question" }, { message: "", type: "answer" })
      state.isTyping = true;
    });
    builder.addCase(askQuestion.fulfilled, (state, action) => {
      if (action.payload.new) {
        state.chat[state.selectedThreat][0].id = action.payload.id;
      }
      state.chat[state.selectedThreat][1][state.chat[state.selectedThreat][1].length - 1].message = action.payload.answer;
      state.isTyping = false;
    });
    builder.addCase(askQuestion.rejected, (state) => {
      state.isTyping = false;
      state.chat[state.selectedThreat][1].pop();
    });
    builder.addCase(initChats.pending, (state, { meta }) => {
      state.isLoading = true;
    });
    builder.addCase(initChats.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chat=action.payload;
    });
    builder.addCase(initChats.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default chatSlice.reducer;
