import React, { useEffect, useState } from 'react'; 
import {Product} from '../types';
import { error } from 'console';
import ConfirmationDialog from './confirmationDialog';

interface ProductItemProps{
    product: Product;
    onDelete: () => void;
}

const ProductItem = ({ product, onDelete } : ProductItemProps) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const deleteProduct = async(id?:string) =>{
    try{
      await fetch("http://localhost:5068/api/products/" + id, {method: 'DELETE'});
      onDelete();
    }
    catch(error){
      console.error("Error deleting product", error);
    }
  } 
  
  return (
    <>
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
          <button type="button" className="btn btn-primary btn-sm mr-2">Edit</button>&nbsp;
          <button onClick={()=> setModalOpen(true)} type="button" className="btn btn-danger btn-sm ml-2 pl-2">Delete</button>
        </td>
      </tr>
      <ConfirmationDialog isOpen={isModalOpen} onClosed={() => setModalOpen(false)} onConfirm={() => deleteProduct(product.id)} />
    </>
    )};

export default ProductItem;