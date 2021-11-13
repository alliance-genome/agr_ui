import React from 'react';
import style from '../style.scss';

const About = () => {
  return (
    <div className={style.section}>
      <h2 className={style.sectionTitle}>About</h2>
      <p>
        The Zebrafish Information Network (ZFIN) is the database of genetic and genomic\
        data for the zebrafish (Danio rerio) as a model organism. ZFIN provides a wide array of
        expertly curated, organized and cross-referenced Zebrafish research data
      </p>
      <p>
        ZFIN is a founding member of the Alliance of Genome Resources Project.
      </p>
      <p>
        <b>To visit ZFIN main website click <a href="https://www.zfin.org"> here</a></b>.
      </p>
    </div>
  );
}

export default About;
