
interface ProductImage {
    _id: string;
    url: string;
  }
 interface Product {
    user: any;
    _id: string;
    title: string;
    description: string;
    price: number;
    images: ProductImage[];
  }
export interface ProductCardProps {
    item: Product;
    userId: string;
     onDeleteSuccess?: (id: string) => void;
  }
