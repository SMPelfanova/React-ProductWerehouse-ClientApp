export interface Product {
    id: number;
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