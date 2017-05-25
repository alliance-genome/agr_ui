import React from 'react';

// hack around margin issue in the gene-ontology-ribbon
// refer to issue: https://github.com/geneontology/ribbon/issues/13

export default function fixRibbonPlacement(RibbonComponent) {
  return (props) => {
    const wrapperStyle = {
      position: 'relative',
      height: '10em'
    };
    const contentStyle = {
      position: 'absolute',
      bottom: 0,
      left: '-18pt'
    };
    return (
      <div style={wrapperStyle}>
        <div style={contentStyle}>
          <RibbonComponent {...props} />
        </div>
      </div>
    );
  };
}
