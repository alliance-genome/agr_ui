import React from 'react';
import About from "./About";
import Resources from "./Resources";
import News from "./News";
import Meetings from "./Meetings";
import Bottom from "./Bottom";
import style from '../style.scss';

const MainWB = () => {
  return (
    <section>
      <About />
      <Resources />
      <Bottom />
    </section>
  );
}

export default MainWB;
