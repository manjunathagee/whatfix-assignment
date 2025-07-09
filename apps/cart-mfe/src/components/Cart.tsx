import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useCart, useGlobalActions } from "@/hooks/useGlobalState";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

const Cart: React.FC = () => {
  const {
    items: cartItems,
    count: cartCount,
    total: cartTotal,
    updateCartItem,
    removeFromCart,
    clearCart,
  } = useCart();
  const { createOrder, navigateTo } = useGlobalActions();

  // Remove the useEffect that adds dummy items to the cart

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    updateCartItem(id, newQuantity);
  };

  const removeItem = (id: string) => {
    removeFromCart(id);
  };

  const getTotalPrice = () => {
    return cartTotal;
  };

  const getTotalItems = () => {
    return cartCount;
  };

  const handleCheckout = () => {
    // Create order from cart items
    const now = new Date();
    const order = {
      id: `order-${now.getTime()}`,
      orderNumber: `ORD-${now.getTime()}`,
      date: now.toISOString(),
      userId: "current-user",
      items: cartItems,
      total: cartTotal * 1.08, // Including tax
      status: "pending",
      createdAt: now,
      updatedAt: now,
    };

    createOrder(order);
    clearCart();
    alert("Order created successfully! You will be redirected to orders page.");
    navigateTo("/orders", "orders");
  };

  const renderCartImage = (image: string | undefined, name: string) => {
    const imgSrc = image || "";
    if (imgSrc.startsWith("http")) {
      return (
        <img
          src={imgSrc}
          alt={name}
          className="w-16 h-16 object-cover rounded"
        />
      );
    }
    return <span className="text-4xl">{imgSrc}</span>;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <ShoppingCart className="size-8 text-primary" />
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <Badge variant="secondary" className="text-sm">
          {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"}
        </Badge>
      </div>

      {cartItems.length === 0 ? (
        <Card className="p-8 text-center">
          <CardContent className="pt-6">
            <ShoppingCart className="size-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground">
              Add some items to get started!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cart Items</CardTitle>
                <CardDescription>Review your selected items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={item.id}>
                      <div className="flex items-center gap-4">
                        {/* Render image or emoji */}
                        {renderCartImage(item.image, item.name)}
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.category}
                          </p>
                          <p className="text-lg font-bold text-primary">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="size-4" />
                          </Button>
                          <span className="w-8 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="size-4" />
                          </Button>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                      {index < cartItems.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${(getTotalPrice() * 1.08).toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  className="w-full mt-6"
                  size="lg"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
