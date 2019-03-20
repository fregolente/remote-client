import moment from 'moment';

export function getDate() {
}

export function getTime() {
}


export function getFormattedDate(date, format = 'MM/DD/YY HH:mm:ss') {
  return moment(date).format(format);
}
