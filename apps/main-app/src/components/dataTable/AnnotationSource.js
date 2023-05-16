function AnnotationSource(dataProvider) {
    if(dataProvider) {
        return dataProvider.abbreviation && '';
    }
    return null;
}

export default AnnotationSource;
