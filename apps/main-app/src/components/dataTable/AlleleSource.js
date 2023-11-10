import ExternalLink from "../ExternalLink";

function  AlleleSource({dataProvider}) {
    return dataProvider && (
        <ExternalLink href={dataProvider?.sourceOrganization?.homepageResourceDescriptorPage?.urlTemplate}>
            {dataProvider?.sourceOrganization?.abbreviation}
        </ExternalLink>);
}

export default AlleleSource;


