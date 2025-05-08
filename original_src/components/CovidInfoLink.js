import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

const CovidInfoLink = () => {
  return (
    <Link className='text-decoration-none' to='/coronavirus-resources'>
      <div className='alert alert-danger m-0' role='alert'>
        <h4 className='alert-heading'>
          <FontAwesomeIcon icon={faTriangleExclamation} /> COVID-19 Information
        </h4>
        <p className='mb-0'>Click here for animal model information and resources for COVID-19 research</p>
      </div>
    </Link>
  );
};

export default CovidInfoLink;
