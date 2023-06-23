import React from 'react';
import { CollapsibleList } from '../collapsibleList';
import ExternalLink from '../ExternalLink';
import { getResourceUrl } from './getResourceUrl';
import { Link } from 'react-router-dom';


function GeneticModifierLink(modifier) {
    switch(modifier?.type) {
        case 'Gene':
            if (modifier.geneSymbol) {
                return (
                    <Link to={`/gene/${modifier.curie}`} target='_blank'>
                        <span dangerouslySetInnerHTML={{__html: modifier.geneSymbol.displayText}}/>
                    </Link>);
            }
            break;
        case 'Allele':
            if (modifier.alleleSymbol) {
                return (
                    <Link to={`/allele/${modifier.curie}`}  target='_blank'>
                        <span dangerouslySetInnerHTML={{__html: modifier.alleleSymbol.displayText}}/>
                    </Link>);
            }
            break;
        case 'AffectedGenomicModel':
            let url = getResourceUrl(modifier.curie, modifier.type, modifier.subtype);
            if (url) {                
                return ( 
                    <ExternalLink href={url}>
                        <span dangerouslySetInnerHTML={{__html: modifier.curie}}/>
                    </ExternalLink>);
            }
            break;
        default:
            return <></>;
            break;
    }
    return <></>;
}

function GeneticModifiersCellCuration ({relation, modifiers}) {
    if(relation && modifiers?.length > 0){
        return (<dl>
            <React.Fragment>
                <dt>{relation.name?.replace(/_/, ' ')}:</dt>
                <dd>
                    <CollapsibleList collapsedSize={modifiers.length}>
                        {modifiers.map(GeneticModifierLink)}
                    </CollapsibleList>
                </dd>
            </React.Fragment>
        </dl>);
    }
    return <></>;
};

export default GeneticModifiersCellCuration;