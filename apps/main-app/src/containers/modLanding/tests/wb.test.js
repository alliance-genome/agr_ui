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
// Title Section
//
const titleString = ReactDOMServer.renderToString(
  <Title
      bannerStyle={content.bannerStyle}
      titleBarStyle={content.titleBarStyle}
      logoImgSrc={content.logoImgSrc}
      modFullName={content.modFullName} />
)

// console.log(titleString);
test('check wormbase title', () => {
    expect(titleString).
    toMatch('<span class="titleBarText">WormBase</span>')
});



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


//
// Resources Section
//
const resourcesString = ReactDOMServer.renderToString(
    <Resources htmlContent={content.resources} sectionStyle={content.sectionStyle} />
);
test('check wormbase resource header', () => {
    expect(resourcesString).
    toMatch('<h2 class="sectionTitle">Resources</h2>')
});

// var patt = /<a[^>]*href=["']([^"']*)["']/g;
var pattResource = /<a[^>]*href=["']([^"']*)["']>(.*?)<\/a><\/p>/g;
var match;
// check the urls match for these
const checkUrlDictResource = {'https://parasite.wormbase.org/': 'WormBase ParaSite'};

// Just do a count for these
const checkLabelsResource = ['WormBase Guidelines for Nomenclature', 'WormBase Tools', 
                             'Submit Data to WormBase', 'WormBase User Guides', 
                             'WormBase Help Desk', 'WormBase ParaSite', 
                             '<i>Caenorhabditis</i> Genetics Center', 'WormBook', 
                             'WormAtlas', 'Nematode.net', 'Nematodes.org', 
                             'microPublication'];
let labelCounterResource = 0;
while (match=pattResource.exec(resourcesString)) {
    if (checkLabelsResource.includes(match[2])) {
        labelCounterResource += 1;
    }
    if (match[1] in checkUrlDictResource) {
        let test_name = checkUrlDictResource[match[1]];
        let obtained_name = match[2];
        test('check wormbase urls match', () => {
            expect(test_name).
            toMatch(obtained_name)
        });
    }
}
test('check wormbase set resources are there', () => {
    expect(labelCounterResource).
    toBe(checkLabelsResource.length)
});


