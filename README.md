# GenomeFeatureComponent

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Describe GenomeFeatureComponent here.

[build-badge]: https://img.shields.io/travis/GMOD/GenomeFeatureComponent/master.png?style=flat-square
[build]: https://travis-ci.org/GMOD/GenomeFeatureComponent

[npm-badge]: https://img.shields.io/npm/v/@gmod/genomefeaturecomponent.png?style=flat-square
[npm]: https://www.npmjs.com/package/@gmod/genomefeaturecomponent

[coveralls-badge]: https://img.shields.io/coveralls/GMOD/GenomeFeatureComponent/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/GMOD/GenomeFeatureComponent


Instructions
============

Make sure you have node 8 or better

    npm install

    npm start


View at [http://localhost:3000](http://localhost:3000).


Works by accessing data from an [Apollo server](https://github.com/gmod/apollo).

E.g., http://someserver.org/apollo/track/Honeybee/Official%20Gene%20Set%20v3.2/Group1.1/GB42168-RA.json



```
[{"strand":1,"children":[[{"phase":0,"strand":1,"fmin":329332,"type":"CDS","fmax":329459},{"phase":2,"strand":1,"fmin":329849,"type":"CDS","fmax":330082},{"phase":0,"strand":1,"fmin":330165,"type":"CDS","fmax":330301},{"phase":2,"strand":1,"fmin":330375,"type":"CDS","fmax":330416},{"strand":1,"fmin":329332,"type":"exon","fmax":329459},{"strand":1,"fmin":329849,"type":"exon","fmax":330082},{"strand":1,"fmin":330165,"type":"exon","fmax":330301},{"strand":1,"fmin":330375,"type":"exon","fmax":330416}]],"name":"GB42168-RA","id":"http://demo.genomearchitect.org/Apollo2/track/Honeybee/Official Gene Set v3.2/Group1.1/GB42168-RA.json","fmin":329332,"type":"mRNA","fmax":330416,"selected":true}]
```

Example Usage
=============

From an example ReactJS environment (also working in VueJS and demo is in VanillaJS).  Height is calculated on the fly for 'global' isoform tracks. 

```
    let transcriptTypes = getTranscriptTypes();
    const configGlobal = {
      'locale': 'global',
      'chromosome': chromosome,
      'start': fmin,
      'end': fmax,
      'transcriptTypes':transcriptTypes,
      'tracks': [
        {
          'id': 1,
          'genome': this.props.species,
          'type': 'isoform',
          'url': [
            this.trackDataUrl,
            '/All%20Genes/',
            `.json${nameSuffixString}`
          ]
        },
      ]
    };
    new GenomeFeatureViewer(configGlobal, 'genome-feature', 900, undefined);
```

```
<div id='genome-feature'></div>
```

Result:

![Example 1](images/ExampleIsoform1.png)



Long Term Goal
====

The idea is that we can have multiple interactive tracks.

This is an example of how they might be used.  The controls / filters can be used to interact and the details section could be part of that interaction.

The top genomic view is the "overview", consisting of a (very sad) variant track and an isoform track, though it could be any number.
The red arrow at top indicates a selected region that is linked to the scrollable track at the bottom through a separate eventing model.



![alt text](images/Version1Output.png "Logo Title Text 1")
