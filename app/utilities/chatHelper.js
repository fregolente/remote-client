import moment from 'moment';
import {
  pipe,
  reject,
  values,
  lift,
  pick,
  join,
  slice,
  filter,
} from 'ramda';

export const getLatestMessage = (messagesList) => {
  return messagesList.reduce((prev, curr) => {
    return (prev.date > curr.date) ? prev : curr;
  });
};

export const getSimpleUserInitials = (user) => {
  const getFirstLetter = n => slice(0, 1, n);
  return pipe(
    pick(['first', 'last']),
    values,
    lift(getFirstLetter),
    join(''),
  )(user);
};

export const getUserInitials = (userId, participants) => {
  const isUser = n => n._id === userId; // eslint-disable-line no-underscore-dangle
  const getFirstLetter = n => slice(0, 1, n);
  return pipe(
    reject(isUser),
    otherUser => pick(['first', 'last'], otherUser[0]),
    values,
    lift(getFirstLetter),
    join(''),
  )(participants);
};

export const getRecipient = (userId, participants) => {
  const isUser = n => n._id === userId; // eslint-disable-line no-underscore-dangle
  return pipe(reject(isUser))(participants);
};

export const getOtherParticipantName = (userId, participants) => {
  const isUser = n => n._id === userId; // eslint-disable-line no-underscore-dangle

  return pipe(
    reject(isUser),
    otherUser => pick(['first', 'last'], otherUser[0]),
    values,
    join(' '),
  )(participants);
};

export const getSenderName = (message, participants) => {
  const { from } = message;
  const isUser = n => n._id === from; // eslint-disable-line no-underscore-dangle

  return pipe(
    filter(isUser),
    otherUser => pick(['first', 'last'], otherUser[0]),
    values,
    join(' '),
  )(participants);
};

export const checkIfUserSentThisMessage = (userId, message) => {
  return message.from === userId;
};

export const getMessageFormatedDate = (message, format = 'MM/DD/YY HH:mm') => {
  return moment(message.date).format(format);
};
