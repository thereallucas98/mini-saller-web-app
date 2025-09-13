import * as React from 'react'

import { cn } from '~/lib/utils'

const Form = React.forwardRef<HTMLFormElement, React.ComponentProps<'form'>>(
  ({ className, ...props }, ref) => (
    <form
      ref={ref}
      className={cn('space-y-4 sm:space-y-6', className)}
      {...props}
    />
  ),
)
Form.displayName = 'Form'

const FormFieldset = React.forwardRef<
  HTMLFieldSetElement,
  React.ComponentProps<'fieldset'>
>(({ className, ...props }, ref) => (
  <fieldset ref={ref} className={cn('space-y-2', className)} {...props} />
))
FormFieldset.displayName = 'FormFieldset'

const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.ComponentProps<'label'>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn('text-sm font-medium text-foreground', className)}
    {...props}
  />
))
FormLabel.displayName = 'FormLabel'

const FormError = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-sm text-destructive', className)}
      {...props}
    />
  ),
)
FormError.displayName = 'FormError'

const FormDescription = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm text-base-gray-400', className)}
    {...props}
  />
))
FormDescription.displayName = 'FormDescription'

export { Form, FormFieldset, FormLabel, FormError, FormDescription }
