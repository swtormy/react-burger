export function getFileNameFromUrl(url) {
    const regex = /\/([^\/]+)$/;
    const match = url.match(regex);
    return match ? match[1] : 'Неизвестная картинка';
}

export function countObjectsWithId(array, targetId) {
    return array.filter(item => item._id === targetId).length;
}

