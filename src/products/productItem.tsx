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
        <td>{index}</td>
        <td>{product.title}</td>
        <td>{product.price}</td>
        <td>&nbsp;{product.sizes.map(size=> 
              (
              <span>{size.name} </span>
              )
              )
          }</td>
        <td>
          <Link to={`/edit/${product.id}`} className="btn btn-primary btn-sm mr-2">Edit</Link>
          <Link to={`/product/${product.id}`} className="btn btn-primary btn-sm mr-2">View Details</Link>
          <button onClick={()=> setModalOpen(true)} type="button" className="btn btn-danger btn-sm ml-2 pl-2">Delete</button>
        </td>
      </tr>
      <ConfirmationDialog isOpen={isModalOpen} onClosed={() => setModalOpen(false)} onConfirm={() => onDeleteProduct(product.id)} />
    </>
    )};

export default ProductItem;