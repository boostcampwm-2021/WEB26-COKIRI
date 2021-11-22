const getFromNow = (time: string | Date) => {
  let targetTime: Date;
  if (typeof time === 'string') {
    targetTime = new Date(time);
  } else {
    targetTime = time;
  }
  const seconds = Math.floor((new Date().getTime() - targetTime.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) {
    return `${Math.floor(interval)}년 전`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return `${Math.floor(interval)}월 전`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)}일 전`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)}시간 전`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)}분 전`;
  }
  return `${Math.floor(seconds)}초 전`;
};

// eslint-disable-next-line import/prefer-default-export
export { getFromNow };
