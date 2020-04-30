import React from 'react';

import style from './style.scss';

const AboutSection = () => {
  return (
    <section className={style.section}>
      <div className={style.contentContainer}>
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
    </section>
  );
};

export default AboutSection;
