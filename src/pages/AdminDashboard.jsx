import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import AdminStats from '@/components/admin/AdminStats';
import ProductManagement from '@/components/admin/ProductManagement';
import RecentOrders from '@/components/admin/RecentOrders';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const productsData = JSON.parse(localStorage.getItem('products') || '[]');
    const ordersData = JSON.parse(localStorage.getItem('orders') || '[]');
    const usersData = JSON.parse(localStorage.getItem('users') || '[]');
    
    setProducts(productsData);
    setOrders(ordersData);
    setUsers(usersData);
  };

  const reloadProducts = () => {
    const productsData = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(productsData);
  }

  const getStats = () => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalProducts = products.length;
    const totalUsers = users.length;
    const totalOrders = orders.length;

    return { totalRevenue, totalProducts, totalUsers, totalOrders };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen py-8 px-4">
      <Helmet>
        <title>Admin Dashboard - ShopHub</title>
        <meta name="description" content="Manage products, orders, and users on the ShopHub admin dashboard." />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-300">
            Manage your e-commerce platform
          </p>
        </motion.div>

        <AdminStats stats={stats} />

        <ProductManagement products={products} reloadProducts={reloadProducts} />

        <RecentOrders orders={orders} />
      </div>
    </div>
  );
};

export default AdminDashboard;