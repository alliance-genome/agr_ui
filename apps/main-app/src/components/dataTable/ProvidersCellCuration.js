import CommaSeparatedList from '../commaSeparatedList';

const removeDuplicates = (providers) => {
  const newArray = providers.map((provider) => [provider.dataProvider.abbreviation, provider]);
  const newMap = new Map(newArray);
  const iterator = newMap.values();
  const uniqueProviders = [...iterator];

  return uniqueProviders;
}

const ProvidersCellCuration = ({ providers }) => {
  const uniqueProviders = removeDuplicates(providers);

  return (
    <CommaSeparatedList listItemClassName='d-block'>
      {
        uniqueProviders.map(provider => {
          const { dataProvider, secondaryDataProvider } = provider;

          return (
              <span>
                {dataProvider.abbreviation}
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
