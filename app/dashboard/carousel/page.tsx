// "use client";

// import { useState, useEffect } from "react";
// import {
//   Plus,
//   Trash2,
//   Edit2,
//   Save,
//   X,
//   Eye,
//   EyeOff,
//   LayoutGrid,
//   Loader2,
//   Check,
//   Palette,
//   ExternalLink,
// } from "lucide-react";
// import { toast } from "sonner";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";

// // --- TYPES (Matches Mongoose Schema) ---
// interface CarouselSlide {
//   _id?: string;
//   title: string;
//   subtitle: string;
//   discount: string;
//   description: string;
//   buttonText: string;
//   link: string;
//   bgClass: string;
//   textClass: string;
//   buttonClass: string;
//   isActive: boolean;
//   order: number;
// }

// // --- 🎨 EXPANDED THEME PRESETS (25+ Themes) ---
// const THEME_PRESETS = [
//   // 🔹 VIBRANT GRADIENTS
//   {
//     name: "Ocean Blue",
//     bg: "bg-gradient-to-br from-blue-600 to-cyan-400",
//     text: "text-white",
//     btn: "bg-white text-blue-600",
//     preview: "from-blue-600 to-cyan-400",
//   },
//   {
//     name: "Sunset Orange",
//     bg: "bg-gradient-to-br from-orange-500 to-red-500",
//     text: "text-white",
//     btn: "bg-white text-orange-600",
//     preview: "from-orange-500 to-red-500",
//   },
//   {
//     name: "Electric Purple",
//     bg: "bg-gradient-to-br from-purple-600 to-blue-600",
//     text: "text-white",
//     btn: "bg-white text-purple-600",
//     preview: "from-purple-600 to-blue-600",
//   },
//   {
//     name: "Neon Lime",
//     bg: "bg-gradient-to-br from-lime-400 to-emerald-600",
//     text: "text-white",
//     btn: "bg-white text-emerald-600",
//     preview: "from-lime-400 to-emerald-600",
//   },
//   {
//     name: "Pink Lemonade",
//     bg: "bg-gradient-to-br from-pink-400 to-orange-400",
//     text: "text-white",
//     btn: "bg-white text-pink-500",
//     preview: "from-pink-400 to-orange-400",
//   },
//   {
//     name: "Cherry Red",
//     bg: "bg-gradient-to-br from-red-600 to-rose-800",
//     text: "text-white",
//     btn: "bg-white text-red-600",
//     preview: "from-red-600 to-rose-800",
//   },
//   {
//     name: "Golden Hour",
//     bg: "bg-gradient-to-br from-amber-400 to-orange-600",
//     text: "text-white",
//     btn: "bg-white text-amber-600",
//     preview: "from-amber-400 to-orange-600",
//   },

//   // 🔹 DARK & ELEGANT
//   {
//     name: "Midnight Blue",
//     bg: "bg-gradient-to-br from-slate-900 to-slate-700",
//     text: "text-blue-100",
//     btn: "bg-blue-500 text-white",
//     preview: "from-slate-900 to-slate-700",
//   },
//   {
//     name: "Deep Forest",
//     bg: "bg-gradient-to-br from-green-900 to-emerald-800",
//     text: "text-emerald-100",
//     btn: "bg-emerald-500 text-white",
//     preview: "from-green-900 to-emerald-800",
//   },
//   {
//     name: "Royal Purple",
//     bg: "bg-gradient-to-br from-indigo-900 to-purple-900",
//     text: "text-purple-100",
//     btn: "bg-purple-500 text-white",
//     preview: "from-indigo-900 to-purple-900",
//   },
//   {
//     name: "Charcoal Black",
//     bg: "bg-gradient-to-br from-gray-900 to-black",
//     text: "text-gray-100",
//     btn: "bg-white text-black",
//     preview: "from-gray-900 to-black",
//   },
//   {
//     name: "Luxury Gold",
//     bg: "bg-gradient-to-br from-yellow-700 via-yellow-600 to-yellow-800",
//     text: "text-yellow-50",
//     btn: "bg-black text-yellow-500",
//     preview: "from-yellow-700 to-yellow-800",
//   },

//   // 🔹 PASTEL & SOFT
//   {
//     name: "Soft Sky",
//     bg: "bg-gradient-to-br from-sky-200 to-blue-100",
//     text: "text-blue-800",
//     btn: "bg-blue-600 text-white",
//     preview: "from-sky-200 to-blue-100",
//   },
//   {
//     name: "Lavender Mist",
//     bg: "bg-gradient-to-br from-purple-200 to-fuchsia-100",
//     text: "text-purple-800",
//     btn: "bg-purple-600 text-white",
//     preview: "from-purple-200 to-fuchsia-100",
//   },
//   {
//     name: "Minty Fresh",
//     bg: "bg-gradient-to-br from-emerald-100 to-teal-100",
//     text: "text-teal-800",
//     btn: "bg-teal-600 text-white",
//     preview: "from-emerald-100 to-teal-100",
//   },
//   {
//     name: "Peachy Keen",
//     bg: "bg-gradient-to-br from-orange-100 to-rose-100",
//     text: "text-rose-800",
//     btn: "bg-rose-500 text-white",
//     preview: "from-orange-100 to-rose-100",
//   },

//   // 🔹 SPECIAL EFFECTS
//   {
//     name: "Cyberpunk",
//     bg: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
//     text: "text-white",
//     btn: "bg-black text-white",
//     preview: "from-pink-500 via-red-500 to-yellow-500",
//   },
//   {
//     name: "Northern Lights",
//     bg: "bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500",
//     text: "text-white",
//     btn: "bg-white text-indigo-600",
//     preview: "from-teal-400 via-blue-500 to-purple-500",
//   },
//   {
//     name: "Instagram",
//     bg: "bg-gradient-to-bl from-yellow-400 via-pink-500 to-purple-600",
//     text: "text-white",
//     btn: "bg-white text-pink-600",
//     preview: "from-yellow-400 via-pink-500 to-purple-600",
//   },
//   {
//     name: "Steel Grey",
//     bg: "bg-gradient-to-br from-gray-400 to-gray-600",
//     text: "text-white",
//     btn: "bg-gray-800 text-white",
//     preview: "from-gray-400 to-gray-600",
//   },
// ];

// const initialSlide: CarouselSlide = {
//   title: "",
//   subtitle: "",
//   discount: "",
//   description: "",
//   buttonText: "Shop Now",
//   link: "/products",
//   // Default to first theme
//   bgClass: THEME_PRESETS[0].bg,
//   textClass: THEME_PRESETS[0].text,
//   buttonClass: THEME_PRESETS[0].btn,
//   isActive: true,
//   order: 0,
// };

// // --- ✨ GLASSMORPHISM STYLES ---
// const pageBackground = "fixed inset-0 bg-[#0a0a0a] -z-20";
// const ambientGlow =
//   "fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(76,29,149,0.15),_rgba(0,0,0,0))] -z-10 pointer-events-none";
// const glassCard =
//   "bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 group";
// const glassModal =
//   "bg-[#121212]/80 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl";
// const glassInput =
//   "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all";
// const glassButton =
//   "flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all active:scale-95 shadow-lg shadow-black/20 hover:shadow-xl";

// export default function AdminCarouselPage() {
//   const [slides, setSlides] = useState<CarouselSlide[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentSlide, setCurrentSlide] = useState<CarouselSlide>(initialSlide);
//   const [showModal, setShowModal] = useState(false);

//   const API_URL =
//     process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

//   // Fetch Slides
//   const fetchSlides = async () => {
//     try {
//       setIsLoading(true);
//       const token = localStorage.getItem("token");
//       const res = await axios.get(`${API_URL}/carousel/admin/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.data.success) setSlides(res.data.data);
//     } catch (error) {
//       toast.error("Failed to load slides");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSlides();
//   }, []);

//   // Submit Handler
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");

//     try {
//       if (isEditing && currentSlide._id) {
//         await axios.put(
//           `${API_URL}/carousel/${currentSlide._id}`,
//           currentSlide,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           },
//         );
//         toast.success("Updated successfully!");
//       } else {
//         await axios.post(`${API_URL}/carousel`, currentSlide, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         toast.success("Created successfully!");
//       }
//       closeModal();
//       fetchSlides();
//     } catch (error) {
//       toast.error("Operation failed");
//     }
//   };

//   // Delete Handler
//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure? This action cannot be undone.")) return;
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`${API_URL}/carousel/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Deleted!");
//       fetchSlides();
//     } catch (error) {
//       toast.error("Failed to delete");
//     }
//   };

//   // Toggle Status
//   const toggleStatus = async (slide: CarouselSlide) => {
//     try {
//       const token = localStorage.getItem("token"); // admin token get getting from local storage
//       await axios.put(
//         `${API_URL}/carousel/${slide._id}`,
//         { ...slide, isActive: !slide.isActive },
//         { headers: { Authorization: `Bearer ${token}` } },
//       );
//       fetchSlides();
//       toast.success(slide.isActive ? "Slide hidden" : "Slide activated");
//     } catch (error) {
//       toast.error("Update failed");
//     }
//   };

//   // Theme Selector
//   const handleThemeSelect = (theme: (typeof THEME_PRESETS)[0]) => {
//     setCurrentSlide({
//       ...currentSlide,
//       bgClass: theme.bg,
//       textClass: theme.text,
//       buttonClass: theme.btn,
//     });
//   };

//   const openModal = (slide?: CarouselSlide) => {
//     if (slide) {
//       setCurrentSlide(slide);
//       setIsEditing(true);
//     } else {
//       setCurrentSlide(initialSlide);
//       setIsEditing(false);
//     }
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setCurrentSlide(initialSlide);
//   };

//   return (
//     <div className="min-h-screen text-gray-100 p-4 md:p-8 font-sans relative overflow-hidden">
//       {/* 🌌 Background Effects */}
//       <div className={pageBackground}></div>
//       <div className={ambientGlow}></div>
//       {/* Floating Orbs */}
//       <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>
//       <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none"></div>

//       <div className="relative z-10 max-w-7xl mx-auto">
//         {/* --- HEADER --- */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 bg-white/5 p-6 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl">
//           <div>
//             <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
//               Carousel Manager
//             </h1>
//             <p className="text-gray-400 mt-2 text-sm flex items-center gap-2">
//               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
//               Manage your homepage banners live
//             </p>
//           </div>
//           <button
//             onClick={() => openModal()}
//             className={`${glassButton} bg-blue-600 hover:bg-blue-500 text-white border border-blue-400/20`}
//           >
//             <Plus size={20} />
//             <span>Add New Slide</span>
//           </button>
//         </div>

//         {/* --- LOADING STATE --- */}
//         {isLoading ? (
//           <div className="flex h-96 items-center justify-center">
//             <div className="flex flex-col items-center gap-4">
//               <Loader2 className="animate-spin text-blue-500 h-10 w-10" />
//               <p className="text-gray-500 text-sm">Loading slides...</p>
//             </div>
//           </div>
//         ) : (
//           /* --- SLIDES GRID --- */
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <AnimatePresence>
//               {slides.map((slide) => (
//                 <motion.div
//                   layout
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.9 }}
//                   key={slide._id}
//                   className={glassCard}
//                 >
//                   {/* Visual Preview */}
//                   <div
//                     className={`h-48 w-full ${slide.bgClass} flex flex-col justify-center px-8 relative overflow-hidden`}
//                   >
//                     {/* Pattern Overlay */}
//                     <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay"></div>

//                     <div className="relative z-10 space-y-2">
//                       <span className="text-[10px] font-bold uppercase tracking-widest bg-black/30 backdrop-blur-md text-white px-2 py-1 rounded-md border border-white/10 inline-block">
//                         {slide.discount}
//                       </span>
//                       <h3
//                         className={`text-2xl font-bold leading-tight line-clamp-1 ${slide.textClass} drop-shadow-lg`}
//                       >
//                         {slide.title}
//                       </h3>
//                       <p
//                         className={`text-xs opacity-90 line-clamp-1 ${slide.textClass} font-medium`}
//                       >
//                         {slide.subtitle}
//                       </p>
//                     </div>

//                     {/* Status Pill */}
//                     <div className="absolute top-4 right-4">
//                       <span
//                         className={`px-3 py-1 text-[10px] font-bold rounded-full border backdrop-blur-xl shadow-lg flex items-center gap-1.5 ${
//                           slide.isActive
//                             ? "bg-green-500/20 text-white border-green-500/30"
//                             : "bg-red-500/20 text-red-200 border-red-500/30"
//                         }`}
//                       >
//                         <span
//                           className={`w-1.5 h-1.5 rounded-full ${slide.isActive ? "bg-green-400 animate-pulse" : "bg-red-400"}`}
//                         ></span>
//                         {slide.isActive ? "ACTIVE" : "HIDDEN"}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Content & Actions */}
//                   <div className="p-5 flex flex-col gap-4 bg-[#121212]/40">
//                     <div className="flex justify-between items-center text-xs text-gray-400 font-medium">
//                       <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
//                         <LayoutGrid size={14} />
//                         <span>Order: {slide.order}</span>
//                       </div>
//                       {slide.link && (
//                         <a
//                           href={slide.link}
//                           target="_blank"
//                           className="flex items-center gap-1 hover:text-blue-400 transition-colors"
//                         >
//                           Link <ExternalLink size={12} />
//                         </a>
//                       )}
//                     </div>

//                     <div className="flex items-center justify-between pt-4 border-t border-white/5">
//                       <button
//                         onClick={() => toggleStatus(slide)}
//                         className={`p-2.5 rounded-xl transition-all duration-300 ${
//                           slide.isActive
//                             ? "text-gray-400 hover:text-white hover:bg-white/10"
//                             : "text-gray-500 hover:text-gray-300"
//                         }`}
//                         title={slide.isActive ? "Hide Slide" : "Show Slide"}
//                       >
//                         {slide.isActive ? (
//                           <Eye size={18} />
//                         ) : (
//                           <EyeOff size={18} />
//                         )}
//                       </button>

//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => openModal(slide)}
//                           className="p-2.5 text-blue-400 hover:text-white hover:bg-blue-600 rounded-xl transition-all duration-300 shadow-sm"
//                           title="Edit"
//                         >
//                           <Edit2 size={18} />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(slide._id!)}
//                           className="p-2.5 text-red-400 hover:text-white hover:bg-red-600 rounded-xl transition-all duration-300 shadow-sm"
//                           title="Delete"
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>
//         )}
//       </div>

//       {/* --- MODAL (Overlay) --- */}
//       <AnimatePresence>
//         {showModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
//           >
//             <motion.div
//               initial={{ y: 50, opacity: 0, scale: 0.95 }}
//               animate={{ y: 0, opacity: 1, scale: 1 }}
//               exit={{ y: 50, opacity: 0, scale: 0.95 }}
//               className={`w-full max-w-4xl ${glassModal} flex flex-col max-h-[90vh]`}
//             >
//               {/* Modal Header */}
//               <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5 rounded-t-2xl">
//                 <div>
//                   <h2 className="text-xl font-bold text-white flex items-center gap-2">
//                     {isEditing ? (
//                       <Edit2 size={20} className="text-blue-400" />
//                     ) : (
//                       <Plus size={20} className="text-green-400" />
//                     )}
//                     {isEditing ? "Edit Slide" : "Create New Slide"}
//                   </h2>
//                   <p className="text-gray-400 text-xs mt-1 ml-7">
//                     Fill details to update homepage carousel
//                   </p>
//                 </div>
//                 <button
//                   onClick={closeModal}
//                   className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-full transition"
//                 >
//                   <X size={24} />
//                 </button>
//               </div>

//               {/* Scrollable Content */}
//               <div className="overflow-y-auto p-6 md:p-8 custom-scrollbar">
//                 <form onSubmit={handleSubmit} className="space-y-8">
//                   {/* 1. TEXT CONTENT */}
//                   <div className="space-y-5">
//                     <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
//                       <span className="w-8 h-[1px] bg-gray-600"></span>
//                       Content Details
//                     </h3>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                       <div className="space-y-2">
//                         <label className="text-xs text-gray-300 ml-1 font-medium">
//                           Main Title
//                         </label>
//                         <input
//                           required
//                           type="text"
//                           value={currentSlide.title}
//                           onChange={(e) =>
//                             setCurrentSlide({
//                               ...currentSlide,
//                               title: e.target.value,
//                             })
//                           }
//                           className={glassInput}
//                           placeholder="e.g. Monsoon Sale"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <label className="text-xs text-gray-300 ml-1 font-medium">
//                           Subtitle
//                         </label>
//                         <input
//                           required
//                           type="text"
//                           value={currentSlide.subtitle}
//                           onChange={(e) =>
//                             setCurrentSlide({
//                               ...currentSlide,
//                               subtitle: e.target.value,
//                             })
//                           }
//                           className={glassInput}
//                           placeholder="e.g. Up to 50% Off"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <label className="text-xs text-gray-300 ml-1 font-medium">
//                           Discount Badge
//                         </label>
//                         <input
//                           required
//                           type="text"
//                           value={currentSlide.discount}
//                           onChange={(e) =>
//                             setCurrentSlide({
//                               ...currentSlide,
//                               discount: e.target.value,
//                             })
//                           }
//                           className={glassInput}
//                           placeholder="e.g. FLAT 20% OFF"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <label className="text-xs text-gray-300 ml-1 font-medium">
//                           Button Link
//                         </label>
//                         <input
//                           required
//                           type="text"
//                           value={currentSlide.link}
//                           onChange={(e) =>
//                             setCurrentSlide({
//                               ...currentSlide,
//                               link: e.target.value,
//                             })
//                           }
//                           className={glassInput}
//                           placeholder="/products?category=..."
//                         />
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <label className="text-xs text-gray-300 ml-1 font-medium">
//                         Description
//                       </label>
//                       <input
//                         required
//                         type="text"
//                         value={currentSlide.description}
//                         onChange={(e) =>
//                           setCurrentSlide({
//                             ...currentSlide,
//                             description: e.target.value,
//                           })
//                         }
//                         className={glassInput}
//                         placeholder="Short catchy description..."
//                       />
//                     </div>
//                   </div>

//                   {/* 2. THEME SELECTOR */}
//                   <div className="pt-2">
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
//                         <span className="w-8 h-[1px] bg-gray-600"></span>
//                         <Palette size={14} className="text-blue-400" /> Color
//                         Theme
//                       </h3>
//                       <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/5">
//                         {THEME_PRESETS.length} Styles
//                       </span>
//                     </div>

//                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-60 overflow-y-auto custom-scrollbar p-1">
//                       {THEME_PRESETS.map((theme, idx) => (
//                         <div
//                           key={idx}
//                           onClick={() => handleThemeSelect(theme)}
//                           className={`cursor-pointer rounded-xl p-1 border-2 transition-all relative group ${
//                             currentSlide.bgClass === theme.bg
//                               ? "border-blue-500 bg-white/10 shadow-[0_0_20px_rgba(59,130,246,0.3)] scale-[1.02]"
//                               : "border-transparent hover:border-white/20 hover:bg-white/5"
//                           }`}
//                         >
//                           <div
//                             className={`h-12 rounded-lg bg-gradient-to-br ${theme.preview} flex items-center justify-center shadow-inner relative overflow-hidden`}
//                           >
//                             {currentSlide.bgClass === theme.bg && (
//                               <div className="absolute inset-0 bg-black/20 flex items-center justify-center backdrop-blur-[1px]">
//                                 <div className="bg-white rounded-full p-1 shadow-lg">
//                                   <Check
//                                     size={12}
//                                     className="text-blue-600 stroke-[3]"
//                                   />
//                                 </div>
//                               </div>
//                             )}
//                           </div>
//                           <p
//                             className={`text-[10px] text-center mt-2 font-medium truncate px-1 ${currentSlide.bgClass === theme.bg ? "text-blue-400" : "text-gray-400 group-hover:text-white"}`}
//                           >
//                             {theme.name}
//                           </p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* 3. SETTINGS */}
//                   <div className="flex flex-col sm:flex-row gap-6 pt-4 border-t border-white/10">
//                     <div className="space-y-2 w-full sm:w-1/3">
//                       <label className="text-xs text-gray-300 ml-1 font-medium">
//                         Sort Order
//                       </label>
//                       <input
//                         type="number"
//                         value={currentSlide.order}
//                         onChange={(e) =>
//                           setCurrentSlide({
//                             ...currentSlide,
//                             order: parseInt(e.target.value),
//                           })
//                         }
//                         className={glassInput}
//                       />
//                     </div>
//                     <div className="space-y-2 w-full sm:w-2/3">
//                       <label className="text-xs text-gray-300 ml-1 font-medium">
//                         Button Text
//                       </label>
//                       <input
//                         type="text"
//                         value={currentSlide.buttonText}
//                         onChange={(e) =>
//                           setCurrentSlide({
//                             ...currentSlide,
//                             buttonText: e.target.value,
//                           })
//                         }
//                         className={glassInput}
//                       />
//                     </div>
//                   </div>
//                 </form>
//               </div>

//               {/* 4. STATUS (Active/Inactive) - ఇది మిస్ అయ్యింది, ఇప్పుడు యాడ్ చేశాను */}
//               <div className="pt-4 border-t border-white/10">
//                 <label className="flex items-center gap-3 cursor-pointer group">
//                   <div className="relative">
//                     <input
//                       type="checkbox"
//                       checked={currentSlide.isActive}
//                       onChange={(e) =>
//                         setCurrentSlide({
//                           ...currentSlide,
//                           isActive: e.target.checked,
//                         })
//                       }
//                       className="peer sr-only"
//                     />
//                     {/* Custom Toggle Switch UI */}
//                     <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
//                   </div>
//                   <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
//                     Set Slide as Active
//                   </span>
//                 </label>
//               </div>

//               {/* Modal Footer */}
//               <div className="p-6 border-t border-white/10 bg-white/5 flex justify-end gap-4 rounded-b-2xl">
//                 <button
//                   onClick={closeModal}
//                   className="px-6 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition font-medium"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSubmit}
//                   className={`${glassButton} bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20`}
//                 >
//                   <Save size={18} />
//                   <span>{isEditing ? "Save Changes" : "Create Slide"}</span>
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  Eye,
  EyeOff,
  LayoutGrid,
  Loader2,
  Check,
  Palette,
  ExternalLink,
  ToggleLeft,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

// --- TYPES ---
interface CarouselSlide {
  _id?: string;
  title: string;
  subtitle: string;
  discount: string;
  description: string;
  buttonText: string;
  link: string;
  bgClass: string;
  textClass: string;
  buttonClass: string;
  isActive: boolean;
  order: number;
}

// // --- 🎨 THEME PRESETS (25+ Themes) ---
// const THEME_PRESETS = [
//   // 🔹 VIBRANT GRADIENTS
//   {
//     name: "Ocean Blue",
//     bg: "bg-gradient-to-br from-blue-600 to-cyan-400",
//     text: "text-white",
//     btn: "bg-white text-blue-600",
//     preview: "from-blue-600 to-cyan-400",
//   },
//   {
//     name: "Sunset Orange",
//     bg: "bg-gradient-to-br from-orange-500 to-red-500",
//     text: "text-white",
//     btn: "bg-white text-orange-600",
//     preview: "from-orange-500 to-red-500",
//   },
//   {
//     name: "Electric Purple",
//     bg: "bg-gradient-to-br from-purple-600 to-blue-600",
//     text: "text-white",
//     btn: "bg-white text-purple-600",
//     preview: "from-purple-600 to-blue-600",
//   },
//   {
//     name: "Neon Lime",
//     bg: "bg-gradient-to-br from-lime-400 to-emerald-600",
//     text: "text-white",
//     btn: "bg-white text-emerald-600",
//     preview: "from-lime-400 to-emerald-600",
//   },
//   {
//     name: "Pink Lemonade",
//     bg: "bg-gradient-to-br from-pink-400 to-orange-400",
//     text: "text-white",
//     btn: "bg-white text-pink-500",
//     preview: "from-pink-400 to-orange-400",
//   },
//   {
//     name: "Cherry Red",
//     bg: "bg-gradient-to-br from-red-600 to-rose-800",
//     text: "text-white",
//     btn: "bg-white text-red-600",
//     preview: "from-red-600 to-rose-800",
//   },
//   {
//     name: "Golden Hour",
//     bg: "bg-gradient-to-br from-amber-400 to-orange-600",
//     text: "text-white",
//     btn: "bg-white text-amber-600",
//     preview: "from-amber-400 to-orange-600",
//   },

//   // 🔹 DARK & ELEGANT
//   {
//     name: "Midnight Blue",
//     bg: "bg-gradient-to-br from-slate-900 to-slate-700",
//     text: "text-blue-100",
//     btn: "bg-blue-500 text-white",
//     preview: "from-slate-900 to-slate-700",
//   },
//   {
//     name: "Deep Forest",
//     bg: "bg-gradient-to-br from-green-900 to-emerald-800",
//     text: "text-emerald-100",
//     btn: "bg-emerald-500 text-white",
//     preview: "from-green-900 to-emerald-800",
//   },
//   {
//     name: "Royal Purple",
//     bg: "bg-gradient-to-br from-indigo-900 to-purple-900",
//     text: "text-purple-100",
//     btn: "bg-purple-500 text-white",
//     preview: "from-indigo-900 to-purple-900",
//   },
//   {
//     name: "Charcoal Black",
//     bg: "bg-gradient-to-br from-gray-900 to-black",
//     text: "text-gray-100",
//     btn: "bg-white text-black",
//     preview: "from-gray-900 to-black",
//   },
//   {
//     name: "Luxury Gold",
//     bg: "bg-gradient-to-br from-yellow-700 via-yellow-600 to-yellow-800",
//     text: "text-yellow-50",
//     btn: "bg-black text-yellow-500",
//     preview: "from-yellow-700 to-yellow-800",
//   },

//   // 🔹 PASTEL & SOFT
//   {
//     name: "Soft Sky",
//     bg: "bg-gradient-to-br from-sky-200 to-blue-100",
//     text: "text-blue-800",
//     btn: "bg-blue-600 text-white",
//     preview: "from-sky-200 to-blue-100",
//   },
//   {
//     name: "Lavender Mist",
//     bg: "bg-gradient-to-br from-purple-200 to-fuchsia-100",
//     text: "text-purple-800",
//     btn: "bg-purple-600 text-white",
//     preview: "from-purple-200 to-fuchsia-100",
//   },
//   {
//     name: "Minty Fresh",
//     bg: "bg-gradient-to-br from-emerald-100 to-teal-100",
//     text: "text-teal-800",
//     btn: "bg-teal-600 text-white",
//     preview: "from-emerald-100 to-teal-100",
//   },
//   {
//     name: "Peachy Keen",
//     bg: "bg-gradient-to-br from-orange-100 to-rose-100",
//     text: "text-rose-800",
//     btn: "bg-rose-500 text-white",
//     preview: "from-orange-100 to-rose-100",
//   },

//   // 🔹 SPECIAL EFFECTS
//   {
//     name: "Cyberpunk",
//     bg: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
//     text: "text-white",
//     btn: "bg-black text-white",
//     preview: "from-pink-500 via-red-500 to-yellow-500",
//   },
//   {
//     name: "Northern Lights",
//     bg: "bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500",
//     text: "text-white",
//     btn: "bg-white text-indigo-600",
//     preview: "from-teal-400 via-blue-500 to-purple-500",
//   },
//   {
//     name: "Instagram",
//     bg: "bg-gradient-to-bl from-yellow-400 via-pink-500 to-purple-600",
//     text: "text-white",
//     btn: "bg-white text-pink-600",
//     preview: "from-yellow-400 via-pink-500 to-purple-600",
//   },
//   {
//     name: "Steel Grey",
//     bg: "bg-gradient-to-br from-gray-400 to-gray-600",
//     text: "text-white",
//     btn: "bg-gray-800 text-white",
//     preview: "from-gray-400 to-gray-600",
//   },
// ];

// --- 🎨 THEME PRESETS (100+ Themes) ---
const THEME_PRESETS = [
  // ==============================
  // 🔹 BLUES & CYANS (1-12)
  // ==============================
  {
    name: "Ocean Blue",
    bg: "bg-gradient-to-br from-blue-600 to-cyan-400",
    text: "text-white",
    btn: "bg-white text-blue-600",
    preview: "from-blue-600 to-cyan-400",
  },
  {
    name: "Deep Sea",
    bg: "bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900",
    text: "text-blue-100",
    btn: "bg-blue-500 text-white",
    preview: "from-blue-900 to-indigo-900",
  },
  {
    name: "Electric Blue",
    bg: "bg-gradient-to-br from-blue-500 to-indigo-600",
    text: "text-white",
    btn: "bg-white text-indigo-600",
    preview: "from-blue-500 to-indigo-600",
  },
  {
    name: "Sky High",
    bg: "bg-gradient-to-b from-sky-400 to-blue-500",
    text: "text-white",
    btn: "bg-white text-sky-600",
    preview: "from-sky-400 to-blue-500",
  },
  {
    name: "Aqua Marine",
    bg: "bg-gradient-to-tr from-cyan-500 to-teal-400",
    text: "text-white",
    btn: "bg-teal-800 text-white",
    preview: "from-cyan-500 to-teal-400",
  },
  {
    name: "Iceberg",
    bg: "bg-gradient-to-br from-cyan-100 to-blue-200",
    text: "text-blue-900",
    btn: "bg-blue-600 text-white",
    preview: "from-cyan-100 to-blue-200",
  },
  {
    name: "Night Sky",
    bg: "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900",
    text: "text-slate-100",
    btn: "bg-blue-500 text-white",
    preview: "from-slate-900 via-blue-900 to-slate-900",
  },
  {
    name: "Blueberry",
    bg: "bg-gradient-to-br from-blue-700 to-purple-800",
    text: "text-white",
    btn: "bg-white text-purple-700",
    preview: "from-blue-700 to-purple-800",
  },
  {
    name: "Pacific",
    bg: "bg-gradient-to-r from-teal-500 to-blue-600",
    text: "text-white",
    btn: "bg-white text-teal-600",
    preview: "from-teal-500 to-blue-600",
  },
  {
    name: "Baby Blue",
    bg: "bg-gradient-to-br from-blue-200 to-cyan-200",
    text: "text-blue-800",
    btn: "bg-blue-600 text-white",
    preview: "from-blue-200 to-cyan-200",
  },
  {
    name: "Denim",
    bg: "bg-gradient-to-br from-blue-800 to-gray-800",
    text: "text-blue-100",
    btn: "bg-orange-500 text-white",
    preview: "from-blue-800 to-gray-800",
  },
  {
    name: "Frost",
    bg: "bg-gradient-to-tr from-white via-blue-100 to-white",
    text: "text-blue-900",
    btn: "bg-blue-500 text-white",
    preview: "from-white via-blue-100 to-white",
  },

  // ==============================
  // 🔸 REDS & ORANGES (13-24)
  // ==============================
  {
    name: "Sunset",
    bg: "bg-gradient-to-br from-orange-500 to-red-500",
    text: "text-white",
    btn: "bg-white text-orange-600",
    preview: "from-orange-500 to-red-500",
  },
  {
    name: "Cherry Bomb",
    bg: "bg-gradient-to-br from-red-600 to-rose-800",
    text: "text-white",
    btn: "bg-white text-red-600",
    preview: "from-red-600 to-rose-800",
  },
  {
    name: "Lava Flow",
    bg: "bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500",
    text: "text-white",
    btn: "bg-black text-white",
    preview: "from-red-500 via-orange-500 to-yellow-500",
  },
  {
    name: "Coral Reef",
    bg: "bg-gradient-to-br from-rose-400 to-orange-300",
    text: "text-rose-900",
    btn: "bg-white text-rose-500",
    preview: "from-rose-400 to-orange-300",
  },
  {
    name: "Burnt Sienna",
    bg: "bg-gradient-to-br from-orange-700 to-red-900",
    text: "text-orange-100",
    btn: "bg-orange-400 text-black",
    preview: "from-orange-700 to-red-900",
  },
  {
    name: "Peach",
    bg: "bg-gradient-to-br from-orange-200 to-rose-200",
    text: "text-rose-800",
    btn: "bg-rose-500 text-white",
    preview: "from-orange-200 to-rose-200",
  },
  {
    name: "Ferrari",
    bg: "bg-gradient-to-br from-red-600 to-red-700",
    text: "text-white",
    btn: "bg-black text-white",
    preview: "from-red-600 to-red-700",
  },
  {
    name: "Autumn",
    bg: "bg-gradient-to-br from-orange-600 to-amber-700",
    text: "text-amber-100",
    btn: "bg-white text-orange-800",
    preview: "from-orange-600 to-amber-700",
  },
  {
    name: "Tangerine",
    bg: "bg-gradient-to-r from-orange-400 to-yellow-400",
    text: "text-white",
    btn: "bg-white text-orange-500",
    preview: "from-orange-400 to-yellow-400",
  },
  {
    name: "Brick",
    bg: "bg-gradient-to-br from-red-800 to-stone-800",
    text: "text-stone-100",
    btn: "bg-white text-red-900",
    preview: "from-red-800 to-stone-800",
  },
  {
    name: "Blood Moon",
    bg: "bg-gradient-to-br from-red-900 via-black to-red-900",
    text: "text-red-500",
    btn: "bg-red-600 text-white",
    preview: "from-red-900 via-black to-red-900",
  },
  {
    name: "Salmon",
    bg: "bg-gradient-to-br from-rose-300 to-red-300",
    text: "text-red-900",
    btn: "bg-white text-red-500",
    preview: "from-rose-300 to-red-300",
  },

  // ==============================
  // 🌿 GREENS & NATURE (25-36)
  // ==============================
  {
    name: "Forest",
    bg: "bg-gradient-to-br from-green-800 to-emerald-900",
    text: "text-emerald-100",
    btn: "bg-emerald-500 text-white",
    preview: "from-green-800 to-emerald-900",
  },
  {
    name: "Neon Lime",
    bg: "bg-gradient-to-br from-lime-400 to-emerald-600",
    text: "text-white",
    btn: "bg-white text-emerald-600",
    preview: "from-lime-400 to-emerald-600",
  },
  {
    name: "Minty",
    bg: "bg-gradient-to-br from-emerald-100 to-teal-100",
    text: "text-teal-800",
    btn: "bg-teal-600 text-white",
    preview: "from-emerald-100 to-teal-100",
  },
  {
    name: "Olive",
    bg: "bg-gradient-to-br from-lime-800 to-stone-700",
    text: "text-lime-100",
    btn: "bg-lime-500 text-black",
    preview: "from-lime-800 to-stone-700",
  },
  {
    name: "Emerald City",
    bg: "bg-gradient-to-r from-emerald-500 to-teal-500",
    text: "text-white",
    btn: "bg-white text-teal-600",
    preview: "from-emerald-500 to-teal-500",
  },
  {
    name: "Grass",
    bg: "bg-gradient-to-br from-green-400 to-green-600",
    text: "text-white",
    btn: "bg-white text-green-600",
    preview: "from-green-400 to-green-600",
  },
  {
    name: "Sage",
    bg: "bg-gradient-to-br from-stone-300 to-emerald-200",
    text: "text-emerald-900",
    btn: "bg-emerald-700 text-white",
    preview: "from-stone-300 to-emerald-200",
  },
  {
    name: "Jungle",
    bg: "bg-gradient-to-br from-green-900 via-teal-900 to-black",
    text: "text-green-400",
    btn: "bg-green-600 text-black",
    preview: "from-green-900 via-teal-900 to-black",
  },
  {
    name: "Toxic",
    bg: "bg-gradient-to-br from-yellow-300 to-lime-400",
    text: "text-lime-900",
    btn: "bg-black text-lime-400",
    preview: "from-yellow-300 to-lime-400",
  },
  {
    name: "Matcha",
    bg: "bg-gradient-to-br from-green-200 to-stone-200",
    text: "text-green-900",
    btn: "bg-green-700 text-white",
    preview: "from-green-200 to-stone-200",
  },
  {
    name: "Seafoam",
    bg: "bg-gradient-to-tr from-teal-200 to-cyan-100",
    text: "text-teal-900",
    btn: "bg-teal-600 text-white",
    preview: "from-teal-200 to-cyan-100",
  },
  {
    name: "Cactus",
    bg: "bg-gradient-to-br from-emerald-700 to-green-800",
    text: "text-white",
    btn: "bg-orange-400 text-white",
    preview: "from-emerald-700 to-green-800",
  },

  // ==============================
  // 🔮 PURPLES & PINKS (37-48)
  // ==============================
  {
    name: "Midnight Purple",
    bg: "bg-gradient-to-br from-purple-900 to-indigo-800",
    text: "text-purple-100",
    btn: "bg-purple-500 text-white",
    preview: "from-purple-900 to-indigo-800",
  },
  {
    name: "Pink Lemonade",
    bg: "bg-gradient-to-br from-pink-400 to-orange-400",
    text: "text-white",
    btn: "bg-white text-pink-500",
    preview: "from-pink-400 to-orange-400",
  },
  {
    name: "Electric Purple",
    bg: "bg-gradient-to-br from-purple-600 to-blue-600",
    text: "text-white",
    btn: "bg-white text-purple-600",
    preview: "from-purple-600 to-blue-600",
  },
  {
    name: "Lavender",
    bg: "bg-gradient-to-br from-purple-200 to-fuchsia-100",
    text: "text-purple-800",
    btn: "bg-purple-600 text-white",
    preview: "from-purple-200 to-fuchsia-100",
  },
  {
    name: "Magenta",
    bg: "bg-gradient-to-br from-fuchsia-600 to-pink-600",
    text: "text-white",
    btn: "bg-white text-fuchsia-600",
    preview: "from-fuchsia-600 to-pink-600",
  },
  {
    name: "Grape",
    bg: "bg-gradient-to-br from-violet-700 to-purple-800",
    text: "text-white",
    btn: "bg-white text-purple-800",
    preview: "from-violet-700 to-purple-800",
  },
  {
    name: "Bubblegum",
    bg: "bg-gradient-to-br from-pink-300 to-rose-300",
    text: "text-pink-900",
    btn: "bg-pink-600 text-white",
    preview: "from-pink-300 to-rose-300",
  },
  {
    name: "Royalty",
    bg: "bg-gradient-to-br from-indigo-900 to-purple-900",
    text: "text-indigo-100",
    btn: "bg-amber-400 text-black",
    preview: "from-indigo-900 to-purple-900",
  },
  {
    name: "Cotton Candy",
    bg: "bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200",
    text: "text-purple-900",
    btn: "bg-purple-600 text-white",
    preview: "from-pink-200 via-purple-200 to-indigo-200",
  },
  {
    name: "Vaporwave",
    bg: "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500",
    text: "text-white",
    btn: "bg-cyan-400 text-black",
    preview: "from-indigo-500 via-purple-500 to-pink-500",
  },
  {
    name: "Plum",
    bg: "bg-gradient-to-br from-fuchsia-900 to-slate-900",
    text: "text-fuchsia-100",
    btn: "bg-fuchsia-500 text-white",
    preview: "from-fuchsia-900 to-slate-900",
  },
  {
    name: "Flamingo",
    bg: "bg-gradient-to-br from-pink-500 to-rose-400",
    text: "text-white",
    btn: "bg-white text-rose-500",
    preview: "from-pink-500 to-rose-400",
  },

  // ==============================
  // ☀️ YELLOWS & GOLDS (49-60)
  // ==============================
  {
    name: "Golden Hour",
    bg: "bg-gradient-to-br from-amber-400 to-orange-600",
    text: "text-white",
    btn: "bg-white text-amber-600",
    preview: "from-amber-400 to-orange-600",
  },
  {
    name: "Luxury Gold",
    bg: "bg-gradient-to-br from-yellow-700 via-yellow-600 to-yellow-800",
    text: "text-yellow-50",
    btn: "bg-black text-yellow-500",
    preview: "from-yellow-700 to-yellow-800",
  },
  {
    name: "Lemon",
    bg: "bg-gradient-to-br from-yellow-300 to-yellow-400",
    text: "text-yellow-900",
    btn: "bg-black text-white",
    preview: "from-yellow-300 to-yellow-400",
  },
  {
    name: "Sunshine",
    bg: "bg-gradient-to-tr from-yellow-200 to-orange-100",
    text: "text-orange-800",
    btn: "bg-orange-500 text-white",
    preview: "from-yellow-200 to-orange-100",
  },
  {
    name: "Bee",
    bg: "bg-gradient-to-br from-yellow-400 to-black",
    text: "text-white",
    btn: "bg-white text-black",
    preview: "from-yellow-400 to-black",
  },
  {
    name: "Mustard",
    bg: "bg-gradient-to-br from-yellow-700 to-orange-800",
    text: "text-yellow-100",
    btn: "bg-yellow-400 text-black",
    preview: "from-yellow-700 to-orange-800",
  },
  {
    name: "Cream",
    bg: "bg-gradient-to-br from-yellow-50 to-orange-50",
    text: "text-orange-900",
    btn: "bg-orange-400 text-white",
    preview: "from-yellow-50 to-orange-50",
  },
  {
    name: "Amber",
    bg: "bg-gradient-to-br from-amber-500 to-amber-700",
    text: "text-white",
    btn: "bg-black text-amber-500",
    preview: "from-amber-500 to-amber-700",
  },
  {
    name: "Sand",
    bg: "bg-gradient-to-br from-stone-200 to-orange-100",
    text: "text-stone-800",
    btn: "bg-stone-600 text-white",
    preview: "from-stone-200 to-orange-100",
  },
  {
    name: "Brass",
    bg: "bg-gradient-to-br from-yellow-600 to-stone-600",
    text: "text-yellow-100",
    btn: "bg-white text-stone-800",
    preview: "from-yellow-600 to-stone-600",
  },
  {
    name: "Neon Yellow",
    bg: "bg-gradient-to-br from-yellow-300 to-lime-300",
    text: "text-black",
    btn: "bg-black text-yellow-300",
    preview: "from-yellow-300 to-lime-300",
  },
  {
    name: "Desert",
    bg: "bg-gradient-to-br from-orange-200 via-yellow-200 to-stone-300",
    text: "text-stone-800",
    btn: "bg-stone-800 text-white",
    preview: "from-orange-200 via-yellow-200 to-stone-300",
  },

  // ==============================
  // 🌑 DARK & BLACKS (61-72)
  // ==============================
  {
    name: "Charcoal",
    bg: "bg-gradient-to-br from-gray-900 to-black",
    text: "text-gray-100",
    btn: "bg-white text-black",
    preview: "from-gray-900 to-black",
  },
  {
    name: "Midnight",
    bg: "bg-gradient-to-br from-slate-900 to-slate-800",
    text: "text-slate-100",
    btn: "bg-blue-600 text-white",
    preview: "from-slate-900 to-slate-800",
  },
  {
    name: "Obsidian",
    bg: "bg-gradient-to-br from-zinc-900 to-zinc-950",
    text: "text-zinc-100",
    btn: "bg-zinc-100 text-black",
    preview: "from-zinc-900 to-zinc-950",
  },
  {
    name: "Space",
    bg: "bg-gradient-to-b from-black via-purple-950 to-black",
    text: "text-white",
    btn: "bg-white text-purple-950",
    preview: "from-black via-purple-950 to-black",
  },
  {
    name: "Vampire",
    bg: "bg-gradient-to-br from-gray-900 to-red-900",
    text: "text-red-100",
    btn: "bg-red-600 text-white",
    preview: "from-gray-900 to-red-900",
  },
  {
    name: "Gunmetal",
    bg: "bg-gradient-to-br from-gray-700 to-slate-800",
    text: "text-white",
    btn: "bg-teal-500 text-white",
    preview: "from-gray-700 to-slate-800",
  },
  {
    name: "Dark Moss",
    bg: "bg-gradient-to-br from-stone-900 to-green-900",
    text: "text-green-100",
    btn: "bg-green-600 text-white",
    preview: "from-stone-900 to-green-900",
  },
  {
    name: "Eclipse",
    bg: "bg-gradient-to-br from-gray-900 via-gray-800 to-black",
    text: "text-white",
    btn: "bg-white text-black",
    preview: "from-gray-900 via-gray-800 to-black",
  },
  {
    name: "Abyss",
    bg: "bg-gradient-to-br from-blue-950 to-black",
    text: "text-blue-100",
    btn: "bg-blue-600 text-white",
    preview: "from-blue-950 to-black",
  },
  {
    name: "Carbon",
    bg: "bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-gray-900 via-gray-800 to-black",
    text: "text-gray-200",
    btn: "bg-orange-600 text-white",
    preview: "from-gray-900 via-gray-800 to-black",
  },
  {
    name: "Luxury Dark",
    bg: "bg-gradient-to-br from-neutral-900 to-stone-900",
    text: "text-amber-100",
    btn: "bg-amber-600 text-white",
    preview: "from-neutral-900 to-stone-900",
  },
  {
    name: "Cyber Dark",
    bg: "bg-gradient-to-br from-gray-900 to-cyan-900",
    text: "text-cyan-100",
    btn: "bg-cyan-500 text-black",
    preview: "from-gray-900 to-cyan-900",
  },

  // ==============================
  // 🏳️ LIGHT & WHITES (73-84)
  // ==============================
  {
    name: "Minimal",
    bg: "bg-gradient-to-br from-gray-100 to-white",
    text: "text-gray-900",
    btn: "bg-black text-white",
    preview: "from-gray-100 to-white",
  },
  {
    name: "Paper",
    bg: "bg-gradient-to-br from-stone-100 to-stone-50",
    text: "text-stone-800",
    btn: "bg-stone-800 text-white",
    preview: "from-stone-100 to-stone-50",
  },
  {
    name: "Cloud",
    bg: "bg-gradient-to-br from-blue-50 to-white",
    text: "text-blue-900",
    btn: "bg-blue-600 text-white",
    preview: "from-blue-50 to-white",
  },
  {
    name: "Rose Water",
    bg: "bg-gradient-to-br from-rose-50 to-white",
    text: "text-rose-900",
    btn: "bg-rose-500 text-white",
    preview: "from-rose-50 to-white",
  },
  {
    name: "Pearl",
    bg: "bg-gradient-to-tr from-gray-200 via-white to-gray-200",
    text: "text-gray-800",
    btn: "bg-gray-800 text-white",
    preview: "from-gray-200 via-white to-gray-200",
  },
  {
    name: "Linen",
    bg: "bg-gradient-to-br from-orange-50 to-stone-100",
    text: "text-stone-800",
    btn: "bg-stone-600 text-white",
    preview: "from-orange-50 to-stone-100",
  },
  {
    name: "Winter",
    bg: "bg-gradient-to-br from-slate-100 to-slate-200",
    text: "text-slate-800",
    btn: "bg-slate-600 text-white",
    preview: "from-slate-100 to-slate-200",
  },
  {
    name: "Mint Cream",
    bg: "bg-gradient-to-br from-emerald-50 to-white",
    text: "text-emerald-900",
    btn: "bg-emerald-600 text-white",
    preview: "from-emerald-50 to-white",
  },
  {
    name: "Lavender White",
    bg: "bg-gradient-to-br from-purple-50 to-white",
    text: "text-purple-900",
    btn: "bg-purple-600 text-white",
    preview: "from-purple-50 to-white",
  },
  {
    name: "Clean",
    bg: "bg-white",
    text: "text-gray-900",
    btn: "bg-blue-600 text-white",
    preview: "from-white to-gray-100",
  },
  {
    name: "Ivory",
    bg: "bg-gradient-to-br from-yellow-50 to-stone-50",
    text: "text-stone-800",
    btn: "bg-stone-800 text-white",
    preview: "from-yellow-50 to-stone-50",
  },
  {
    name: "Glass",
    bg: "bg-gradient-to-br from-white to-blue-50 border border-blue-100",
    text: "text-blue-900",
    btn: "bg-blue-500 text-white",
    preview: "from-white to-blue-50",
  },

  // ==============================
  // 🌈 SPECIAL / MIXED (85-100)
  // ==============================
  {
    name: "Northern Lights",
    bg: "bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500",
    text: "text-white",
    btn: "bg-white text-indigo-600",
    preview: "from-teal-400 via-blue-500 to-purple-500",
  },
  {
    name: "Instagram",
    bg: "bg-gradient-to-bl from-yellow-400 via-pink-500 to-purple-600",
    text: "text-white",
    btn: "bg-white text-pink-600",
    preview: "from-yellow-400 via-pink-500 to-purple-600",
  },
  {
    name: "Cyberpunk",
    bg: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
    text: "text-white",
    btn: "bg-black text-white",
    preview: "from-pink-500 via-red-500 to-yellow-500",
  },
  {
    name: "Steel Grey",
    bg: "bg-gradient-to-br from-gray-400 to-gray-600",
    text: "text-white",
    btn: "bg-gray-800 text-white",
    preview: "from-gray-400 to-gray-600",
  },
  {
    name: "Rainbow",
    bg: "bg-gradient-to-r from-red-500 via-green-500 to-blue-500",
    text: "text-white",
    btn: "bg-white text-black",
    preview: "from-red-500 via-green-500 to-blue-500",
  },
  {
    name: "Holographic",
    bg: "bg-gradient-to-tr from-pink-300 via-purple-300 to-indigo-400",
    text: "text-white",
    btn: "bg-white/50 backdrop-blur-md text-purple-900",
    preview: "from-pink-300 via-purple-300 to-indigo-400",
  },
  {
    name: "Patriot",
    bg: "bg-gradient-to-br from-blue-900 via-white to-red-700",
    text: "text-slate-900",
    btn: "bg-blue-900 text-white",
    preview: "from-blue-900 via-white to-red-700",
  },
  {
    name: "Tropical",
    bg: "bg-gradient-to-br from-green-400 to-blue-500",
    text: "text-white",
    btn: "bg-yellow-400 text-black",
    preview: "from-green-400 to-blue-500",
  },
  {
    name: "Candy Shop",
    bg: "bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300",
    text: "text-purple-800",
    btn: "bg-white text-purple-600",
    preview: "from-pink-300 via-purple-300 to-cyan-300",
  },
  {
    name: "Dusk",
    bg: "bg-gradient-to-br from-indigo-800 via-purple-800 to-orange-700",
    text: "text-orange-100",
    btn: "bg-orange-500 text-white",
    preview: "from-indigo-800 via-purple-800 to-orange-700",
  },
  {
    name: "Dawn",
    bg: "bg-gradient-to-br from-indigo-300 via-purple-300 to-orange-300",
    text: "text-indigo-900",
    btn: "bg-indigo-600 text-white",
    preview: "from-indigo-300 via-purple-300 to-orange-300",
  },
  {
    name: "Grey Teal",
    bg: "bg-gradient-to-br from-gray-700 to-teal-700",
    text: "text-white",
    btn: "bg-teal-400 text-black",
    preview: "from-gray-700 to-teal-700",
  },
  {
    name: "Warmth",
    bg: "bg-gradient-to-br from-stone-500 to-orange-400",
    text: "text-white",
    btn: "bg-white text-orange-600",
    preview: "from-stone-500 to-orange-400",
  },
  {
    name: "Cooling",
    bg: "bg-gradient-to-br from-blue-200 to-slate-300",
    text: "text-slate-800",
    btn: "bg-slate-700 text-white",
    preview: "from-blue-200 to-slate-300",
  },
  {
    name: "Matrix",
    bg: "bg-gradient-to-b from-black via-green-900 to-black",
    text: "text-green-400",
    btn: "bg-green-600 text-black",
    preview: "from-black via-green-900 to-black",
  },
  {
    name: "Coffee",
    bg: "bg-gradient-to-br from-stone-800 to-orange-900",
    text: "text-orange-100",
    btn: "bg-orange-700 text-white",
    preview: "from-stone-800 to-orange-900",
  },
];

const initialSlide: CarouselSlide = {
  title: "",
  subtitle: "",
  discount: "",
  description: "",
  buttonText: "Shop Now",
  link: "/products",
  bgClass: THEME_PRESETS[0].bg,
  textClass: THEME_PRESETS[0].text,
  buttonClass: THEME_PRESETS[0].btn,
  isActive: true,
  order: 0,
};

// --- STYLES ---
const pageBackground = "fixed inset-0 bg-[#0a0a0a] -z-20";
const ambientGlow =
  "fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(76,29,149,0.15),_rgba(0,0,0,0))] -z-10 pointer-events-none";
const glassCard =
  "bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 group";
const glassModal =
  "bg-[#121212]/95 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl";
const glassInput =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-sm";
const glassButton =
  "flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all active:scale-95 shadow-lg shadow-black/20 hover:shadow-xl";

export default function AdminCarouselPage() {
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<CarouselSlide>(initialSlide);
  const [showModal, setShowModal] = useState(false);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  const fetchSlides = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/carousel/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setSlides(res.data.data);
    } catch (error) {
      toast.error("Failed to load slides");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      if (isEditing && currentSlide._id) {
        await axios.put(
          `${API_URL}/carousel/${currentSlide._id}`,
          currentSlide,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        toast.success("Updated successfully!");
      } else {
        await axios.post(`${API_URL}/carousel`, currentSlide, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Created successfully!");
      }
      closeModal();
      fetchSlides();
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This action cannot be undone.")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/carousel/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Deleted!");
      fetchSlides();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const toggleStatus = async (slide: CarouselSlide) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/carousel/${slide._id}`,
        { ...slide, isActive: !slide.isActive },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchSlides();
      toast.success(slide.isActive ? "Slide hidden" : "Slide activated");
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const handleThemeSelect = (theme: (typeof THEME_PRESETS)[0]) => {
    setCurrentSlide({
      ...currentSlide,
      bgClass: theme.bg,
      textClass: theme.text,
      buttonClass: theme.btn,
    });
  };

  const openModal = (slide?: CarouselSlide) => {
    if (slide) {
      setCurrentSlide(slide);
      setIsEditing(true);
    } else {
      setCurrentSlide(initialSlide);
      setIsEditing(false);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentSlide(initialSlide);
  };

  return (
    <div className="min-h-screen text-gray-100 p-4 md:p-8 font-sans relative overflow-hidden">
      {/* Background Effects */}
      <div className={pageBackground}></div>
      <div className={ambientGlow}></div>
      <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 bg-white/5 p-6 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Carousel Manager
            </h1>
            <p className="text-gray-400 mt-2 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Manage your homepage banners live
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className={`${glassButton} bg-blue-600 hover:bg-blue-500 text-white border border-blue-400/20`}
          >
            <Plus size={20} />
            <span>Add New Slide</span>
          </button>
        </div>

        {/* LOADING */}
        {isLoading ? (
          <div className="flex h-96 items-center justify-center">
            <Loader2 className="animate-spin text-blue-500 h-10 w-10" />
          </div>
        ) : (
          /* SLIDES GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {slides.map((slide) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={slide._id}
                  className={glassCard}
                >
                  {/* Visual Preview */}
                  <div
                    className={`h-48 w-full ${slide.bgClass} flex flex-col justify-center px-8 relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay"></div>
                    <div className="relative z-10 space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-black/30 backdrop-blur-md text-white px-2 py-1 rounded-md border border-white/10 inline-block">
                        {slide.discount}
                      </span>
                      <h3
                        className={`text-2xl font-bold leading-tight line-clamp-1 ${slide.textClass} drop-shadow-lg`}
                      >
                        {slide.title}
                      </h3>
                      <p
                        className={`text-xs opacity-90 line-clamp-1 ${slide.textClass} font-medium`}
                      >
                        {slide.subtitle}
                      </p>
                    </div>
                    {/* Status Pill */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-3 py-1 text-[10px] font-bold rounded-full border backdrop-blur-xl shadow-lg flex items-center gap-1.5 ${
                          slide.isActive
                            ? "bg-green-500/20 text-white border-green-500/30"
                            : "bg-red-500/20 text-red-200 border-red-500/30"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${slide.isActive ? "bg-green-400 animate-pulse" : "bg-red-400"}`}
                        ></span>
                        {slide.isActive ? "ACTIVE" : "HIDDEN"}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-5 flex flex-col gap-4 bg-[#121212]/40">
                    <div className="flex justify-between items-center text-xs text-gray-400 font-medium">
                      <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                        <LayoutGrid size={14} />
                        <span>Order: {slide.order}</span>
                      </div>
                      {slide.link && (
                        <a
                          href={slide.link}
                          target="_blank"
                          className="flex items-center gap-1 hover:text-blue-400 transition-colors"
                        >
                          Link <ExternalLink size={12} />
                        </a>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <button
                        onClick={() => toggleStatus(slide)}
                        className={`p-2.5 rounded-xl transition-all duration-300 ${
                          slide.isActive
                            ? "text-gray-400 hover:text-white hover:bg-white/10"
                            : "text-gray-500 hover:text-gray-300"
                        }`}
                        title={slide.isActive ? "Hide Slide" : "Show Slide"}
                      >
                        {slide.isActive ? (
                          <Eye size={18} />
                        ) : (
                          <EyeOff size={18} />
                        )}
                      </button>

                      <div className="flex gap-2">
                        <button
                          onClick={() => openModal(slide)}
                          className="p-2.5 text-blue-400 hover:text-white hover:bg-blue-600 rounded-xl transition-all duration-300 shadow-sm"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(slide._id!)}
                          className="p-2.5 text-red-400 hover:text-white hover:bg-red-600 rounded-xl transition-all duration-300 shadow-sm"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* --- MODAL (Overlay) --- */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              className={`w-full max-w-4xl ${glassModal} flex flex-col max-h-[90vh]`}
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5 rounded-t-2xl">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    {isEditing ? (
                      <Edit2 size={20} className="text-blue-400" />
                    ) : (
                      <Plus size={20} className="text-green-400" />
                    )}
                    {isEditing ? "Edit Slide" : "Create New Slide"}
                  </h2>
                  <p className="text-gray-400 text-xs mt-1 ml-7">
                    Customize your slide appearance
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-full transition"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Scrollable Form */}
              <div className="overflow-y-auto p-6 md:p-8 custom-scrollbar">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* 1. TEXT CONTENT (2 Columns) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-white/10 pb-2">
                        Main Info
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs text-gray-400 ml-1">
                            Main Title
                          </label>
                          <input
                            required
                            type="text"
                            value={currentSlide.title}
                            onChange={(e) =>
                              setCurrentSlide({
                                ...currentSlide,
                                title: e.target.value,
                              })
                            }
                            className={glassInput}
                            placeholder="e.g. Summer Sale"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-400 ml-1">
                            Subtitle
                          </label>
                          <input
                            required
                            type="text"
                            value={currentSlide.subtitle}
                            onChange={(e) =>
                              setCurrentSlide({
                                ...currentSlide,
                                subtitle: e.target.value,
                              })
                            }
                            className={glassInput}
                            placeholder="e.g. Up to 50% Off"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-400 ml-1">
                            Description
                          </label>
                          <input
                            required
                            type="text"
                            value={currentSlide.description}
                            onChange={(e) =>
                              setCurrentSlide({
                                ...currentSlide,
                                description: e.target.value,
                              })
                            }
                            className={glassInput}
                            placeholder="Brief description..."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-white/10 pb-2">
                        Action Details
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs text-gray-400 ml-1">
                            Discount Tag
                          </label>
                          <input
                            required
                            type="text"
                            value={currentSlide.discount}
                            onChange={(e) =>
                              setCurrentSlide({
                                ...currentSlide,
                                discount: e.target.value,
                              })
                            }
                            className={glassInput}
                            placeholder="e.g. FLAT 20% OFF"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-gray-400 ml-1">
                              Button Text
                            </label>
                            <input
                              type="text"
                              value={currentSlide.buttonText}
                              onChange={(e) =>
                                setCurrentSlide({
                                  ...currentSlide,
                                  buttonText: e.target.value,
                                })
                              }
                              className={glassInput}
                              placeholder="Shop Now"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-gray-400 ml-1">
                              Sort Order
                            </label>
                            <input
                              type="number"
                              value={currentSlide.order}
                              onChange={(e) =>
                                setCurrentSlide({
                                  ...currentSlide,
                                  order: parseInt(e.target.value),
                                })
                              }
                              className={glassInput}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-gray-400 ml-1">
                            Link URL
                          </label>
                          <input
                            required
                            type="text"
                            value={currentSlide.link}
                            onChange={(e) =>
                              setCurrentSlide({
                                ...currentSlide,
                                link: e.target.value,
                              })
                            }
                            className={glassInput}
                            placeholder="/products?category=..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. SETTINGS ROW (Active Toggle) */}
                  <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                    <label className="flex items-center gap-3 cursor-pointer group w-full">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={currentSlide.isActive}
                          onChange={(e) =>
                            setCurrentSlide({
                              ...currentSlide,
                              isActive: e.target.checked,
                            })
                          }
                          className="peer sr-only"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                          Set Slide as Active
                        </span>
                        <span className="text-xs text-gray-500">
                          Enable this to show the slide on the homepage
                          immediately.
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* 3. THEME SELECTOR */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                        <Palette size={14} className="text-blue-400" /> Color
                        Theme
                      </h3>
                      <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/5">
                        {THEME_PRESETS.length} Styles
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-52 overflow-y-auto custom-scrollbar p-1">
                      {THEME_PRESETS.map((theme, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleThemeSelect(theme)}
                          className={`cursor-pointer rounded-xl p-1 border-2 transition-all relative group ${
                            currentSlide.bgClass === theme.bg
                              ? "border-blue-500 bg-white/10 shadow-[0_0_15px_rgba(59,130,246,0.3)] scale-[1.02]"
                              : "border-transparent hover:border-white/20 hover:bg-white/5"
                          }`}
                        >
                          <div
                            className={`h-12 rounded-lg bg-gradient-to-br ${theme.preview} flex items-center justify-center shadow-inner relative overflow-hidden`}
                          >
                            {currentSlide.bgClass === theme.bg && (
                              <div className="absolute inset-0 bg-black/20 flex items-center justify-center backdrop-blur-[1px]">
                                <div className="bg-white rounded-full p-1 shadow-lg">
                                  <Check
                                    size={12}
                                    className="text-blue-600 stroke-[3]"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                          <p
                            className={`text-[10px] text-center mt-2 font-medium truncate px-1 ${currentSlide.bgClass === theme.bg ? "text-blue-400" : "text-gray-400 group-hover:text-white"}`}
                          >
                            {theme.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </form>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-white/10 bg-white/5 flex justify-end gap-4 rounded-b-2xl">
                <button
                  onClick={closeModal}
                  className="px-6 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className={`${glassButton} bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20`}
                >
                  <Save size={18} />
                  <span>{isEditing ? "Save Changes" : "Create Slide"}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
