import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();

  const handleCreateOrder = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to place an order",
        className: "error-toast"
      });
      return;
    }

    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some products to your cart first",
        className: "error-toast"
      });
      return;
    }

    // Create order
    const order = {
      id: Date.now().toString(),
      userId: user.id,
      items: cartItems,
      total: getCartTotal(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    // Update product stock
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const updatedProducts = products.map(product => {
      const cartItem = cartItems.find(item => item.id === product.id);
      if (cartItem) {
        return {
          ...product,
          stock: Math.max(0, product.stock - cartItem.quantity)
        };
      }
      return product;
    });
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    clearCart();

    toast({
      title: "Order placed successfully!",
      description: `Order #${order.id} has been created`,
      className: "success-toast"
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen py-8 px-4">
        <Helmet>
          <title>Shopping Cart - ShopHub</title>
          <meta name="description" content="Review your selected items and proceed to checkout on ShopHub." />
        </Helmet>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold gradient-text mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/products">
              <Button className="btn-primary text-lg px-8 py-4">
                Start Shopping
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <Helmet>
        <title>Shopping Cart - ShopHub</title>
        <meta name="description" content="Review your selected items and proceed to checkout on ShopHub." />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Shopping Cart
          </h1>
          <p className="text-xl text-gray-300">
            Review your items and proceed to checkout
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="cart-item"
              >
                <div className="flex items-center space-x-4">
                  <img  
                    className="w-20 h-20 object-cover rounded-lg"
                    alt={item.name}
                   src="https://images.unsplash.com/photo-1632813405318-1a453ecac8bf" />
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">
                      {item.name}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      ${item.price} each
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-red-500/20"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    
                    <span className="text-white font-semibold w-8 text-center">
                      {item.quantity}
                    </span>
                    
                    <Button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-green-500/20"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold gradient-text">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <Button
                      onClick={() => removeFromCart(item.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="admin-card sticky top-24">
              <h2 className="text-2xl font-bold gradient-text mb-6">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal:</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax:</span>
                  <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
                </div>
                <hr className="border-gray-600" />
                <div className="flex justify-between text-xl font-bold text-white">
                  <span>Total:</span>
                  <span className="gradient-text">
                    ${(getCartTotal() * 1.1).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleCreateOrder}
                  className="w-full btn-primary text-lg py-3"
                >
                  Place Order
                </Button>
                
                <Button
                  onClick={clearCart}
                  variant="outline"
                  className="w-full btn-secondary"
                >
                  Clear Cart
                </Button>
                
                <Link to="/products" className="block">
                  <Button variant="ghost" className="w-full text-purple-300 hover:text-white">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              {!user && (
                <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-300 text-sm text-center">
                    <Link to="/login" className="underline hover:text-yellow-200">
                      Login
                    </Link> to place your order
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;