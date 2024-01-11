export interface IProductData {
  width: number;
  height: number;
  offsetLeft: number;
  offsetTop: number;
  start: number;
  duration: number;
  player_width: number;
  player_height: number;
  id: number;
  product_id: number;
  name: string;
  price: number;
  currency: string;
  image: string;
}

export interface IProduct {
  id: number;
  product_type_id: number;
  category_id: number;
  name: string;
  description: string;
  price: number;
  weight: number;
  size_guide_image_url: string;
  variants: IProductVariants[];
  images: IProductImage[];
  quantity: number;
}

export interface IProductVariants {
  size_id: number;
  sku: string;
  quantity: number;
  id?: number;
}

export interface IProductImage {
  id: number | string;
  url: string;
  position: number;
  file: File | null;
}
export type IVideoEventCard = {
  id: number | null;
  product_id: number;
  image: string;
  price: number;
  name: string;
  start: number | null;
  duration: number | null;
  width: number | null;
  height: number | null;
  player_width: number | null;
  player_height: number | null;
  offsetTop: number | null;
  offsetLeft: number | null;
};
export interface IResizableData {
  elementId: number;
  offsetLeft: number;
  width: number;
  height: number;
  parentOffset: { width: number; height: number };
}
