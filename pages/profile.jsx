import { useEffect } from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Router from 'next/router'
import Head from 'next/head'
import Profile from '@/components/profile'

export default function ProfilePage() {
  const session = useSession()
  const supabase = useSupabaseClient()

  useEffect(() => {
    // session is null on first render, so we need to wait a bit
    const timeout = setTimeout(() => {
      if (!session) {
        Router.push('/login')
      }
    }, 100) // Delay of 0.1 seconds (100 milliseconds)
    return () => clearTimeout(timeout) // Cleanup the timeout on component unmount
  }, [session])

  // TODO: add logout button
  async function logout() {
    const { error } = await supabase.auth.signOut()
    if (error) console.log('Error logging out:', error.message)
  }

  return (
    <>
      {session && (
        <>
          <Head>
            <title>First Property - Profile</title>
          </Head>
          <div className='flex w-full mt-12 justify-center bg-white'>
            <Profile />
          </div>{' '}
        </>
      )}
    </>
  )
}