import React from 'react'
import UpdateUserForm from '@/components/dashboard/profile/UpdateUserForm'
import { UserInfo } from '@/types/auth'

interface Props{
  userInfo: UserInfo
}

const ProfileSection = ({userInfo}: Props) => {
  return (
    <section id='profile'>
        <UpdateUserForm userInfo={userInfo}/>
    </section>
  )
}

export default ProfileSection