import React from 'react';
import style from '../style.scss';

const About = () => {
  return (
    <div className={style.section}>
      <h2 className={style.sectionTitle}>About</h2>
      <p>
        WormBase is an international consortium of biologists and computer scientists providing the research community
        with accurate, current, accessible information concerning the genetics, genomics and biology of
        <i>C. elegans</i> and related nematodes. Founded in 2000, the WormBase Consortium is led by Paul Sternberg
        (CalTech), Matt Berriman (The Wellcome Trust Sanger Institute), Kevin Howe (EBI), and Lincoln Stein (The
        Ontario Institute for Cancer Research).
      </p>
      <p>
        WormBase is a founding member of the Alliance of Genome Resources Project.
      </p>
      <p>
        <b>To visit Wormbase's main website click <a href="https://wormbase.org"> here</a></b>.
      </p>
    </div>
  );
}

export default About;
