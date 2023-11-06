export function getFileNameFromUrl(url) {
    const regex = /\/([^\/]+)$/;
    const match = url.match(regex);
    return match ? match[1] : 'Неизвестная картинка';
}

export function countObjectsWithId(array, targetId) {
    return array.filter(item => item._id === targetId).length;
}

export function getHovIndex(monitor, itemRefs) {
    const clientOffset = monitor.getClientOffset();
    return itemRefs.current.find(ref => {
        const boundingRect = ref.getBoundingClientRect();
        return clientOffset.x > boundingRect.left &&
            clientOffset.x < boundingRect.right &&
            clientOffset.y > boundingRect.top &&
            clientOffset.y < boundingRect.bottom;
    });
}