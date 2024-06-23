import './CarierCheckbox.css'
function CarierCheckbox({ checked, setChecked, onChange, id, title, activesCarrierCheckbox, setActivesCarrierCheckbox }) {
    const carrierID = id
    return (
        <label className='tickets__filters-captions-input-label' htmlFor={`tickets__filters-captions-input_${id}`}>
            <input type='checkbox' checked={checked} className='tickets__filters-captions-input' id={`tickets__filters-captions-input_${id}`} onChange={() => {
                setChecked(prev => !prev)
                if (!activesCarrierCheckbox.some(item => item === `${carrierID}`)) {
                    setActivesCarrierCheckbox(prev => [...prev, `${carrierID}`])
                }
                else setActivesCarrierCheckbox(prev => [...prev.filter((carrierUid) => {
                    if (carrierUid !== `${carrierID}`) {
                        return carrierUid
                    }
                })])
            }}></input>
            <h5 className='tickets__filters-captions-input-title'>{title}</h5>
        </label >
    )
}
export default CarierCheckbox;