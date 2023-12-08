
export type TIngredientExtended = {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
    position?: string,
    instanceId?: string,
    orderIndex?: number,
};

export type TDraggableElement = {
    isHover: boolean,
    ing: TIngredientExtended,
    handleDeleteItem: (item: TIngredientExtended) => void,
    setHoveredId: React.Dispatch<React.SetStateAction<number | null>>,
}

export type TFormValues = {
    [key: string]: string;
}


export type TResponseData = {
    success: boolean;
    [key: string]: any;
}

export type TUserProfileData = {
    [key: string]: string;
}

export type TErrorResponseData = Pick<TResponseData, "success"> & {
    message: string;
}

export type TRequestOptions = {
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    headers?: Record<string, string>;
    body?: string;
}

export type TJWTDecode = {
    id: string,
    iat: number,
    exp: number
}