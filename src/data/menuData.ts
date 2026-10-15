export interface MenuItem {
  id: string;
  name: string;
  category: 'breakfast' | 'starters' | 'mains' | 'local' | 'desserts' | 'hot-drinks' | 'cold-drinks';
  categoryLabel: string;
  description: string;
  fullDescription: string;
  price: number;
  imageUrl: string;
  dietary?: string[];
  allergens?: string[];
  isAvailable?: boolean;
  featured?: boolean;
}

export interface MenuCategoryOption {
  id: string;
  label: string;
}

export interface DiningCategoryCard {
  id: string;
  title: string;
  categoryQuery: string;
  description: string;
  imageUrl: string;
  hours: string;
}

export interface DiningHours {
  meal: string;
  hours: string;
  description: string;
}

export const MENU_CATEGORIES: MenuCategoryOption[] = [
  { id: 'all', label: 'All Items' },
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'starters', label: 'Starters' },
  { id: 'mains', label: 'Main Courses' },
  { id: 'local', label: 'Local Cuisine' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'hot-drinks', label: 'Hot Drinks' },
  { id: 'cold-drinks', label: 'Cold Drinks' },
];

export const DINING_CATEGORIES: DiningCategoryCard[] = [
  {
    id: 'breakfast',
    title: 'Breakfast & Morning Delights',
    categoryQuery: 'breakfast',
    description: 'Freshly baked artisanal breads, tropical fruits, organic eggs, and sunrise specialties made to order.',
    imageUrl: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=80',
    hours: '06:30 AM – 10:30 AM',
  },
  {
    id: 'lunch-dinner',
    title: 'Lunch & Elegant Dinner',
    categoryQuery: 'mains',
    description: 'Prime dry-aged steaks, fresh coastal seafood catches, and handmade pastas prepared with culinary finesse.',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    hours: '12:00 PM – 10:30 PM',
  },
  {
    id: 'local-cuisine',
    title: 'Authentic Local Cuisine',
    categoryQuery: 'local',
    description: 'Time-honored recipes, aromatic berbere spices, slow-simmered stews, and traditional injera platters.',
    imageUrl: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1200&q=80',
    hours: '12:00 PM – 10:00 PM',
  },
  {
    id: 'desserts',
    title: 'Artisan Desserts & Pastries',
    categoryQuery: 'desserts',
    description: 'Decadent chocolate ganache, seasonal fruit tarts, and handcrafted patisserie made daily in-house.',
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80',
    hours: '11:00 AM – 11:00 PM',
  },
  {
    id: 'beverages',
    title: 'Coffee & Refreshing Beverages',
    categoryQuery: 'hot-drinks',
    description: 'Single-origin highland coffee ceremonies, specialty teas, cold-pressed juices, and signature botanical blends.',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    hours: '06:30 AM – 11:00 PM',
  },
];

export const RESTAURANT_OPERATING_HOURS: DiningHours[] = [
  {
    meal: 'Breakfast',
    hours: '06:30 AM – 10:30 AM',
    description: 'Daily buffet & à la carte breakfast overlooking the morning coastal breeze.',
  },
  {
    meal: 'Lunch',
    hours: '12:00 PM – 03:30 PM',
    description: 'Casual fine dining, garden salads, light coastal catches, and specialty bowls.',
  },
  {
    meal: 'Dinner',
    hours: '06:30 PM – 10:30 PM',
    description: 'Intimate candlelit dinners, multi-course chef tasting menus, and sommelier pairings.',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // --- BREAKFAST ---
  {
    id: 'classic-breakfast-plate',
    name: 'Classic Breakfast Plate',
    category: 'breakfast',
    categoryLabel: 'Breakfast',
    description: 'Farm-fresh eggs cooked to your preference with roasted potatoes, smoked bacon, chicken sausage, and toasted sourdough.',
    fullDescription: 'Our signature morning plate features two organic free-range eggs prepared any style, complemented by house-cured applewood smoked bacon, artisanal chicken herb sausage, garlic-rosemary roasted fingerling potatoes, blistered vine tomatoes, and toasted sourdough served with sweet cream butter.',
    price: 14,
    imageUrl: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80',
    dietary: ['Signature', 'High Protein'],
    allergens: ['Eggs', 'Gluten'],
    isAvailable: true,
  },
  {
    id: 'pancakes-fresh-fruit',
    name: 'Pancakes with Fresh Fruit',
    category: 'breakfast',
    categoryLabel: 'Breakfast',
    description: 'Fluffy golden buttermilk pancakes stacked high and topped with seasonal berries, whipped mascarpone, and pure maple syrup.',
    fullDescription: 'Three golden, soufflé-light buttermilk pancakes stacked delicately with organic strawberries, blueberries, and raspberries. Finished with a quenelle of whipped vanilla mascarpone, powdered sugar dusting, and served with warm 100% pure Grade-A amber maple syrup.',
    price: 12,
    imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80',
    dietary: ['Vegetarian'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    isAvailable: true,
  },
  {
    id: 'avocado-toast',
    name: 'Avocado Toast',
    category: 'breakfast',
    categoryLabel: 'Breakfast',
    description: 'Toasted seeded brioche topped with crushed Hass avocado, heirloom cherry tomatoes, crumbled feta, and radish ribbons.',
    fullDescription: 'Thick-sliced rustic multigrain bread toasted crisp, layered with lemon-infused ripe Hass avocado puree, colorful heirloom cherry tomatoes, shaved watermelon radish, French feta cheese, micro herbs, and finished with a drizzle of cold-pressed extra virgin olive oil and Maldon sea salt.',
    price: 10,
    imageUrl: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=800&q=80',
    dietary: ['Vegetarian', 'Healthy Choice'],
    allergens: ['Gluten', 'Dairy'],
    isAvailable: true,
  },

  // --- STARTERS ---
  {
    id: 'garden-salad',
    name: 'Garden Salad',
    category: 'starters',
    categoryLabel: 'Starters',
    description: 'Crisp organic mixed greens, heirloom tomatoes, English cucumber, shaved fennel, and aged balsamic vinaigrette.',
    fullDescription: 'Hand-picked organic baby field greens and tender leaves from our partnering local estates, tossed with sweet baby heirloom tomatoes, crisp cucumber ribbons, shaved shaved fennel, pickled shallots, toasted sunflower seeds, and drizzled with a 12-year aged Modena balsamic vinaigrette.',
    price: 11,
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    dietary: ['Vegetarian', 'Vegan', 'Gluten-Free'],
    allergens: ['None'],
    isAvailable: true,
    featured: true,
  },
  {
    id: 'creamy-mushroom-soup',
    name: 'Creamy Mushroom Soup',
    category: 'starters',
    categoryLabel: 'Starters',
    description: 'Velvety wild forest mushroom soup infused with fresh thyme, white truffle oil, and sourdough herb croutons.',
    fullDescription: 'A rich and earthy velouté crafted from a slow-simmered blend of roasted chanterelles, porcini, and cremini mushrooms with sweet shallots and aromatic thyme. Garnished with sautéed wild mushrooms, chive blossoms, a drizzle of Italian white truffle oil, and crisp house-baked croutons.',
    price: 9,
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    dietary: ['Vegetarian'],
    allergens: ['Dairy', 'Gluten'],
    isAvailable: true,
  },
  {
    id: 'bruschetta',
    name: 'Bruschetta',
    category: 'starters',
    categoryLabel: 'Starters',
    description: 'Grilled crusty Italian ciabatta rubbed with garlic, topped with marinated vine tomatoes, sweet basil, and parmesan.',
    fullDescription: 'Wood-fired sourdough ciabatta lightly rubbed with roasted garlic and brushed with Tuscan olive oil. Topped with vine-ripened Roma tomatoes marinated in sweet shallots, aged balsamic, and Genovese basil, finished with aged Parmigiano-Reggiano shavings and sea salt.',
    price: 8,
    imageUrl: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=800&q=80',
    dietary: ['Vegetarian'],
    allergens: ['Gluten', 'Dairy'],
    isAvailable: true,
  },

  // --- MAIN COURSES ---
  {
    id: 'grilled-salmon',
    name: 'Grilled Salmon',
    category: 'mains',
    categoryLabel: 'Main Courses',
    description: 'Pan-seared Atlantic salmon fillet served over lemon-herb risotto, tender asparagus spears, and citrus butter emulsion.',
    fullDescription: 'Sustainably caught Atlantic salmon fillet pan-seared to a delicate crisp exterior and tender flaky center. Rested atop a creamy Meyer lemon and sweet mascarpone risotto, accompanied by grilled green asparagus spears, roasted baby bell peppers, and finished with a silky citrus beurre blanc sauce.',
    price: 24,
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
    dietary: ['Gluten-Free', 'Chef Signature'],
    allergens: ['Fish', 'Dairy'],
    isAvailable: true,
    featured: true,
  },
  {
    id: 'beef-tenderloin',
    name: 'Beef Tenderloin',
    category: 'mains',
    categoryLabel: 'Main Courses',
    description: 'Prime center-cut beef tenderloin steak grilled to perfection with truffled potato puree, glazed carrots, and red wine reduction.',
    fullDescription: 'A succulent 8oz center-cut USDA Prime beef tenderloin grilled over oak wood coals to your desired temperature. Served with silky Yukon Gold potato puree infused with white truffle, roasted baby heirloom carrots, haricots verts, and draped in a rich 48-hour Cabernet Sauvignon demi-glace.',
    price: 29,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    dietary: ['Gluten-Free', 'Signature'],
    allergens: ['Dairy'],
    isAvailable: true,
    featured: true,
  },
  {
    id: 'herb-roasted-chicken',
    name: 'Herb-Roasted Chicken',
    category: 'mains',
    categoryLabel: 'Main Courses',
    description: 'Juicy organic chicken breast roasted with rosemary and thyme, served with garlic baby potatoes and natural pan jus.',
    fullDescription: 'Free-range organic chicken breast marinated in garden rosemary, garlic, and cracked pepper, oven-roasted until crisp and deeply flavorful. Accompanied by roasted fingerling potatoes, caramelized pearl onions, sautéed Swiss chard, and a rich thyme-scented pan chicken reduction.',
    price: 20,
    imageUrl: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80',
    dietary: ['Gluten-Free'],
    allergens: ['None'],
    isAvailable: true,
  },
  {
    id: 'vegetable-pasta',
    name: 'Vegetable Pasta',
    category: 'mains',
    categoryLabel: 'Main Courses',
    description: 'Handcrafted tagliatelle pasta with sautéed summer zucchini, roasted bell peppers, cherry tomatoes, and basil pesto.',
    fullDescription: 'Fresh handmade bronze-die tagliatelle ribbon pasta tossed with fire-roasted bell peppers, baby zucchini ribbons, sun-blushed cherry tomatoes, and toasted pine nuts in a fragrant Genovese basil pesto sauce. Garnished with fresh ricotta salata and cold-pressed olive oil.',
    price: 17,
    imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
    dietary: ['Vegetarian'],
    allergens: ['Gluten', 'Dairy', 'Nuts'],
    isAvailable: true,
  },

  // --- LOCAL CUISINE ---
  {
    id: 'traditional-ethiopian-platter',
    name: 'Traditional Ethiopian Platter',
    category: 'local',
    categoryLabel: 'Local Cuisine',
    description: 'A vibrant combination of spiced doro wat, tender beef tibs, and seasoned vegetable stews served on fresh fermented teff injera.',
    fullDescription: 'An authentic communal dining centerpiece highlighting regional heritage. Features tender chicken drumstick slow-cooked in rich berbere sauce (Doro Wat) with hard-boiled egg, succulent sautéed beef with rosemary and jalapeño (Key Tibs), turmeric cabbage (Atkilt Wat), and yellow split peas (Kik Alicha), served over fresh sourdough teff injera bread.',
    price: 18,
    imageUrl: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    dietary: ['Local Heritage', 'Signature'],
    allergens: ['Eggs'],
    isAvailable: true,
  },
  {
    id: 'spiced-lentil-stew',
    name: 'Spiced Lentil Stew (Misir Wat)',
    category: 'local',
    categoryLabel: 'Local Cuisine',
    description: 'Slow-simmered red lentils infused with aromatic berbere spice blend, garlic, and ginger, served with warm rolls of injera.',
    fullDescription: 'Organic red split lentils slow-simmered to a velvety consistency with house-blended highland berbere pepper, sautéed red onions, fresh ginger, and garlic. A deeply flavorful, comforting plant-based specialty presented with warm folded rolls of sourdough teff injera bread and pickled beet salad.',
    price: 13,
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    dietary: ['Vegetarian', 'Vegan', 'Local Heritage'],
    allergens: ['None'],
    isAvailable: true,
  },

  // --- DESSERTS ---
  {
    id: 'chocolate-lava-cake',
    name: 'Chocolate Lava Cake',
    category: 'desserts',
    categoryLabel: 'Desserts',
    description: 'Warm dark chocolate cake with a molten chocolate center, served with Madagascar vanilla bean gelato and raspberry coulis.',
    fullDescription: 'Baked to order using 70% Valrhona dark Belgian chocolate, this decadent individual soufflé cake releases a luscious warm molten center when pierced. Paired with a scoop of artisan Madagascar bourbon vanilla bean gelato, fresh raspberries, and a tangy house-made raspberry reduction.',
    price: 10,
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    dietary: ['Vegetarian', 'Chef Signature'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    isAvailable: true,
    featured: true,
  },
  {
    id: 'vanilla-cheesecake',
    name: 'Vanilla Cheesecake',
    category: 'desserts',
    categoryLabel: 'Desserts',
    description: 'Silky New York-style baked cheesecake atop a buttery graham cracker crust with a glaze of wild strawberry compote.',
    fullDescription: 'Classic slow-baked cream cheese and crème fraîche filling delicately flavored with pure vanilla bean on a crisp butter-baked honey graham cracker foundation. Garnished with a glazed wild forest strawberry compote, fresh mint sprigs, and edible blossoms.',
    price: 9,
    imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    dietary: ['Vegetarian'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    isAvailable: true,
  },
  {
    id: 'seasonal-fruit-plate',
    name: 'Seasonal Fruit Plate',
    category: 'desserts',
    categoryLabel: 'Desserts',
    description: 'Artfully sliced tropical fruits including dragon fruit, sweet pineapple, mango, and passion fruit with wild honey drizzle.',
    fullDescription: 'A refreshing and vibrant presentation of sun-ripened coastal fruits. Slices of ruby dragon fruit, golden honey pineapple, Kent mango, sweet papaya, fresh berries, and a halved passion fruit, accompanied by a side of wildflower honeycomb and fresh lime wedges.',
    price: 8,
    imageUrl: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&w=800&q=80',
    dietary: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Healthy Choice'],
    allergens: ['None'],
    isAvailable: true,
  },

  // --- HOT DRINKS ---
  {
    id: 'ethiopian-coffee',
    name: 'Ethiopian Single-Origin Coffee',
    category: 'hot-drinks',
    categoryLabel: 'Hot Drinks',
    description: 'Traditionally brewed Yirgacheffe highland Arabica beans offering delicate jasmine floral notes and citrus undertones.',
    fullDescription: 'Freshly roasted washed Yirgacheffe beans prepared in traditional clay pot style (Jebena). Delivers an intoxicating fragrance of sweet jasmine blossoms, light bergamot citrus notes, and a clean caramel finish. Served with sweet popcorn and candied ginger.',
    price: 4,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    dietary: ['Signature', 'Locally Sourced'],
    allergens: ['None'],
    isAvailable: true,
  },
  {
    id: 'espresso',
    name: 'Espresso',
    category: 'hot-drinks',
    categoryLabel: 'Hot Drinks',
    description: 'Rich, full-bodied double shot extracted under precise pressure with velvety crema and deep cocoa notes.',
    fullDescription: 'A classic Italian double espresso crafted with a blend of highland Arabica and sweet Robusta beans, extracted to yield a thick hazelnut-colored crema, robust roasted hazelnut body, and subtle bittersweet dark cocoa finish.',
    price: 3,
    imageUrl: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80',
    dietary: ['Vegetarian'],
    allergens: ['None'],
    isAvailable: true,
  },
  {
    id: 'tea-selection',
    name: 'Curated Artisan Tea Selection',
    category: 'hot-drinks',
    categoryLabel: 'Hot Drinks',
    description: 'Selection of organic whole-leaf teas including Earl Grey Imperial, Jasmine Dragon Pearls, and Moroccan Mint.',
    fullDescription: 'Brewed tableside with filtered mountain water. Choose from our curated tea chest: Imperial Bergamot Earl Grey, First-Flush Darjeeling, Jasmine Green Pearl Blossom, Egyptian Chamomile, or Fresh Moroccan Spearmint. Served with organic wildflower honey and fresh lemon.',
    price: 3,
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    dietary: ['Organic', 'Vegetarian'],
    allergens: ['None'],
    isAvailable: true,
  },

  // --- COLD DRINKS ---
  {
    id: 'fresh-tropical-juice',
    name: 'Fresh Tropical Juice',
    category: 'cold-drinks',
    categoryLabel: 'Cold Drinks',
    description: 'Cold-pressed coastal blend of sweet mango, passion fruit, pineapple, and citrus with a touch of mint.',
    fullDescription: 'Pressed fresh to order from local orchard fruits without added sugars or concentrates. A refreshing tropical blend of golden sweet mango, tart passion fruit pulp, ripe pineapple juice, and a splash of freshly squeezed Persian lime served over crushed ice with fresh mint.',
    price: 6,
    imageUrl: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80',
    dietary: ['Vegan', 'Gluten-Free', 'Fresh Pressed'],
    allergens: ['None'],
    isAvailable: true,
  },
  {
    id: 'iced-coffee',
    name: 'Artisan Iced Coffee',
    category: 'cold-drinks',
    categoryLabel: 'Cold Drinks',
    description: 'Slow-steeped 16-hour cold brew coffee poured over crystalline ice blocks with your choice of organic milk or oat cream.',
    fullDescription: 'Our signature highland single-origin beans steeped in chilled filtered water for 16 hours to extract smooth chocolate notes and zero bitterness. Poured over artisanal crystal-clear ice cubes, accompanied by organic whole milk, sweet vanilla syrup, or Madagascar oat milk.',
    price: 5,
    imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    dietary: ['Vegetarian'],
    allergens: ['Dairy on request'],
    isAvailable: true,
  },
  {
    id: 'bottled-water',
    name: 'Sanctuary Mineral Water',
    category: 'cold-drinks',
    categoryLabel: 'Cold Drinks',
    description: 'Chilled natural artisan spring water available still or sparkling, served with lemon or cucumber slices.',
    fullDescription: 'Premium natural mineral water sourced from deep artesian springs, naturally filtered through mineral-rich volcanic strata. Served chilled in elegant recycled glass bottles with your choice of still or sparkling, accompanied by fresh citrus slices or garden cucumber.',
    price: 2,
    imageUrl: 'https://images.unsplash.com/photo-1517093728432-a0440f8d45af?auto=format&fit=crop&w=800&q=80',
    dietary: ['Gluten-Free', 'Pure'],
    allergens: ['None'],
    isAvailable: true,
  },
];

// Helper to look up an item by ID
export const getMenuItemById = (id?: string): MenuItem | undefined => {
  if (!id) return undefined;
  return MENU_ITEMS.find((item) => item.id === id);
};

// Helper for featured dishes on Dining page
export const getFeaturedDishes = (): MenuItem[] => {
  return MENU_ITEMS.filter((item) => item.featured === true);
};
