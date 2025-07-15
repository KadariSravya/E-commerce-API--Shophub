import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Search, Filter, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/use-toast';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 8;

  const { addToCart } = useCart();

  const categories = ['all', 'electronics', 'clothing', 'books', 'home', 'sports'];

  useEffect(() => {
    const initializeProducts = () => {
      const existingProducts = localStorage.getItem('products');
      if (!existingProducts || JSON.parse(existingProducts).length === 0) {
        const mockProducts = [
          {
            id: '1',
            name: 'Premium Wireless Headphones',
            price: 1500,
            category: 'electronics',
            description: 'High-quality wireless headphones with noise cancellation',
            stock: 50,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
          },
          {
            id: '2',
            name: 'Smart Fitness Watch',
            price: 1400,
            category: 'electronics',
            description: 'Advanced fitness tracking with heart rate monitor',
            stock: 30,
            image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80'
          },
          {
            id: '3',
            name: 'Designer T-Shirt',
            price: 300,
            category: 'clothing',
            description: 'Premium cotton t-shirt with modern design',
            stock: 100,
            image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80'
          },
          {
            id: '4',
            name: 'The Full Stack Developer',
            price: 390.99,
            category: 'books',
            description: 'Complete guide to modern web development',
            stock: 25,
            image: 'https://cdn2.percipio.com/public/c/books/144491/cover-images/5ad50305-c2ff-412a-8f09-b2d0a29a87cd/modality/5ad50305-c2ff-412a-8f09-b2d0a29a87cd.jpg?width=400'
          },
          {
            id: '5',
            name: 'Smart Home Speaker',
            price: 1209.99,
            category: 'electronics',
            description: 'Voice-controlled smart speaker with AI assistant',
            stock: 40,
            image: 'https://img.freepik.com/premium-photo/smart-speaker-smartphone-table_1082794-19038.jpg?w=360'
          },
          {
            id: '6',
            name: 'Yoga Mat Pro',
            price: 1800.99,
            category: 'sports',
            description: 'Professional-grade yoga mat with superior grip',
            stock: 60,
            image: 'https://m.media-amazon.com/images/I/711mr7wmiTL._SL1500_.jpg'
          },
          {
            id: '7',
            name: 'Coffee Maker Deluxe',
            price: 40000,
            category: 'home',
            description: 'Premium coffee maker with programmable features',
            stock: 20,
            image: 'https://m.media-amazon.com/images/I/71tDUWqtfiL.jpg'
          },
          {
            id: '8',
            name: 'Running Shoes Elite',
            price: 7000.99,
            category: 'sports',
            description: 'Professional running shoes with advanced cushioning',
            stock: 35,
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
          }
        ];
        localStorage.setItem('products', JSON.stringify(mockProducts));
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
      } else {
        const parsedProducts = JSON.parse(existingProducts);
        setProducts(parsedProducts);
        setFilteredProducts(parsedProducts);
      }
      setLoading(false);
    };

    initializeProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, selectedCategory, searchTerm]);

  const handleAddToCart = (product) => {
    if (product.stock > 0) {
      addToCart(product);
    } else {
      toast({
        title: "Out of stock",
        description: `${product.name} is currently out of stock`,
        className: "error-toast"
      });
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <Helmet>
        <title>Products - ShopHub</title>
        <meta name="description" content="Browse our extensive collection of premium products across electronics, clothing, books, home goods, and sports equipment." />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Our Products
          </h1>
          <p className="text-xl text-gray-300">
            Discover amazing products across all categories
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 search-bar"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
        >
          {currentProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <div className="relative overflow-hidden rounded-t-xl">
                  <img  
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                    src={product.image || 'https://images.unsplash.com/photo-1559223669-e0065fa7f142'}
                    alt={product.name} 
                  />
                  {product.stock <= 5 && product.stock > 0 && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                      Low Stock
                    </div>
                  )}
                  {product.stock === 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      Out of Stock
                    </div>
                  )}
                </div>
                
                <CardContent className="flex-1 p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-300 text-sm mb-3">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold gradient-text">
                      ₹{product.price}
                    </span>
                    <span className="text-sm text-gray-400">
                      Stock: {product.stock}
                    </span>
                  </div>
                </CardContent>
                
                <CardFooter className="p-4 pt-0">
                  <Button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center items-center space-x-2"
          >
            <Button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              variant="ghost"
              className="pagination-btn"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                variant={currentPage === index + 1 ? "default" : "ghost"}
                className={`pagination-btn ${currentPage === index + 1 ? 'bg-purple-500' : ''}`}
              >
                {index + 1}
              </Button>
            ))}
            
            <Button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="ghost"
              className="pagination-btn"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </motion.div>
        )}

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-gray-300">
              No products found matching your criteria.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Products;