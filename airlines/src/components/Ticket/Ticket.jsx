import './Ticket.css'
import TicketDirection from '../TicketDirection/TicketDirection';
import { svgCarier } from '../../allsvg';

function Ticket({ flight, id }) {


    function renderTicket(flight, id) {
        const noDirectOnHomeToTatget = flight.legs[0].segments.length > 1;
        const noDirectOnTatgetToHome = flight.legs[1].segments.length > 1;

        if (noDirectOnHomeToTatget && noDirectOnTatgetToHome) {
            return <>
                <TicketDirection flight={flight} departureCity={flight.legs[0].segments[0].departureCity} departureAirport={flight.legs[0].segments[0].departureAirport} arrivalCity={flight.legs[0].segments[1].arrivalCity} arrivalAirport={flight.legs[0].segments[1].arrivalAirport} carrier={flight.carrier} directFlight={false} sendingTime={flight.legs[0].segments[0].departureDate} arrivalTime={flight.legs[0].segments[1].arrivalDate} key={`${id} + onHome`}></TicketDirection >

                <TicketDirection flight={flight} departureCity={flight.legs[1].segments[0].departureCity} departureAirport={flight.legs[1].segments[0].departureAirport} arrivalCity={flight.legs[1].segments[1].arrivalCity} arrivalAirport={flight.legs[1].segments[1].arrivalAirport} carrier={flight.carrier} directFlight={false} sendingTime={flight.legs[1].segments[0].departureDate} arrivalTime={flight.legs[1].segments[1].arrivalDate} key={`${id} + toHome`}></TicketDirection>
            </>
        }

        else if (noDirectOnHomeToTatget) {
            return <>
                <TicketDirection flight={flight} departureCity={flight.legs[0].segments[0].departureCity} departureAirport={flight.legs[0].segments[0].departureAirport} arrivalCity={flight.legs[0].segments[1].arrivalCity} arrivalAirport={flight.legs[0].segments[1].arrivalAirport} carrier={flight.carrier} sendingTime={flight.legs[0].segments[0].departureDate} arrivalTime={flight.legs[0].segments[1].arrivalDate} key={`${id} + onHome`} directFlight={false}></TicketDirection >

                <TicketDirection flight={flight} departureCity={flight.legs[1].segments[0].departureCity} departureAirport={flight.legs[1].segments[0].departureAirport} arrivalCity={flight.legs[1].segments[0].arrivalCity} arrivalAirport={flight.legs[1].segments[0].arrivalAirport} carrier={flight.carrier} sendingTime={flight.legs[1].segments[0].departureDate} arrivalTime={flight.legs[1].segments[0].arrivalDate} key={`${id} + toHome`} directFlight={true}></TicketDirection>
            </>
        }
        else if (noDirectOnTatgetToHome) {
            return <>
                <TicketDirection flight={flight} departureCity={flight.legs[0].segments[0].departureCity} departureAirport={flight.legs[0].segments[0].departureAirport} arrivalCity={flight.legs[0].segments[0].arrivalCity} arrivalAirport={flight.legs[0].segments[0].arrivalAirport} carrier={flight.carrier} sendingTime={flight.legs[0].segments[0].departureDate} arrivalTime={flight.legs[0].segments[0].arrivalDate} key={`${id} + onHome`} directFlight={true}></TicketDirection >

                <TicketDirection flight={flight} departureCity={flight.legs[1].segments[0].departureCity} departureAirport={flight.legs[1].segments[0].departureAirport} arrivalCity={flight.legs[1].segments[1].arrivalCity} arrivalAirport={flight.legs[1].segments[1].arrivalAirport} carrier={flight.carrier} sendingTime={flight.legs[1].segments[0].departureDate} arrivalTime={flight.legs[1].segments[1].arrivalDate} key={`${id} + toHome`} directFlight={false}></TicketDirection>
            </>
        }
        else {
            return <>
                <TicketDirection flight={flight} departureCity={flight.legs[0].segments[0].departureCity} departureAirport={flight.legs[0].segments[0].departureAirport} arrivalCity={flight.legs[0].segments[0].arrivalCity} arrivalAirport={flight.legs[0].segments[0].arrivalAirport} carrier={flight.carrier} sendingTime={flight.legs[0].segments[0].departureDate} arrivalTime={flight.legs[0].segments[0].arrivalDate} key={`${id} + onHome`} directFlight={true}></TicketDirection >
                <TicketDirection flight={flight} departureCity={flight.legs[1].segments[0].departureCity} departureAirport={flight.legs[1].segments[0].departureAirport} arrivalCity={flight.legs[1].segments[0].arrivalCity} arrivalAirport={flight.legs[1].segments[0].arrivalAirport} carrier={flight.carrier} sendingTime={flight.legs[1].segments[0].departureDate} arrivalTime={flight.legs[1].segments[0].arrivalDate} key={`${id} + toHome`} directFlight={true}></TicketDirection>
            </>
        }
    };

    return (
        <div className='ticket'>
            <div className="ticket__header">
                <img className="ticket__header-image" src={svgCarier[flight.carrier.uid]}></img>
                <span className='ticket__header-price'>{flight.price.total.amount}₽</span>
            </div>
            {renderTicket(flight,id)}
            <button className='ticket__button-choose'>Выбрать</button>
        </div>
    )
}

export default Ticket;