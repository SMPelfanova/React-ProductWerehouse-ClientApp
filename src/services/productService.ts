export const fetchBrands = async () => {
    try {
        const response = await fetch('http://localhost:5068/api/brands');
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.log('Failed to fetch brands:', response.statusText);
            return [];
        }
    } catch (error) {
        console.log('Error:', error);
        return [];
    }
};

export const fetchGroups = async () => {
    try {
        const response = await fetch('http://localhost:5068/api/groups');
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.log('Failed to fetch groups:', response.statusText);
            return [];
        }
    } catch (error) {
        console.log('Error:', error);
        return [];
    }
};

export const fetchSizes = async () => {
    try {
        const response = await fetch('http://localhost:5068/api/sizes');
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.log('Failed to fetch sizes:', response.statusText);
            return [];
        }
    } catch (error) {
        console.log('Error:', error);
        return [];
    }
};

export const fetchProductDetails = async (id:string) => {
    try {
        const response = await fetch(`http://localhost:5068/api/products/${id}`);
        if (!response.ok) {
            console.log('Failed to fetch product details:', response.statusText);
            return [];
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching product details:', error);
        return [];
    }
}

export const deleteProduct = async (id: string | undefined) => {
    try{
      await fetch(`http://localhost:5068/api/products/${id}`, {method: 'DELETE'});
    }
    catch(error){
      console.error("Error deleting product", error);
    }
  } 