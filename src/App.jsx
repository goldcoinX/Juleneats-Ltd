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
    { name: 'Chicken', emoji: '🍗' },
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

export default function App() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [loginView, setLoginView] = useState('options'); // 'options' | 'email'
    const [selectedItem, setSelectedItem] = useState(null);
    const [favorites, setFavorites] = useState(new Set());
    const [cartQuantity, setCartQuantity] = useState(1);

    // Lock body scroll when modals are open
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

            {}
            <header className="flex-shrink-0 bg-white border-b border-gray-100 z-50 relative">
                <div className="px-4 lg:px-6 h-16 lg:h-20 flex items-center justify-between gap-4">
                    
                    {/* Left: Menu & Logo */}
                    <div className="flex items-center gap-4 shrink-0">
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
                            <Menu className="w-6 h-6" />
                        </button>
                        <a href="#" className="text-2xl lg:text-3xl font-black text-[#FF6B00] tracking-tighter">
                            JULEN<span className="text-black">EATS</span>
                        </a>
                    </div>

                    {/* Center: Delivery Toggle, Location & Search */}
                    <div className="hidden lg:flex items-center gap-4 flex-1 max-w-4xl ml-4">
                        <div className="flex items-center bg-gray-100 rounded-full p-1 shrink-0">
                            <button className="bg-white text-black px-4 py-1.5 rounded-full font-semibold shadow-sm text-sm transition-all">Delivery</button>
                            <button className="text-gray-600 px-4 py-1.5 rounded-full font-semibold hover:text-black text-sm transition-all">Pickup</button>
                        </div>
                        
                        <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-full transition-colors shrink-0 group">
                            <MapPin className="w-4 h-4 text-black" />
                            <span className="font-medium text-sm truncate max-w-[150px]">Lagos, NG</span>
                            <span className="text-gray-400 text-xs">•</span>
                            <span className="font-medium text-sm">Now</span>
                            <ChevronDown className="w-4 h-4 ml-1 group-hover:translate-y-0.5 transition-transform" />
                        </button>

                        <div className="flex-1 bg-gray-100 rounded-full flex items-center px-4 py-2.5 focus-within:ring-2 focus-within:ring-black focus-within:bg-white transition-all shadow-inner">
                            <Search className="w-5 h-5 text-gray-500 mr-3" />
                            <input type="text" placeholder="Search Julen Eats" className="bg-transparent border-none outline-none w-full text-sm font-medium placeholder-gray-500" />
                        </div>
                    </div>

                    {/* Right: Cart & Auth */}
                    <div className="flex items-center gap-3 shrink-0">
                        <button className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                        
                        <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-2 px-3">
                            <ShoppingCart className="w-5 h-5" />
                            <span className="absolute top-0 right-0 bg-green-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-white">0</span>
                            <span className="hidden md:block text-sm font-semibold ml-1">Cart</span>
                        </button>
                        
                        <button onClick={() => setIsLoginOpen(true)} className="hidden md:block px-4 py-2 text-sm font-semibold hover:bg-gray-100 rounded-full transition-colors">Log in</button>
                        <button onClick={() => setIsLoginOpen(true)} className="bg-gray-100 text-black hover:bg-gray-200 px-4 py-2 text-sm font-semibold rounded-full transition-colors whitespace-nowrap hidden sm:block">Sign up</button>
                    </div>
                </div>

                {/* Mobile Search & Delivery Bar */}
                <div className="lg:hidden px-4 pb-3 flex items-center gap-2">
                    <div className="flex items-center bg-gray-100 rounded-full p-1 shrink-0">
                        <button className="bg-white text-black px-3 py-1 rounded-full font-semibold shadow-sm text-xs">Delivery</button>
                        <button className="text-gray-600 px-3 py-1 rounded-full font-semibold text-xs">Pickup</button>
                    </div>
                    <button className="flex-1 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition-colors px-3 py-1.5 rounded-full text-xs font-medium truncate">
                        <MapPin className="w-3 h-3 shrink-0" /> <span className="truncate">Lagos, NG • Now</span> <ChevronDown className="w-3 h-3 ml-auto shrink-0" />
                    </button>
                </div>
            </header>

            {}
            <main className="flex-1 flex overflow-hidden relative">
                
                {/* Left Scrollable Area */}
                <div className="flex-1 overflow-y-auto custom-scroll relative bg-white pb-20 lg:pb-0" id="main-scroll-area">
                    
                    {/* Top Sticky Section: Categories & Filters */}
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
                            <div className="sticky right-0 w-16 h-full bg-gradient-to-l from-white to-transparent pointer-events-none hidden sm:block"></div>
                        </div>

                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3">
                            <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap">
                                <Tag className="w-4 h-4 text-black" /> Offers
                            </button>
                            <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap">
                                Delivery fee <ChevronDown className="w-3 h-3" />
                            </button>
                            <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap">
                                Under 30 min
                            </button>
                            <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap">
                                <Award className="w-4 h-4 text-black" /> Highest rated
                            </button>
                            <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap">
                                <Star className="w-4 h-4" /> Rating <ChevronDown className="w-3 h-3" />
                            </button>
                            <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap">
                                Sort <ChevronDown className="w-3 h-3" />
                            </button>
                        </div>
                    </div>

                    {}
                    <div className="px-4 lg:px-6 py-4">
                        <p className="text-sm text-gray-500 mb-6">Learn how results are ranked. <a href="#" className="underline hover:text-black">Learn more</a></p>

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
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-bold text-black mb-1 line-clamp-1">{item.name}</h3>
                                            <p className="text-sm text-gray-500 mb-1">{item.time} • {item.dist} • {item.fee}</p>
                                            {item.value && (
                                                <span className="inline-block bg-orange-50 text-[#FF6B00] text-[10px] font-bold px-2 py-0.5 rounded">{item.value}</span>
                                            )}
                                        </div>
                                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                                            {item.rating}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer inside scroll area */}
                        <div className="border-t border-gray-200 py-8 text-center text-sm text-gray-500">
                            <p className="font-bold text-black mb-2">JULEN EATS</p>
                            <p className="mb-4">Delivering happiness, one meal at a time.</p>
                            <div className="flex justify-center gap-4 text-xs">
                                <a href="#" className="hover:text-black">Terms</a>
                                <a href="#" className="hover:text-black">Privacy</a>
                                <a href="#" className="hover:text-black">Do not sell my info</a>
                            </div>
                        </div>
                    </div>
                </div>

                {}
                <div className="hidden lg:block w-[45%] xl:w-[40%] bg-gray-200 relative border-l border-gray-200 shadow-inner z-10">
                    <iframe 
                        title="Delivery Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.46310237746!2d3.20397899014168!3d6.548369389279768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng" 
                        className="w-full h-full border-0 filter contrast-110 opacity-90"
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.05)]"></div>
                    
                    {/* Floating Map Controls */}
                    <div className="absolute bottom-6 right-6 flex flex-col gap-2 pointer-events-auto">
                        <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors">
                            <Crosshair className="w-5 h-5" />
                        </button>
                        <div className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden">
                            <button className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100">
                                <Plus className="w-5 h-5" />
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors">
                                <Minus className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

            </main>

            {}
            <div className="lg:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 z-50 flex justify-around items-center h-16 pb-safe px-2 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                <button className="flex flex-col items-center justify-center w-full h-full text-black">
                    <Home className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-semibold">Home</span>
                </button>
                <button className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-black transition-colors">
                    <Search className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-semibold">Browse</span>
                </button>
                <button className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-black transition-colors">
                    <Receipt className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-semibold">Orders</span>
                </button>
                <button onClick={() => setIsLoginOpen(true)} className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-black transition-colors">
                    <User className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-semibold">Account</span>
                </button>
            </div>

            {}
            {/* Cart Backdrop */}
            <div 
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[110] transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsCartOpen(false)}
            ></div>
            
            {/* Cart Sidebar */}
            <div className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl z-[120] transform transition-transform duration-300 flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h2 className="text-xl font-black text-black">Your Cart</h2>
                    <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center text-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/2748/2748962.png" alt="Empty Cart" className="w-32 h-32 opacity-20 mb-4" />
                    <h3 className="text-lg font-bold text-black mb-2">Your cart is empty</h3>
                    <p className="text-sm text-gray-500 mb-6">Add items from a restaurant to start a new basket.</p>
                    <button onClick={() => setIsCartOpen(false)} className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">Start Shopping</button>
                </div>

                <div className="p-4 border-t border-gray-100 bg-white">
                    <button className="w-full bg-gray-100 text-gray-400 cursor-not-allowed py-4 rounded-xl font-bold flex justify-between items-center px-6">
                        <span>Checkout</span>
                        <span>₦0</span>
                    </button>
                </div>
            </div>

            {}
            {/* Item Modal Backdrop */}
            <div 
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[130] transition-opacity duration-300 ${selectedItem ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setSelectedItem(null)}
            ></div>

            {/* Item Modal Content */}
            <div className={`fixed inset-x-0 bottom-0 sm:inset-0 z-[140] flex items-end sm:items-center justify-center pointer-events-none`}>
                <div className={`bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-2xl max-h-[90vh] sm:max-h-[85vh] flex flex-col relative transform transition-all duration-300 pointer-events-auto overflow-hidden shadow-2xl ${selectedItem ? 'translate-y-0 sm:scale-100' : 'translate-y-full sm:translate-y-10 sm:scale-95'}`}>
                    
                    {selectedItem && (
                        <>
                            <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-black hover:bg-white z-20 shadow-md transition-colors">
                                <X className="w-5 h-5" />
                            </button>

                            <div className="h-64 sm:h-72 w-full relative shrink-0">
                                <img src={selectedItem.img} alt={selectedItem.name} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 custom-scroll">
                                <div className="flex justify-between items-start mb-2">
                                    <h2 className="text-3xl font-black text-black">{selectedItem.name}</h2>
                                    <p className="text-xl font-bold text-black shrink-0 ml-4">{selectedItem.price}</p>
                                </div>
                                <p className="text-gray-500 mb-6 text-sm leading-relaxed">Authentic Nigerian recipe prepared with locally sourced spices and fresh ingredients. Served hot and ready to eat.</p>

                                <div className="border-t border-gray-100 pt-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-bold text-black">Choice of Protein</h3>
                                        <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Required</span>
                                    </div>
                                    <div className="space-y-4">
                                        {['Grilled Chicken (Free)', 'Fried Beef (+ ₦500)', 'Assorted Meat (+ ₦1,200)', 'Fresh Fish (+ ₦2,000)'].map((protein, idx) => (
                                            <label key={idx} className="flex items-center justify-between cursor-pointer group">
                                                <div className="flex items-center gap-3">
                                                    <input type="radio" name="protein" defaultChecked={idx === 0} className="w-5 h-5 text-black focus:ring-black border-gray-300" />
                                                    <span className="text-black font-medium group-hover:text-[#FF6B00] transition-colors">{protein.split(' (')[0]}</span>
                                                </div>
                                                <span className="text-gray-500 text-sm">{protein.split(' (')[1].replace(')', '')}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-6 mt-6 pb-20 sm:pb-6">
                                    <h3 className="text-lg font-bold text-black mb-4">Special Instructions</h3>
                                    <textarea placeholder="e.g. Extra spicy, no onions..." className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all resize-none h-24"></textarea>
                                </div>
                            </div>

                            <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-4 shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] pb-safe">
                                <div className="flex items-center bg-gray-100 rounded-full shrink-0">
                                    <button onClick={() => setCartQuantity(Math.max(1, cartQuantity - 1))} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-600 transition-colors"><Minus className="w-4 h-4" /></button>
                                    <span className="w-8 text-center font-bold text-black">{cartQuantity}</span>
                                    <button onClick={() => setCartQuantity(cartQuantity + 1)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-600 transition-colors"><Plus className="w-4 h-4" /></button>
                                </div>
                                <button onClick={() => { setSelectedItem(null); setIsCartOpen(true); }} className="flex-1 bg-black text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-gray-800 transition-colors shadow-md">
                                    <span>Add {cartQuantity} to cart</span>
                                    <span className="w-1 h-1 bg-white rounded-full mx-1"></span>
                                    <span>{selectedItem.price}</span>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {}
            {/* Login Modal Backdrop */}
            <div 
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] transition-opacity duration-300 ${isLoginOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsLoginOpen(false)}
            ></div>

            {/* Login Modal Content */}
            <div className={`fixed inset-0 z-[210] flex items-center justify-center min-h-[100dvh] px-4 pt-4 pb-20 text-center sm:p-0 pointer-events-none`}>
                <div className={`relative bg-white rounded-[2rem] text-left overflow-hidden shadow-2xl transform transition-all duration-300 sm:my-8 sm:max-w-[420px] w-full pointer-events-auto ${isLoginOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                    
                    <button onClick={() => setIsLoginOpen(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-gray-200 transition-colors z-10">
                        <X className="w-4 h-4" />
                    </button>

                    <div className="px-6 py-8 sm:p-10 relative overflow-hidden">
                        {/* Options View */}
                        <div className={`transition-all duration-300 absolute inset-0 px-6 py-8 sm:p-10 bg-white ${loginView === 'options' ? 'translate-x-0 opacity-100 relative' : '-translate-x-full opacity-0 absolute'}`}>
                            <h3 className="text-[28px] font-black text-center text-black mb-1">Welcome</h3>
                            <p className="text-center text-gray-500 text-[15px] mb-8">Continue with one of the following options</p>

                            <div className="flex gap-2 mb-3">
                                <div className="w-[35%] relative">
                                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Prefix</label>
                                    <div className="flex items-center border border-gray-200 rounded-xl px-3 py-3.5 bg-white transition-colors cursor-pointer hover:border-gray-400">
                                        <span className="text-sm font-bold mr-1">🇳🇬</span>
                                        <span className="text-sm font-bold">+234</span>
                                        <ChevronDown className="w-3 h-3 text-gray-400 ml-auto" />
                                    </div>
                                </div>
                                <div className="w-[65%]">
                                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Phone number</label>
                                    <input type="tel" placeholder="Phone number" className="w-full border border-gray-200 rounded-xl px-4 py-3.5 bg-white text-sm focus:outline-none focus:border-[#FF6B00] transition-colors hover:border-gray-400 font-medium" />
                                </div>
                            </div>

                            <p className="text-[11px] text-gray-500 leading-tight mb-6">
                                This site is protected by reCAPTCHA and the Google <a href="#" className="text-[#00A082] font-semibold hover:underline">Privacy Policy</a> and <a href="#" className="text-[#00A082] font-semibold hover:underline">Terms of Service</a> apply.
                            </p>

                            <div className="flex gap-3 mb-6">
                                <a href="https://wa.me/2347034912710" target="_blank" rel="noreferrer" className="flex-1 border border-gray-200 text-black font-bold py-3.5 rounded-full hover:bg-gray-50 transition-colors text-[15px] flex items-center justify-center gap-2">
                                    <svg viewBox="0 0 24 24" width="20" height="20" className="text-[#25D366] fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                                    WhatsApp
                                </a>
                                <button className="flex-1 bg-[#00A082] text-white font-bold py-3.5 rounded-full hover:bg-[#008f74] transition-colors text-[15px]">
                                    SMS
                                </button>
                            </div>

                            <div className="relative flex items-center py-2 mb-6">
                                <div className="flex-grow border-t border-gray-200"></div>
                                <span className="flex-shrink-0 mx-4 text-gray-400 text-[15px]">or with</span>
                                <div className="flex-grow border-t border-gray-200"></div>
                            </div>

                            <div className="space-y-3 mb-10">
                                <button className="w-full flex items-center justify-center gap-3 border border-gray-200 text-black font-bold py-3.5 rounded-full hover:bg-gray-50 transition-colors text-[15px]">
                                    <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                                    Google
                                </button>
                                <button className="w-full flex items-center justify-center gap-3 border border-gray-200 text-black font-bold py-3.5 rounded-full hover:bg-gray-50 transition-colors text-[15px]">
                                    <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg" className="text-[#1877F2] fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                    Facebook
                                </button>
                                <button onClick={() => setLoginView('email')} className="w-full flex items-center justify-center gap-3 border border-gray-200 text-black font-bold py-3.5 rounded-full hover:bg-gray-50 transition-colors text-[15px]">
                                    <Mail className="w-5 h-5 text-gray-600" />
                                    Log in with Email
                                </button>
                            </div>

                            <p className="text-center text-[12px] text-gray-500 leading-relaxed">
                                By creating an account, you automatically accept our <a href="#" className="font-semibold text-[#00A082] hover:underline">Terms of service</a>, <a href="#" className="font-semibold text-[#00A082] hover:underline">Privacy Policy</a> and <a href="#" className="font-semibold text-[#00A082] hover:underline">Cookies Policy</a>
                            </p>
                        </div>

                        {/* Email Form View */}
                        <div className={`transition-all duration-300 absolute inset-0 px-6 py-8 sm:p-10 bg-white ${loginView === 'email' ? 'translate-x-0 opacity-100 relative' : 'translate-x-full opacity-0 absolute'}`}>
                            <button onClick={() => setLoginView('options')} className="mb-6 text-gray-500 hover:text-black transition-colors flex items-center gap-2 text-sm font-medium">
                                <ArrowLeft className="w-4 h-4" /> Back to options
                            </button>
                            <h3 className="text-[28px] font-black text-black mb-1">Log In</h3>
                            <p className="text-gray-500 text-[15px] mb-8">Enter your email and password to continue</p>

                            <form onSubmit={(e) => e.preventDefault()} className="space-y-4 mb-8">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1 font-medium">Email address</label>
                                    <input type="email" placeholder="name@example.com" className="w-full border border-gray-200 rounded-xl px-4 py-3.5 bg-white text-sm focus:outline-none focus:border-[#00A082] focus:ring-1 focus:ring-[#00A082] transition-colors" />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="block text-sm text-gray-600 font-medium">Password</label>
                                        <a href="#" className="text-xs text-[#00A082] hover:underline font-semibold">Forgot password?</a>
                                    </div>
                                    <input type="password" placeholder="••••••••" className="w-full border border-gray-200 rounded-xl px-4 py-3.5 bg-white text-sm focus:outline-none focus:border-[#00A082] focus:ring-1 focus:ring-[#00A082] transition-colors" />
                                </div>
                                <button type="submit" className="w-full bg-[#00A082] text-white font-bold py-3.5 rounded-full hover:bg-[#008f74] transition-colors text-[15px] mt-4 shadow-md">
                                    Log In
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}