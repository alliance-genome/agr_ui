import React from 'react';
import { CollapsibleList } from '../collapsibleList';
import ExternalLink from '../ExternalLink';
import { getResourceUrl } from './getResourceUrl';


function GeneticModifier(modifier) {
    let url = getResourceUrl(modifier.curie, modifier.type, modifier.subtype);
    return <ExternalLink href={url}>{modifier.curie}</ExternalLink>;
}

function GeneticModifiersCellCuration ({relation, modifiers}) {
    if(relation && modifiers?.length > 0){
        return (<dl>
            <React.Fragment>
                <dt>{relation.name?.replace(/_/, ' ')}:</dt>
                <dd>
                    <CollapsibleList collapsedSize={modifiers.length}>
                        {modifiers.map(GeneticModifier)}
                    </CollapsibleList>
                </dd>
            </React.Fragment>
        </dl>);
    }
    return <></>;
};

export default GeneticModifiersCellCuration;