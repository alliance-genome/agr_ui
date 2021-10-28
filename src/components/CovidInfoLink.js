import React from 'react';
import { Link } from 'react-router-dom';

const CovidInfoLink = () => {
  return (
    <Link className='text-decoration-none' to='/coronavirus-resources'>
      <div className='alert alert-danger m-0' role='alert'>
        <h4 className='alert-heading'>
          <i className='fa fa-exclamation-triangle' /> COVID-19 Information
        </h4>
        <p className='mb-0'>Click here for animal model information and resources for COVID-19 research</p>
      </div>
    </Link>
  );
};

export default CovidInfoLink;
