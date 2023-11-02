import ExternalLink from "../ExternalLink";

function ProviderCellCuration({ provider }) {
    if(!provider) return null;

    const { dataProvider, secondaryDataProvider } = provider;

    return (
        <span>
            <ExternalLink href={dataProvider.url} key={dataProvider.id} title={dataProvider.abbreviation}>
                {dataProvider.abbreviation}
            </ExternalLink>
            {
                secondaryDataProvider &&
                <>
                    <i> via </i>
                    <ExternalLink href={secondaryDataProvider.url} key={secondaryDataProvider.id} title={secondaryDataProvider.abbreviation}>
                        {secondaryDataProvider.abbreviation}
                    </ExternalLink>
                </>
            }
        </span>
    )
}

export default ProviderCellCuration;
