import moment from 'moment';

export const getLatestMessage = (messagesList) => {
  return messagesList.reduce((prev, curr) => {
    return (prev.date > curr.date) ? prev : curr;
  });
};


export const getUserInitials = (participant) => {
  const { first, last } = participant;

  return `${first.slice(0,1)}${last.slice(0,1)}`;
};

export const getSenderName = (message) => {
  const { from } = message;

  return `${from.first} ${from.last}`;
};

export const getOtherParticipantName = (participantList, me) => {
  const { first, last } = participantList[0];
  return `${first} ${last}`;
}

export const getMessageFormatedDate = (message, format = 'MM/DD/YY HH:mm') => {
  return moment(message.date).format(format);
};
