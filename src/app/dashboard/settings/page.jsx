'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Phone, Home } from 'lucide-react'

export default function ProfileSettings() {
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('john.doe@example.com')
  const [phone, setPhone] = useState('+1 234 567 8900')
  const [address, setAddress] = useState('123 Main St, Anytown, AN 12345')
  const [avatar, setAvatar] = useState('/placeholder.svg?height=100&width=100')

  const handleSubmit = (event) => {
    event.preventDefault()
    // Here you would typically send the updated profile data to your backend
    console.log('Profile updated:', { name, email, phone, address })
  }

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="px-10">
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>Update your personal information and account settings</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-32 h-32">
                <AvatarImage src={avatar} alt="Profile picture" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Label htmlFor="avatar" className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2">
                Change Avatar
              </Label>
              <Input id="avatar" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <Home className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="pl-10" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="ml-auto">Save Changes</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

