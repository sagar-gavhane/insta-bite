import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export default function AccountPage() {
  const { loginWithRedirect } = useAuth0()

  useEffect(() => {
    loginWithRedirect()
  })

  return null
}
