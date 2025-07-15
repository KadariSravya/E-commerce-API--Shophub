import React from 'react';
import { motion } from 'framer-motion';

const RecentOrders = ({ orders }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 }}
    className="admin-card"
  >
    <h2 className="text-2xl font-bold gradient-text mb-6">
      Recent Orders
    </h2>
    
    {orders.length === 0 ? (
      <p className="text-gray-300 text-center py-8">
        No orders yet
      </p>
    ) : (
      <div className="space-y-4">
        {orders.slice(0, 5).map((order) => (
          <div key={order.id} className="glass-effect rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold">
                  Order #{order.id}
                </p>
                <p className="text-gray-300 text-sm">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold gradient-text">
                  ${order.total.toFixed(2)}
                </p>
                <p className="text-sm text-gray-400">
                  {order.items.length} items
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </motion.div>
);

export default RecentOrders;