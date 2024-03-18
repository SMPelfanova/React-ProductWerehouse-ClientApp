import React,{useState} from 'react';
import { Product } from '../types';
import useProductForm from '../hooks/useProductForm';

interface AddProductFormProps{
  isEditMode:boolean;
  initialProduct?:Product;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ isEditMode, initialProduct }) => {
  const {
      product,
      brands,
      groups,
      allSizes,
      handleChange,
      handleBrandChange,
      handleGroupChange,
      handleSizeQuantityChange,
      handleSubmit
  } = useProductForm(isEditMode, initialProduct);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!product.title.trim()) {
      errors.title = 'Title is required';
    }
    if (product.price <= 0) {
      errors.price = 'Price must be greater than 0';
    }
    if (!product.description.trim()) {
      errors.description = 'Description is required';
    }
    if (!product.brandId.trim()) {
      errors.brandId = 'Brand is required';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(e);
    }
  };
  return (
    <div className="container pt-4">
        <div className="row">
            <form onSubmit={onSubmit}>
                {isEditMode ? <h1>Edit product</h1> : <h1>Add product</h1>} 
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="title" className="form-control" value={product.title} onChange={handleChange} />
                    {errors.title && <small className="text-danger">{errors.title}</small>}
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input type="number" name="price"  className="form-control" value={product.price} onChange={handleChange} />
                    {errors.price && <small className="text-danger">{errors.price}</small>}
                </div>
                <div className="form-group">
                    <label>Brand:</label>
                    <select name="brand" className="form-control" value={product.brandId || ''} onChange={e => handleBrandChange(e.target.value)}>
                      <option value="">Select...</option>
                      {
                        brands && brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>{brand.name}</option> 
                      ))}
                    </select>
                    {errors.brandId && <small className="text-danger">{errors.brandId}</small>}
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input type="text" name="description" className="form-control" value={product.description} onChange={handleChange} />
                    {errors.description && <small className="text-danger">{errors.description}</small>}
                </div>
                <div className="form-group pt-1">
                  <label>Groups: &nbsp;</label>
                      {groups.map(group=>(
                        <div key={group.id} className="form-check form-check-inline">
                          <input type="checkbox" className="form-check-input" id={group.id} value={group.id} checked={product.groups.some(g=>g.id === group.id)}
                            onChange={e=> handleGroupChange(group.id, e.target.checked)} />
                          <label className="form-check-label" htmlFor={group.id}>{group.name}</label>
                        </div>
                      ))}
                </div>
                <div className="form-group">
                  <label>Sizes and Quantities:</label><br />
                  {allSizes.map(size => (
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