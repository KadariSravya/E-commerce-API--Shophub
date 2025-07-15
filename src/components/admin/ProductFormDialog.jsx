import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

const ProductFormDialog = ({ isOpen, setIsOpen, editingProduct, reloadProducts }) => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    category: 'electronics',
    description: '',
    stock: '',
    image: ''
  });

  const categories = ['electronics', 'clothing', 'books', 'home', 'sports'];

  useEffect(() => {
    if (editingProduct) {
      setProductData({
        name: editingProduct.name,
        price: editingProduct.price.toString(),
        category: editingProduct.category,
        description: editingProduct.description,
        stock: editingProduct.stock.toString(),
        image: editingProduct.image || ''
      });
    } else {
      setProductData({
        name: '',
        price: '',
        category: 'electronics',
        description: '',
        stock: '',
        image: ''
      });
    }
  }, [editingProduct, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!productData.name || !productData.price || !productData.description || !productData.stock || !productData.image) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields, including image URL",
        className: "error-toast"
      });
      return;
    }

    const currentProducts = JSON.parse(localStorage.getItem('products') || '[]');
    let updatedProducts;

    if (editingProduct) {
      updatedProducts = currentProducts.map(p =>
        p.id === editingProduct.id
          ? { ...p, ...productData, price: parseFloat(productData.price), stock: parseInt(productData.stock) }
          : p
      );
      toast({
        title: "Product Updated",
        description: `${productData.name} has been updated.`,
        className: "success-toast"
      });
    } else {
      const newProduct = {
        id: Date.now().toString(),
        ...productData,
        price: parseFloat(productData.price),
        stock: parseInt(productData.stock),
        createdAt: new Date().toISOString()
      };
      updatedProducts = [...currentProducts, newProduct];
      toast({
        title: "Product Added",
        description: `${newProduct.name} has been added.`,
        className: "success-toast"
      });
    }

    localStorage.setItem('products', JSON.stringify(updatedProducts));
    reloadProducts();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="gradient-text">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-white">Product Name</Label>
            <Input id="name" name="name" value={productData.name} onChange={handleChange} placeholder="Enter product name" />
          </div>
          <div>
            <Label htmlFor="price" className="text-white">Price</Label>
            <Input id="price" name="price" type="number" step="0.01" value={productData.price} onChange={handleChange} placeholder="Enter price" />
          </div>
          <div>
            <Label htmlFor="category" className="text-white">Category</Label>
            <select id="category" name="category" value={productData.category} onChange={handleChange} className="input-field w-full">
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="description" className="text-white">Description</Label>
            <Input id="description" name="description" value={productData.description} onChange={handleChange} placeholder="Enter description" />
          </div>
          <div>
            <Label htmlFor="stock" className="text-white">Stock</Label>
            <Input id="stock" name="stock" type="number" value={productData.stock} onChange={handleChange} placeholder="Enter stock quantity" />
          </div>
          <div>
            <Label htmlFor="image" className="text-white">Image URL</Label>
            <Input id="image" name="image" value={productData.image} onChange={handleChange} placeholder="Enter image URL" />
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleSubmit} className="btn-primary flex-1">
              {editingProduct ? 'Update Product' : 'Add Product'}
            </Button>
            <Button onClick={() => setIsOpen(false)} variant="outline" className="btn-secondary flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormDialog;