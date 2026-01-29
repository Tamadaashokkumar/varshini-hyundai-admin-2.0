// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ArrowLeft,
//   Upload,
//   X,
//   Plus,
//   Trash2,
//   Tag,
//   Scale,
//   Ruler,
//   Save,
//   Loader2,
// } from "lucide-react";
// import Button from "@/components/ui/Button";
// import { ProductService } from "@/lib/api";
// import { toast } from "sonner";
// import { ProductCategory, CompatibleModel, Product } from "@/types";
// import Link from "next/link";
// import Image from "next/image";

// // --- Interfaces (Same as Add Page) ---
// interface ProductFormData {
//   name: string;
//   partNumber: string;
//   description: string;
//   category: ProductCategory;
//   subcategory: string;
//   price: number;
//   discountPrice?: number;
//   stock: number;
//   lowStockThreshold: number;
//   warrantyPeriod: string;
//   manufacturer: string;
//   compatibleModels: CompatibleModel[];
//   tags: string[];
//   weight?: number;
//   isActive: boolean;
// }

// interface Dimensions {
//   length: string;
//   width: string;
//   height: string;
//   unit: string;
// }

// interface SpecificationItem {
//   key: string;
//   value: string;
// }

// const CATEGORIES: ProductCategory[] = [
//   "Engine",
//   "Brake",
//   "Electrical",
//   "Body",
//   "Accessories",
//   "Suspension",
//   "Transmission",
//   "Interior",
//   "Exterior",
//   "Service Parts",
// ];

// const HYUNDAI_MODELS = [
//   "i10",
//   "i20",
//   "Venue",
//   "Verna",
//   "Creta",
//   "Alcazar",
//   "Tucson",
//   "Elantra",
//   "Kona",
//   "Ioniq 5",
//   "Santro",
//   "Grand i10",
//   "Aura",
//   "Exter",
// ];

// export default function EditProductPage() {
//   const router = useRouter();
//   const { id } = useParams();

//   const [isFetching, setIsFetching] = useState(true);
//   const [isSaving, setIsSaving] = useState(false);

//   // Existing Images (URLs)
//   const [existingImages, setExistingImages] = useState<
//     { url: string; publicId: string; _id?: string }[]
//   >([]);
//   // New Images to Upload (Files)
//   const [newImages, setNewImages] = useState<File[]>([]);
//   const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);

//   const [tagInput, setTagInput] = useState("");

//   // Form State
//   const [formData, setFormData] = useState<ProductFormData>({
//     name: "",
//     partNumber: "",
//     description: "",
//     category: "Engine",
//     subcategory: "",
//     price: 0,
//     stock: 0,
//     lowStockThreshold: 5,
//     warrantyPeriod: "",
//     manufacturer: "",
//     compatibleModels: [],
//     tags: [],
//     weight: undefined,
//     isActive: true,
//   });

//   const [dimensions, setDimensions] = useState<Dimensions>({
//     length: "",
//     width: "",
//     height: "",
//     unit: "cm",
//   });

//   const [specifications, setSpecifications] = useState<SpecificationItem[]>([]);

//   const [currentModel, setCurrentModel] = useState<CompatibleModel>({
//     modelName: "",
//     yearFrom: new Date().getFullYear(),
//     yearTo: undefined,
//     variant: "",
//   });

//   // --- 1. Fetch Product Data ---
//   useEffect(() => {
//     if (id) {
//       fetchProductData();
//     }
//   }, [id]);

//   const fetchProductData = async () => {
//     try {
//       const response = await ProductService.getById(id as string);
//       const product: Product = response.data.data.product || response.data;

//       // Populate Form
//       setFormData({
//         name: product.name,
//         partNumber: product.partNumber,
//         description: product.description,
//         category: product.category as ProductCategory,
//         subcategory: product.subcategory || "",
//         price: product.price,
//         discountPrice: product.discountPrice,
//         stock: product.stock,
//         lowStockThreshold: product.lowStockThreshold || 5,
//         warrantyPeriod: product.warrantyPeriod || "",
//         manufacturer: product.manufacturer || "",
//         compatibleModels: product.compatibleModels || [],
//         tags: product.tags || [],
//         weight: product.weight,
//         isActive: product.isActive,
//       });

//       // Populate Images
//       if (product.images) {
//         setExistingImages(product.images);
//       }

//       // Populate Dimensions
//       if (product.dimensions) {
//         setDimensions({
//           length: product.dimensions.length?.toString() || "",
//           width: product.dimensions.width?.toString() || "",
//           height: product.dimensions.height?.toString() || "",
//           unit: product.dimensions.unit || "cm",
//         });
//       }

//       // Populate Specifications (Convert Map/Object to Array)
//       if (product.specifications) {
//         const specsArray = Object.entries(product.specifications).map(
//           ([key, value]) => ({
//             key,
//             value: value as string,
//           }),
//         );
//         setSpecifications(specsArray);
//       } else {
//         setSpecifications([{ key: "", value: "" }]);
//       }
//     } catch (error) {
//       console.error("Fetch error:", error);
//       toast.error("Failed to load product details");
//       router.push("/dashboard/products");
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   // --- 2. Handlers ---

//   const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     const totalImages = existingImages.length + newImages.length + files.length;

//     if (totalImages > 5) {
//       toast.error("Maximum 5 images allowed in total");
//       return;
//     }

//     setNewImages([...newImages, ...files]);
//     files.forEach((file) => {
//       const reader = new FileReader();
//       reader.onloadend = () =>
//         setNewImagePreviews((prev) => [...prev, reader.result as string]);
//       reader.readAsDataURL(file);
//     });
//   };

//   // 1. అసలు డిలీట్ చేసే లాజిక్ (Helper Function)
//   const executeImageDeletion = async (index: number, imageId: string) => {
//     // Show loading toast
//     const loadingToast = toast.loading("Deleting image...");

//     try {
//       // API Call
//       await ProductService.deleteImage(id as string, imageId);

//       // Update UI State (Remove from list)
//       setExistingImages((prev) => prev.filter((_, i) => i !== index));

//       // Success Message
//       toast.dismiss(loadingToast);
//       toast.success("Image deleted successfully");
//     } catch (error: any) {
//       console.error("Error deleting image:", error);
//       toast.dismiss(loadingToast);
//       toast.error(error.response?.data?.message || "Failed to delete image");
//     }
//   };

//   // 2. మెయిన్ ఫంక్షన్ (Triggered on Click)
//   const removeExistingImage = (index: number) => {
//     const imageToDelete = existingImages[index];

//     // Validation
//     if (!id) {
//       toast.error("Product ID missing");
//       return;
//     }

//     if (!imageToDelete?._id) {
//       console.warn("Image ID missing, removing locally only");
//       setExistingImages((prev) => prev.filter((_, i) => i !== index));
//       return;
//     }

//     // ✨ STYLISH CONFIRMATION TOAST
//     toast("Are you sure?", {
//       description: "This action cannot be undone.",
//       action: {
//         label: "Delete",
//         onClick: () => executeImageDeletion(index, imageToDelete._id!), // Call the helper function
//       },
//       cancel: {
//         label: "Cancel",
//         onClick: () => console.log("Deletion cancelled"), // Optional
//       },
//       duration: 5000, // 5 seconds display time
//       // Optional: Custom Style for Dark Theme look
//       style: {
//         background: "#1f2937",
//         color: "#fff",
//         border: "1px solid #374151",
//       },
//     });
//   };

//   const removeNewImage = (index: number) => {
//     setNewImages((prev) => prev.filter((_, i) => i !== index));
//     setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));
//   };

//   // Compatible Models Logic
//   const addCompatibleModel = () => {
//     if (!currentModel.modelName) {
//       toast.error("Please select a model");
//       return;
//     }
//     setFormData((prev) => ({
//       ...prev,
//       compatibleModels: [...prev.compatibleModels, currentModel],
//     }));
//     setCurrentModel({
//       modelName: "",
//       yearFrom: new Date().getFullYear(),
//       yearTo: undefined,
//       variant: "",
//     });
//   };

//   const removeCompatibleModel = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       compatibleModels: prev.compatibleModels.filter((_, i) => i !== index),
//     }));
//   };

//   // Specifications Logic
//   const handleSpecChange = (
//     index: number,
//     field: "key" | "value",
//     value: string,
//   ) => {
//     const newSpecs = [...specifications];
//     newSpecs[index][field] = value;
//     setSpecifications(newSpecs);
//   };

//   const addSpecRow = () =>
//     setSpecifications([...specifications, { key: "", value: "" }]);
//   const removeSpecRow = (index: number) =>
//     setSpecifications(specifications.filter((_, i) => i !== index));

//   // Tags Logic
//   const handleAddTag = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && tagInput.trim()) {
//       e.preventDefault();
//       if (!formData.tags.includes(tagInput.trim())) {
//         setFormData((prev) => ({
//           ...prev,
//           tags: [...prev.tags, tagInput.trim()],
//         }));
//       }
//       setTagInput("");
//     }
//   };
//   const removeTag = (tag: string) =>
//     setFormData((prev) => ({
//       ...prev,
//       tags: prev.tags.filter((t) => t !== tag),
//     }));

//   // --- 3. Submit Handler (Update) ---
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSaving(true);

//     try {
//       const data = new FormData();

//       // Basic Fields
//       data.append("name", formData.name);
//       data.append("partNumber", formData.partNumber);
//       data.append("description", formData.description);
//       data.append("category", formData.category);
//       if (formData.subcategory)
//         data.append("subcategory", formData.subcategory);
//       data.append("price", formData.price.toString());
//       if (formData.discountPrice)
//         data.append("discountPrice", formData.discountPrice.toString());
//       data.append("stock", formData.stock.toString());
//       data.append("lowStockThreshold", formData.lowStockThreshold.toString());
//       data.append("warrantyPeriod", formData.warrantyPeriod);
//       data.append("manufacturer", formData.manufacturer);
//       data.append("isActive", formData.isActive.toString());

//       if (formData.weight) data.append("weight", formData.weight.toString());

//       // Dimensions
//       const dims = {
//         length: parseFloat(dimensions.length) || 0,
//         width: parseFloat(dimensions.width) || 0,
//         height: parseFloat(dimensions.height) || 0,
//         unit: dimensions.unit,
//       };
//       data.append("dimensions", JSON.stringify(dims));

//       // Arrays & Objects
//       data.append(
//         "compatibleModels",
//         JSON.stringify(formData.compatibleModels),
//       );
//       data.append("tags", JSON.stringify(formData.tags));

//       const specsObject = specifications.reduce(
//         (acc, curr) => {
//           if (curr.key.trim() && curr.value.trim())
//             acc[curr.key.trim()] = curr.value.trim();
//           return acc;
//         },
//         {} as Record<string, string>,
//       );
//       data.append("specifications", JSON.stringify(specsObject));

//       // Handle Images
//       // 1. Keep Existing Images (Pass as JSON string of publicIds or full objects)
//       // Backend should handle "if existingImages provided, keep them"
//       data.append("existingImages", JSON.stringify(existingImages));

//       // 2. Add New Images
//       newImages.forEach((image) => {
//         data.append("images", image); // Note: Backend key might differ, usually 'images' or specific key
//       });

//       // NOTE: Ensure your Backend Update Controller handles `existingImages` (to preserve)
//       // and `req.files` (to add new ones).

//       await ProductService.update(id as string, data);

//       toast.success("Product updated successfully!");
//       router.push("/dashboard/products");
//     } catch (error: any) {
//       console.error("Update error:", error);
//       toast.error(error.response?.data?.message || "Failed to update product");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   if (isFetching) {
//     return (
//       <div className="flex h-[80vh] items-center justify-center">
//         <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 pb-20">
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex items-center justify-between"
//       >
//         <div className="flex items-center gap-4">
//           <Link href="/dashboard/products">
//             <button className="rounded-xl bg-white/5 p-2 transition-colors hover:bg-white/10">
//               <ArrowLeft className="h-5 w-5 text-white" />
//             </button>
//           </Link>
//           <div>
//             <h1 className="text-3xl font-bold text-white">Edit Product</h1>
//             <p className="mt-1 text-gray-400">
//               Update product details and stock
//             </p>
//           </div>
//         </div>
//       </motion.div>

//       {/* Form */}
//       <motion.form
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.1 }}
//         onSubmit={handleSubmit}
//         className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm"
//       >
//         <div className="space-y-8">
//           {/* 1. Basic Information */}
//           <div>
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold text-white">
//                 Basic Information
//               </h2>
//               {/* Active Toggle */}
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={formData.isActive}
//                   onChange={(e) =>
//                     setFormData({ ...formData, isActive: e.target.checked })
//                   }
//                   className="sr-only peer"
//                 />
//                 <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                 <span className="ms-3 text-sm font-medium text-white">
//                   {formData.isActive ? "Active Listing" : "Draft / Inactive"}
//                 </span>
//               </label>
//             </div>

//             <div className="grid gap-6 md:grid-cols-2">
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-300">
//                   Product Name *
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                   className="form-input"
//                 />
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-300">
//                   Part Number *
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={formData.partNumber}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       partNumber: e.target.value.toUpperCase(),
//                     })
//                   }
//                   className="form-input"
//                 />
//               </div>

//               <div className="md:col-span-2">
//                 <label className="mb-2 block text-sm font-medium text-gray-300">
//                   Description *
//                 </label>
//                 <textarea
//                   required
//                   rows={4}
//                   value={formData.description}
//                   onChange={(e) =>
//                     setFormData({ ...formData, description: e.target.value })
//                   }
//                   className="form-input"
//                 />
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-300">
//                   Category *
//                 </label>
//                 <select
//                   required
//                   value={formData.category}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       category: e.target.value as ProductCategory,
//                     })
//                   }
//                   className="form-input"
//                 >
//                   {CATEGORIES.map((cat) => (
//                     <option key={cat} value={cat}>
//                       {cat}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-300">
//                   Subcategory
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.subcategory}
//                   onChange={(e) =>
//                     setFormData({ ...formData, subcategory: e.target.value })
//                   }
//                   className="form-input"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="h-px bg-white/10" />

//           {/* 2. Pricing & Stock */}
//           <div>
//             <h2 className="mb-4 text-xl font-semibold text-white">
//               Pricing & Stock
//             </h2>
//             <div className="grid gap-6 md:grid-cols-4">
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-300">
//                   Price (₹) *
//                 </label>
//                 <input
//                   type="number"
//                   required
//                   min="0"
//                   value={formData.price}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       price: parseFloat(e.target.value),
//                     })
//                   }
//                   className="form-input"
//                 />
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-300">
//                   Discount Price (₹)
//                 </label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={formData.discountPrice || ""}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       discountPrice: e.target.value
//                         ? parseFloat(e.target.value)
//                         : undefined,
//                     })
//                   }
//                   className="form-input"
//                 />
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-300">
//                   Stock Quantity *
//                 </label>
//                 <input
//                   type="number"
//                   required
//                   min="0"
//                   value={formData.stock}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       stock: parseInt(e.target.value),
//                     })
//                   }
//                   className="form-input"
//                 />
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-300">
//                   Low Stock Alert
//                 </label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={formData.lowStockThreshold}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       lowStockThreshold: parseInt(e.target.value),
//                     })
//                   }
//                   className="form-input"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="h-px bg-white/10" />

//           {/* 3. Physical & Specifications */}
//           <div>
//             <h2 className="mb-4 text-xl font-semibold text-white">
//               Technical Details
//             </h2>
//             <div className="grid gap-6 md:grid-cols-2">
//               {/* Dimensions */}
//               <div>
//                 <div className="flex items-center gap-2 mb-2">
//                   <Ruler className="h-4 w-4 text-purple-400" />
//                   <span className="text-sm font-medium text-gray-300">
//                     Dimensions (L x W x H)
//                   </span>
//                 </div>
//                 <div className="flex gap-2">
//                   <input
//                     type="number"
//                     placeholder="L"
//                     value={dimensions.length}
//                     onChange={(e) =>
//                       setDimensions({ ...dimensions, length: e.target.value })
//                     }
//                     className="form-input w-full"
//                   />
//                   <input
//                     type="number"
//                     placeholder="W"
//                     value={dimensions.width}
//                     onChange={(e) =>
//                       setDimensions({ ...dimensions, width: e.target.value })
//                     }
//                     className="form-input w-full"
//                   />
//                   <input
//                     type="number"
//                     placeholder="H"
//                     value={dimensions.height}
//                     onChange={(e) =>
//                       setDimensions({ ...dimensions, height: e.target.value })
//                     }
//                     className="form-input w-full"
//                   />
//                   <select
//                     value={dimensions.unit}
//                     onChange={(e) =>
//                       setDimensions({ ...dimensions, unit: e.target.value })
//                     }
//                     className="form-input w-24"
//                   >
//                     <option value="cm">cm</option>
//                     <option value="mm">mm</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Weight */}
//               <div>
//                 <div className="flex items-center gap-2 mb-2">
//                   <Scale className="h-4 w-4 text-blue-400" />
//                   <span className="text-sm font-medium text-gray-300">
//                     Weight (kg)
//                   </span>
//                 </div>
//                 <input
//                   type="number"
//                   step="0.01"
//                   value={formData.weight || ""}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       weight: e.target.value
//                         ? parseFloat(e.target.value)
//                         : undefined,
//                     })
//                   }
//                   className="form-input"
//                   placeholder="0.00"
//                 />
//               </div>
//             </div>

//             {/* Dynamic Specs */}
//             <div className="mt-6">
//               <label className="mb-2 block text-sm font-medium text-gray-300">
//                 Specifications
//               </label>
//               <div className="space-y-3">
//                 {specifications.map((spec, index) => (
//                   <div key={index} className="flex gap-4">
//                     <input
//                       type="text"
//                       placeholder="Key"
//                       value={spec.key}
//                       onChange={(e) =>
//                         handleSpecChange(index, "key", e.target.value)
//                       }
//                       className="form-input flex-1"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Value"
//                       value={spec.value}
//                       onChange={(e) =>
//                         handleSpecChange(index, "value", e.target.value)
//                       }
//                       className="form-input flex-1"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeSpecRow(index)}
//                       className="p-3 rounded-xl bg-red-500/10 text-red-400"
//                     >
//                       <Trash2 className="h-5 w-5" />
//                     </button>
//                   </div>
//                 ))}
//                 <Button
//                   type="button"
//                   onClick={addSpecRow}
//                   variant="secondary"
//                   size="sm"
//                 >
//                   <Plus className="h-4 w-4 mr-2" /> Add Specification
//                 </Button>
//               </div>
//             </div>
//           </div>

//           <div className="h-px bg-white/10" />

//           {/* 4. Compatible Models */}
//           <div>
//             <h2 className="mb-4 text-xl font-semibold text-white">
//               Compatible Models
//             </h2>

//             {/* Add Model Form */}
//             <div className="mb-4 grid gap-4 md:grid-cols-5 p-4 rounded-xl bg-white/5 border border-white/10">
//               <div className="md:col-span-2">
//                 <select
//                   value={currentModel.modelName}
//                   onChange={(e) =>
//                     setCurrentModel({
//                       ...currentModel,
//                       modelName: e.target.value,
//                     })
//                   }
//                   className="form-input"
//                 >
//                   <option value="">Select Model</option>
//                   {HYUNDAI_MODELS.map((model) => (
//                     <option key={model} value={model}>
//                       {model}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <input
//                 type="number"
//                 placeholder="From Year"
//                 value={currentModel.yearFrom}
//                 onChange={(e) =>
//                   setCurrentModel({
//                     ...currentModel,
//                     yearFrom: parseInt(e.target.value),
//                   })
//                 }
//                 className="form-input"
//               />
//               <input
//                 type="number"
//                 placeholder="To Year"
//                 value={currentModel.yearTo || ""}
//                 onChange={(e) =>
//                   setCurrentModel({
//                     ...currentModel,
//                     yearTo: e.target.value
//                       ? parseInt(e.target.value)
//                       : undefined,
//                   })
//                 }
//                 className="form-input"
//               />
//               <Button
//                 type="button"
//                 onClick={addCompatibleModel}
//                 variant="primary"
//               >
//                 <Plus className="h-4 w-4" /> Add
//               </Button>
//             </div>

//             {/* List */}
//             <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
//               {formData.compatibleModels.map((model, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center justify-between rounded-lg border border-white/10 bg-blue-500/10 p-3"
//                 >
//                   <div className="text-sm">
//                     <p className="font-semibold text-blue-200">
//                       {model.modelName}
//                     </p>
//                     <p className="text-blue-300/70 text-xs">
//                       {model.yearFrom} - {model.yearTo || "Present"}
//                     </p>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => removeCompatibleModel(index)}
//                     className="text-red-400 hover:text-red-300"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="h-px bg-white/10" />

//           {/* 5. Images */}
//           <div>
//             <h2 className="mb-4 text-xl font-semibold text-white">Images</h2>
//             <div className="space-y-4">
//               {/* Existing Images */}
//               {existingImages.length > 0 && (
//                 <div className="mb-4">
//                   <p className="mb-2 text-sm text-gray-400">Current Images</p>
//                   <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-5">
//                     {existingImages.map((img, index) => (
//                       <div
//                         key={index}
//                         className="group relative aspect-square overflow-hidden rounded-xl border border-white/10"
//                       >
//                         <Image
//                           src={img.url}
//                           alt="product"
//                           fill
//                           className="object-cover"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeExistingImage(index)}
//                           className="absolute right-2 top-2 rounded-full bg-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
//                         >
//                           <Trash2 className="h-4 w-4 text-white" />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Upload New */}
//               <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/20 bg-white/5 px-6 py-8 hover:bg-white/10">
//                 <Upload className="mb-2 h-8 w-8 text-gray-400" />
//                 <span className="text-sm font-medium text-white">
//                   Add New Images
//                 </span>
//                 <input
//                   type="file"
//                   multiple
//                   accept="image/*"
//                   onChange={handleNewImageChange}
//                   className="hidden"
//                 />
//               </label>

//               {/* New Previews */}
//               {newImagePreviews.length > 0 && (
//                 <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-5 mt-4">
//                   {newImagePreviews.map((preview, index) => (
//                     <div
//                       key={index}
//                       className="relative aspect-square overflow-hidden rounded-xl border border-green-500/30"
//                     >
//                       <Image
//                         src={preview}
//                         alt="new"
//                         fill
//                         className="object-cover opacity-80"
//                       />
//                       <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-xs font-bold text-white">
//                         NEW
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => removeNewImage(index)}
//                         className="absolute right-2 top-2 rounded-full bg-red-500 p-1"
//                       >
//                         <X className="h-4 w-4 text-white" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* 6. Footer Actions */}
//           <div className="flex gap-4 pt-4 border-t border-white/10">
//             <Button
//               type="submit"
//               variant="primary"
//               size="lg"
//               isLoading={isSaving}
//               className="flex-1"
//             >
//               <Save className="h-4 w-4 mr-2" /> Update Product
//             </Button>
//             <Link href="/dashboard/products" className="flex-1">
//               <Button
//                 type="button"
//                 variant="secondary"
//                 size="lg"
//                 className="w-full"
//               >
//                 Cancel
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </motion.form>

//       {/* Styles */}
//       <style jsx global>{`
//         .form-input {
//           width: 100%;
//           border-radius: 0.75rem;
//           border-width: 1px;
//           border-color: rgba(255, 255, 255, 0.1);
//           background-color: rgba(255, 255, 255, 0.05);
//           padding: 0.75rem 1rem;
//           color: white;
//           outline: none;
//           transition: all 0.2s;
//         }
//         .form-input:focus {
//           border-color: rgba(59, 130, 246, 0.5);
//           background-color: rgba(255, 255, 255, 0.1);
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Upload,
  X,
  Plus,
  Trash2,
  Tag,
  Scale,
  Ruler,
  Save,
  Loader2,
  Zap,
  RotateCcw,
  BarChart3,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { ProductService } from "@/lib/api";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

// --- Types Definition ---
type ProductCategory =
  | "Engine"
  | "Brake"
  | "Electrical"
  | "Body"
  | "Accessories"
  | "Suspension"
  | "Transmission"
  | "Interior"
  | "Exterior"
  | "Service Parts";

interface CompatibleModel {
  modelName: string;
  yearFrom: number;
  yearTo?: number;
  variant?: string;
}

interface ProductFormData {
  name: string;
  partNumber: string;
  description: string;
  category: ProductCategory;
  subcategory: string;
  price: number;
  discountPrice?: number;
  stock: number;
  lowStockThreshold: number;
  warrantyPeriod: string;
  manufacturer: string;
  compatibleModels: CompatibleModel[];
  tags: string[];
  isActive: boolean;
  // 🔥 New Fields
  flashSale: {
    isActive: boolean;
    salePrice?: number;
    startTime?: string;
    endTime?: string;
  };
  inventoryAnalytics: {
    reorderLevel: number;
    leadTimeDays: number;
    supplierEmail: string;
  };
  returnPolicy: {
    isReturnable: boolean;
    returnWindowDays: number;
    restockingFee: number;
  };
  shippingInfo: {
    weight: number;
    length: number;
    width: number;
    height: number;
  };
}

interface SpecificationItem {
  key: string;
  value: string;
}

const CATEGORIES: ProductCategory[] = [
  "Engine",
  "Brake",
  "Electrical",
  "Body",
  "Accessories",
  "Suspension",
  "Transmission",
  "Interior",
  "Exterior",
  "Service Parts",
];

const HYUNDAI_MODELS = [
  "i10",
  "i20",
  "Venue",
  "Verna",
  "Creta",
  "Alcazar",
  "Tucson",
  "Elantra",
  "Kona",
  "Ioniq 5",
  "Santro",
  "Grand i10",
  "Aura",
  "Exter",
];

// Helper: Format Date for Input (YYYY-MM-DDTHH:mm)
// Helper: Format Date correctly for datetime-local input (Local Time)
const formatDateForInput = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);

  // Get local date parts to match user's timezone
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Return format: YYYY-MM-DDTHH:mm
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();

  const [isFetching, setIsFetching] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Images State
  const [existingImages, setExistingImages] = useState<
    { url: string; publicId: string; _id?: string }[]
  >([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);

  const [tagInput, setTagInput] = useState("");

  // Form State
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    partNumber: "",
    description: "",
    category: "Engine",
    subcategory: "",
    price: 0,
    discountPrice: undefined,
    stock: 0,
    lowStockThreshold: 5,
    warrantyPeriod: "",
    manufacturer: "",
    compatibleModels: [],
    tags: [],
    isActive: true,
    flashSale: { isActive: false, salePrice: 0, startTime: "", endTime: "" },
    inventoryAnalytics: {
      reorderLevel: 10,
      leadTimeDays: 7,
      supplierEmail: "",
    },
    returnPolicy: { isReturnable: true, returnWindowDays: 7, restockingFee: 0 },
    shippingInfo: { weight: 0, length: 0, width: 0, height: 0 },
  });

  const [specifications, setSpecifications] = useState<SpecificationItem[]>([
    { key: "", value: "" },
  ]);
  const [currentModel, setCurrentModel] = useState<CompatibleModel>({
    modelName: "",
    yearFrom: new Date().getFullYear(),
    yearTo: undefined,
    variant: "",
  });

  // --- 1. Fetch Product Data ---
  useEffect(() => {
    if (id) {
      fetchProductData();
    }
  }, [id]);

  const fetchProductData = async () => {
    try {
      const response = await ProductService.getById(id as string);
      // Adjust based on your API response structure (e.g., response.data.data.product or response.data.product)
      const product =
        response.data.data?.product || response.data.product || response.data;

      // Map API Data to State
      setFormData({
        name: product.name,
        partNumber: product.partNumber,
        description: product.description,
        category: product.category as ProductCategory,
        subcategory: product.subcategory || "",
        price: product.price,
        discountPrice: product.discountPrice,
        stock: product.stock,
        lowStockThreshold: product.lowStockThreshold || 5,
        warrantyPeriod: product.warrantyPeriod || "",
        manufacturer: product.manufacturer || "",
        compatibleModels: product.compatibleModels || [],
        tags: product.tags || [],
        isActive: product.isActive,
        // Map Nested Objects (with fallbacks)
        flashSale: {
          isActive: product.flashSale?.isActive || false,
          salePrice: product.flashSale?.salePrice || 0,
          startTime: formatDateForInput(product.flashSale?.startTime),
          endTime: formatDateForInput(product.flashSale?.endTime),
        },
        inventoryAnalytics: product.inventoryAnalytics || {
          reorderLevel: 10,
          leadTimeDays: 7,
          supplierEmail: "",
        },
        returnPolicy: product.returnPolicy || {
          isReturnable: true,
          returnWindowDays: 7,
          restockingFee: 0,
        },
        shippingInfo: product.shippingInfo || {
          weight: 0,
          length: 0,
          width: 0,
          height: 0,
        },
      });

      // Images
      if (product.images) setExistingImages(product.images);

      // Specifications (Object to Array)
      if (product.specifications) {
        const specsArray = Object.entries(product.specifications).map(
          ([key, value]) => ({
            key,
            value: value as string,
          }),
        );
        setSpecifications(
          specsArray.length > 0 ? specsArray : [{ key: "", value: "" }],
        );
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load product details");
      router.push("/dashboard/products");
    } finally {
      setIsFetching(false);
    }
  };

  // --- 2. Handlers ---

  const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (existingImages.length + newImages.length + files.length > 5) {
      toast.error("Maximum 5 images allowed total");
      return;
    }
    setNewImages([...newImages, ...files]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () =>
        setNewImagePreviews((prev) => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const removeNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Delete Existing Image via API
  const removeExistingImage = (index: number) => {
    const imageToDelete = existingImages[index];
    if (!imageToDelete?._id) return;

    toast("Are you sure?", {
      description: "This will permanently delete the image.",
      action: {
        label: "Delete",
        onClick: async () => {
          const loadingToast = toast.loading("Deleting image...");
          try {
            await ProductService.deleteImage(id as string, imageToDelete._id!);
            setExistingImages((prev) => prev.filter((_, i) => i !== index));
            toast.dismiss(loadingToast);
            toast.success("Image deleted");
          } catch (error: any) {
            toast.dismiss(loadingToast);
            toast.error("Failed to delete image");
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {
          console.log("Toast cancelled");
        },
      },
    });
  };

  // ... (Reused Logic: Compatible Models, Specs, Tags) ...
  const addCompatibleModel = () => {
    if (!currentModel.modelName) return toast.error("Select a model");
    setFormData((p) => ({
      ...p,
      compatibleModels: [...p.compatibleModels, currentModel],
    }));
    setCurrentModel({
      modelName: "",
      yearFrom: new Date().getFullYear(),
      yearTo: undefined,
      variant: "",
    });
  };
  const removeCompatibleModel = (i: number) => {
    setFormData((p) => ({
      ...p,
      compatibleModels: p.compatibleModels.filter((_, idx) => idx !== i),
    }));
  };
  const handleSpecChange = (i: number, f: "key" | "value", v: string) => {
    const s = [...specifications];
    s[i][f] = v;
    setSpecifications(s);
  };
  const addSpecRow = () =>
    setSpecifications([...specifications, { key: "", value: "" }]);
  const removeSpecRow = (i: number) =>
    setSpecifications(specifications.filter((_, idx) => idx !== i));
  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim()))
        setFormData((p) => ({ ...p, tags: [...p.tags, tagInput.trim()] }));
      setTagInput("");
    }
  };
  const removeTag = (t: string) =>
    setFormData((p) => ({ ...p, tags: p.tags.filter((tag) => tag !== t) }));

  // --- 3. Submit Handler (Update) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const data = new FormData();

      // Basic Fields
      data.append("name", formData.name);
      data.append("partNumber", formData.partNumber);
      data.append("description", formData.description);
      data.append("category", formData.category);
      if (formData.subcategory)
        data.append("subcategory", formData.subcategory);
      data.append("price", formData.price.toString());
      if (formData.discountPrice)
        data.append("discountPrice", formData.discountPrice.toString());
      data.append("stock", formData.stock.toString());
      data.append("lowStockThreshold", formData.lowStockThreshold.toString());
      data.append("warrantyPeriod", formData.warrantyPeriod);
      data.append("manufacturer", formData.manufacturer);
      data.append("isActive", formData.isActive.toString());

      // Complex Fields (JSON.stringify)
      data.append(
        "compatibleModels",
        JSON.stringify(formData.compatibleModels),
      );
      data.append("tags", JSON.stringify(formData.tags));
      data.append("flashSale", JSON.stringify(formData.flashSale));
      data.append(
        "inventoryAnalytics",
        JSON.stringify(formData.inventoryAnalytics),
      );
      data.append("returnPolicy", JSON.stringify(formData.returnPolicy));
      data.append("shippingInfo", JSON.stringify(formData.shippingInfo));

      // Specifications Map
      const specsObject = specifications.reduce(
        (acc, curr) => {
          if (curr.key.trim() && curr.value.trim())
            acc[curr.key.trim()] = curr.value.trim();
          return acc;
        },
        {} as Record<string, string>,
      );
      data.append("specifications", JSON.stringify(specsObject));

      // New Images Only (Backend appends these to existing)
      newImages.forEach((image) => data.append("images", image));

      await ProductService.update(id as string, data);

      toast.success("Product updated successfully!");
      router.push("/dashboard/products");
    } catch (error: any) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Failed to update product");
    } finally {
      setIsSaving(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Link href="/dashboard/products">
          <button className="rounded-xl bg-white/5 p-2 transition-colors hover:bg-white/10">
            <ArrowLeft className="h-5 w-5 text-white" />
          </button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Edit Product</h1>
          <p className="mt-1 text-gray-400">
            Update product details and configuration
          </p>
        </div>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm"
      >
        <div className="space-y-8">
          {/* 1. Basic Information */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">
                Basic Information
              </h2>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                <span className="ms-3 text-sm font-medium text-white">
                  {formData.isActive ? "Active Listing" : "Draft"}
                </span>
              </label>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="form-input"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Part Number
                </label>
                <input
                  type="text"
                  required
                  value={formData.partNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      partNumber: e.target.value.toUpperCase(),
                    })
                  }
                  className="form-input"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Description
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="form-input"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Category
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value as ProductCategory,
                    })
                  }
                  className="form-input"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Subcategory
                </label>
                <input
                  type="text"
                  value={formData.subcategory}
                  onChange={(e) =>
                    setFormData({ ...formData, subcategory: e.target.value })
                  }
                  className="form-input"
                />
              </div>
            </div>
          </div>

          <div className="h-px bg-white/10" />

          {/* 2. Pricing & Stock */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-white">
              Pricing & Stock
            </h2>
            <div className="grid gap-6 md:grid-cols-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Price (₹)
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseFloat(e.target.value),
                    })
                  }
                  className="form-input"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Discount Price (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.discountPrice || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      discountPrice: e.target.value
                        ? parseFloat(e.target.value)
                        : undefined,
                    })
                  }
                  className="form-input"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stock: parseInt(e.target.value),
                    })
                  }
                  className="form-input"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Low Stock Alert
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.lowStockThreshold}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      lowStockThreshold: parseInt(e.target.value),
                    })
                  }
                  className="form-input"
                />
              </div>
            </div>
          </div>

          <div className="h-px bg-white/10" />

          {/* 🔥 3. Flash Sale */}
          <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                <h2 className="text-xl font-semibold text-white">Flash Sale</h2>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.flashSale.isActive}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      flashSale: {
                        ...formData.flashSale,
                        isActive: e.target.checked,
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:bg-yellow-600 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
              </label>
            </div>
            {formData.flashSale.isActive && (
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Sale Price (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.flashSale.salePrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        flashSale: {
                          ...formData.flashSale,
                          salePrice: parseFloat(e.target.value),
                        },
                      })
                    }
                    className="form-input border-yellow-500/30 focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Start Time
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.flashSale.startTime}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        flashSale: {
                          ...formData.flashSale,
                          startTime: e.target.value,
                        },
                      })
                    }
                    className="form-input border-yellow-500/30 focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    End Time
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.flashSale.endTime}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        flashSale: {
                          ...formData.flashSale,
                          endTime: e.target.value,
                        },
                      })
                    }
                    className="form-input border-yellow-500/30 focus:border-yellow-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 4. Shipping Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scale className="h-5 w-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">
                Shipping & Dimensions
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.shippingInfo.weight}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      shippingInfo: {
                        ...formData.shippingInfo,
                        weight: parseFloat(e.target.value),
                      },
                    })
                  }
                  className="form-input"
                />
              </div>
              <div className="md:col-span-3">
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Dimensions (L x W x H) in cm
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="L"
                    value={formData.shippingInfo.length}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shippingInfo: {
                          ...formData.shippingInfo,
                          length: parseFloat(e.target.value),
                        },
                      })
                    }
                    className="form-input w-full"
                  />
                  <input
                    type="number"
                    placeholder="W"
                    value={formData.shippingInfo.width}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shippingInfo: {
                          ...formData.shippingInfo,
                          width: parseFloat(e.target.value),
                        },
                      })
                    }
                    className="form-input w-full"
                  />
                  <input
                    type="number"
                    placeholder="H"
                    value={formData.shippingInfo.height}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shippingInfo: {
                          ...formData.shippingInfo,
                          height: parseFloat(e.target.value),
                        },
                      })
                    }
                    className="form-input w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-white/10" />

          {/* 5. Compatible Models & Specs (Same UI as Add Page) */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-white">
              Compatible Models
            </h2>
            <div className="mb-4 grid gap-4 md:grid-cols-5 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="md:col-span-2">
                <select
                  value={currentModel.modelName}
                  onChange={(e) =>
                    setCurrentModel({
                      ...currentModel,
                      modelName: e.target.value,
                    })
                  }
                  className="form-input"
                >
                  <option value="">Select Model</option>
                  {HYUNDAI_MODELS.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="number"
                placeholder="From"
                value={currentModel.yearFrom}
                onChange={(e) =>
                  setCurrentModel({
                    ...currentModel,
                    yearFrom: parseInt(e.target.value),
                  })
                }
                className="form-input"
              />
              <input
                type="number"
                placeholder="To"
                value={currentModel.yearTo || ""}
                onChange={(e) =>
                  setCurrentModel({
                    ...currentModel,
                    yearTo: e.target.value
                      ? parseInt(e.target.value)
                      : undefined,
                  })
                }
                className="form-input"
              />
              <div className="flex items-end">
                <Button
                  type="button"
                  onClick={addCompatibleModel}
                  variant="primary"
                >
                  <Plus className="h-4 w-4" /> Add
                </Button>
              </div>
            </div>
            {formData.compatibleModels.length > 0 && (
              <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                {formData.compatibleModels.map((model, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-blue-500/10 p-3"
                  >
                    <div className="text-sm">
                      <p className="font-semibold text-blue-200">
                        {model.modelName}
                      </p>
                      <p className="text-blue-300/70 text-xs">
                        {model.yearFrom} - {model.yearTo || "Present"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeCompatibleModel(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 6. Specifications (Dynamic) */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-white">
              Specifications
            </h2>
            <div className="space-y-3">
              {specifications.map((spec, index) => (
                <div key={index} className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Key"
                    value={spec.key}
                    onChange={(e) =>
                      handleSpecChange(index, "key", e.target.value)
                    }
                    className="form-input flex-1"
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    value={spec.value}
                    onChange={(e) =>
                      handleSpecChange(index, "value", e.target.value)
                    }
                    className="form-input flex-1"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeSpecRow(index)}
                      className="p-3 rounded-xl bg-red-500/10 text-red-400"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                onClick={addSpecRow}
                variant="secondary"
                size="sm"
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" /> Add
              </Button>
            </div>
          </div>

          {/* 7. Inventory & Returns */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">
                Inventory Analytics
              </h2>
              <div className="space-y-4 rounded-xl bg-white/5 p-4 border border-white/10">
                <input
                  type="number"
                  placeholder="Reorder Level"
                  value={formData.inventoryAnalytics.reorderLevel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      inventoryAnalytics: {
                        ...formData.inventoryAnalytics,
                        reorderLevel: parseInt(e.target.value),
                      },
                    })
                  }
                  className="form-input"
                />
                <input
                  type="number"
                  placeholder="Lead Time (Days)"
                  value={formData.inventoryAnalytics.leadTimeDays}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      inventoryAnalytics: {
                        ...formData.inventoryAnalytics,
                        leadTimeDays: parseInt(e.target.value),
                      },
                    })
                  }
                  className="form-input"
                />
                <input
                  type="email"
                  placeholder="Supplier Email"
                  value={formData.inventoryAnalytics.supplierEmail}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      inventoryAnalytics: {
                        ...formData.inventoryAnalytics,
                        supplierEmail: e.target.value,
                      },
                    })
                  }
                  className="form-input"
                />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">
                Return Policy
              </h2>
              <div className="space-y-4 rounded-xl bg-white/5 p-4 border border-white/10">
                <div className="flex justify-between">
                  <label className="text-sm text-gray-400">
                    Is Returnable?
                  </label>
                  <input
                    type="checkbox"
                    checked={formData.returnPolicy.isReturnable}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        returnPolicy: {
                          ...formData.returnPolicy,
                          isReturnable: e.target.checked,
                        },
                      })
                    }
                    className="h-5 w-5"
                  />
                </div>
                {formData.returnPolicy.isReturnable && (
                  <>
                    <input
                      type="number"
                      placeholder="Return Window (Days)"
                      value={formData.returnPolicy.returnWindowDays}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          returnPolicy: {
                            ...formData.returnPolicy,
                            returnWindowDays: parseInt(e.target.value),
                          },
                        })
                      }
                      className="form-input"
                    />
                    <input
                      type="number"
                      placeholder="Restocking Fee (₹)"
                      value={formData.returnPolicy.restockingFee}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          returnPolicy: {
                            ...formData.returnPolicy,
                            restockingFee: parseFloat(e.target.value),
                          },
                        })
                      }
                      className="form-input"
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="h-px bg-white/10" />

          {/* 8. Other Details & Tags */}
          <div className="grid gap-6 md:grid-cols-2">
            <input
              type="text"
              placeholder="Warranty Period"
              value={formData.warrantyPeriod}
              onChange={(e) =>
                setFormData({ ...formData, warrantyPeriod: e.target.value })
              }
              className="form-input"
            />
            <input
              type="text"
              placeholder="Manufacturer"
              value={formData.manufacturer}
              onChange={(e) =>
                setFormData({ ...formData, manufacturer: e.target.value })
              }
              className="form-input"
            />
          </div>
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
              <Tag className="h-4 w-4" /> Tags
            </label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              className="form-input"
              placeholder="Type tag & Enter"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-200 border border-blue-500/30"
                >
                  {tag}{" "}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="h-px bg-white/10" />

          {/* 9. Images (Edit Mode) */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-white">Images</h2>
            <div className="space-y-4">
              {existingImages.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-5">
                  {existingImages.map((img, index) => (
                    <div
                      key={index}
                      className="group relative aspect-square overflow-hidden rounded-xl border border-white/10"
                    >
                      <Image
                        src={img.url}
                        alt="product"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        className="absolute right-2 top-2 rounded-full bg-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/20 bg-white/5 px-6 py-8 hover:bg-white/10">
                <Upload className="mb-2 h-8 w-8 text-gray-400" />
                <span className="text-sm font-medium text-white">
                  Upload New Images
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleNewImageChange}
                  className="hidden"
                />
              </label>
              {newImagePreviews.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-5 mt-4">
                  {newImagePreviews.map((preview, index) => (
                    <div
                      key={index}
                      className="relative aspect-square overflow-hidden rounded-xl border border-green-500/30"
                    >
                      <Image
                        src={preview}
                        alt="new"
                        fill
                        className="object-cover opacity-80"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-xs font-bold text-white">
                        NEW
                      </div>
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute right-2 top-2 rounded-full bg-red-500 p-1"
                      >
                        <X className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4 pt-4 border-t border-white/10">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSaving}
              className="flex-1"
            >
              <Save className="h-4 w-4 mr-2" /> Save Changes
            </Button>
            <Link href="/dashboard/products" className="flex-1">
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="w-full"
              >
                Cancel
              </Button>
            </Link>
          </div>
        </div>
      </motion.form>

      {/* Styles */}
      <style jsx global>{`
        .form-input {
          width: 100%;
          border-radius: 0.75rem;
          border-width: 1px;
          border-color: rgba(255, 255, 255, 0.1);
          background-color: rgba(255, 255, 255, 0.05);
          padding: 0.75rem 1rem;
          color: white;
          outline: none;
          transition: all 0.2s;
        }
        .form-input:focus {
          border-color: rgba(59, 130, 246, 0.5);
          background-color: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}
