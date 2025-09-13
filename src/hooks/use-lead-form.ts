import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const leadFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  status: z.enum(['New', 'Contacted', 'Qualified', 'Unqualified'], {
    required_error: 'Status is required',
  }),
})

export type LeadFormData = z.infer<typeof leadFormSchema>

export const useLeadForm = (initialData: Partial<LeadFormData> = {}) => {
  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      email: initialData.email || '',
      status: initialData.status || 'New',
    },
    mode: 'onSubmit', // Only validate on submit, not on change/blur
  })

  return {
    form,
    schema: leadFormSchema,
  }
}
