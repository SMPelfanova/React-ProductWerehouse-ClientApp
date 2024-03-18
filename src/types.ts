export interface Product {
    id?: string;
    title: string;
    description: string;
    price: number;
    brandId: string;
    brand: Brand;
    groups: Group[],
    sizes: Size[]
} 

export interface Brand {
  id: string;
  name: string;
}


export interface Size {
  id: string;
  name: string;
  quantityInStock: number;
}

export interface Group {
  id: string;
  name: string;
}