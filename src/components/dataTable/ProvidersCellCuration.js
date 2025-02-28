import CommaSeparatedList from '../commaSeparatedList';
import ProviderCellCuration from './ProviderCellCuration';
import { removeDuplicates } from './utils';

const ProvidersCellCuration = ({ rowId, providers }) => {
  if(!providers) return null;

  const uniqueProviders = removeDuplicates(providers, (provider) => provider.dataProvider.abbreviation);

  return (
    <CommaSeparatedList listItemClassName='d-block'>
      {
        uniqueProviders?.map(provider => {
          return <ProviderCellCuration key={provider.dataProvider.abbreviation} provider={provider} />
        })
      }
    </CommaSeparatedList>
  );
};

export default ProvidersCellCuration;
