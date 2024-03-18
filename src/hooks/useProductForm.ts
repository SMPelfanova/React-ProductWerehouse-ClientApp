import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Product, Brand, Group, Size } from '../types';
import { fetchBrands, fetchGroups, fetchSizes, fetchProductDetails } from '../services/productService';
 
const useProductForm = (isEditMode: boolean, initialProduct?: Product) => {
    const navigate = useNavigate();
    const {id } = useParams<{id?: string}>();
    const [product, setProduct] = useState<Product>(() => {
        if (isEditMode && initialProduct) {
            return initialProduct;
        }
        return {
            title: '',
            description: '',
            price: 0,
            sizes: [],
            brandId: '',
            brand: { id: '', name: '' },
            groups: []
        };
    });

    const [brands, setBrands] = useState<Brand[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);
    const [allSizes, setSizes] = useState<Size[]>([]);

    useEffect(() => {
        fetchInitialData();
    }, [id]);

    const fetchInitialData = async () => {
        if (isEditMode && id) {
            try {
                const productDetails = await fetchProductDetails(id);
                setProduct(productDetails);
                const sizesData: Size[] = await fetchSizes();
                const newSizes: Size[] = [];
                sizesData.forEach(size => {
                    if (!productDetails.sizes.some((existingSize: Size) => existingSize.id === size.id)) {
                        newSizes.push(size);
                    }
                });
                setSizes([...productDetails.sizes, ...newSizes]);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        }

        const brandsData = await fetchBrands();
        setBrands(brandsData);

        const groupsData = await fetchGroups();

        setGroups(groupsData);
        if (!isEditMode){
            const sizesData = await fetchSizes();
       
            setSizes(sizesData);
    
            setProduct(prevProduct => ({
                ...prevProduct,
                sizes: sizesData
            }));
        }
      
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleBrandChange = (selectedBrandId: string) => {
        setProduct(prevProduct => ({
            ...prevProduct,
            brandId: selectedBrandId
        }));
    };

    const handleGroupChange = (groupId: string, isChecked: boolean) => {
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
                return { ...size, quantityInStock: quantity };
            }
            return size;
        });
        setProduct(prevProduct => ({
            ...prevProduct,
            sizes: updatedSizes
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const filteredSizes = product.sizes.filter(size => size.quantityInStock > 0);
            const productToSend = { ...product, sizes: filteredSizes };
           
            if (isEditMode) {
                const response = await fetch(`http://localhost:5068/api/products/${product.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productToSend)
                });
                if (response.ok) {
                    console.log('Product updated successfully!');
                    navigate('/');
                } else {
                    console.error('Failed to update product:', response.statusText);
                }
            } else {
            const response = await fetch('http://localhost:5068/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productToSend)
            });
            if (response.ok) {
                setProduct({
                    title: '',
                    description: '',
                    price: 0,
                    brandId: '',
                    brand: { id: '', name: '' },
                    sizes: [],
                    groups: []
                });
                navigate('/');
            } else {
                console.error('Failed to add product:', response.statusText);
            }
        }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return {
        product,
        brands,
        groups,
        allSizes,
        handleChange,
        handleBrandChange,
        handleGroupChange,
        handleSizeQuantityChange,
        handleSubmit
    };
};

export default useProductForm;
