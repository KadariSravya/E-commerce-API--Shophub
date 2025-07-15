import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ShoppingBag, Shield, Truck, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
  const features = [
    {
      icon: <ShoppingBag className="h-8 w-8" />,
      title: "Premium Products",
      description: "Curated selection of high-quality items"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure Shopping",
      description: "JWT authentication and secure payments"
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Fast Delivery",
      description: "Quick and reliable shipping worldwide"
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Top Rated",
      description: "Trusted by thousands of customers"
    }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>ShopHub - Premium E-commerce Platform</title>
        <meta name="description" content="Welcome to ShopHub - your premium destination for quality products with secure shopping and fast delivery." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-section"
          >
            <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
              Welcome to ShopHub
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover amazing products with our premium e-commerce platform featuring secure authentication, seamless cart management, and lightning-fast ordering.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button className="btn-primary text-lg px-8 py-4">
                  Shop Now
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" className="btn-secondary text-lg px-8 py-4">
                  Join Today
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Why Choose ShopHub?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the future of online shopping with our cutting-edge features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="product-card text-center card-hover"
              >
                <div className="text-purple-400 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="hero-section"
          >
            <h2 className="text-4xl font-bold gradient-text mb-6">
              Ready to Start Shopping?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of satisfied customers and discover your next favorite product today!
            </p>
            <Link to="/products">
              <Button className="btn-primary text-lg px-8 py-4">
                Explore Products
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;