import { useEffect, useState } from 'react'

import { Lead, LeadStatus } from '~/types'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet'

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
  const [editedLead, setEditedLead] = useState(lead)
  const [emailError, setEmailError] = useState<string | null>(null)

  // Update editedLead when lead prop changes
  useEffect(() => {
    setEditedLead(lead)
  }, [lead])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSave = async () => {
    if (editedLead.email && !validateEmail(editedLead.email)) {
      setEmailError('Please enter a valid email address')
      return
    }

    try {
      await onUpdateLead(lead.id, editedLead)
      setIsEditing(false)
      setEmailError(null)
      onClose() // Close the panel after successful update
    } catch (err) {
      console.error('Failed to save lead:', err)
      // Error handling is done in the parent component
    }
  }

  const handleCancel = () => {
    setEditedLead(lead)
    setIsEditing(false)
    setEmailError(null)
  }

  const handleEmailChange = (email: string) => {
    setEditedLead((prev) => ({ ...prev, email }))
    if (email && !validateEmail(email)) {
      setEmailError('Please enter a valid email address')
    } else {
      setEmailError(null)
    }
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

        <div className="space-y-6 p-6">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-base-gray-300">
              Name
            </label>
            <div className="mt-1 rounded border border-border bg-background-secondary p-3">
              <span className="text-foreground">{lead.name}</span>
            </div>
          </div>

          {/* Company */}
          <div>
            <label className="text-sm font-medium text-base-gray-300">
              Company
            </label>
            <div className="mt-1 rounded border border-border bg-background-secondary p-3">
              <span className="text-foreground">{lead.company}</span>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-base-gray-300">
              Email
            </label>
            {isEditing ? (
              <div className="mt-1">
                <Input
                  value={editedLead.email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  className={emailError ? 'border-destructive' : ''}
                />
                {emailError && (
                  <p className="mt-1 text-sm text-destructive">{emailError}</p>
                )}
              </div>
            ) : (
              <div className="mt-1 rounded border border-border bg-background-secondary p-3">
                <span className="text-foreground">{lead.email}</span>
              </div>
            )}
          </div>

          {/* Source */}
          <div>
            <label className="text-sm font-medium text-base-gray-300">
              Source
            </label>
            <div className="mt-1 rounded border border-border bg-background-secondary p-3">
              <span className="text-foreground">{lead.source}</span>
            </div>
          </div>

          {/* Score */}
          <div>
            <label className="text-sm font-medium text-base-gray-300">
              Score
            </label>
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
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-base-gray-300">
              Status
            </label>
            {isEditing ? (
              <div className="mt-1">
                <Select
                  value={editedLead.status}
                  onValueChange={(value) =>
                    setEditedLead((prev) => ({
                      ...prev,
                      status: value as LeadStatus,
                    }))
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
              </div>
            ) : (
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
            )}
          </div>
        </div>

        <SheetFooter className="flex gap-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave} className="flex-1">
                Save
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex-1"
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="flex-1">
              Edit
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
