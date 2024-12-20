import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Database } from '@/types/supabase'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Gestione degli accessi in base al ruolo
  const path = req.nextUrl.pathname

  // Redirect to login if accessing protected routes without session
  if (!session && (path.startsWith('/(dashboard)') || path.startsWith('/api/'))) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Role-based access control
  if (session) {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    const role = user?.user_metadata?.role

    if (path.startsWith('/(dashboard)/supplier') && role !== 'supplier') {
      return NextResponse.redirect(new URL('/', req.url))
    }

    if (path.startsWith('/(dashboard)/installer') && role !== 'installer') {
      return NextResponse.redirect(new URL('/', req.url))
    }

    if (path.startsWith('/(dashboard)/client') && role !== 'client') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return res
}

export const config = {
  matcher: [
    '/(dashboard)/:path*',
    '/api/:path*',
    '/login',
    '/register',
    '/forgot-password',
  ],
}
