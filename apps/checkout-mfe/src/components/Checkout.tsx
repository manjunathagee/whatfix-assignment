import React, { useActionState, useState } from 'react'
import useGlobalState from '../hooks/useGlobalState'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Separator } from './ui/separator'
import { CreditCard, Package, User, MapPin } from 'lucide-react'

interface CheckoutFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

interface CheckoutState {
  errors?: Record<string, string>
  success?: boolean
  message?: string
}

async function processCheckout(
  _prevState: CheckoutState | null,
  formData: FormData
): Promise<CheckoutState> {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  const data = Object.fromEntries(formData.entries()) as Record<string, string>
  const errors: Record<string, string> = {}
  
  // Validation
  if (!data.firstName) errors.firstName = 'First name is required'
  if (!data.lastName) errors.lastName = 'Last name is required'
  if (!data.email) errors.email = 'Email is required'
  if (!data.phone) errors.phone = 'Phone is required'
  if (!data.address) errors.address = 'Address is required'
  if (!data.city) errors.city = 'City is required'
  if (!data.state) errors.state = 'State is required'
  if (!data.zipCode) errors.zipCode = 'ZIP code is required'
  if (!data.country) errors.country = 'Country is required'
  
  if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Please enter a valid email address'
  }
  
  if (data.phone && !/^\+?[\d\s\-\(\)]+$/.test(data.phone)) {
    errors.phone = 'Please enter a valid phone number'
  }
  
  if (Object.keys(errors).length > 0) {
    return { errors }
  }
  
  // Simulate random failure
  if (Math.random() < 0.1) {
    return { 
      message: 'Payment processing failed. Please try again.',
      errors: {} 
    }
  }
  
  return { 
    success: true, 
    message: 'Order placed successfully! Redirecting to payment...' 
  }
}

const Checkout: React.FC = () => {
  const { cart, getCartTotal, getCartCount, user } = useGlobalState()
  const [state, formAction, isPending] = useActionState(processCheckout, null)
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  })

  const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const total = getCartTotal()
  const itemCount = getCartCount()
  const tax = total * 0.08
  const shipping = total > 100 ? 0 : 9.99
  const finalTotal = total + tax + shipping

  if (state?.success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Order Confirmed!</h3>
            <p className="text-gray-600 mb-4">{state.message}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="w-full"
            >
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
            <p className="text-gray-600">Add some items to proceed with checkout</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form action={formAction} className="space-y-6">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="John"
                        disabled={isPending}
                      />
                      {state?.errors?.firstName && (
                        <p className="text-sm text-red-600 mt-1">{state.errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Doe"
                        disabled={isPending}
                      />
                      {state?.errors?.lastName && (
                        <p className="text-sm text-red-600 mt-1">{state.errors.lastName}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="john@example.com"
                        disabled={isPending}
                      />
                      {state?.errors?.email && (
                        <p className="text-sm text-red-600 mt-1">{state.errors.email}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        disabled={isPending}
                      />
                      {state?.errors?.phone && (
                        <p className="text-sm text-red-600 mt-1">{state.errors.phone}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="123 Main Street"
                      disabled={isPending}
                    />
                    {state?.errors?.address && (
                      <p className="text-sm text-red-600 mt-1">{state.errors.address}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="New York"
                        disabled={isPending}
                      />
                      {state?.errors?.city && (
                        <p className="text-sm text-red-600 mt-1">{state.errors.city}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        placeholder="NY"
                        disabled={isPending}
                      />
                      {state?.errors?.state && (
                        <p className="text-sm text-red-600 mt-1">{state.errors.state}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        placeholder="10001"
                        disabled={isPending}
                      />
                      {state?.errors?.zipCode && (
                        <p className="text-sm text-red-600 mt-1">{state.errors.zipCode}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select 
                      name="country" 
                      value={formData.country} 
                      onValueChange={(value) => handleInputChange('country', value)}
                      disabled={isPending}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                    {state?.errors?.country && (
                      <p className="text-sm text-red-600 mt-1">{state.errors.country}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {state?.message && !state.success && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-800">{state.message}</p>
                </div>
              )}

              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                disabled={isPending}
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Proceed to Payment
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout