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

//console.log(titleString);
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
//console.log(aboutString);


//
// Resources Section
//
const resourcesString = ReactDOMServer.renderToString(
    <Resources htmlContent={content.resources} sectionStyle={content.sectionStyle} />
);
console.log(resourcesString);
test('check wormbase resource header', () => {
    expect(resourcesString).
    toMatch('<h2 class="sectionTitle">Resources</h2>')
});

//var patt = /<a[^>]*href=["']([^"']*)["']/g;
var patt = /<a[^>]*href=["']([^"']*)["']>(.*?)</g;
var match;
// check the urls match for these
let checkUrlDict = {'https://parasite.wormbase.org/': 'ParaSite'};

// Just do a count for these
let checkLabels = ['Nomenclature', 'Tools', 'Submit data to WormBase', 'User guides',
                     'Help Desk', 'Caenorhabditis Genetics Center', 'WormBook', 'WormAtlas',
                     'Nematode.net', 'Nematodes.org', 'Micropublication', 'ParaSite'];
let labelCounter = 0;
while(match=patt.exec(resourcesString)){
    console.log(match[1] + " has name " + match[2] + ' ' + labelCounter);
    if (checkLabels.includes(match[2])){
        labelCounter += 1;
    }
    else{
        console.log('Undefined label ' + match[2]);
    }
    if(match[1] in checkUrlDict){
        console.log("INCHECK " + match[1] + " has name " + match[2]);
        let test_name = checkUrlDict[match[1]];
        let obtained_name = match[2];
        console.log(test_name + " " + obtained_name);
        test('check wormbase urls match', () => {
            expect(test_name).
            toMatch(obtained_name)
        });
    }
}
test('check wormbase set resources are there', () => {
        expect(labelCounter).
        toBe(checkLabels.length)
});


//
// Footer Section
//
const footerString = ReactDOMServer.renderToString(
    <FooterAlt  link={content.link}
                links={content.footer}
                note={content.footerNote}
                footerStyle={content.footerStyle}
                logoImgSrc={content.logoImgSrc}
                titleBarStyle={content.titleBarStyle}
                modShortName={content.modShortName}/>
);

test('check wormbase footer', () => {
    expect(footerString).
    toMatch('WormBase')
});

// check the urls match for these
checkUrlDict = {'https://wormbase.org/about/release_schedule#01--10': 'Release Schedule'};

// Just do a count for these
checkLabels = ['Nomenclature', 'Tools', 'Citing WormBase', 'Release Schedule','How To Cite',
                     'Copyright', 'FAQ', 'Forum', 'Worm Labs', 'Developer Documentation', 'FTP Downloads'];
labelCounter = 0;
while(match=patt.exec(footerString)){
    console.log(match[1] + " has name " + match[2] + ' ' + labelCounter);
    if (checkLabels.includes(match[2])){
        labelCounter += 1;
    }
    else{
        console.log('Undefined label ' + match[2]);
    }
    if(match[1] in checkUrlDict){
        console.log("INCHECK " + match[1] + " has name " + match[2]);
        let test_name = checkUrlDict[match[1]];
        let obtained_name = match[2];
        console.log(test_name + " " + obtained_name);
        test('check wormbase footer urls match', () => {
            expect(test_name).
            toMatch(obtained_name)
        });
    }
}
test('check wormbase footers are there', () => {
        expect(labelCounter).
        toBe(checkLabels.length)
});

test('check wormbase footer note', () => {
    expect(footerString).
    toMatch('WormBase is supported by grant #24 HG002223')
});
