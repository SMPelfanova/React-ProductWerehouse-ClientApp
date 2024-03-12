export interface Product {
    id: string;
    title: string;
    price: number;
    brand: string;
    sizes: [
      {
        id: number;
        name: string;
        quantityInStock: number;
      }
    ]
} 