import EventCreateForm from '@/components/EventsCreateForm'
import RootLayout from '@/components/layout/RootLayout'
import React from 'react'

function createEvent() {
  return (
    <RootLayout>
        <EventCreateForm/>
    </RootLayout>
  )
}

export default createEvent