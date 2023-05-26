function AnnotationSource(dataProvider) {
    if(dataProvider) {
        return <>{dataProvider.abbreviation}</>;
    }
    return <></>;
}

export default AnnotationSource;
