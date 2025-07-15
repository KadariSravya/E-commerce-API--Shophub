import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react';

const StatCard = ({ title, value, icon, delay, colorClass }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <Card className="admin-stats">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-300 text-sm">{title}</p>
            <p className="text-2xl font-bold gradient-text">
              {value}
            </p>
          </div>
          <div className={colorClass}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const AdminStats = ({ stats }) => {
  const statItems = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: <DollarSign className="h-8 w-8" />,
      colorClass: 'text-green-400',
    },
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: <Package className="h-8 w-8" />,
      colorClass: 'text-blue-400',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: <ShoppingCart className="h-8 w-8" />,
      colorClass: 'text-purple-400',
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: <Users className="h-8 w-8" />,
      colorClass: 'text-orange-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statItems.map((item, index) => (
        <StatCard
          key={item.title}
          title={item.title}
          value={item.value}
          icon={item.icon}
          delay={(index + 1) * 0.1}
          colorClass={item.colorClass}
        />
      ))}
    </div>
  );
};

export default AdminStats;