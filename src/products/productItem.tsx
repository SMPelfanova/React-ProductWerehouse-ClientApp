import React, { useState } from 'react'; 
import {Product} from '../types';
import ConfirmationDialog from './confirmationDialog';
import {Link} from 'react-router-dom';
import { deleteProduct } from '../services/productService';

interface ProductItemProps{
    index: number;
    product: Product;
    onDelete: () => void;
}

const ProductItem = ({ index, product, onDelete } : ProductItemProps) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const onDeleteProduct = async (id?: string) =>{
    await deleteProduct(id);
    onDelete();
  };
  
  return (
    <>
      <tr key={product.id}>
        <td className="align-top pb-3">{index}</td>
        <td className="align-top pb-3">{product.title}</td>
        <td className="align-top pb-3">${product.price}</td>
        <td className="align-top pb-3">{product.sizes.map(size=> 
              (<div>{size.name}: {size.quantityInStock} </div>))
          }</td>
        <td className="align-top text-end pb-3">
          <Link to={`/product/${product.id}`} className="btn btn-primary btn-sm m-1">View</Link>
          <Link to={`/edit/${product.id}`} className="btn btn-primary btn-sm m-1">Edit</Link>
          <button onClick={()=> setModalOpen(true)} type="button" className="btn btn-danger btn-sm m-1">Delete</button>
        </td>
      </tr>
      <ConfirmationDialog isOpen={isModalOpen} onClosed={() => setModalOpen(false)} onConfirm={() => onDeleteProduct(product.id)} />
    </>
    )};

export default ProductItem;