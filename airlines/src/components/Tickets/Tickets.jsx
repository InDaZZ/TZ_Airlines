

import Ticket from '../Ticket/Ticket';
import { useEffect, useState } from 'react';
import './Tickets.css';
import useSortByPrice from '../../hooks/useSortByPrice.jsx';
import Checkbox from '../Checkbox/Checkbox.jsx';
import useFilter from '../../hooks/useFilter.jsx';
import CarierCheckbox from '../CarierCheckbox/CarierCheckbox.jsx';
import useCarrierCheckbox from '../../hooks/useCarrierCheckbox.jsx';

function Tickets({ flights }) {
    const { priceGrow, setPriceGrow, priceFalling, setPriceFalling } = useSortByPrice();
    const { directFlight, setDirectFlight, oneTransferFlight, setOneTransferFlight, minPrice, setMinPrice, maxPrice, setMaxPrice } = useFilter();
    const { AF, setAF, KL, setKL, SU1, setSU1, TK, setTK, AY, setAY, BT, setBT, AZ, setAZ, PC, setPC, SN, setSN, LO, setLO } = useCarrierCheckbox();
    const [pivcesFilter, setPricesFilter] = useState(false);
    const [visibleTickets, setVisibleTickets] = useState(5);
    const [filteredFlights, setFilteredFlights] = useState([...flights]);
    const [notFound, setNotFound] = useState(false);
    const [activesCarrierCheckbox, setActivesCarrierCheckbox] = useState([]);
    const filterActive = priceGrow || priceFalling || directFlight || oneTransferFlight || pivcesFilter || (activesCarrierCheckbox.length > 0);

    useEffect(() => {
        setFilteredFlights([...flights])
        setNotFound(false)
        filterFlights(filteredFlights)
        return
    }, [priceGrow, priceFalling, directFlight, oneTransferFlight, pivcesFilter, activesCarrierCheckbox.length])

    function filterFlights() {
        if (activesCarrierCheckbox.length > 0) {
            setVisibleTickets(5)
            setFilteredFlights(prev => [...prev].filter((flight) => {
                for (let i = 0; i < activesCarrierCheckbox.length; i++) {
                    if (activesCarrierCheckbox[i] === flight.flight.carrier.uid) {
                        return true
                    }
                }
            })
            )
        };
        if (pivcesFilter && maxPrice > 0) {
            setFilteredFlights(prev => [...prev.filter((flight) => {
                if ((Number(flight.flight.price.total.amount) <= maxPrice) && (Number(flight.flight.price.total.amount) >= minPrice)) {
                    return true
                }
            })])
        };
        if (priceGrow) {
            setFilteredFlights(prev => [...prev.sort((a, b) => a.flight.price.total.amount - b.flight.price.total.amount)])
        };
        if (priceFalling) {
            setFilteredFlights(prev => [...prev.sort((a, b) => b.flight.price.total.amount - a.flight.price.total.amount)])
        };
        if (directFlight) {
            setFilteredFlights(prev => [...prev.filter((flight) => {
                if (flight.flight.legs[0].segments.length === 1 && flight.flight.legs[1].segments.length === 1) {
                    return flight
                }
            })])
        };
        if (oneTransferFlight) {
            setFilteredFlights(prev => [...prev.filter((flight) => {
                if ((flight.flight.legs[0].segments.length > 1 && flight.flight.legs[1].segments.length === 1) || (flight.flight.legs[1].segments.length > 1 && flight.flight.legs[0].segments.length === 1)) {
                    return flight
                }

            })])
        };
    };

    function loadMoreTickets() {
        setVisibleTickets(prev => prev + 5)
    };

    function renderTickets(flights, visibleTickets) {
        if (flights.length > 0) {
            return flights
                .slice(0, visibleTickets)
                .map((flightData) => {
                    return <Ticket flight={flightData.flight} id={flightData.flightToken} key={flightData.flightToken}></Ticket>
                })
        }
        else setNotFound(true)
    };

    function rarra(event) {
        event.preventDefault()
        setPricesFilter(true)
        filterFlights()
    };

    function clearPricesFilter() {
        setPricesFilter(false)
        setFilteredFlights([...flights])
        filterFlights()
        setMinPrice(0)
        setMaxPrice(0)
    };

    function resetAllFilters() {
        setFilteredFlights([...flights])
        setPriceGrow(false)
        setPriceFalling(false)
        setDirectFlight(false)
        setOneTransferFlight(false)
        setMinPrice(0)
        setMaxPrice(0)
        setPricesFilter(false)
        setAF(false)
        setKL(false)
        setSU1(false)
        setTK(false)
        setAY(false)
        setBT(false)
        setAZ(false)
        setPC(false)
        setSN(false)
        setLO(false)
        setNotFound(false)
    };
    console.log(filterActive && filteredFlights.length <= visibleTickets)
    return (
        <section className="tickets">
            <div className='tickets__filters'>
                <div className='tickets__filters-sort-container'>
                    <h4 className='tickets__filters-title tickets__filters-title_sort'>Сортировать</h4>
                    <Checkbox children={'По возрастанию цены'} checked={priceGrow} onChange={() => {
                        setPriceGrow(prev => !prev)
                        setPriceFalling(prev => prev && !prev)
                    }} id={`priceGrow`}></Checkbox>

                    <Checkbox children={'По убыванию цены'} checked={priceFalling} onChange={() => {
                        setPriceFalling(prev => !prev)
                        setPriceGrow(prev => prev && !prev)
                    }} id={`priceFalling`}></Checkbox>

                </div>
                <div className='tickets__filters-filter-container'>
                    <h4 className='tickets__filters-title tickets__filters-title_filter'>Фильтры :</h4>
                    <Checkbox children={'1 пересадка'} checked={oneTransferFlight} onChange={() => {
                        setOneTransferFlight(prev => !prev)
                        setDirectFlight(prev => prev && !prev)
                    }} id={`oneTransferFlight`}></Checkbox>

                    <Checkbox children={'Без пересадок'} checked={directFlight} onChange={() => {
                        setDirectFlight(prev => !prev)
                        setOneTransferFlight(prev => prev && !prev)
                    }} id={`directFlight`}></Checkbox>

                </div>
                <form className='tickets__filters-filter-price-container' onSubmit={(event) => rarra(event)}>
                    <h4 className='tickets__filters-title tickets__filters-title_filter'>Цена :</h4>
                    <label className='tickets__filters-filter-price-input-label'>
                        <span >От: </span>
                        <input className='tickets__filters-filter-price-input' id='tickets__filters-filter-price-input_minprice' placeholder='От' value={minPrice} onChange={(event) => {
                            setMinPrice(event.target.value)
                        }}></input>
                    </label>
                    <label className='tickets__filters-filter-price-input-label'>
                        <span >До: </span>
                        <input className='tickets__filters-filter-price-input' id='tickets__filters-filter-price-input_maxprice' placeholder='До' value={maxPrice} onChange={(event) => {
                            setMaxPrice(event.target.value)
                        }}></input>
                    </label>
                    <div className='tickets__filters-filter-price-button-container'>
                        <button type='onSubmit' className='tickets__filters-buttto'>Применить</button>
                        <button type='button' className='tickets__filters-buttto' onClick={clearPricesFilter}>Сбросить</button>
                    </div>
                </form>
                <div className='tickets__filters-carriers'>
                    <h4>Авиакомпании :</h4>
                    <CarierCheckbox id={'AF'} title={'Air France'} checked={AF} setChecked={setAF} activesCarrierCheckbox={activesCarrierCheckbox} setActivesCarrierCheckbox={setActivesCarrierCheckbox}></CarierCheckbox>
                    <CarierCheckbox id={'KL'} title={'KLM'} checked={KL} setChecked={setKL} activesCarrierCheckbox={activesCarrierCheckbox} setActivesCarrierCheckbox={setActivesCarrierCheckbox}></CarierCheckbox>
                    <CarierCheckbox id={'SU1'} title={'Аэрофлот - российские авиалинии'} checked={SU1} setChecked={setSU1} activesCarrierCheckbox={activesCarrierCheckbox} setActivesCarrierCheckbox={setActivesCarrierCheckbox}></CarierCheckbox>
                    <CarierCheckbox id={'TK'} title={'TURK HAVA YOLLARI A.O.'} checked={TK} setChecked={setTK} activesCarrierCheckbox={activesCarrierCheckbox} setActivesCarrierCheckbox={setActivesCarrierCheckbox}></CarierCheckbox>
                    <CarierCheckbox id={'AY'} title={'Finnair Oyj'} checked={AY} setChecked={setAY} activesCarrierCheckbox={activesCarrierCheckbox} setActivesCarrierCheckbox={setActivesCarrierCheckbox}></CarierCheckbox>
                    <CarierCheckbox id={'BT'} title={'Air Baltic Corporation A/S'} checked={BT} setChecked={setBT} activesCarrierCheckbox={activesCarrierCheckbox} setActivesCarrierCheckbox={setActivesCarrierCheckbox}></CarierCheckbox>
                    <CarierCheckbox id={'AZ'} title={'Alitalia Societa Aerea Italiana'} checked={AZ} setChecked={setAZ} activesCarrierCheckbox={activesCarrierCheckbox} setActivesCarrierCheckbox={setActivesCarrierCheckbox}></CarierCheckbox>
                    <CarierCheckbox id={'PC'} title={'Pegasus Hava Tasimaciligi A.S.'} checked={PC} setChecked={setPC} activesCarrierCheckbox={activesCarrierCheckbox} setActivesCarrierCheckbox={setActivesCarrierCheckbox}></CarierCheckbox>
                    <CarierCheckbox id={'SN'} title={'Brussels Airlines'} checked={SN} setChecked={setSN} activesCarrierCheckbox={activesCarrierCheckbox} setActivesCarrierCheckbox={setActivesCarrierCheckbox}></CarierCheckbox>
                    <CarierCheckbox id={'LO'} title={'LOT Polish Airlines'} checked={LO} setChecked={setLO} activesCarrierCheckbox={activesCarrierCheckbox} setActivesCarrierCheckbox={setActivesCarrierCheckbox}></CarierCheckbox>
                </div>
            </div>
            <div className='tickets__filters-captions'>

            </div>
            <div className='tickets-container'>
                {notFound ? <span className='tickets__error'>Ничего не найдено</span> : filterActive ? renderTickets(filteredFlights, visibleTickets) : renderTickets(flights, visibleTickets, filteredFlights)}
                <button type='button' className={`tickets__button-more ${(filterActive && filteredFlights.length <= visibleTickets) ? 'tickets__button-more_hiden' : (flights.length <= visibleTickets) && 'tickets__button-more_hiden'}`} onClick={notFound ? resetAllFilters : loadMoreTickets}>{notFound ? 'Сбросить фильтры' : 'Показать еще'}</button>
            </div>
        </section >
    )
};

export default Tickets;