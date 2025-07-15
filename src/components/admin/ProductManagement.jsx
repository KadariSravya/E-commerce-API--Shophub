import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductFormDialog from '@/components/admin/ProductFormDialog';
import { toast } from '@/components/ui/use-toast';

const ProductManagement = ({ products, reloadProducts }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleAddNewProduct = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    const currentProducts = JSON.parse(localStorage.getItem('products') || '[]');
    const updatedProducts = currentProducts.filter(p => p.id !== productId);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    reloadProducts();

    toast({
      title: "Product Deleted",
      description: "Product has been removed successfully",
      className: "success-toast"
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="admin-card mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold gradient-text">
          Product Management
        </h2>
        <Button onClick={handleAddNewProduct} className="btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img 
              src={product.image || 'https://images.unsplash.com/photo-1559223669-e0065fa7f142'} 
              alt={product.name} 
              className="w-full h-32 object-cover rounded-t-lg mb-3"
            />
            <div className="flex-1 mb-3 px-3">
              <h3 className="text-lg font-semibold text-white mb-1">
                {product.name}
              </h3>
              <p className="text-gray-300 text-sm mb-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold gradient-text">
                  ${product.price}
                </span>
                <span className="text-sm text-gray-400">
                  Stock: {product.stock}
                </span>
              </div>
            </div>
            <div className="flex space-x-2 px-3 pb-3">
              <Button
                onClick={() => handleEditProduct(product)}
                variant="outline"
                size="sm"
                className="flex-1 text-blue-400 hover:text-blue-300"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button
                onClick={() => handleDeleteProduct(product.id)}
                variant="outline"
                size="sm"
                className="flex-1 text-red-400 hover:text-red-300"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <ProductFormDialog
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        editingProduct={editingProduct}
        reloadProducts={reloadProducts}
      />
    </motion.div>
  );
};

export default ProductManagement;