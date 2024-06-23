import { useState } from "react";

const useFilter = () => {
    const [directFlight, setDirectFlight] = useState(false);
    const [oneTransferFlight, setOneTransferFlight] = useState(false);
    const [minPrice, setMinPrice] = useState();
    const [maxPrice, setMaxPrice] = useState();
    return { directFlight, setDirectFlight, oneTransferFlight, setOneTransferFlight, minPrice, setMinPrice, maxPrice, setMaxPrice }
};

export default useFilter;