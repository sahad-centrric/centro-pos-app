import { useEffect } from 'react'
import { useLocation, useNavigate } from '@tanstack/react-router'

const AuthRedirect = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const login = '/login'
  const homePage = '/'
  const redirectUrl = `/login?redirectTo=${encodeURIComponent(pathname)}`

  useEffect(() => {
    // If the user is already on the login page, do nothing
    if (pathname === login) return

    // Redirect to login with redirectTo param, unless they're already there
    navigate({
      to: pathname === homePage ? login : redirectUrl,
      replace: true // prevent stacking history
    })
  }, [pathname, navigate, redirectUrl])

  // Nothing to render since this component only redirects
  return null
}

export default AuthRedirect
