import './TicketDirection.css'
import getFormattedDate from '../../utils/getDate';

function TicketDirection({flight, departureCity, departureAirport, arrivalCity, arrivalAirport, carrier, directFlight, sendingTime, arrivalTime }) {
    
    const getSendingTime = getFormattedDate(sendingTime)
    const getArrivalTime = getFormattedDate(arrivalTime)
    const minutesInFlight = (new Date(arrivalTime).getTime() - new Date(sendingTime).getTime()) / 60000;

    function toHoursAndMinutes(totalMinutes) {
        const minutes = totalMinutes % 60;
        const hours = Math.floor(totalMinutes / 60);
        return `${hours}ч ${minutes} мин`;
    }
    
    return (
        <div className="ticketdirection">
            <div className='ticketdirection-container'>
                <div className="ticketdirection__title">
                    <span className="ticketdirection__airport">{`${departureCity? departureCity.caption : departureAirport.caption}, ${departureAirport.caption}`} <span className="ticketdirection__airport-abbreviation">({departureAirport.uid})<span className="ticketdirection__airport-abbreviation-ray">&rarr;</span></span></span>
                    <span className="ticketdirection__airport">{`${arrivalCity ? arrivalCity.caption:arrivalAirport.caption}, ${arrivalAirport.caption}`} <span className="ticketdirection__airport-abbreviation">({arrivalAirport.uid})</span></span>
                </div>
                <div className="ticketdirection__flight-time">
                    <div className="ticketdirection__boarding-container">
                        <time className="ticketdirection__boarding__time">{getSendingTime.time}</time>
                        <span className="ticketdirection__boarding__date">{` ${getSendingTime.day} ${getSendingTime.month}. ${getSendingTime.weekdays}`}</span>
                    </div>
                    <div className="ticketdirection__flight-time">{toHoursAndMinutes(minutesInFlight)}</div>
                    <div className="ticketdirection__boarding-container">
                        <time className="ticketdirection__boarding__time">{getArrivalTime.time}</time>
                        <span className="ticketdirection__boarding__date">{` ${getArrivalTime.day} ${getArrivalTime.month}. ${getArrivalTime.weekdays}`}</span>
                    </div>
                </div>
                <div className='ticketdirection__border'><span className={`${directFlight ? 'ticketdirection__transfer-info_hiden' : 'ticketdirection__transfer-info'}`}>1 пересадка</span></div>
                <div className='ticketdirection__carrier'>Рейс выполняет: {carrier.caption}</div>
            </div>
        </div >
    )
};

export default TicketDirection;