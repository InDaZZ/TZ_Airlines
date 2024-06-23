import { useState } from "react"

const useCarrierCheckbox = () => {
    const [AF, setAF] = useState(false);
    const [KL, setKL] = useState(false);
    const [SU1, setSU1] = useState(false);
    const [TK, setTK] = useState(false);
    const [AY, setAY] = useState(false);
    const [BT, setBT] = useState(false);
    const [AZ, setAZ] = useState(false);
    const [PC, setPC] = useState(false);
    const [SN, setSN] = useState(false);
    const [LO, setLO] = useState(false);
    return { AF, setAF, KL, setKL, SU1, setSU1, TK, setTK, AY, setAY, BT, setBT, BT, AZ, setAZ, PC, setPC, SN, setSN, LO, setLO }
}

export default useCarrierCheckbox;