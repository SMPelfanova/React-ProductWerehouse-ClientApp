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
      <tr key={product.id} className=''>
        <td className="align-top pb-3">{index}</td>
        <td className="align-top pb-3">{product.title}</td>
        <td className="align-top pb-3">${product.price}</td>
        <td className="align-top pb-3">{product.sizes.map(size=> 
              (<div>{size.name}: {size.quantityInStock} </div>))
          }</td>
        <td className="align-top text-end text-white  pb-3">
          <Link to={`/product/${product.id}`} className="btn btn-info text-white btn-sm m-1"><i className="fas fa-info-circle"></i>&nbsp;Info</Link>
          <Link to={`/edit/${product.id}`} className="btn btn-warning text-white  btn-sm m-1"><i className="fas fa-edit"></i>&nbsp;Edit</Link>
          <button onClick={()=> setModalOpen(true)} type="button" className="btn btn-danger btn-icon-split btn-sm m-1">  
                <i className="fas fa-trash"></i>&nbsp;Delete
           </button>
        </td>
      </tr>
      <ConfirmationDialog isOpen={isModalOpen} onClosed={() => setModalOpen(false)} onConfirm={() => onDeleteProduct(product.id)} />
    </>
    )};

export default ProductItem;