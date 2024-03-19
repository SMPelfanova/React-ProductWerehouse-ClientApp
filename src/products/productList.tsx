import React, {  useState, useEffect } from 'react';
import ProductItem from './productItem';
import {Product} from '../types';

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () =>{
        try{
            const response = await fetch("http://localhost:5068/api/products");
            if(!response.ok){
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            const sortedProducts = data.sort((a: Product, b: Product) => a.title.localeCompare(b.title));
            setProducts(sortedProducts);
        }
        catch(error){
            console.error("Error fetching products", error);
        }
    }

    return (
        <div className="container p-5 pt-3">
            <div className="row">
                <table className="table mx-auto">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Sizes</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        products.length === 0 ? (
                        <tr>
                            <td colSpan={5}>No products found</td>
                        </tr>
                    ) : (
                        products.map((product, index) => (
                            <ProductItem key={product.id} index={index+1} product={product} onDelete={fetchProducts} />
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;