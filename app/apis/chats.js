import { baseHeader, statusHelper } from './baseInfo';

function createNewChat(lawyerId, caseId, caseTitle) {
  const body = {
    caseId,
    recipient: lawyerId,
    topic: caseTitle,
    message: 'Remote.Legal is co-participant in this talk enabling users and lawyers to find the best legal help there is. Messages from lawyers and users cannot be considered soliciting by any means.',
  };

  return fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: baseHeader(),
    body: JSON.stringify(body),
  })
    .then(statusHelper)
    .then(res => res.json())
    .then(data => data);
}

function getMyChats() {
  return fetch(`${API_URL}/chat`, {
    method: 'GET',
    headers: baseHeader(),
  })
    .then(statusHelper)
    .then(res => res.json())
    .then(data => data);
}

function sendNewMessage(chatId, recipient, message) {
  const body = {
    recipient,
    message,
  };

  return fetch(`${API_URL}/chat/${chatId}`, {
    method: 'PATCH',
    headers: baseHeader(),
    body: JSON.stringify(body),
  })
    .then(statusHelper)
    .then(res => res.json())
    .then(data => data);
}

function getChatById(chatId) {
  return fetch(`${API_URL}/chat/${chatId}`, {
    method: 'GET',
    headers: baseHeader(),
  })
    .then(statusHelper)
    .then(res => res.json())
    .then(data => data);
}

export default {
  createNewChat,
  getMyChats,
  sendNewMessage,
  getChatById,
};
