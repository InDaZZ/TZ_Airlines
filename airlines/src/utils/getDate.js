/* const arrivalDate = "2020-08-20T04:30:00"; 2020-08-20T04:30:00
let newsData = new Date(arrivalDate)
console.log(newsData.getDay()) */
"2020-08-20T04:30:00"
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
  const formattedDate = {
    time: `${new Date(date).getHours()}.${new Date(date).getMinutes()}`,
    day: new Date(date).getDate(),
    month: month[new Date(date).getMonth()],
    weekdays: weekdays[new Date(date).getDay()]
  }
  return formattedDate
};

export default getFormattedDate;