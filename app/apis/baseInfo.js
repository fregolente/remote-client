import { USER_TOKEN } from '~/constants/localstorageItems';
const SESSION_TOKEN = localStorage.getItem(USER_TOKEN);


export function baseHeader() {
  const sanitizedToken = SESSION_TOKEN.replace(/"/g, '')

  const header = new Headers({
    Accept: 'application/json',
    Authorization: `Bearer ${sanitizedToken}`,
    'Content-Type': 'application/json',
  });

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