import React from 'react';
// import { Link } from 'react-router-dom';

const CovidInfoLink = () => {
  return (
    <div className='alert alert-danger m-0' role='alert'>
      <h4 className='alert-heading'>
        <i className='fa fa-exclamation-triangle' /> Community Action Alert
      </h4>
      <p className='mb-0'><a href="https://grants.nih.gov/grants/guide/notice-files/NOT-OD-21-182.html">Click here to Register</a> your support for Model Organism Databases</p>
    </div>
  );
};

export default CovidInfoLink;



// import React from 'react';
// import { Link } from 'react-router-dom';
//
// const CovidInfoLink = () => {
//   return (
//     <Link className='text-decoration-none' to='/coronavirus-resources'>
//       <div className='alert alert-danger m-0' role='alert'>
//         <h4 className='alert-heading'>
//           <i className='fa fa-exclamation-triangle' /> COVID-19 Information
//         </h4>
//         <p className='mb-0'>Click here for animal model information and resources for COVID-19 research</p>
//       </div>
//     </Link>
//   );
// };
//
// export default CovidInfoLink;
