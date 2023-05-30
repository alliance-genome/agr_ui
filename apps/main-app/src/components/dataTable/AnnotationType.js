
function AnnotationType({annotationType}) {
    if (annotationType) {
        return <>{annotationType.name}</>;
    }
    return <></>;
}

export default AnnotationType;