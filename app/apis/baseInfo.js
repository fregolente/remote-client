import { USER_TOKEN } from '~/constants/localstorageItems';

export function baseHeader(orgUid) {
  const header = new Headers({
    Accept: 'application/json',
    Authorization: localStorage.getItem(USER_TOKEN),
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