import React, { useEffect, useState } from 'react'; 
import { useParams } from 'react-router-dom';
import { ProductDetail } from '../types';
import {Link} from 'react-router-dom';
import {fetchProductDetails} from '../services/productService'

const ProductDetails = () =>{
    const { id} = useParams<{ id?:string }>();
    const [product, setProduct] = useState<ProductDetail | null>(null);
   
    useEffect(() => {
        fetchInitialData();
    }, [id]);

    const fetchInitialData = async () => {
        if (id) { 
            try {
                const productDetails = await fetchProductDetails(id);
                setProduct(productDetails);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container p-5 pt-2">
        <Link to='/' className='mb-2'>&lt;&lt; Back to product list</Link>
        <div className="row pt-3">
            <div className="col-md-6">
                <img src="/comming-soon.png" className="img-fluid" onError={(e) => console.log('Image Load Error', e)} />
            </div>
            <div className="col-md-6">
                <h2>{product.title}</h2>
                <p><strong>Price:</strong> ${product.price}</p>
                {product.brand && <p><strong>Brand:</strong> {product.brand}</p>}
                <p><strong>Description:</strong> {product.description}</p>
                {product.groups.length !== 0 &&  <p><strong>Groups:</strong> {product.groups.map(group => group.name).join(', ')}</p>}
                {product.sizes.length !== 0 &&  <p><strong>Sizes:</strong></p>}
                {product.sizes.length !== 0 &&  product.sizes.map(size => (
                    size.quantityInStock != 0 && (
                    <div key={size.id}>{size.name}: {size.quantityInStock} </div>
                    )
                ))}
            </div>
        </div>
    </div>
    );
};


export default ProductDetails;