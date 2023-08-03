function AnnotationSource({dataProvider}) {
    console.log(dataProvider);
    if(dataProvider) {
        return <>{dataProvider.abbreviation}</>;
    }
    return <></>;
}

export default AnnotationSource;
