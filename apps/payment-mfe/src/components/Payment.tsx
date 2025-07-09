import React, { useActionState, useState } from 'react'
import useGlobalState from '../hooks/useGlobalState'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Separator } from './ui/separator'
import { CreditCard, Shield, CheckCircle, XCircle, ArrowLeft } from 'lucide-react'

interface PaymentFormData {
  cardNumber: string
  expiryDate: string
  cvv: string
  cardholderName: string
  paymentMethod: 'credit' | 'debit' | 'paypal' | 'apple_pay'
}

interface PaymentState {
  errors?: Record<string, string>
  success?: boolean
  processing?: boolean
  message?: string
  orderId?: string
}

async function processPayment(
  _prevState: PaymentState | null,
  formData: FormData
): Promise<PaymentState> {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 3000))
  
  const data = Object.fromEntries(formData.entries()) as Record<string, string>
  const errors: Record<string, string> = {}
  
  // Validation for credit/debit cards
  if (data.paymentMethod === 'credit' || data.paymentMethod === 'debit') {
    if (!data.cardNumber) errors.cardNumber = 'Card number is required'
    if (!data.expiryDate) errors.expiryDate = 'Expiry date is required'
    if (!data.cvv) errors.cvv = 'CVV is required'
    if (!data.cardholderName) errors.cardholderName = 'Cardholder name is required'
    
    if (data.cardNumber && !/^\d{16}$/.test(data.cardNumber.replace(/\s/g, ''))) {
      errors.cardNumber = 'Please enter a valid 16-digit card number'
    }
    
    if (data.expiryDate && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiryDate)) {
      errors.expiryDate = 'Please enter expiry date in MM/YY format'
    }
    
    if (data.cvv && !/^\d{3,4}$/.test(data.cvv)) {
      errors.cvv = 'Please enter a valid CVV'
    }
  }
  
  if (Object.keys(errors).length > 0) {
    return { errors }
  }
  
  // Simulate random payment failure
  if (Math.random() < 0.15) {
    return { 
      message: 'Payment failed. Please check your payment details and try again.',
      errors: {} 
    }
  }
  
  // Generate order ID
  const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  
  return { 
    success: true, 
    orderId,
    message: 'Payment processed successfully!' 
  }
}

const Payment: React.FC = () => {
  const { cart, getCartTotal, getCartCount, clearCart, user } = useGlobalState()
  const [state, formAction, isPending] = useActionState(processPayment, null)
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: user?.name || '',
    paymentMethod: 'credit'
  })

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim()
  }

  const total = getCartTotal()
  const itemCount = getCartCount()
  const tax = total * 0.08
  const shipping = total > 100 ? 0 : 9.99
  const finalTotal = total + tax + shipping

  // Success state
  if (state?.success) {
    // Clear cart on successful payment
    React.useEffect(() => {
      clearCart()
    }, [clearCart])

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Payment Successful!</h3>
            <p className="text-gray-600 mb-2">{state.message}</p>
            <p className="text-sm text-gray-500 mb-4">Order ID: {state.orderId}</p>
            <div className="space-y-2">
              <Button 
                onClick={() => window.location.reload()} 
                className="w-full"
              >
                Continue Shopping
              </Button>
              <Button 
                variant="outline"
                onClick={() => alert(`Order ${state.orderId} details will be sent to ${user?.email}`)}
                className="w-full"
              >
                View Order Details
              </Button>
            </div>
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
            <XCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No items to pay for</h3>
            <p className="text-gray-600">Your cart is empty</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Checkout
          </Button>
          <h1 className="text-2xl font-bold">Payment</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <form action={formAction} className="space-y-6">
              {/* Payment Method Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select 
                    name="paymentMethod" 
                    value={formData.paymentMethod} 
                    onValueChange={(value: any) => handleInputChange('paymentMethod', value)}
                    disabled={isPending}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit">Credit Card</SelectItem>
                      <SelectItem value="debit">Debit Card</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="apple_pay">Apple Pay</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Card Details (show only for credit/debit) */}
              {(formData.paymentMethod === 'credit' || formData.paymentMethod === 'debit') && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Card Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        name="cardholderName"
                        value={formData.cardholderName}
                        onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                        placeholder="John Doe"
                        disabled={isPending}
                      />
                      {state?.errors?.cardholderName && (
                        <p className="text-sm text-red-600 mt-1">{state.errors.cardholderName}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={formatCardNumber(formData.cardNumber)}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\s/g, '')
                          if (value.length <= 16) {
                            handleInputChange('cardNumber', value)
                          }
                        }}
                        placeholder="1234 5678 9012 3456"
                        disabled={isPending}
                      />
                      {state?.errors?.cardNumber && (
                        <p className="text-sm text-red-600 mt-1">{state.errors.cardNumber}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, '')
                            if (value.length >= 2) {
                              value = value.slice(0, 2) + '/' + value.slice(2, 4)
                            }
                            handleInputChange('expiryDate', value)
                          }}
                          placeholder="MM/YY"
                          maxLength={5}
                          disabled={isPending}
                        />
                        {state?.errors?.expiryDate && (
                          <p className="text-sm text-red-600 mt-1">{state.errors.expiryDate}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          type="password"
                          value={formData.cvv}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '')
                            if (value.length <= 4) {
                              handleInputChange('cvv', value)
                            }
                          }}
                          placeholder="123"
                          disabled={isPending}
                        />
                        {state?.errors?.cvv && (
                          <p className="text-sm text-red-600 mt-1">{state.errors.cvv}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Alternative Payment Methods */}
              {formData.paymentMethod === 'paypal' && (
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">PayPal Payment</h3>
                    <p className="text-gray-600 mb-4">You will be redirected to PayPal to complete your payment</p>
                  </CardContent>
                </Card>
              )}

              {formData.paymentMethod === 'apple_pay' && (
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="w-8 h-8 text-gray-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Apple Pay</h3>
                    <p className="text-gray-600 mb-4">Use Touch ID or Face ID to pay with Apple Pay</p>
                  </CardContent>
                </Card>
              )}

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
                    Processing Payment...
                  </div>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    Pay ${finalTotal.toFixed(2)}
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

                <div className="mt-4 p-3 bg-green-50 rounded-md">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-800">Your payment is secured with 256-bit SSL encryption</span>
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

export default Payment