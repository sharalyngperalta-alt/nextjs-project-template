'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Plus, Minus, Clock, Star } from 'lucide-react';
import { getMenuByCategory, getMenuItemById, MenuItem } from '@/lib/menu-data';

export default function OrderingPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<Array<{
    item: MenuItem;
    quantity: number;
  }>>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const categories = ['all', 'food', 'drinks', 'appetizers', 'desserts'];

  useEffect(() => {
    const loadMenu = async () => {
      setIsLoading(true);
      try {
        const items = getMenuByCategory('all');
        setMenuItems(items);
      } catch (error) {
        console.error('Failed to load menu:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadMenu();
  }, []);

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.item.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.item.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Order Food & Drinks
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our menu and order directly to your table
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Card key={item.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="flex justify-between items-center mt-4">
                  <span className="text-2xl font-bold">${item.price.toFixed(2)}</span>
                  <Button
                    onClick={() => addToCart(item)}
                    className="w-full"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {cart.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Shopping Cart</CardTitle>
              <CardDescription>
                Total: ${getTotalPrice().toFixed(2)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {cart.map((item) => (
                <div key={item.item.id} className="flex justify-between items-center py-2">
                  <div>
                    <h3>{item.item.name}</h3>
                    <p>${item.item.price.toFixed(2)} x {item.quantity}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => updateQuantity(item.item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => updateQuantity(item.item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => removeFromCart(item.item.id)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
