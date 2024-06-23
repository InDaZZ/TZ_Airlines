import './Checkbox.css'

function Checkbox({ children, checked, onChange,id }) {
    return (
        <div className="custom-checkbox">
            <label className='custom-checkbox__checkbox-label' htmlFor={`custom-checkbox__checkbox_${id}`}>
                <input className='custom-checkbox__checkbox' type='checkbox' checked={checked} id={`custom-checkbox__checkbox_${id}`} onChange={onChange} ></input>
                <span className='custom-checkbox__checkbox-custom'>
                </span>
            </label> -
            <h2 className='custom-checkbox__title'>{children}</h2>
        </div>
    )

};

export default Checkbox;