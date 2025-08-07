export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'food' | 'drinks' | 'appetizers' | 'desserts';
  image: string;
  available: boolean;
}

export const menuItems: MenuItem[] = [
  // Appetizers
  {
    id: 'app_1',
    name: 'Comedy Club Wings',
    description: 'Crispy buffalo wings with our signature laugh-out-loud sauce',
    price: 12.99,
    category: 'appetizers',
    image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg',
    available: true,
  },
  {
    id: 'app_2',
    name: 'Punchline Nachos',
    description: 'Loaded nachos with cheese, jalapeños, and all the fixings',
    price: 14.99,
    category: 'appetizers',
    image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg',
    available: true,
  },
  {
    id: 'app_3',
    name: 'Stand-Up Sliders',
    description: 'Three mini burgers that will have you coming back for more',
    price: 16.99,
    category: 'appetizers',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
    available: true,
  },

  // Main Food
  {
    id: 'food_1',
    name: 'The Headliner Burger',
    description: 'Premium beef patty with bacon, cheese, and our special sauce',
    price: 18.99,
    category: 'food',
    image: 'https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg',
    available: true,
  },
  {
    id: 'food_2',
    name: 'Mic Drop Pizza',
    description: 'Wood-fired pizza with pepperoni, mushrooms, and fresh basil',
    price: 22.99,
    category: 'food',
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
    available: true,
  },
  {
    id: 'food_3',
    name: 'Showstopper Steak',
    description: '8oz grilled sirloin with garlic mashed potatoes and vegetables',
    price: 28.99,
    category: 'food',
    image: 'https://images.pexels.com/photos/299347/pexels-photo-299347.jpeg',
    available: true,
  },
  {
    id: 'food_4',
    name: 'Laugh Track Pasta',
    description: 'Creamy alfredo pasta with grilled chicken and broccoli',
    price: 19.99,
    category: 'food',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
    available: true,
  },

  // Drinks
  {
    id: 'drink_1',
    name: 'Comedy Gold Cocktail',
    description: 'Our signature cocktail with vodka, pineapple, and a twist of lime',
    price: 12.99,
    category: 'drinks',
    image: 'https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg',
    available: true,
  },
  {
    id: 'drink_2',
    name: 'Punchline Punch',
    description: 'Fruity rum punch that packs a comedic punch',
    price: 11.99,
    category: 'drinks',
    image: 'https://images.pexels.com/photos/1304540/pexels-photo-1304540.jpeg',
    available: true,
  },
  {
    id: 'drink_3',
    name: 'Craft Beer Selection',
    description: 'Local craft beer on tap - ask your server for today\'s selection',
    price: 6.99,
    category: 'drinks',
    image: 'https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg',
    available: true,
  },
  {
    id: 'drink_4',
    name: 'House Wine',
    description: 'Red or white wine by the glass',
    price: 8.99,
    category: 'drinks',
    image: 'https://images.pexels.com/photos/434311/pexels-photo-434311.jpeg',
    available: true,
  },

  // Desserts
  {
    id: 'dessert_1',
    name: 'Finale Chocolate Cake',
    description: 'Rich chocolate cake that\'s the perfect ending to your night',
    price: 8.99,
    category: 'desserts',
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg',
    available: true,
  },
  {
    id: 'dessert_2',
    name: 'Standing Ovation Cheesecake',
    description: 'New York style cheesecake with berry compote',
    price: 9.99,
    category: 'desserts',
    image: 'https://images.pexels.com/photos/140831/pexels-photo-140831.jpeg',
    available: true,
  },
];

export const getMenuByCategory = (category: MenuItem['category']) => {
  return menuItems.filter(item => item.category === category && item.available);
};

export const getMenuItemById = (id: string) => {
  return menuItems.find(item => item.id === id);
};
