const weekdays = [
  'Вск',
  'Пн',
  'Вт',
  'Ср',
  'Чт',
  'Птн',
  'Суб'
];

const month = [
  'янв',
  'фев',
  'март',
  'апр',
  'май',
  'июнь',
  'июль',
  'авг',
  'сент',
  'окт',
  'ноя',
  'дек',
];

function getFormattedDate(date) {
  let minutes = new Date(date).getMinutes();
  let hours = new Date(date).getHours();

  console.log(new Date(date), new Date(date).getHours())
  const formattedDate = {
    time: `${(hours <=9) ? `0${hours}`: hours}.${(minutes <=9) ? `0${minutes}`: minutes}`,
    day: new Date(date).getDate(),
    month: month[new Date(date).getMonth()],
    weekdays: weekdays[new Date(date).getDay()]
  }
  return formattedDate
};

export default getFormattedDate;