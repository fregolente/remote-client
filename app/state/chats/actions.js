export const GET_CHATS = 'GET_CHATS';

export function getChats() {
  return {
    type: GET_CHATS,
  };
}

export const GET_CHATS_SUCCESS = 'GET_CHATS_SUCCESS';

export function getChatsSuccess(chat) {
  return {
    type: GET_CHATS_SUCCESS,
    chat,
  };
}

export const GET_CHATS_ERROR = 'GET_CHATS_ERROR';

export function getChatsError(error) {
  return {
    type: GET_CHATS_ERROR,
    error,
  };
}

export const CREATE_NEW_CHAT = 'CREATE_NEW_CHAT';

export function createNewChat(caseId, lawyerId, caseTitle) {
  return {
    type: CREATE_NEW_CHAT,
    caseId,
    lawyerId,
    caseTitle,
  };
}

export const SEND_NEW_CHAT_MESSAGE = 'SEND_NEW_CHAT_MESSAGE';

export function sendNewChatMessage(chatId, recipient, message) {
  return {
    type: SEND_NEW_CHAT_MESSAGE,
    chatId,
    recipient,
    message,
  };
}

export const SEND_NEW_CHAT_MESSAGE_SUCCESS = 'SEND_NEW_CHAT_MESSAGE_SUCCESS';

export function sendNewChatMessageSuccess(chat) {
  return {
    type: SEND_NEW_CHAT_MESSAGE_SUCCESS,
    chat,
  };
}

export const GET_CHAT_BY_ID = 'GET_CHAT_BY_ID';

export function getChatById(chatId) {
  return {
    type: GET_CHAT_BY_ID,
    chatId,
  };
}

export const CLEAR_SELECTED_CHAT = 'CLEAR_SELECTED_CHAT';

export function clearSelectedChat() {
  return {
    type: CLEAR_SELECTED_CHAT,
  };
}
