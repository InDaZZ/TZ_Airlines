import jsonData from './flights.json';

const newData = JSON.parse(JSON.stringify(jsonData)); //Предполагаемый ответ от сервера
const allCaption = new Set(); //Превозчики
const flightToLondonDirect = []; //Прямые рейсы
const flightToLondonWithApress = []; //Рейсы с пресадкой
const captionMap = new Map();// uid : `название превозчика`
const unic = [];//уникальные перевозчики

newData.result.flights.forEach((item) => {
    if (!allCaption.has(item.flight.carrier.caption)) {
        allCaption.add(item.flight.carrier.caption)
    }
}) // получил список всех перевозчиков

for (let i = 0; i < newData.result.flights.length; i++) {
    if (!unic.some((item) => item === newData.result.flights[i].flight.carrier.caption)) {
        unic.push(newData.result.flights[i].flight.carrier.caption)
        captionMap.set(`${newData.result.flights[i].flight.carrier.uid}`, newData.result.flights[i].flight.carrier.caption)
    }
}
newData.result.flights.forEach((item) => {
    if (item.flight.legs[0].segments.length === 1 && item.flight.legs[1].segments.length === 1) {
        flightToLondonDirect.push(item)
    }
    if (item.flight.legs[0].segments.length > 1 || item.flight.legs[1].segments.length > 1) {
        flightToLondonWithApress.push(item)
    }
    else return
});

export { allCaption, newData, flightToLondonDirect, flightToLondonWithApress, captionMap }