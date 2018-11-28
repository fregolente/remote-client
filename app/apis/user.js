import { baseHeader, smallHeader, statusHelper } from './baseInfo';

function createUser(user) {
  return fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: smallHeader(),
    body: JSON.stringify(user),
  })
    .then(statusHelper)
    .then(res => res.json())
    .then(data => data);
}

function loginUser(user) {
  return fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: smallHeader(),
    body: JSON.stringify(user),
  })
    .then(statusHelper)
    .then(res => res.json())
    .then(data => data);
}

function getUserById(userId) {
  return fetch(`${API_URL}/users/${userId}`, {
    method: 'GET',
    headers: baseHeader(),
  })
    .then(statusHelper)
    .then(res => res.json())
    .then(data => data);
}

function updateUser(user) {
  return fetch(`${API_URL}/users`, {
    method: 'PUT',
    headers: baseHeader(),
    body: JSON.stringify(user),
  })
    .then(statusHelper)
    .then(res => res.json())
    .then(data => data);
}

export default {
  createUser,
  loginUser,
  getUserById,
  updateUser,
};
