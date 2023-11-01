export function getFileNameFromUrl(url) {
    const regex = /\/([^\/]+)$/;
    const match = url.match(regex);
    return match ? match[1] : 'Неизвестная картинка';
}