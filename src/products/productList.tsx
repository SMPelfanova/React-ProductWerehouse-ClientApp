import React, {  useState, useEffect } from 'react';
import ProductItem from './productItem';
import {Product} from '../types';
import {Link} from 'react-router-dom';

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
        <div className="container pt-4">
            <div className="row">
            <Link to="/add" className="m-0 p-0"><button type="button" className="btn btn-primary">Add product</button></Link>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Sizes</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {
                        products.length === 0 ? (
                        <p>No products found</p>
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