const MINUTE = 60; // SECONDS
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

const getFromNow = (time: string) => {
  const targetTime = new Date(time);
  const seconds = Math.floor((new Date().getTime() - targetTime.getTime()) / 1000);
  let interval = seconds / YEAR;
  if (interval > 1) {
    return `${Math.floor(interval)}년 전`;
  }
  interval = seconds / MONTH;
  if (interval > 1) {
    return `${Math.floor(interval)}월 전`;
  }
  interval = seconds / DAY;
  if (interval > 1) {
    return `${Math.floor(interval)}일 전`;
  }
  interval = seconds / HOUR;
  if (interval > 1) {
    return `${Math.floor(interval)}시간 전`;
  }
  interval = seconds / MINUTE;
  if (interval > 1) {
    return `${Math.floor(interval)}분 전`;
  }
  return '방금';
};

const getBirthdayFormat = (time?: string) => {
  if (time) {
    const date = new Date(time);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
  return '';
};

export { getFromNow, getBirthdayFormat };
