import { type Database } from '@/types/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function getSession() {
  const supabase = createServerComponentClient<Database>({ cookies })
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

export async function getUserDetails() {
  const supabase = createServerComponentClient<Database>({ cookies })
  try {
    const { data: userDetails } = await supabase
      .from('users')
      .select('*')
      .single()
    return userDetails
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

export async function getRole() {
  const session = await getSession()
  return session?.user?.user_metadata?.role
}

export async function checkRole(allowedRoles: string[]) {
  const role = await getRole()
  return role ? allowedRoles.includes(role) : false
}
