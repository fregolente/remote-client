import { baseHeader, statusHelper } from './baseInfo';

function getFavoriteCases() {
  return fetch(`${API_URL}/case/favorite-cases`, {
    method: 'GET',
    headers: baseHeader(),
  })
    .then(statusHelper)
    .then(res => res.json())
    .then(data => data);
}


function applyToACase(caseId, lawyerId) {
  const body = {
    lawyerId,
  };

  return fetch(`${API_URL}/case/${caseId}/application`, {
    method: 'POST',
    headers: baseHeader(),
    body: JSON.stringify(body),
  })
    .then(statusHelper)
    .then(res => res.json())
    .then(data => data);
}

function favoriteACase(caseId, lawyerId) {
  const body = {
    caseId,
    lawyerId,
  };

  return fetch(`${API_URL}/case/favorite-cases`, {
    method: 'POST',
    headers: baseHeader(),
    body: JSON.stringify(body),
  })
    .then(statusHelper)
    .then(res => res.json())
    .then(data => data);
}

function unfavoriteACase(caseId, lawyerId) {
  const body = {
    caseId,
    lawyerId,
  };

  return fetch(`${API_URL}/case/unfavorite-case`, {
    method: 'POST',
    headers: baseHeader(),
    body: JSON.stringify(body),
  })
    .then(statusHelper)
    .then(res => res.json())
    .then(data => data);
}

function getLawyerApplications() {
  return fetch(`${API_URL}/case/applied-cases`, {
    method: 'GET',
    headers: baseHeader(),
  })
    .then(statusHelper)
    .then(res => res.json())
    .then(data => data);
}

export default {
  getFavoriteCases,
  applyToACase,
  favoriteACase,
  unfavoriteACase,
  getLawyerApplications,
};
