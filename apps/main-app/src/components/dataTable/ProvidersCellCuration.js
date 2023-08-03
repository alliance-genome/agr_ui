import CommaSeparatedList from '../commaSeparatedList';
import { buildSourceUrl } from './utils';
import ExternalLink from '../ExternalLink';

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
  const url = buildSourceUrl(providers[0].dataProvider);


  return (
    <CommaSeparatedList listItemClassName='d-block'>
      {
        uniqueProviders.map(provider => {
          const { dataProvider, secondaryDataProvider } = provider;
          return (
              <span>
                {/* todo: better key and title */}
                <ExternalLink href={url} key={url} title={url}>{dataProvider?.sourceOrganization?.abbreviation}</ExternalLink>;
                {
                  secondaryDataProvider &&
                    <>
                      <i> via </i>
                      {secondaryDataProvider.abbreviation}
                    </>
                }
              </span>
          )

        })
      }
    </CommaSeparatedList>
  );
};

export default ProvidersCellCuration;
