import CommaSeparatedList from '../commaSeparatedList';

const ProvidersCellCuration = ({ providers }) => {
  return (
    <CommaSeparatedList listItemClassName='d-block'>
      {
        providers.map(provider => {
          const { dataProvider, secondaryDataProvider } = provider;

          return (
              <span>
								{dataProvider}
                {
                  secondaryDataProvider &&
                    <>
                      <i> via </i>
                      {secondaryDataProvider}
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
