import { Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import businessImage from '../../assets/business.png'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { useAuth } from '../../contexts/auth-context'

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        navigate('/')
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Login Form */}
      <div className="flex flex-1 items-center justify-center bg-background-primary p-4 sm:p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-6 text-center sm:mb-8">
            <h1 className="mb-2 text-3xl font-bold text-foreground sm:text-4xl">
              Mini Seller
            </h1>
            <p className="text-sm text-base-gray-300">
              A dynamic platform designed to propel your company&apos;s growth
              journey hand in hand with Utilify.
              <br />
            </p>
          </div>

          {/* Login Form */}
          <Card className="border-border bg-background-components">
            <CardContent className="p-6 sm:p-8">
              <h2 className="mb-6 text-center text-xl font-bold text-foreground sm:mb-8 sm:text-2xl">
                LOGIN
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Email Field */}
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-base-gray-400" />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-border bg-background-secondary pl-10"
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-base-gray-400" />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-border bg-background-secondary pl-10"
                    required
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="text-center text-sm text-destructive">
                    {error}
                  </div>
                )}

                {/* Login Button */}
                <Button
                  type="submit"
                  className="hover:bg-primary/90 w-full bg-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>

                {/* Create Account Link */}
                <div className="text-center">
                  <button
                    type="button"
                    className="hover:text-primary/80 text-sm text-primary"
                    onClick={() => {
                      /* Handle sign up */
                    }}
                  >
                    Create an account
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Business Image */}
      <div className="relative hidden overflow-hidden lg:flex lg:flex-1">
        <img
          src={businessImage}
          alt="Business meeting"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 flex items-center justify-center p-8">
          <div className="text-center text-white">
            <h3 className="mb-4 text-3xl font-bold">Welcome Back</h3>
            <p className="text-lg opacity-90">
              Manage your leads and opportunities with ease
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
