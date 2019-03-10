import { baseHeader, smallHeader, statusHelper } from './baseInfo';

function createNewCase(newCase) {
  return fetch(`${API_URL}/case`, {
    method: 'POST',
    headers: baseHeader(),
    body: JSON.stringify(newCase),
  })
    .then(statusHelper)
    .then(res => res.json())
    .then(data => data);
}

function listUserCases() {
  return fetch(`${API_URL}/case`, {
    method: 'GET',
    headers: baseHeader(),
  })
    .then(statusHelper)
    .then(res => res.json())
    .then(data => data);
}

export default {
  createNewCase,
  listUserCases,
};