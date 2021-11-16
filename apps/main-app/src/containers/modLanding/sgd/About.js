import React from 'react';
import style from '../style.scss';

const About = () => {
  return (
    <div className={style.section}>
      <h2 className={style.sectionTitle}>About</h2>
      <p>
        The Saccharomyces Genome Database (SGD) provides comprehensive integrated biological information for the budding
        yeast <i>Saccharomyces cerevisiae</i> along with search and analysis tools to explore these data, enabling the
        discovery of functional relationships between sequence and gene products in fungi and higher organisms.
      </p>
      <p>
        SGD is a founding member of the Alliance of Genome Resources Project.
      </p>
      <p>
        <b>To visit SGD click <a href="https://www.yeastgenome.org"> here</a></b>.
      </p>
    </div>
  );
}

export default About;
