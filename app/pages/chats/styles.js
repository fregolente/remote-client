export const mainContainer = {
  padding: '30px',
};

export const chatOpenedContainer = {
  minHeight: '400px',
  padding: '10px',
};

export const chatHeaderContainer = {
  maxHeight: '80px',
};

export const messagesContainer = {
  borderRadius: '3px',
  backgroundColor: 'rgb(216, 219, 213)',
  minHeight: '350px',
  maxHeight: '500px',
  padding: '10px',
  overflowY: 'scroll',
};

export const chatMessageContainer = {
  width: '100%',
  display: 'block',
  float: 'left',
};

export const chatMessageText = {
  margin: '5px',
  backgroundColor: '#8cbadd',
  borderRadius: '8px',
  padding: '8px',
  maxWidth: '450px',
  color: '#FFF',
};

export const myChatMessageText = {
  ...chatMessageText,
  backgroundColor: '#bdbdbd',
  float: 'right',
  color: '#333',
};

export const messageTextTimestamp = {
  fontSize: '12px',
};
