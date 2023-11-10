
function AnnotationType({annotationType}) {
    if (annotationType) {
        return <>{annotationType.name.replaceAll('_', ' ')}</>;
    }
    return <></>;
}

export default AnnotationType;