import React, { useState, useEffect } from 'react';
import { 
    Menu, MapPin, Search, ShoppingCart, ChevronDown, 
    X, User, Minus, Plus, Clock, Star, Bolt, Briefcase,
    ArrowRight, Heart, ChevronRight, Check, Send, Phone,
    Loader2, CheckCircle2
} from 'lucide-react';

const FOOD_ITEMS = [
    { 
        id: 1, name: 'Classic Jollof Rice', basePrice: 4500, 
        img: 'https://uploads.onecompiler.io/44jjpumhc/1782418712158/Classic%20Jollof%20Rice%20Best.jpeg',
        desc: 'Smoky party jollof rice served with grilled chicken, plantain, and coleslaw.',
        rating: 4.8, reviews: 342, category: 'Jollof', badge: 'Popular'
    },
    { 
        id: 2, name: 'Spicy Beef Suya', basePrice: 3000, 
        img: 'https://uploads.onecompiler.io/44jjpumhc/1782418547467/Spicy%20Beef%20Suya.jpeg',
        desc: 'Thinly sliced grilled beef tossed in authentic, fiery Yaji spice mix with onions.',
        rating: 4.9, reviews: 512, category: 'Suya', badge: 'Must Try'
    },
    { 
        id: 3, name: 'Assorted Small Chops', basePrice: 2500, 
        img: 'https://uploads.onecompiler.io/44jjpumhc/1782418476169/Assorted%20Small%20Chops.jpeg',
        desc: 'Spring rolls, samosas, fluffy puff-puff, and peppered gizzard combo.',
        rating: 4.5, reviews: 128, category: 'Chops'
    },
    { 
        id: 4, name: 'Peppered Asun', basePrice: 4000, 
        img: 'https://uploads.onecompiler.io/44jjpumhc/1782418675471/Peppered%20Asun%20Grills.jpeg',
        desc: 'Spicy, smoky roasted goat meat chopped into bite-sized pieces with peppers.',
        rating: 4.7, reviews: 256, category: 'Meat', badge: 'Spicy'
    },
    { 
        id: 5, name: 'Authentic Egusi Soup', basePrice: 5500, 
        img: 'https://uploads.onecompiler.io/44jjpumhc/1782418693869/Authentic%20Egusi%20&%20Pounded%20Yam.jpeg',
        desc: 'Rich melon seed soup cooked with assorted meat, stock fish, and served with Pounded Yam.',
        rating: 4.9, reviews: 412, category: 'Soups'
    },
    { 
        id: 6, name: 'Chilled Zobo Drink', basePrice: 1500, 
        img: 'https://uploads.onecompiler.io/44jjpumhc/1782418700446/Chilled%20Zobo%20&%20Smoothies.jpeg',
        desc: 'Refreshing hibiscus tea infused with pineapple, ginger, and cloves.',
        rating: 4.6, reviews: 189, category: 'Drinks'
    },
    { 
        id: 7, name: 'Efo Riro & Amala', basePrice: 4800, 
        img: 'https://uploads.onecompiler.io/44jjpumhc/1782420008779/Efo%20Riro%20and%20Amala.jpeg',
        desc: 'Rich vegetable soup with locust beans and assorted proteins, served with soft Amala.',
        rating: 4.8, reviews: 310, category: 'Soups', badge: 'Chef Special'
    },
    { 
        id: 8, name: 'Naija Meatpies (Box of 4)', basePrice: 3500, 
        img: 'https://uploads.onecompiler.io/44jjpumhc/1782419997548/Naija%20Meatpies.jpeg',
        desc: 'Flaky pastry filled with seasoned minced meat, potatoes, and carrots.',
        rating: 4.7, reviews: 205, category: 'Pastries'
    }
];

const FAQS = [
    { id: 1, question: "How fast is the delivery?", answer: "Our standard delivery time is under 30 minutes depending on your location. We use optimized routing to ensure your food arrives piping hot and fresh." },
    { id: 2, question: "Will my food be fresh?", answer: "Absolutely! We pride ourselves on preparing meals fresh daily. Our traditional recipes require premium ingredients that we source directly from trusted local markets." },
    { id: 3, question: "How do I order corporate catering?", answer: "It's easy! Just scroll down to our Corporate Catering section and click 'Request a Quote', or contact us via WhatsApp. We provide customized menus for your team." },
    { id: 4, question: "What are your operating hours?", answer: "We never close! Late night cravings or early breakfast? We are actively cooking and delivering 24 hours a day, 7 days a week." }
];

const CATEGORIES = [
    { id: 1, name: 'Jollof', icon: '🍚' },
    { id: 2, name: 'Suya', icon: '🥩' },
    { id: 3, name: 'Chops', icon: '🥟' },
    { id: 4, name: 'Soups', icon: '🍲' },
    { id: 5, name: 'Protein', icon: '🍗' },
    { id: 6, name: 'Drinks', icon: '🥤' },
    { id: 7, name: 'Healthy', icon: '🥬' },
    { id: 8, name: 'Bakery', icon: '🍞' }
];

const PROTEIN_OPTIONS = [
    { name: 'Grilled Chicken', price: 0 },
    { name: 'Fried Beef', price: 500 },
    { name: 'Assorted Meat', price: 1200 },
    { name: 'Fresh Fish', price: 2000 }
];

export default function App() {
    const [viewMode, setViewMode] = useState('delivery'); // 'delivery' or 'pickup'
    const [address, setAddress] = useState('');
    
    // Modals & Panels
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [loginView, setLoginView] = useState('options'); // 'options' or 'email'
    const [selectedItem, setSelectedItem] = useState(null); // For Item Modal
    const [orderSuccess, setOrderSuccess] = useState(false); // Checkout Success Modal
    
    // Cart & Selections
    const [cart, setCart] = useState([]);
    const [selectedProtein, setSelectedProtein] = useState(PROTEIN_OPTIONS[0]);
    const [itemQuantity, setItemQuantity] = useState(1);
    const [isCheckingOut, setIsCheckingOut] = useState(false); // Loading state
    
    // FAQ State
    const [activeFaq, setActiveFaq] = useState(FAQS[0]);

    // Derived State
    const cartSubtotal = cart.reduce((sum, item) => sum + item.finalPrice, 0);
    const deliveryFee = cartSubtotal > 0 && viewMode === 'delivery' ? 1200 : 0;
    const cartTotal = cartSubtotal + deliveryFee;
    const currentItemTotal = selectedItem ? (selectedItem.basePrice + selectedProtein.price) * itemQuantity : 0;

    const openItemModal = (item) => {
        setSelectedItem(item);
        setSelectedProtein(PROTEIN_OPTIONS[0]);
        setItemQuantity(1);
    };

    const closeItemModal = () => {
        setSelectedItem(null);
    };

    const handleAddToCart = () => {
        if (!selectedItem) return;
        
        const cartItem = {
            ...selectedItem,
            cartId: Date.now(), // Unique ID for cart instance
            protein: selectedProtein,
            quantity: itemQuantity,
            finalPrice: currentItemTotal
        };
        
        setCart([...cart, cartItem]);
        closeItemModal();
        setIsCartOpen(true);
    };

    const removeFromCart = (cartId) => {
        setCart(cart.filter(item => item.cartId !== cartId));
    };

    const updateCartQuantity = (cartId, delta) => {
        setCart(cart.map(item => {
            if (item.cartId === cartId) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return {
                    ...item,
                    quantity: newQuantity,
                    finalPrice: (item.basePrice + item.protein.price) * newQuantity
                };
            }
            return item;
        }));
    };

    const handleMockCheckout = () => {
        setIsCheckingOut(true);
        // Simulate API/Payment processing delay for 2 seconds
        setTimeout(() => {
            setIsCheckingOut(false);
            setIsCartOpen(false);
            setOrderSuccess(true);
            setCart([]); // Clear the cart after successful order
        }, 2000);
    };

    const handleOrderNowClick = () => {
        if (address.trim() === '') {
            // Focus input if empty (handled gracefully without alert)
            document.getElementById('address-input')?.focus();
            return;
        }
        document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-white text-[#1A1A1A] font-sans overflow-x-hidden selection:bg-[#FF6B00] selection:text-white">
            
            {/* Top Navigation Bar */}
            <nav className="fixed w-full z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 h-20">
                <div className="h-full px-4 lg:px-6 flex items-center justify-between gap-4 max-w-[1600px] mx-auto">
                    
                    {/* Left: Menu & Logo */}
                    <div className="flex items-center gap-4 shrink-0">
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block lg:hidden">
                            <Menu className="w-6 h-6" />
                        </button>
                        <a href="#" className="text-2xl lg:text-3xl font-black text-[#FF6B00] tracking-tighter">
                            JULEN<span className="text-black">EATS</span>
                        </a>
                    </div>

                    {/* Center: Delivery Toggle, Location & Search */}
                    <div className="hidden lg:flex items-center gap-4 flex-1 max-w-4xl ml-4">
                        {/* Toggle */}
                        <div className="flex items-center bg-gray-100 rounded-full p-1 shrink-0">
                            <button 
                                onClick={() => setViewMode('delivery')}
                                className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${viewMode === 'delivery' ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:text-black'}`}>
                                Delivery
                            </button>
                            <button 
                                onClick={() => setViewMode('pickup')}
                                className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${viewMode === 'pickup' ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:text-black'}`}>
                                Pickup
                            </button>
                        </div>
                        
                        {/* Location */}
                        <button className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-full transition-colors shrink-0 group border border-transparent hover:border-gray-200">
                            <MapPin className="w-5 h-5 text-black" />
                            <span className="font-semibold text-sm truncate max-w-[150px]">{address || 'Lagos, NG'}</span>
                            <span className="text-gray-400 text-xs">•</span>
                            <span className="font-semibold text-sm">Now</span>
                            <ChevronDown className="w-4 h-4 text-gray-500 group-hover:translate-y-0.5 transition-transform" />
                        </button>

                        {/* Search */}
                        <div className="flex-1 bg-gray-100 rounded-full flex items-center px-4 py-2.5 focus-within:ring-2 focus-within:ring-black focus-within:bg-white transition-all">
                            <Search className="w-5 h-5 text-gray-500 mr-3" />
                            <input 
                                type="text" 
                                placeholder="Search Julen Eats" 
                                className="bg-transparent border-none outline-none w-full text-sm font-semibold placeholder-gray-500"
                            />
                        </div>
                    </div>

                    {/* Right: Cart & Auth */}
                    <div className="flex items-center gap-2 shrink-0">
                        <button className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <Search className="w-6 h-6" />
                        </button>
                        
                        <button 
                            onClick={() => setIsLoginOpen(true)} 
                            className="hidden md:flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                            <User className="w-4 h-4" /> Log in
                        </button>
                        
                        <button 
                            onClick={() => setIsCartOpen(true)} 
                            className="relative p-2.5 bg-black text-white hover:bg-gray-800 rounded-full transition-colors flex items-center gap-2 px-5 group">
                            <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-bold">Cart • {cart.length}</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Search & Delivery Bar */}
                <div className="lg:hidden px-4 pb-3 flex items-center gap-2 bg-white border-b border-gray-100">
                    <div className="flex items-center bg-gray-100 rounded-full p-1 shrink-0">
                        <button 
                            onClick={() => setViewMode('delivery')}
                            className={`px-4 py-1.5 rounded-full font-bold text-xs transition-all ${viewMode === 'delivery' ? 'bg-white text-black shadow-sm' : 'text-gray-600'}`}>
                            Delivery
                        </button>
                        <button 
                            onClick={() => setViewMode('pickup')}
                            className={`px-4 py-1.5 rounded-full font-bold text-xs transition-all ${viewMode === 'pickup' ? 'bg-white text-black shadow-sm' : 'text-gray-600'}`}>
                            Pickup
                        </button>
                    </div>
                    <button className="flex-1 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition-colors px-4 py-1.5 rounded-full text-xs font-semibold truncate">
                        <MapPin className="w-3 h-3" /> {address || 'Lagos, NG'} • Now
                    </button>
                </div>
            </nav>

            {}
            <main className="pt-24 lg:pt-20 flex min-h-screen">
                
                {/* Left Scrollable Area */}
                <div className={`flex-1 transition-all duration-500 overflow-y-auto pb-24 lg:pb-0 ${viewMode === 'pickup' ? 'w-full lg:w-[60%] xl:w-[65%]' : 'w-full'}`}>
                    
                    {/* Category Scroll Bar */}
                    <div className="bg-white px-4 lg:px-8 py-4 border-b border-gray-100">
                        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            {CATEGORIES.map(cat => (
                                <button key={cat.id} className="flex flex-col items-center gap-2 min-w-[72px] group shrink-0">
                                    <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-100 group-hover:border-gray-200 transition-all shadow-sm">
                                        <span className="text-3xl transform group-hover:scale-110 transition-transform">{cat.icon}</span>
                                    </div>
                                    <span className="text-[13px] font-bold text-gray-800">{cat.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Inline Hero / Header within scroll area */}
                    <div className="px-4 lg:px-8 py-8 lg:py-12 bg-[#FFF9F5] border-b border-orange-100">
                        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-5xl lg:text-7xl font-black mb-6 tracking-tight leading-[1.1]">
                                    We have <br/><span className="text-[#FF6B00]">food for you!</span>
                                </h1>
                                
                                {/* Address Input & Order Button */}
                                <div className="flex flex-col sm:flex-row gap-2 max-w-xl mx-auto md:mx-0 mb-6">
                                    <div className="flex-1 relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input 
                                            id="address-input"
                                            type="text" 
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="Enter delivery address" 
                                            className="w-full bg-white border border-gray-200 rounded-full py-4 pl-12 pr-4 font-semibold focus:outline-none focus:border-[#FF6B00] shadow-sm"
                                        />
                                    </div>
                                    <button 
                                        onClick={handleOrderNowClick}
                                        className="bg-[#FF6B00] text-white px-8 py-4 rounded-full font-bold hover:bg-[#e66000] transition-colors shadow-lg shadow-orange-500/20 shrink-0">
                                        Order now
                                    </button>
                                </div>

                                <div className="flex items-center justify-center md:justify-start gap-4 text-sm font-semibold">
                                    <a href="https://wa.me/2347034912710" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#00A082] hover:underline bg-[#00A082]/10 px-4 py-2 rounded-full">
                                        <Phone className="w-4 h-4" /> Order via WhatsApp
                                    </a>
                                </div>
                            </div>
                            
                            {/* Rotating Platter */}
                            <div className="w-64 h-64 lg:w-80 lg:h-80 shrink-0 relative">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF6B00] to-yellow-400 animate-[spin_40s_linear_infinite] opacity-20 blur-xl"></div>
                                <img 
                                    src="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=600&q=80" 
                                    alt="Platter" 
                                    className="w-full h-full object-cover rounded-full border-[6px] border-white shadow-2xl relative z-10 animate-[spin_60s_linear_infinite]"
                                />
                                <div className="absolute -bottom-4 -left-4 bg-white px-4 py-2 rounded-2xl shadow-xl z-20 flex items-center gap-2 font-bold border border-gray-100">
                                    <Bolt className="text-[#FF6B00] w-5 h-5" /> Under 30 min
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sticky Filter Bar */}
                    <div id="menu-section" className="sticky top-0 bg-white z-30 px-4 lg:px-8 py-4 border-b border-gray-100 shadow-[0_4px_10px_rgba(0,0,0,0.02)]">
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar -mb-2">
                            <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-full text-sm font-bold transition-colors whitespace-nowrap">
                                <Bolt className="w-4 h-4 text-[#FF6B00]" /> Offers
                            </button>
                            <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-full text-sm font-bold transition-colors whitespace-nowrap">
                                Delivery fee <ChevronDown className="w-4 h-4" />
                            </button>
                            <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-full text-sm font-bold transition-colors whitespace-nowrap">
                                Under 30 min
                            </button>
                            <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-full text-sm font-bold transition-colors whitespace-nowrap">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> Rating <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Food Grid */}
                    <div className="px-4 lg:px-8 py-8">
                        <h2 className="text-3xl font-black mb-6">Popular Demands</h2>
                        <div className={`grid grid-cols-1 sm:grid-cols-2 ${viewMode === 'pickup' ? 'xl:grid-cols-2' : 'lg:grid-cols-3 xl:grid-cols-4'} gap-6`}>
                            {FOOD_ITEMS.map((item) => (
                                <div key={item.id} onClick={() => openItemModal(item)} className="bg-white group cursor-pointer border border-transparent hover:border-gray-100 rounded-2xl p-3 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300">
                                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-gray-100">
                                        <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        {item.badge && (
                                            <div className="absolute top-3 left-3 bg-[#FF6B00] text-white text-[11px] font-black uppercase px-2.5 py-1 rounded-md shadow-sm">
                                                {item.badge}
                                            </div>
                                        )}
                                        <button 
                                            onClick={(e) => e.stopPropagation()} 
                                            className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shadow-sm">
                                            <Heart className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="text-lg font-bold leading-tight truncate pr-2">{item.name}</h3>
                                            <div className="bg-gray-100 rounded-full px-2 py-0.5 flex items-center gap-1 shrink-0">
                                                <span className="text-xs font-bold">{item.rating}</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-500 text-sm mb-3 line-clamp-1">{item.desc}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="font-black text-lg">₦{item.basePrice.toLocaleString()}</span>
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                                                <Plus className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {}
                    {/* Corporate Catering Banner */}
                    <div id="catering" className="px-4 lg:px-8 mb-12">
                        <div className="bg-[#FF6B00] rounded-3xl p-8 lg:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
                            <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-white opacity-5 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
                            <div className="relative z-10 md:w-1/2 text-white">
                                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">For Business</span>
                                <h2 className="text-4xl lg:text-5xl font-black mb-4 leading-tight">Impress Your Team.<br/>Book Catering.</h2>
                                <p className="text-white/90 font-medium mb-8">Premium Nigerian cuisine packed perfectly for your board meetings and office parties.</p>
                                <button className="bg-white text-[#FF6B00] px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-colors shadow-lg flex items-center gap-2">
                                    Request a Quote <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="relative z-10 md:w-5/12 w-full">
                                <img src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80" alt="Catering" className="rounded-2xl shadow-2xl border-4 border-white/20 aspect-video md:aspect-square object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div id="faq" className="px-4 lg:px-8 py-12 bg-gray-50 border-t border-gray-100">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-black mb-8 text-center">Frequently Asked Questions</h2>
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="w-full md:w-1/2 space-y-3">
                                    {FAQS.map(faq => (
                                        <button 
                                            key={faq.id}
                                            onClick={() => setActiveFaq(faq)}
                                            className={`w-full text-left px-6 py-4 rounded-2xl font-bold transition-all border ${activeFaq.id === faq.id ? 'bg-black text-white border-black shadow-md' : 'bg-white text-black border-gray-200 hover:border-[#FF6B00]'}`}>
                                            {faq.question}
                                        </button>
                                    ))}
                                </div>
                                <div className="w-full md:w-1/2 bg-[#FFD700] rounded-3xl p-8 flex flex-col justify-center min-h-[250px] shadow-lg relative overflow-hidden">
                                    <h3 className="text-3xl font-black mb-4">Ans.</h3>
                                    <p className="text-xl font-medium leading-relaxed">{activeFaq.answer}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="px-4 lg:px-8 py-12 border-t border-gray-200 bg-white text-center md:text-left">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div>
                                <h2 className="text-2xl font-black text-[#FF6B00] tracking-tighter mb-2">JULEN<span className="text-black">EATS</span></h2>
                                <p className="text-gray-500 text-sm">© 2026 Julen Eats. All rights reserved.</p>
                            </div>
                            <div className="flex gap-6 text-sm font-semibold text-gray-600">
                                <a href="#" className="hover:text-black">Terms</a>
                                <a href="#" className="hover:text-black">Privacy</a>
                                <a href="#" className="hover:text-black">Delivery Zones</a>
                            </div>
                        </div>
                    </footer>
                </div>

                {}
                {/* Right Fixed Area (Map for Pickup) */}
                {viewMode === 'pickup' && (
                    <div className="hidden lg:block w-[40%] xl:w-[35%] bg-gray-200 relative border-l border-gray-200 shadow-inner z-10 h-[calc(100vh-80px)] sticky top-20">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.46310237746!2d3.20397899014168!3d6.548369389279768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0, filter: 'contrast(1.1) opacity(0.9)' }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                        <div className="absolute top-6 left-6 bg-white px-4 py-3 rounded-xl shadow-lg border border-gray-100">
                            <p className="font-bold text-sm">Pickup Available</p>
                            <p className="text-xs text-gray-500">Julen Eats HQ, Lagos</p>
                        </div>
                    </div>
                )}
            </main>

            {/* Mobile Bottom Navigation */}
            <div className="lg:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 z-40 flex justify-around items-center h-16 pb-safe px-2 shadow-[0_-5px_10px_rgba(0,0,0,0.02)]">
                <button onClick={() => window.scrollTo(0,0)} className="flex flex-col items-center justify-center w-full h-full text-black">
                    <MapPin className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-bold">Home</span>
                </button>
                <button onClick={() => document.getElementById('menu-section')?.scrollIntoView()} className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-black transition-colors">
                    <Search className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-bold">Browse</span>
                </button>
                <button onClick={() => setIsCartOpen(true)} className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-black transition-colors relative">
                    <ShoppingCart className="w-5 h-5 mb-1" />
                    {cart.length > 0 && <span className="absolute top-1 right-5 w-2 h-2 bg-red-500 rounded-full"></span>}
                    <span className="text-[10px] font-bold">Cart</span>
                </button>
                <button onClick={() => setIsLoginOpen(true)} className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-black transition-colors">
                    <User className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-bold">Account</span>
                </button>
            </div>

            {/* Floating WhatsApp Button */}
            <a href="https://wa.me/2347034912710" target="_blank" rel="noopener noreferrer" className="fixed bottom-20 lg:bottom-6 right-6 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-[0_10px_20px_rgba(37,211,102,0.3)] hover:scale-110 transition-transform z-40 border-2 border-white">
                <Phone className="w-6 h-6 fill-current" />
            </a>

            {}
            {/* Slide-out Cart Panel */}
            <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
                <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <h2 className="text-2xl font-black">Your Cart</h2>
                        <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                                <ShoppingCart className="w-16 h-16 mb-4 text-gray-400" />
                                <h3 className="text-xl font-bold mb-2">Cart is empty</h3>
                                <p className="text-sm">Add some delicious items to start your order.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cart.map((item) => (
                                    <div key={item.cartId} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4">
                                        <img src={item.img} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-bold text-sm leading-tight pr-2">{item.name}</h4>
                                                <button onClick={() => removeFromCart(item.cartId)} className="text-gray-400 hover:text-red-500 transition-colors">
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1 mb-3">+ {item.protein.name}</p>
                                            <div className="flex justify-between items-center">
                                                <span className="font-black text-sm">₦{item.finalPrice.toLocaleString()}</span>
                                                <div className="flex items-center bg-gray-100 rounded-full border border-gray-200">
                                                    <button onClick={() => updateCartQuantity(item.cartId, -1)} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"><Minus className="w-3 h-3" /></button>
                                                    <span className="w-6 text-center font-bold text-xs">{item.quantity}</span>
                                                    <button onClick={() => updateCartQuantity(item.cartId, 1)} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"><Plus className="w-3 h-3" /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="p-6 bg-white border-t border-gray-100">
                        {cart.length > 0 && (
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500 font-medium">Subtotal</span>
                                    <span className="font-bold">₦{cartSubtotal.toLocaleString()}</span>
                                </div>
                                {viewMode === 'delivery' && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500 font-medium">Delivery Fee</span>
                                        <span className="font-bold">₦{deliveryFee.toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                    <span className="text-gray-800 font-bold">Total</span>
                                    <span className="text-2xl font-black">₦{cartTotal.toLocaleString()}</span>
                                </div>
                            </div>
                        )}
                        
                        <button 
                            disabled={cart.length === 0 || isCheckingOut}
                            onClick={handleMockCheckout}
                            className={`w-full py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-all shadow-md ${cart.length === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#FF6B00] text-white hover:bg-[#e66000] hover:shadow-lg'}`}>
                            {isCheckingOut ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                                </>
                            ) : (
                                <>
                                    Go to Checkout <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Order Success Modal */}
            <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${orderSuccess ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOrderSuccess(false)}></div>
                <div className={`bg-white rounded-[2rem] w-full max-w-sm p-8 relative z-10 shadow-2xl text-center transition-transform duration-300 ${orderSuccess ? 'scale-100' : 'scale-95'}`}>
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="text-3xl font-black mb-2">Order Placed!</h2>
                    <p className="text-gray-500 mb-8">Your delicious Nigerian food is being prepared. {viewMode === 'delivery' ? 'It will be at your door soon.' : 'We will notify you when it is ready for pickup.'}</p>
                    <button 
                        onClick={() => setOrderSuccess(false)}
                        className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-colors">
                        Track Order
                    </button>
                </div>
            </div>

            {/* Food Item Modal */}
            <div className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center transition-opacity duration-300 ${selectedItem ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeItemModal}></div>
                
                {selectedItem && (
                    <div className={`bg-white w-full sm:max-w-2xl sm:rounded-[2rem] rounded-t-[2rem] max-h-[90vh] flex flex-col relative z-10 overflow-hidden shadow-2xl transition-transform duration-300 ${selectedItem ? 'translate-y-0 scale-100' : 'translate-y-full sm:translate-y-0 sm:scale-95'}`}>
                        
                        <button onClick={closeItemModal} className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-black hover:bg-white z-20 shadow-md transition-colors">
                            <X className="w-5 h-5" />
                        </button>

                        <div className="h-64 sm:h-72 w-full shrink-0 relative">
                            <img src={selectedItem.img} alt={selectedItem.name} className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-gray-50/50">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-2xl sm:text-3xl font-black">{selectedItem.name}</h2>
                                <p className="text-xl font-black shrink-0 ml-4">₦{selectedItem.basePrice.toLocaleString()}</p>
                            </div>
                            <p className="text-gray-600 mb-8 text-sm leading-relaxed">{selectedItem.desc}</p>

                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold">Choice of Protein</h3>
                                    <span className="bg-orange-100 text-[#FF6B00] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Required</span>
                                </div>
                                <div className="space-y-3">
                                    {PROTEIN_OPTIONS.map((protein, idx) => (
                                        <label key={idx} className="flex items-center justify-between cursor-pointer group p-3 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${selectedProtein.name === protein.name ? 'border-[#FF6B00] bg-[#FF6B00]' : 'border-gray-300'}`}>
                                                    {selectedProtein.name === protein.name && <Check className="w-3 h-3 text-white" />}
                                                </div>
                                                <span className="font-semibold text-sm group-hover:text-[#FF6B00] transition-colors">{protein.name}</span>
                                            </div>
                                            <span className="text-gray-500 text-sm font-medium">{protein.price === 0 ? 'Included' : `+ ₦${protein.price}`}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-white border-t border-gray-100 flex items-center gap-4 shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] pb-safe">
                            <div className="flex items-center bg-gray-100 rounded-full shrink-0 border border-gray-200">
                                <button onClick={() => setItemQuantity(Math.max(1, itemQuantity - 1))} className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"><Minus className="w-4 h-4" /></button>
                                <span className="w-8 text-center font-black text-lg">{itemQuantity}</span>
                                <button onClick={() => setItemQuantity(itemQuantity + 1)} className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"><Plus className="w-4 h-4" /></button>
                            </div>
                            <button 
                                onClick={handleAddToCart} 
                                className="flex-1 bg-black text-white py-4 rounded-xl font-bold flex justify-center items-center gap-3 hover:bg-gray-800 transition-colors shadow-lg">
                                <span>Add to cart</span>
                                <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                                <span>₦{currentItemTotal.toLocaleString()}</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {}
            {/* Login Modal */}
            <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isLoginOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsLoginOpen(false)}></div>
                
                <div className={`bg-white rounded-[2rem] w-full max-w-[420px] p-8 relative z-10 shadow-2xl transition-transform duration-300 ${isLoginOpen ? 'scale-100' : 'scale-95'}`}>
                    <button onClick={() => setIsLoginOpen(false)} className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                        <X className="w-4 h-4" />
                    </button>

                    {loginView === 'options' ? (
                        <div>
                            <h2 className="text-[28px] font-black text-center mb-1">Welcome</h2>
                            <p className="text-center text-gray-500 text-sm mb-8">Continue with one of the following options</p>

                            <div className="flex gap-2 mb-3">
                                <div className="w-[35%] relative">
                                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Prefix</label>
                                    <div className="flex items-center border border-gray-200 rounded-xl px-3 py-3.5 bg-white cursor-pointer hover:border-gray-400">
                                        <span className="text-sm font-bold mr-1">🇳🇬</span>
                                        <span className="text-sm font-bold">+234</span>
                                    </div>
                                </div>
                                <div className="w-[65%]">
                                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Phone number</label>
                                    <input type="tel" placeholder="Phone number" className="w-full border border-gray-200 rounded-xl px-4 py-3.5 bg-white text-sm focus:outline-none focus:border-[#FF6B00] font-medium" />
                                </div>
                            </div>

                            <p className="text-[11px] text-gray-500 leading-tight mb-6">
                                This site is protected by reCAPTCHA and the Google <a href="#" className="text-[#00A082] font-semibold">Privacy Policy</a> apply.
                            </p>

                            <div className="flex gap-3 mb-6">
                                <a href="https://wa.me/2347034912710" target="_blank" rel="noopener noreferrer" className="flex-1 border border-gray-200 font-bold py-3.5 rounded-full hover:bg-gray-50 flex items-center justify-center text-sm">
                                    WhatsApp
                                </a>
                                <button className="flex-1 bg-[#00A082] text-white font-bold py-3.5 rounded-full hover:bg-[#008f74] text-sm">
                                    SMS
                                </button>
                            </div>

                            <div className="flex items-center py-2 mb-6">
                                <div className="flex-grow border-t border-gray-200"></div>
                                <span className="mx-4 text-gray-400 text-sm font-medium">or with</span>
                                <div className="flex-grow border-t border-gray-200"></div>
                            </div>

                            <div className="space-y-3 mb-8">
                                <button className="w-full flex items-center justify-center gap-3 border border-gray-200 font-bold py-3.5 rounded-full hover:bg-gray-50 text-sm">
                                    Google
                                </button>
                                <button onClick={() => setLoginView('email')} className="w-full flex items-center justify-center gap-3 border border-gray-200 font-bold py-3.5 rounded-full hover:bg-gray-50 text-sm">
                                    Log in with Email
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <button onClick={() => setLoginView('options')} className="mb-6 text-gray-500 hover:text-black flex items-center gap-2 text-sm font-bold">
                                Back to options
                            </button>
                            <h3 className="text-[28px] font-black mb-1">Log In</h3>
                            <p className="text-gray-500 text-sm mb-8">Enter your email and password to continue</p>

                            <form onSubmit={(e) => e.preventDefault()} className="space-y-4 mb-8">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1 font-bold">Email address</label>
                                    <input type="email" placeholder="name@example.com" className="w-full border border-gray-200 rounded-xl px-4 py-3.5 bg-white text-sm focus:outline-none focus:border-[#00A082] focus:ring-1 focus:ring-[#00A082]" />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="block text-sm text-gray-600 font-bold">Password</label>
                                        <a href="#" className="text-xs text-[#00A082] font-bold">Forgot password?</a>
                                    </div>
                                    <input type="password" placeholder="••••••••" className="w-full border border-gray-200 rounded-xl px-4 py-3.5 bg-white text-sm focus:outline-none focus:border-[#00A082] focus:ring-1 focus:ring-[#00A082]" />
                                </div>
                                <button type="submit" className="w-full bg-[#00A082] text-white font-bold py-3.5 rounded-full hover:bg-[#008f74] mt-4 shadow-md">
                                    Log In
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
