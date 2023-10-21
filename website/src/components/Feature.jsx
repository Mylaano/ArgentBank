import PropTypes from 'prop-types';

import '../styles/Feature/Feature.css';

function Feature({ title, text, imageSrc, imageAlt }) {
    return ( 
        <div className="feature-item">
            <img src={imageSrc} alt={imageAlt} className="feature-icon" />
            <h3 className="feature-item-title">{title}</h3>
            <p>{text}</p>
        </div>
    );
}

Feature.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    imageAlt: PropTypes.string.isRequired
};

export default Feature;