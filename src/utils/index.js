const showFormattedDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('id-ID', options);
};

const showFromattedTime = (time) => {
  const date = new Date(time);
  return `${date.getHours()} : ${date.getMinutes()}`;
};

export { showFormattedDate, showFromattedTime };
