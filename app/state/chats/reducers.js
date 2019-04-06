// Actions
import {
  GET_CHATS,
  GET_CHATS_ERROR,
  GET_CHATS_SUCCESS,
  SEND_NEW_CHAT_MESSAGE_SUCCESS,
} from './actions';
import { CLEAR_SELECTED_CASE } from '../cases/actions';

const initialState = {
  chatsLoading: false,
  chatsList: [],
  chatsError: '',
  selectedChat: null,
};

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHATS:
      return {
        ...state,
        chatsLoading: true,
        chatsList: initialState.chatsList,
        chatsError: initialState.chatsError,
      };
    case GET_CHATS_ERROR:
      return {
        ...state,
        chatsLoading: initialState.chatsLoading,
        chatsList: initialState.chatsList,
        chatsError: action.error,
      };
    case GET_CHATS_SUCCESS:
      return {
        ...state,
        chatsLoading: initialState.chatsLoading,
        chatsList: action.chat,
        chatsError: initialState.chatsError,
      };
    case SEND_NEW_CHAT_MESSAGE_SUCCESS:
      return {
        ...state,
        selectedChat: action.chat,
      };
    case CLEAR_SELECTED_CASE:
      return {
        ...state,
        selectedChat: initialState.selectedChat,
      };
    default:
      return state;
  }
}
