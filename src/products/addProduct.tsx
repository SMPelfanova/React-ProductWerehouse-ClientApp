import React,{useEffect, useState} from 'react'; 
import {Product, Brand, Group, Size} from '../types';
import { useNavigate } from 'react-router-dom';

interface AddProductFormProps{
  isEditMode:boolean;
  initialProduct?:Product;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ isEditMode, initialProduct }) => {
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product>(()=> {
      if (isEditMode && initialProduct) {
        return initialProduct;
      }
      return{
        title: '',
        description: '',
        price: 0,
        sizes: [],
        brandId: '',
        brand: { id:'', name:''},
        groups: []
      };
      });

    const [brands, setBrands] = useState<Brand[]>([]);
    const [gorups, setGroups] = useState<Group[]>([]);
    const [sizes, setSizes] = useState<Size[]>([]);

    useEffect(()=>{
      fetchBrands();
      fetchGroups();
      fetchSizes();
    }, []);

    const fetchBrands = async () => {
      try{
        const response = await fetch('http://localhost:5068/api/brands');
        if(response.ok){
          const data = await response.json();
          setBrands(data);
        }else{
          console.log('Failed to fetch brands:', response.statusText);
        }
      }catch(error){
        console.log('Error:', error);
      }
    };
    const fetchGroups = async () => {
      try{
        const response = await fetch('http://localhost:5068/api/groups');
        if(response.ok){
          const data = await response.json();
          setGroups(data);
        }else{
          console.log('Failed to fetch brands:', response.statusText);
        }
      }catch(error){
        console.log('Error:', error);
      }
    };
    const fetchSizes = async () => {
      try{
        const response = await fetch('http://localhost:5068/api/sizes');
        if(response.ok){
          const data = await response.json();
          setSizes(data);
          setProduct(prevProduct => ({
            ...prevProduct,
            sizes: data
      }))
        }else{
          console.log('Failed to fetch brands:', response.statusText);
        }
      }catch(error){
        console.log('Error:', error);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
          ...prevProduct,
          [name]: e.target.value
        }));
      };
    
    const handleBrandChange = (selectedBrandId: string)=>{
      setProduct(prevProduct => ({
            ...prevProduct,
            brandId: selectedBrandId
      }))
    };

    const handleGroupChange = (groupId: string, isChecked: boolean) =>{
      setProduct(prevProduct => {
        if (isChecked) {
          return {
            ...prevProduct,
            groups: [...prevProduct.groups, { id: groupId, name: '' }]
          };
        } else {
          return {
            ...prevProduct,
            groups: prevProduct.groups.filter(group => group.id !== groupId)
          };
        }
      });
    }; 

    const handleSizeQuantityChange = (sizeId: string, quantity: number) => {
      const updatedSizes = product.sizes.map(size => {
        if (size.id === sizeId) {
          console.log('sizeId',sizeId);
          return { ...size, quantityInStock: quantity };
        }
        return size;
      });
      console.log('updatedSizes', JSON.stringify(quantity));
      setProduct(prevProduct => ({
        ...prevProduct,
        sizes: updatedSizes
      }));
  };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      const filteredSizes = product.sizes.filter(size => size.quantityInStock > 0);

      const productToSend = {
        ...product,
        sizes: filteredSizes
      };
  
        const response = await fetch('http://localhost:5068/api/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(productToSend)
            
          });
          console.log('Request:', JSON.stringify(product));
           if (response.ok) {
        console.log('Product added successfully!');
        setProduct({
          title: '',
          description: '',
          price: 0,
          brandId: '',
          brand: {id:'',name:''},
          sizes: [],
          groups: []
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
                        <select name="brand" className="form-control" value={product.brandId || ''} onChange={e => handleBrandChange(e.target.value)} required>
                          <option value="">Select...</option>
                          {
                            brands && brands.map((brand) => (
                              <option key={brand.id} value={brand.id}>{brand.name}</option> 
                          ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <input type="text" name="description" className="form-control" value={product.description} onChange={handleChange} required />
                    </div>
                    <div className="form-group pt-1">
                      <label>Groups: &nbsp;</label>
                          {gorups.map(group=>(
                            <div key={group.id} className="form-check form-check-inline">
                              <input type="checkbox" className="form-check-input" id={group.id} value={group.id} checked={product.groups.some(g=>g.id === group.id)}
                                onChange={e=> handleGroupChange(group.id, e.target.checked)} />
                              <label className="form-check-label" htmlFor={group.id}>{group.name}</label>
                            </div>
                          ))}
                    </div>
                    <div className="form-group">
                      <label>Sizes and Quantities:</label><br />
                      {sizes.map(size => (
                        <div key={size.id} className="form-group">
                          <label>{size.name}:</label>
                          <input type="number" className="form-control" value={product.sizes.find(s => s.id === size.id)?.quantityInStock} onChange={e => handleSizeQuantityChange(size.id, parseInt(e.target.value))}  />
                        </div>
                      ))}
                    </div>
                    <button type="submit" className="btn btn-primary  mt-4">Submit</button>
                </form>
            </div>
        </div>
)}

export default AddProductForm;