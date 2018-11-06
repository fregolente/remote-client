import { smallHeader, statusHelper } from './baseInfo';

function getUtilities() {
  return fetch(`${API_URL}/utilities`, {
    method: 'GET',
    headers: smallHeader(),
  })
    .then(statusHelper)
    .then(res => res.json())
    .then(data => data);
}

export default {
  getUtilities,
};
