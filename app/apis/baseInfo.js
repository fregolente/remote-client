export function baseHeader(orgUid) {
  const header = new Headers({
    Accept: 'application/json',
    Authorization: `JWT ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  });

  if (orgUid) {
    header.append('Organization', orgUid);
  }

  return header;
}

export function smallHeader() {
  return new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });
}

export function statusHelper(res) {
  if (!res.ok) {
    throw Error(res.status);
  }
  return res;
}