import React from 'react';
import ReactDOMServer from 'react-dom/server';
//import PropTypes from 'prop-types';
//import style from './style.scss';
import {MODContent} from '../content';
import About from "../About";
//import LinkToMOD from "./LinkToMOD";
import Title from "../Title";
//import News from "./News";
import Resources from "../Resources";
import FooterAlt from "../FooterAlt";

const content = MODContent['wormbase'];

//
// About section
//
const aboutString = ReactDOMServer.renderToString(
    <About
        htmlContent={content.about}
        modVisitButtonText={content.modVisitButtonText}
        linkToMod={content.link}
        sectionStyle={content.sectionStyle}
        titleBarStyle={content.titleBarStyle} />
  );
  test('check wormbase about text', () => {
    expect(aboutString).
    toMatch('WormBase is a founding member of the Alliance of Genome Resources Project')
  });

 test('check wormbase about button', () => {
    expect(aboutString).
    toMatch('<a href="https://wormbase.org"><button')
 });
// console.log(aboutString);




