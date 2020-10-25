import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const LogoutButton = () => {
  const { logout } = useAuth0()

  useEffect(() => {
    logout({ returnTo: window.location.origin })
  })

  return null
}

export default LogoutButton
