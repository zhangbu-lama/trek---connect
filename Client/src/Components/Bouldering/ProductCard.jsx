export default function ProductCard({ product }) {
    return (
      <div className="bg-white rounded-xl p-4 shadow space-y-2">
        <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded" />
        <h3 className="font-bold">{product.name}</h3>
        <p>Rs. {product.price}</p>
        <p className="text-sm text-gray-500">Expires: {new Date(product.expiresAt).toLocaleString()}</p>
      </div>
    );
  }
  