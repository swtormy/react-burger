import { jwtDecode } from 'jwt-decode';
import { TIngredientExtended, TJWTDecode } from './models';
import { DropTargetMonitor } from 'react-dnd';

export function getFileNameFromUrl(url: string): string {
    const regex = /\/([^\/]+)$/;
    const match = url.match(regex);
    return match ? match[1] : 'Неизвестная картинка';
}

export function countObjectsWithId(array: TIngredientExtended[], targetId: string): number {
    return array.filter(item => item._id === targetId).length;
}

export function getHovIndex(
    monitor: DropTargetMonitor,
    itemRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
): HTMLDivElement | undefined {
    const clientOffset = monitor.getClientOffset();
    return itemRefs.current.find(ref => {
        const boundingRect = ref?.getBoundingClientRect();
        return (
            clientOffset &&
            boundingRect &&
            clientOffset.x > boundingRect.left &&
            clientOffset.x < boundingRect.right &&
            clientOffset.y > boundingRect.top &&
            clientOffset.y < boundingRect.bottom
        );
    }) ?? undefined; 
}


export function checkTokenExpiry(token: string): boolean {
    if (!token) {
        return false;
    }
    const decoded = jwtDecode<TJWTDecode>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp ? decoded.exp > currentTime : false;
}