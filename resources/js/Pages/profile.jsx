import RootLayout from '@/components/layout/RootLayout'
import ProfileSection from '@/components/profile-section'
import { usePage } from '@inertiajs/react'
import React from 'react'

function profile() {
    const { props } = usePage();
  const user = props.auth?.user;
  return (
    <RootLayout>
        <ProfileSection user={user}/>
    </RootLayout>
  )
}

export default profile