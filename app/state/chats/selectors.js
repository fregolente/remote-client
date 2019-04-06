export const getChatsLoading = state => state.chats.chatsLoading;
export const getChatsList = state => state.chats.chatsList;
export const getChatsError = state => state.chats.chatsError;

export const getChatDataSelector = state => ({
  loading: getChatsLoading(state),
  chats: getChatsList(state),
  error: getChatsError(state),
});

export const getCurrentSelectedChat = state => state.chats.selectedChat;
