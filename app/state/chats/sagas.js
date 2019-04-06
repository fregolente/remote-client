import { all, put, takeLatest, call } from 'redux-saga/effects';

import chatsAPI from '~/apis/chats';
import {
  CREATE_NEW_CHAT,
  GET_CHATS,
  getChats,
  getChatsSuccess,
  getChatsError,
  SEND_NEW_CHAT_MESSAGE,
  sendNewChatMessageSuccess,
  GET_CHAT_BY_ID,
} from './actions';

function* createNewChat(action) {
  try {
    const { lawyerId, caseId, caseTitle } = action;
    yield call(chatsAPI.createNewChat, lawyerId, caseId, caseTitle);
    yield put(getChats());
  } catch (error) {
    console.log(error);
  }
}

function* watchCreateNewChat() {
  yield takeLatest(CREATE_NEW_CHAT, createNewChat);
}

function* getMyChats() {
  try {
    const response = yield call(chatsAPI.getMyChats);
    const { success, chat } = response;

    if (success === true && chat) {
      yield put(getChatsSuccess(chat));
    }
  } catch (error) {
    yield put(getChatsError(`Client error: ${error}`));
  }
}

function* watchGetMyChats() {
  yield takeLatest(GET_CHATS, getMyChats);
}

function* sendMessageToChat(action) {
  try {
    const { chatId, recipient, message } = action;
    const response = yield call(chatsAPI.sendNewMessage, chatId, recipient, message);
    const { success } = response;

    if (success === true && chatId) {
      const chatResponse = yield call(chatsAPI.getChatById, chatId);
      const { chat } = chatResponse;
      yield put(sendNewChatMessageSuccess(chat));
    }
  } catch (error) {
    yield put(getChatsError(`Client error: ${error}`));
  }
}

function* watchSendMessageToChat() {
  yield takeLatest(SEND_NEW_CHAT_MESSAGE, sendMessageToChat);
}

function* getChatById(action) {
  try {
    const { chatId } = action;
    const response = yield call(chatsAPI.getChatById, chatId);
    const { chat } = response;
    yield put(sendNewChatMessageSuccess(chat));
  } catch (error) {
    yield put(getChatsError(`Client error: ${error}`));
  }
}

function* watchGetChatById() {
  yield takeLatest(GET_CHAT_BY_ID, getChatById);
}

export default function* watchLawyersSagas() {
  yield all([
    watchCreateNewChat(),
    watchGetMyChats(),
    watchSendMessageToChat(),
    watchGetChatById(),
  ]);
}
