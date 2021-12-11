import React from 'react';
import ReactDOMServer from 'react-dom/server';
//import PropTypes from 'prop-types';
//import style from './style.scss';
import {MODContent} from '../content';
import About from "../About";
//import LinkToMOD from "./LinkToMOD";
import Title from "../Title";
//import News from "./News";
import Resources from "../Resources"

const content = MODContent['wb'];

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
        modShortName={content.modShortName}
        linkToMod={content.link}
        sectionStyle={content.sectionStyle} />
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
//console.log(resourcesString);
test('check wormbase resource header', () => { 
    expect(resourcesString).
    toMatch('<h2 class="sectionTitle">Resources</h2>')
});

//var patt = /<a[^>]*href=["']([^"']*)["']/g;
var patt = /<a[^>]*href=["']([^"']*)["']>(.*?)</g;
var match;
// check the urls match for these
const checkUrlDict = {'https://parasite.wormbase.org/': 'ParaSite'};

// Just do a count for these
const checkLabels = ['Nomenclature', 'Tools', 'Submit data to WormBase', 'User guides',
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
