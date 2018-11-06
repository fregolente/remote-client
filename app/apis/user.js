import { smallHeader, statusHelper } from './baseInfo';

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

export default {
  createUser,
};
