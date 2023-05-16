
function AnnotationType(annotationType) {
    if (annotationType) {
        return annotationType.name &&  '';
    }
    return null;
}

export default AnnotationType;