export interface ProductImage {
    _id: string;
    url: string;
  }
  export interface Product {
    user: any;
    data: any;
    _id: string;
    title: string;
    description: string;
    price: number;
    images: ProductImage[];
  }
