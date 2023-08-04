import CommaSeparatedList from '../commaSeparatedList';
import { buildProvidersWithUrl } from './utils';
import ExternalLink from '../ExternalLink';
import ProviderCellCuration from './ProviderCellCuration';

const removeDuplicates = (providers) => {
  const newArray = providers.map((provider) => [provider.dataProvider.abbreviation, provider]);
  const newMap = new Map(newArray);
  const iterator = newMap.values();
  const uniqueProviders = [...iterator];

  return uniqueProviders;
}

const ProvidersCellCuration = ({ providers }) => {
  if(!providers) return null;

  const uniqueProviders = removeDuplicates(providers);

  return (
    <CommaSeparatedList listItemClassName='d-block'>
      {
        uniqueProviders?.map(provider => {
          return <ProviderCellCuration provider={provider} />
        })
      }
    </CommaSeparatedList>
  );
};

export default ProvidersCellCuration;
