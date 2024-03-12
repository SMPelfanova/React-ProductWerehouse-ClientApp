import React from 'react'; 
import {Product} from '../types';

interface ProductItemProps{
    product: Product;
}

const ProductItem = ({ product } : ProductItemProps) => {
    return (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>&nbsp;{product.sizes.map(size=> 
                    (
                    <span>{size.name} </span>
                    )
                    )
                }</td>
             <td>
                <button type="button" className="btn btn-primary btn-sm">Edit</button>
                <button type="button" className="btn btn-danger btn-sm ml-2">Delete</button>
              </td>
            </tr>
          )};

export default ProductItem;

{/* <div className="col-lg-3 col-md-4 mb-4">
            <div className="card">
                <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <img src="/comming-soon.png" alt="Comming soon" className="img-fluid"  />
                <p className="card-text text-center">{product.title}</p>
                <p className="card-text">${product.price}</p>
                {
                <p>&nbsp;{product.sizes.map(size=> 
                    (
                    <span>{size.name} </span>
                    )
                    )
                }</p>
                    }
                </div>
            </div>
        </div> */}