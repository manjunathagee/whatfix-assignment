import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getProductsByCategory, Product } from "@/services/productService";
import { useGlobalStore } from "@/stores/globalStore";

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { addToCart } = useGlobalStore();

  const products = category ? getProductsByCategory(category) : [];

  const categoryNames: Record<string, string> = {
    home: "Home",
    clothing: "Clothing",
    electronics: "Electronics",
    mobiles: "Mobiles",
    books: "Books",
  };

  const categoryName = category
    ? categoryNames[category] || category
    : "Unknown";

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      category: product.category,
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-sm ${
          i < Math.floor(rating) ? "text-yellow-500" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {categoryName}
        </h1>
        <p className="text-gray-600">
          Showing {products.length} products in {categoryName.toLowerCase()}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="hover:shadow-lg transition-shadow"
            noPadding
          >
            <CardHeader className="p-0">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                {!product.inStock && (
                  <Badge
                    variant="destructive"
                    className="absolute top-2 left-2"
                  >
                    Out of Stock
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg mb-2 line-clamp-1">
                {product.name}
              </CardTitle>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                  <span className="text-sm text-gray-500 ml-1">
                    ({product.rating})
                  </span>
                </div>
                <span className="text-xl font-bold text-blue-600">
                  ${product.price}
                </span>
              </div>

              <Button
                onClick={() => handleAddToCart(product)}
                disabled={!product.inStock}
                className="w-full"
                variant={product.inStock ? "default" : "secondary"}
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
