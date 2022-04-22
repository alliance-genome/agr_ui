import React from 'react';
import { Link } from 'react-router-dom';

const DavidShawUserSurvey = () => {
  return (
    <a className='text-decoration-none' target='_blank' rel='noreferrer' href='https://www.surveymonkey.com/r/6H63GDB'>
      <div className='alert alert-success m-0' role='alert'>
        <h4 className='alert-heading'>
          Help us improve the Alliance resources by taking a very brief survey
        </h4>
        <p className='mb-0'>Click here for survey</p>
      </div>
    </a>
  );
};

export default DavidShawUserSurvey;
