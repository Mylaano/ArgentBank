import PropTypes from 'prop-types';

import '../styles/InputLabel/InputLabel.css';

function InputLabel({ type, id, autoComplete, defaultValue, onChange, labelName, required, disabled }) {
    return (
        <div className="input-wrapper">
            <label htmlFor={id}>{labelName}</label>
            <input 
                type={type} 
                id={id} 
                defaultValue={defaultValue} 
                onChange={onChange} 
                autoComplete={autoComplete}
                disabled={disabled}
                required={required}
            />
        </div>
    );
}

InputLabel.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    labelName: PropTypes.string.isRequired,
    autoComplete: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    disabled: PropTypes.bool
};

export default InputLabel;