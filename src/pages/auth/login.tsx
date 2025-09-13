import { Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import businessImage from '~/assets/business.png'
import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import { Form, FormError, FormFieldset, FormLabel } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { useAuth } from '~/contexts/auth-context'
import { type LoginFormData, useLoginForm } from '~/hooks/use-login-form'

export const LoginPage = () => {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()
  const { form } = useLoginForm()

  const onSubmit = async (data: LoginFormData) => {
    setError('')
    setIsLoading(true)

    try {
      const success = await login(data.email, data.password)
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

              <Form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Email Field */}
                <FormFieldset>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-base-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      className="border-border bg-background-secondary pl-10"
                      {...form.register('email')}
                    />
                  </div>
                  {form.formState.errors.email && (
                    <FormError>{form.formState.errors.email.message}</FormError>
                  )}
                </FormFieldset>

                {/* Password Field */}
                <FormFieldset>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-base-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      className="border-border bg-background-secondary pl-10"
                      {...form.register('password')}
                    />
                  </div>
                  {form.formState.errors.password && (
                    <FormError>
                      {form.formState.errors.password.message}
                    </FormError>
                  )}
                </FormFieldset>

                {/* Error Message */}
                {error && (
                  <FormError className="text-center">{error}</FormError>
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
              </Form>
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
