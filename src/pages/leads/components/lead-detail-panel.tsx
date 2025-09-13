import { useEffect, useState } from 'react'

import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Form, FormError, FormFieldset, FormLabel } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '~/components/ui/sheet'
import { type LeadFormData, useLeadForm } from '~/hooks/use-lead-form'
import { Lead, LeadStatus } from '~/types'

interface LeadDetailPanelProps {
  lead: Lead
  onClose: () => void
  onUpdateLead: (id: string, updates: Partial<Lead>) => Promise<void>
}

export const LeadDetailPanel = ({
  lead,
  onClose,
  onUpdateLead,
}: LeadDetailPanelProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const { form } = useLeadForm({
    email: lead.email,
    status: lead.status,
  })

  // Update form when lead prop changes
  useEffect(() => {
    form.reset({
      email: lead.email,
      status: lead.status,
    })
  }, [lead.id, lead.email, lead.status, form]) // More specific dependencies

  const onSubmit = async (data: LeadFormData) => {
    try {
      await onUpdateLead(lead.id, data)
      setIsEditing(false)
      onClose() // Close the panel after successful update
    } catch (err) {
      console.error('Failed to save lead:', err)
      // Error handling is done in the parent component
    }
  }

  const handleCancel = () => {
    form.reset({
      email: lead.email,
      status: lead.status,
    })
    setIsEditing(false)
  }

  return (
    <Sheet open={!!lead} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="responsive" className="w-full">
        <SheetHeader>
          <SheetTitle className="text-foreground">Lead Details</SheetTitle>
          <SheetDescription className="text-base-gray-400">
            View and edit lead information
          </SheetDescription>
        </SheetHeader>

        <div className="p-6">
          {isEditing ? (
            <Form id="lead-form" onSubmit={form.handleSubmit(onSubmit)}>
              {/* Email Field */}
              <FormFieldset>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="border-border bg-background-secondary"
                  {...form.register('email')}
                />
                {form.formState.errors.email && (
                  <FormError>{form.formState.errors.email.message}</FormError>
                )}
              </FormFieldset>

              {/* Status Field */}
              <FormFieldset>
                <FormLabel htmlFor="status">Status</FormLabel>
                <Select
                  value={form.watch('status')}
                  onValueChange={(value) =>
                    form.setValue('status', value as LeadStatus)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Contacted">Contacted</SelectItem>
                    <SelectItem value="Qualified">Qualified</SelectItem>
                    <SelectItem value="Unqualified">Unqualified</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.status && (
                  <FormError>{form.formState.errors.status.message}</FormError>
                )}
              </FormFieldset>
            </Form>
          ) : (
            <div className="space-y-6">
              {/* Name */}
              <FormFieldset>
                <FormLabel>Name</FormLabel>
                <div className="mt-1 rounded border border-border bg-background-secondary p-3">
                  <span className="text-foreground">{lead.name}</span>
                </div>
              </FormFieldset>

              {/* Company */}
              <FormFieldset>
                <FormLabel>Company</FormLabel>
                <div className="mt-1 rounded border border-border bg-background-secondary p-3">
                  <span className="text-foreground">{lead.company}</span>
                </div>
              </FormFieldset>

              {/* Email */}
              <FormFieldset>
                <FormLabel>Email</FormLabel>
                <div className="mt-1 rounded border border-border bg-background-secondary p-3">
                  <span className="text-foreground">{lead.email}</span>
                </div>
              </FormFieldset>

              {/* Source */}
              <FormFieldset>
                <FormLabel>Source</FormLabel>
                <div className="mt-1 rounded border border-border bg-background-secondary p-3">
                  <span className="text-foreground">{lead.source}</span>
                </div>
              </FormFieldset>

              {/* Score */}
              <FormFieldset>
                <FormLabel>Score</FormLabel>
                <div className="mt-1">
                  <Badge
                    variant={
                      lead.score >= 80
                        ? 'default'
                        : lead.score >= 60
                          ? 'secondary'
                          : 'destructive'
                    }
                  >
                    {lead.score}
                  </Badge>
                </div>
              </FormFieldset>

              {/* Status */}
              <FormFieldset>
                <FormLabel>Status</FormLabel>
                <div className="mt-1">
                  <Badge
                    variant={
                      lead.status === 'Qualified'
                        ? 'default'
                        : lead.status === 'Contacted'
                          ? 'secondary'
                          : lead.status === 'New'
                            ? 'outline'
                            : 'destructive'
                    }
                  >
                    {lead.status}
                  </Badge>
                </div>
              </FormFieldset>
            </div>
          )}
        </div>

        <SheetFooter className="flex gap-2">
          {isEditing ? (
            <>
              <Button
                type="submit"
                form="lead-form"
                className="flex-1"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Saving...' : 'Save'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="flex-1"
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                setIsEditing(true)
              }}
              className="flex-1"
            >
              Edit
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
