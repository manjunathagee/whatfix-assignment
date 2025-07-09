import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Package, CheckCircle, Truck, Calendar, DollarSign, Eye } from 'lucide-react'

export interface Order {
  id: string
  orderNumber: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: Array<{
    name: string
    quantity: number
    price: number
    image: string
  }>
}

const Orders: React.FC = () => {
  const orders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 1299.99,
      items: [
        { name: 'iPhone 15 Pro', quantity: 1, price: 999.99, image: '📱' },
        { name: 'iPhone Case', quantity: 1, price: 29.99, image: '📱' },
        { name: 'Screen Protector', quantity: 2, price: 14.99, image: '🛡️' }
      ]
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      date: '2024-01-20',
      status: 'shipped',
      total: 189.99,
      items: [
        { name: 'Nike Air Max 90', quantity: 1, price: 120.00, image: '👟' },
        { name: 'Athletic Socks', quantity: 3, price: 19.99, image: '🧦' }
      ]
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      date: '2024-01-25',
      status: 'processing',
      total: 2299.99,
      items: [
        { name: 'MacBook Pro 14"', quantity: 1, price: 1999.99, image: '💻' },
        { name: 'Magic Mouse', quantity: 1, price: 79.99, image: '🖱️' },
        { name: 'USB-C Cable', quantity: 2, price: 29.99, image: '🔌' }
      ]
    },
    {
      id: '4',
      orderNumber: 'ORD-2024-004',
      date: '2024-01-28',
      status: 'pending',
      total: 89.97,
      items: [
        { name: 'Cotton T-Shirt', quantity: 3, price: 29.99, image: '👕' }
      ]
    }
  ]

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'pending':
        return 'bg-gray-100 text-gray-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="size-4" />
      case 'shipped':
        return <Truck className="size-4" />
      case 'processing':
        return <Package className="size-4" />
      case 'pending':
        return <Calendar className="size-4" />
      case 'cancelled':
        return <Package className="size-4" />
      default:
        return <Package className="size-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleViewDetails = (orderId: string) => {
    alert(`Order details for ${orderId} will be implemented in future sprints!`)
  }

  const handleReorder = (orderId: string) => {
    alert(`Reorder functionality for ${orderId} will be implemented in future sprints!`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Package className="size-8 text-primary" />
        <h1 className="text-3xl font-bold">Order History</h1>
        <Badge variant="secondary" className="text-sm">
          {orders.length} {orders.length === 1 ? 'order' : 'orders'}
        </Badge>
      </div>

      {orders.length === 0 ? (
        <Card className="p-8 text-center">
          <CardContent className="pt-6">
            <Package className="size-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
            <p className="text-muted-foreground">Your order history will appear here once you make your first purchase.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-muted/50">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{order.orderNumber}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Calendar className="size-4" />
                      Ordered on {formatDate(order.date)}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">{order.status}</span>
                    </Badge>
                    <div className="flex items-center gap-1 mt-2 text-lg font-bold">
                      <DollarSign className="size-4" />
                      {order.total.toFixed(2)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="text-2xl">{item.image}</div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right font-semibold">
                        ${(item.quantity * item.price).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    {order.items.reduce((total, item) => total + item.quantity, 0)} items
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(order.id)}
                    >
                      <Eye className="size-4 mr-2" />
                      View Details
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleReorder(order.id)}
                    >
                      <Package className="size-4 mr-2" />
                      Reorder
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders