// import React, { useState, useEffect } from 'react';
// import {
//   useCategories,
//   useAddCategory,
//   useUpdateCategory,
//   useDeleteCategory,
// } from '../Hooks/useCategory';
// import useCategoryStore from '../Store/CategoryStore';
// import Layout from './Layout';

// const CategoryAdminPanel = () => {
//   const { data: categories, isLoading } = useCategories();
//   const addCategoryMutation = useAddCategory();
//   const updateCategoryMutation = useUpdateCategory();
//   const deleteCategoryMutation = useDeleteCategory();

//   const { selectedCategory, setSelectedCategory } = useCategoryStore();

//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     image: null,
//   });

//   useEffect(() => {
//     if (selectedCategory) {
//       setFormData({
//         name: selectedCategory.name || '',
//         description: selectedCategory.description || '',
//         image: null,
//       });
//     }
//   }, [selectedCategory]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     data.append('name', formData.name);
//     data.append('description', formData.description);
//     if (formData.image) data.append('image', formData.image);

//     if (selectedCategory) {
//       updateCategoryMutation.mutate({ id: selectedCategory.id, data });
//     } else {
//       addCategoryMutation.mutate(data);
//     }

//     setFormData({ name: '', description: '', image: null });
//     setSelectedCategory(null);
//   };

//   const handleEdit = (category) => {
//     setSelectedCategory(category);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this category?')) {
//       deleteCategoryMutation.mutate(id);
//     }
//   };

//   return (
//     <Layout>
//       <div className="max-w-6xl mx-auto px-4 py-10">
//         <h1 className="text-3xl font-bold mb-6 text-center">Category Admin Panel</h1>

//         {/* Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="mb-8 bg-white p-6 rounded-lg shadow space-y-4"
//         >
//           <div>
//             <label className="block font-semibold">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>

//           <div>
//             <label className="block font-semibold">Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>

//           <div>
//             <label className="block font-semibold">Image (optional)</label>
//             <input
//               type="file"
//               name="image"
//               accept="image/*"
//               onChange={handleChange}
//               className="w-full"
//             />
//           </div>

//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             {selectedCategory ? 'Update Category' : 'Add Category'}
//           </button>
//         </form>

//         {/* Category List */}
//         <div>
//           <h2 className="text-2xl font-semibold mb-4">All Categories</h2>
//           {isLoading ? (
//             <p className="text-center">Loading...</p>
//           ) : (
//             <ul className="space-y-4">
//               {categories?.map((cat) => (
//                 <li
//                   key={cat.id}
//                   className="bg-gray-100 p-4 rounded-lg shadow flex justify-between items-center"
//                 >
//                   <div>
//                     <h3 className="font-bold text-lg">{cat.name}</h3>
//                     <p className="text-sm text-gray-600">{cat.description}</p>
//                   </div>
//                   <div className="space-x-2">
//                     <button
//                       onClick={() => handleEdit(cat)}
//                       className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(cat.id)}
//                       className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CategoryAdminPanel;
