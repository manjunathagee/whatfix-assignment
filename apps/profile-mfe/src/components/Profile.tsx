import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  Shield, 
  Bell,
  Edit3,
  Camera,
  Star,
  Heart,
  Settings
} from 'lucide-react'

export interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  avatar: string
  joinDate: string
  membershipLevel: 'basic' | 'premium' | 'gold'
  preferences: {
    notifications: boolean
    newsletter: boolean
    sms: boolean
  }
  stats: {
    totalOrders: number
    totalSpent: number
    favoriteItems: number
    reviewsWritten: number
  }
}

const Profile: React.FC = () => {
  const [profile] = useState<UserProfile>({
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: {
      street: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'United States'
    },
    avatar: '',
    joinDate: '2023-01-15',
    membershipLevel: 'premium',
    preferences: {
      notifications: true,
      newsletter: true,
      sms: false
    },
    stats: {
      totalOrders: 24,
      totalSpent: 2847.96,
      favoriteItems: 12,
      reviewsWritten: 8
    }
  })

  const getMembershipColor = (level: UserProfile['membershipLevel']) => {
    switch (level) {
      case 'gold':
        return 'bg-yellow-100 text-yellow-800'
      case 'premium':
        return 'bg-purple-100 text-purple-800'
      case 'basic':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleEditProfile = () => {
    alert('Edit profile functionality will be implemented in future sprints!')
  }

  const handleChangeAvatar = () => {
    alert('Change avatar functionality will be implemented in future sprints!')
  }

  const handleUpdatePreferences = () => {
    alert('Update preferences functionality will be implemented in future sprints!')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <User className="size-8 text-primary" />
        <h1 className="text-3xl font-bold">My Profile</h1>
        <Badge className={getMembershipColor(profile.membershipLevel)}>
          {profile.membershipLevel.charAt(0).toUpperCase() + profile.membershipLevel.slice(1)} Member
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Info */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Manage your account details
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={handleEditProfile}>
                  <Edit3 className="size-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Avatar and Basic Info */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="size-20">
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                      <AvatarFallback className="text-xl">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="absolute -bottom-2 -right-2 size-8 rounded-full p-0"
                      onClick={handleChangeAvatar}
                    >
                      <Camera className="size-4" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{profile.name}</h3>
                    <p className="text-muted-foreground">
                      Member since {formatDate(profile.joinDate)}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Contact Information */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <Mail className="size-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{profile.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="size-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{profile.phone}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="size-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">
                      {profile.address.street}<br />
                      {profile.address.city}, {profile.address.state} {profile.address.zipCode}<br />
                      {profile.address.country}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>
                    Manage your notification settings
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={handleUpdatePreferences}>
                  <Settings className="size-4 mr-2" />
                  Update
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="size-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about orders and offers
                      </p>
                    </div>
                  </div>
                  <Badge variant={profile.preferences.notifications ? "default" : "secondary"}>
                    {profile.preferences.notifications ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="size-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Newsletter</p>
                      <p className="text-sm text-muted-foreground">
                        Get updates about new products and sales
                      </p>
                    </div>
                  </div>
                  <Badge variant={profile.preferences.newsletter ? "default" : "secondary"}>
                    {profile.preferences.newsletter ? 'Subscribed' : 'Unsubscribed'}
                  </Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Phone className="size-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">SMS Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive text messages about order updates
                      </p>
                    </div>
                  </div>
                  <Badge variant={profile.preferences.sms ? "default" : "secondary"}>
                    {profile.preferences.sms ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Account Stats</CardTitle>
              <CardDescription>
                Your activity summary
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="size-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Total Orders</p>
                      <p className="text-sm text-muted-foreground">All time</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{profile.stats.totalOrders}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="size-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">Total Spent</p>
                      <p className="text-sm text-muted-foreground">All time</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">${profile.stats.totalSpent.toFixed(2)}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Heart className="size-5 text-red-600" />
                    <div>
                      <p className="text-sm font-medium">Favorite Items</p>
                      <p className="text-sm text-muted-foreground">Saved for later</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{profile.stats.favoriteItems}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Star className="size-5 text-yellow-600" />
                    <div>
                      <p className="text-sm font-medium">Reviews Written</p>
                      <p className="text-sm text-muted-foreground">Product reviews</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{profile.stats.reviewsWritten}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Membership Info */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Membership</CardTitle>
              <CardDescription>
                Your current membership status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-3">
                <Shield className="size-12 mx-auto text-purple-600" />
                <div>
                  <p className="text-lg font-semibold">Premium Member</p>
                  <p className="text-sm text-muted-foreground">
                    Enjoy exclusive benefits and faster shipping
                  </p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  View Benefits
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile