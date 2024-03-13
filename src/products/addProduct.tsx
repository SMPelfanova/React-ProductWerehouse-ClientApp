import React,{useState} from 'react'; 
import {Product} from '../types';
import { useNavigate } from 'react-router-dom';

const AddProductForm = () => {
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product>({
        id: '',
        title: '',
        price: 0,
        sizes: [
            { id:0, name:'', quantityInStock: 0 }
        ],
        brand: ''
      });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
          ...prevProduct,
          [name]: e.target.value
        }));
      };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
        const response = await fetch('http://localhost:5068/api/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
          });
           if (response.ok) {
        console.log('Product added successfully!');
        setProduct({
          id: '',
          title: '',
          price: 0,
          brand: '',
          sizes: [   {id:0,name:'',quantityInStock: 0}]
        });
        navigate("/");
      } else {
        console.error('Failed to add product:', response.statusText);
      }
    }
    catch (error) {
      console.error('Error:', error);
    }
    };

    return (
        <div className="container pt-4">
            <div className="row">
                <form onSubmit={handleSubmit}>
                    <h1>Add product</h1>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" name="title" className="form-control" value={product.title} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Price:</label>
                        <input type="number" name="price"  className="form-control" value={product.price} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Brand:</label>
                        <input type="text" name="brand" className="form-control"  value={product.brand} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary  mt-4">Submit</button>
                </form>
            </div>
        </div>
)}

export default AddProductForm;