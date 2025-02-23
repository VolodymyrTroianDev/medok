export interface ProductEntity {
  apiculture: Category;
  tea: Category;
  sweetsGifts: Category;
  beekeepingProducts: Category;
}
export interface Quantity {
  product: number;
  price: number;
}
export interface ProductItem {
  uid: string;
  img: string;
  price: number;
  name: string;
  completeSet: string;
  capacity?: string;
  description?: string;
  compound?: string;
  carousel?: string[];
}

export interface Category {
  slag: string;
  name: string;
  items: ProductItem[];
}
export interface StateProducts {
  locale: string;
  products: ProductEntity;
}
