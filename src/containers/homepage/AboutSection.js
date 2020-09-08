import React from 'react';

import style from './style.scss';

const AboutSection = () => {
  return (
    <section className={style.section}>
      <div className={style.contentContainer}>
        <div className='row'>
          <div className='col-md-8'>
            <h1>What is the Alliance of Genome Resources?</h1>
            <p className='lead'>
              A consortium of 6 model organism databases (MODs) and the Gene
              Ontology (GO) Consortium whose goal is to provide an integrated view
              of their data to all biologists, clinicians and other interested
              parties.
            </p>

            <p className='lead'>
              The primary mission of the Alliance of Genome Resources (the Alliance)
              is to develop and maintain sustainable genome information resources
              that facilitate the use of diverse model organisms in understanding
              the genetic and genomic basis of human biology, health and disease.
              This understanding is fundamental for advancing genome biology
              research and for translating human genome data into clinical utility.
            </p>
          </div>
          <div className='col-md-4 border-left'>
            <a className='text-decoration-none' href='https://groups.google.com/a/alliancegenome.org/g/community'>
              <div className='alert alert-primary'>
                <h4 className='alert-heading'>
                  <i className="fa fa-comments" aria-hidden="true" /> Join the Alliance User Community
                </h4>
                <p>
                  Click here to access official announcements, ask questions, and view discussions with other Alliance members.
                </p>
                <p className='mb-0'>
                  Join today to keep up-to-date.
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
