import React, { useState, useEffect } from 'react';
import { 
    Menu, MapPin, Search, ShoppingCart, ChevronDown, 
    Tag, Award, Star, Heart, Crosshair, Plus, Minus,
    Home, Receipt, User, X, Mail, ArrowLeft
} from 'lucide-react';

const CATEGORIES = [
    { name: 'Jollof', emoji: '🍚' },
    { name: 'Suya', emoji: '🥩' },
    { name: 'Chops', emoji: '🥟' },
    { name: 'Soups', emoji: '🍲' },
    { name: 'Protein', emoji: '🍗' },
    { name: 'Drinks', emoji: '🥤' },
    { name: 'Healthy', emoji: '🥬' },
    { name: 'Bakery', emoji: '🍞' }
];

const FOOD_ITEMS = [
    { 
        id: 1, name: 'Julen Jollof Hub', price: '₦4,500', 
        img: 'https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        time: '15 min', dist: '2.5 km', fee: '₦1,000 delivery', rating: 4.8, 
        badge: '25% off select items', value: 'Great value' 
    },
    { 
        id: 2, name: 'Suya Spot Express', price: '₦3,000', 
        img: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        time: '20 min', dist: '3.2 km', fee: '₦800 delivery', rating: 4.9, 
        badge: '₦1000 off ₦5000+', value: null 
    },
    { 
        id: 3, name: "Mama's Small Chops", price: '₦2,500', 
        img: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        time: '10 min', dist: '1.1 km', fee: 'Free delivery', rating: 4.5, 
        badge: null, value: null 
    },
    { 
        id: 4, name: 'Peppered Asun Grills', price: '₦4,200', 
        img: 'https://images.unsplash.com/photo-1604328726558-7c87c04ee494?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        time: '30 min', dist: '5.0 km', fee: '₦1,200 delivery', rating: 4.7, 
        badge: '20% off select items', value: 'Great value' 
    },
    { 
        id: 5, name: 'Authentic Egusi & Pounded Yam', price: '₦5,500', 
        img: 'https://images.unsplash.com/photo-1544681280-d2dcff2ec811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        time: '45 min', dist: '6.5 km', fee: '₦1,500 delivery', rating: 4.9, 
        badge: null, value: null 
    },
    { 
        id: 6, name: 'Chilled Zobo & Smoothies', price: '₦1,500', 
        img: 'https://images.unsplash.com/photo-1583524273874-9fbb9f17a942?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        time: '10 min', dist: '0.8 km', fee: 'Free delivery', rating: 4.2, 
        badge: 'Buy 1 Get 1 Free', value: null 
    },
    { 
        id: 7, name: 'Iya Basira Efo Riro', price: '₦4,000', 
        img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        time: '25 min', dist: '4.1 km', fee: '₦1,000 delivery', rating: 4.6, 
        badge: null, value: null 
    },
    { 
        id: 8, name: 'Naija Meatpie & Rolls', price: '₦2,000', 
        img: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        time: '15 min', dist: '2.0 km', fee: '₦500 delivery', rating: 4.8, 
        badge: null, value: null 
    }
];

const PROTEIN_OPTIONS = [
    { name: 'Grilled Chicken', label: 'Grilled Chicken (Free)', price: 0 },
    { name: 'Fried Beef', label: 'Fried Beef (+ ₦500)', price: 500 },
    { name: 'Assorted Meat', label: 'Assorted Meat (+ ₦1,200)', price: 1200 },
    { name: 'Fresh Fish', label: 'Fresh Fish (+ ₦2,000)', price: 2000 }
];

export default function App() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [loginView, setLoginView] = useState('options'); 
    const [selectedItem, setSelectedItem] = useState(null);
    const [favorites, setFavorites] = useState(new Set());
    const [cartQuantity, setCartQuantity] = useState(1);
    const [deliveryMode, setDeliveryMode] = useState('delivery');
    const [address, setAddress] = useState('Lagos, NG');
    
    const [cartItems, setCartItems] = useState([]);
    const [selectedProtein, setSelectedProtein] = useState(0);
    const [specialInstructions, setSpecialInstructions] = useState('');

    useEffect(() => {
        if (isCartOpen || isLoginOpen || selectedItem) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isCartOpen, isLoginOpen, selectedItem]);

    const toggleFavorite = (e, id) => {
        e.stopPropagation();
        const newFavs = new Set(favorites);
        if (newFavs.has(id)) newFavs.delete(id);
        else newFavs.add(id);
        setFavorites(newFavs);
    };

    const handleOpenItem = (item) => {
        setSelectedItem(item);
        setCartQuantity(1);
        setSelectedProtein(0); 
        setSpecialInstructions(''); 
    };

    const handleAddToCart = () => {
        if (!selectedItem) return;
        const proteinOpt = PROTEIN_OPTIONS[selectedProtein];
        const basePrice = parseInt(selectedItem.price.replace(/[^0-9]/g, ''));
        const itemTotal = (basePrice + proteinOpt.price) * cartQuantity;
        
        const newItem = {
            id: Math.random().toString(36).substr(2, 9),
            itemId: selectedItem.id,
            name: selectedItem.name,
            img: selectedItem.img,
            quantity: cartQuantity,
            protein: proteinOpt,
            instructions: specialInstructions,
            price: itemTotal
        };

        setCartItems([...cartItems, newItem]);
        setSelectedItem(null);
        setIsCartOpen(true);
    };

    const updateCartItemQuantity = (index, delta) => {
        const newCart = [...cartItems];
        const item = newCart[index];
        const newQuantity = item.quantity + delta;
        if (newQuantity > 0) {
            const unitPrice = item.price / item.quantity;
            item.quantity = newQuantity;
            item.price = unitPrice * newQuantity;
            setCartItems(newCart);
        } else {
            newCart.splice(index, 1);
            setCartItems(newCart);
        }
    };

    const removeCartItem = (index) => {
        const newCart = [...cartItems];
        newCart.splice(index, 1);
        setCartItems(newCart);
    };

    const cartTotal = cartItems.reduce((acc, item) => acc + item.price, 0);
    const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const getModalPrice = () => {
        if (!selectedItem) return 0;
        const basePrice = parseInt(selectedItem.price.replace(/[^0-9]/g, ''));
        const proteinPrice = PROTEIN_OPTIONS[selectedProtein].price;
        return (basePrice + proteinPrice) * cartQuantity;
    };

    return (
        <div className="bg-white text-[#222222] h-[100dvh] overflow-hidden flex flex-col font-sans">
            <style dangerouslySetInnerHTML={{__html: `
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .custom-scroll::-webkit-scrollbar { width: 8px; }
                .custom-scroll::-webkit-scrollbar-track { background: transparent; }
                .custom-scroll::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 10px; }
                .custom-scroll::-webkit-scrollbar-thumb:hover { background: #D1D5DB; }
            `}} />

            <header className="flex-shrink-0 bg-white border-b border-gray-100 z-50 relative">
                <div className="px-4 lg:px-6 h-16 lg:h-20 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 shrink-0">
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
                            <Menu className="w-6 h-6" />
                        </button>
                        <a href="#" className="text-2xl lg:text-3xl font-black text-[#FF6B00] tracking-tighter">
                            JULEN<span className="text-black">EATS</span>
                        </a>
                    </div>

                    <div className="hidden lg:flex items-center gap-4 flex-1 max-w-4xl ml-4">
                        <div className="flex items-center bg-gray-100 rounded-full p-1 shrink-0 transition-colors">
                            <button onClick={() => setDeliveryMode('delivery')} className={`${deliveryMode === 'delivery' ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:text-black'} px-4 py-1.5 rounded-full font-semibold text-sm transition-all`}>Delivery</button>
                            <button onClick={() => setDeliveryMode('pickup')} className={`${deliveryMode === 'pickup' ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:text-black'} px-4 py-1.5 rounded-full font-semibold text-sm transition-all`}>Pickup</button>
                        </div>
                        
                        <div className="flex items-center bg-gray-100 rounded-full p-1 pl-4 shrink-0 transition-all border border-transparent focus-within:border-[#FF6B00] focus-within:bg-white shadow-inner">
                            <MapPin className="w-4 h-4 text-[#FF6B00]" />
                            <input type="text" placeholder="Enter delivery address" value={address} onChange={(e) => setAddress(e.target.value)} className="bg-transparent border-none outline-none text-sm font-medium ml-2 w-[160px] xl:w-[220px] text-black placeholder-gray-500" />
                            <button className="bg-[#FF6B00] text-white px-5 py-1.5 rounded-full text-sm font-bold ml-2 hover:bg-[#e66000] shadow-md shadow-orange-500/20 transition-all">Order Now</button>
                        </div>

                        <div className="flex-1 bg-gray-100 rounded-full flex items-center px-4 py-2.5 focus-within:ring-2 focus-within:ring-black focus-within:bg-white transition-all shadow-inner">
                            <Search className="w-5 h-5 text-gray-500 mr-3" />
                            <input type="text" placeholder="Search Julen Eats" className="bg-transparent border-none outline-none w-full text-sm font-medium placeholder-gray-500" />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <button className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                        <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-2 px-3">
                            <ShoppingCart className="w-5 h-5" />
                            {cartItemCount > 0 && (
                                <span className="absolute top-0 right-0 bg-[#FF6B00] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-white">{cartItemCount}</span>
                            )}
                            <span className="hidden md:block text-sm font-semibold ml-1">Cart</span>
                        </button>
                        <button onClick={() => setIsLoginOpen(true)} className="hidden md:block px-4 py-2 text-sm font-semibold hover:bg-gray-100 rounded-full transition-colors">Log in</button>
                        <button onClick={() => setIsLoginOpen(true)} className="bg-gray-100 text-black hover:bg-gray-200 px-4 py-2 text-sm font-semibold rounded-full transition-colors whitespace-nowrap hidden sm:block">Sign up</button>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex overflow-hidden relative">
                <div className="flex-1 overflow-y-auto custom-scroll relative bg-white pb-20 lg:pb-0">
                    <div className="sticky top-0 bg-white z-40 pt-4 pb-2 px-4 lg:px-6 shadow-[0_4px_6px_-6px_rgba(0,0,0,0.1)]">
                        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-4 border-b border-gray-100 relative">
                            {CATEGORIES.map((cat, idx) => (
                                <button key={idx} className="flex flex-col items-center gap-2 min-w-[64px] group">
                                    <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-gray-100 transition-colors shadow-sm">
                                        <span className="text-3xl">{cat.emoji}</span>
                                    </div>
                                    <span className="text-xs font-semibold text-gray-800">{cat.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="px-4 lg:px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 pb-12">
                            {FOOD_ITEMS.map((item) => (
                                <div key={item.id} onClick={() => handleOpenItem(item)} className="group block cursor-pointer">
                                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-gray-100">
                                        <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        {item.badge && (
                                            <div className="absolute top-3 left-3 bg-[#FF6B00] text-white text-[11px] font-bold px-2 py-1 rounded shadow-sm">
                                                {item.badge}
                                            </div>
                                        )}
                                        <button onClick={(e) => toggleFavorite(e, item.id)} className={`absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors shadow-sm ${favorites.has(item.id) ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}>
                                            <Heart className="w-4 h-4" fill={favorites.has(item.id) ? "currentColor" : "none"} />
                                        </button>
                                    </div>
                                    <h3 className="text-lg font-bold text-black mb-1 line-clamp-1">{item.name}</h3>
                                    <p className="text-sm text-gray-500">{item.time} • {item.dist} • {item.fee}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {deliveryMode === 'pickup' && (
                    <div className="hidden lg:block w-[45%] xl:w-[40%] bg-gray-200 relative border-l border-gray-200 shadow-inner z-10 transition-all">
                        <iframe 
                            title="Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.46310237746!2d3.20397899014168!3d6.548369389279768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng" 
                            className="w-full h-full border-0"
                            allowFullScreen="" loading="lazy">
                        </iframe>
                    </div>
                )}
            </main>

            {/* Cart Modal */}
            {isCartOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110] flex justify-end" onClick={() => setIsCartOpen(false)}>
                    <div className="w-full md:w-96 bg-white shadow-2xl h-full p-4 flex flex-col" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-black">Your Cart</h2>
                            <button onClick={() => setIsCartOpen(false)}><X /></button>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {cartItems.map((item, index) => (
                                <div key={item.id} className="flex gap-4 mb-4 border-b pb-4">
                                    <img src={item.img} className="w-16 h-16 rounded-lg object-cover" />
                                    <div className="flex-1 text-sm">
                                        <p className="font-bold">{item.name}</p>
                                        <p className="text-gray-500">{item.protein.name}</p>
                                        <div className="flex justify-between items-center mt-2">
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => updateCartItemQuantity(index, -1)} className="bg-gray-100 p-1 rounded"><Minus className="w-3 h-3" /></button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateCartItemQuantity(index, 1)} className="bg-gray-100 p-1 rounded"><Plus className="w-3 h-3" /></button>
                                            </div>
                                            <p className="font-bold">₦{item.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-4 bg-[#FF6B00] text-white rounded-xl font-bold mt-4">Checkout ₦{cartTotal.toLocaleString()}</button>
                    </div>
                </div>
            )}

            {/* Item Detail Modal */}
            {selectedItem && (
                <div className="fixed inset-0 bg-black/60 z-[130] flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
                    <div className="bg-white rounded-3xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <img src={selectedItem.img} className="w-full h-64 object-cover rounded-2xl mb-6" />
                        <h2 className="text-3xl font-black mb-2">{selectedItem.name}</h2>
                        <div className="space-y-4 mb-6">
                            {PROTEIN_OPTIONS.map((p, idx) => (
                                <label key={idx} className="flex items-center justify-between p-3 border rounded-xl cursor-pointer">
                                    <div className="flex items-center gap-2">
                                        <input type="radio" name="protein" checked={selectedProtein === idx} onChange={() => setSelectedProtein(idx)} />
                                        <span>{p.name}</span>
                                    </div>
                                    <span>{p.price > 0 ? `+ ₦${p.price}` : 'Free'}</span>
                                </label>
                            ))}
                        </div>
                        <button onClick={handleAddToCart} className="w-full py-4 bg-black text-white rounded-xl font-bold">Add to Cart ₦{getModalPrice().toLocaleString()}</button>
                    </div>
                </div>
            )}

            {isLoginOpen && (
                <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4" onClick={() => setIsLoginOpen(false)}>
                    <div className="bg-white p-8 rounded-3xl w-full max-w-sm text-center" onClick={e => e.stopPropagation()}>
                        <h2 className="text-2xl font-black mb-6">Welcome</h2>
                        <button className="w-full bg-[#00A082] text-white py-3 rounded-full font-bold mb-4">Log in with SMS</button>
                        <button className="w-full border py-3 rounded-full font-bold">Log in with Email</button>
                    </div>
                </div>
            )}
        </div>
    );
}
