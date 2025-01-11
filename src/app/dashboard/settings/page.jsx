'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Phone, Home, CheckCircle } from 'lucide-react'
import { BaseApiUrl } from '@/utils/constanst'

export default function ProfileSettings() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    pic: '/placeholder.svg?height=100&width=100'
  })
  const [isPhoneVerified, setIsPhoneVerified] = useState(false)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const response = await fetch(`${BaseApiUrl}/user/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      const json = await response.json()
      if (json && json.user && json.user.user) {
        setUserData({
          username: json.user.user.username || '',
          email: json.user.user.email || '',
          phone: json.user.user.phone || '',
          address: json.user.user.address || '',
          pic: json.user.user.pic || '/placeholder.svg?height=100&width=100'
        })
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Here you would typically send the updated profile data to your backend
    console.log('Profile updated:', userData)
  }

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUserData(prevData => ({
          ...prevData,
          pic: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleVerifyPhone = () => {
    // Implement phone verification logic here
    console.log('Verifying phone number:', userData.phone)
    // For demonstration, we'll just toggle the state
    setIsPhoneVerified(!isPhoneVerified)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Profile Settings</CardTitle>
          <CardDescription>Update your personal information and account settings</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-32 h-32">
                <AvatarImage src={userData.pic} alt="Profile picture" />
                <AvatarFallback>{userData.username.charAt(0)}</AvatarFallback>
              </Avatar>
              <Label htmlFor="avatar" className="cursor-pointer bg-blue-500 text-white hover:bg-blue-600 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 px-4 py-2">
                Change Avatar
              </Label>
              <Input id="avatar" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  id="username" 
                  name="username"
                  value={userData.username} 
                  onChange={handleInputChange} 
                  className="pl-10" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  value={userData.email} 
                  onChange={handleInputChange} 
                  className="pl-10" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <div className="relative flex">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  id="phone" 
                  name="phone"
                  type="tel" 
                  value='9922041837' 
                  onChange={handleInputChange} 
                  className="pl-10 flex-grow" 
                />
                <Button 
                  type="button" 
                  onClick={handleVerifyPhone} 
                  className="ml-2 bg-green-500 hover:bg-green-600"
                >
                  {isPhoneVerified ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Verified
                    </>
                  ) : (
                    'Verify'
                  )}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <Home className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  id="address" 
                  name="address"
                  value="Mumbai,India" 
                  onChange={handleInputChange} 
                  className="pl-10" 
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">Save Changes</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

