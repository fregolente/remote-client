import { baseHeader, statusHelper } from './baseInfo';

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

function editCaseById(editCaseData) {
  const { id } = editCaseData;

  return fetch(`${API_URL}/case/${id}`, {
    method: 'PATCH',
    headers: baseHeader(),
    body: JSON.stringify(editCaseData),
  })
    .then(statusHelper)
    .then(res => res.json())
    .then(data => data);
}

function getAppliedLawyers(id) {
  return fetch(`${API_URL}/case/${id}/lawyers`, {
    method: 'GET',
    headers: baseHeader(),
  })
    .then(statusHelper)
    .then(res => res.json())
    .then(data => data);
}


function getExplorerCases(title, description, region, practiceArea, priceType) {
  let fetchURL = `${API_URL}/case?`;

  if (title) {
    fetchURL = `${fetchURL}&title=${title}`;
  }

  if (description) {
    fetchURL = `${fetchURL}&description=${description}`;
  }

  if (region) {
    fetchURL = `${fetchURL}&region=${region}`;
  }

  if (practiceArea) {
    fetchURL = `${fetchURL}&practiceArea=${practiceArea}`;
  }

  if (priceType) {
    fetchURL = `${fetchURL}&priceType=${priceType}`;
  }

  return fetch(fetchURL, {
    method: 'GET',
    headers: baseHeader(),
  })
    .then(statusHelper)
    .then(res => res.json())
    .then(data => data);
}

export default {
  createNewCase,
  editCaseById,
  listUserCases,
  getAppliedLawyers,
  getExplorerCases,
};
