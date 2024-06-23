import { useState } from "react";

const useSortByPrice = () => {
    const [priceGrow, setPriceGrow] = useState(false);
    const [priceFalling, setPriceFalling] = useState(false);
    const [journeyTime, setJourneyTime] = useState(false);
    return { priceGrow, setPriceGrow, priceFalling, setPriceFalling, journeyTime, setJourneyTime }
};

export default useSortByPrice;