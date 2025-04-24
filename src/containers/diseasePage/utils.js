export const formatLink = (link) => {
    return link
        .replace("url:www", "http://www")
        .replace("url:", "")
        .replace("URL:", "")
        .replace("\\:", ":")
        .replace('\\', '');
}