import React from 'react';
import { CollapsibleList } from '../collapsibleList';
import ExternalLink from '../ExternalLink.jsx';
import { getResourceUrl } from './getResourceUrl.jsx';
import { Link } from 'react-router-dom';
import { getIdentifier } from './utils.jsx';


function GeneticModifierLink(modifier) {
    const identifier = getIdentifier(modifier);
    switch(modifier?.type) {
        case 'Gene':
            if (modifier.geneSymbol) {
                return (
                    <Link to={`/gene/${identifier}`} target='_blank'>
                        <span dangerouslySetInnerHTML={{__html: modifier.geneSymbol.displayText}}/>
                    </Link>);
            }
            break;
        case 'Allele':
            if (modifier.alleleSymbol) {
                return (
                    <Link to={`/allele/${identifier}`}  target='_blank'>
                        <span dangerouslySetInnerHTML={{__html: modifier.alleleSymbol.displayText}}/>
                    </Link>);
            }
            break;
        case 'AffectedGenomicModel':
            let url = getResourceUrl({ identifier, type: modifier.type, subtype: modifier.subtype});
            if (url && modifier.name) {
                return (
                    <ExternalLink href={url}>
                        <span dangerouslySetInnerHTML={{__html: modifier.name}}/>
                    </ExternalLink>);
            }
            break;
        default:
            return <></>;
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
