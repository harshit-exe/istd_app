"use client"
import React from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { events } from '../events/data.events'


export default function EventsPage() {
    
  const filterEvents = (events, filter) => {
    if (filter === 'all') return events;
    return events.filter(event => event.type === filter);
  }

  return (
    <div className="px-10 py-8">
      <h1 className="text-3xl font-bold mb-8">Upcoming Tech Events</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{event.title}</CardTitle>
                <Badge>{event.type}</Badge>
              </div>
              <CardDescription>{event.date}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>{event.description}</p>
            </CardContent>
            <CardContent className="text-sm text-muted-foreground">
              📍 {event.location}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}



