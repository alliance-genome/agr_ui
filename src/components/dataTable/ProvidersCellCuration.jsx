import CommaSeparatedList from '../commaSeparatedList.jsx';
import ProviderCellCuration from './ProviderCellCuration.jsx';
import { removeDuplicates } from './utils.jsx';

const ProvidersCellCuration = ({ rowId, providers }) => {
  if (!providers) return null;

  const uniqueProviders = removeDuplicates(providers, (provider) => provider.dataProvider.abbreviation);

  return (
    <CommaSeparatedList listItemClassName="d-block">
      {uniqueProviders?.map((provider) => {
        return <ProviderCellCuration key={provider.dataProvider.abbreviation} provider={provider} />;
      })}
    </CommaSeparatedList>
  );
};

export default ProvidersCellCuration;
