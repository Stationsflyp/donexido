"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Trash2, File, Sparkles, Settings, Lock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { FileItem } from "./dashboard"

interface FileListProps {
  files: FileItem[]
  isLoading: boolean
  onDelete: (fileId: string) => void
  onDownload: (fileId: string, fileName: string) => void
  onSetPassword: (fileId: string, password: string) => void
  apiBaseUrl: string
}

export function FileList({ files, isLoading, onDelete, onDownload, onSetPassword, apiBaseUrl }: FileListProps) {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
  const [password, setPassword] = useState("")

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="relative">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full border-4 border-primary opacity-20" />
        </div>
        <p className="text-sm text-muted-foreground animate-pulse">Loading your files...</p>
      </div>
    )
  }

  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-fadeIn">
        <div className="relative">
          <File className="h-16 w-16 text-muted-foreground/30 animate-float" />
          <Sparkles className="h-6 w-6 text-primary/50 absolute -top-2 -right-2 animate-pulse" />
        </div>
        <p className="mt-6 text-base font-medium text-muted-foreground">No files uploaded yet</p>
        <p className="mt-1 text-sm text-muted-foreground/70">Upload your first file to get started</p>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return dateString
    }
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "Unknown"
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`
  }

  const handleOpenSettings = (file: FileItem) => {
    setSelectedFile(file)
    setPassword(file.password || "")
    setSettingsOpen(true)
  }

  const handleSavePassword = () => {
    if (selectedFile) {
      onSetPassword(selectedFile.file_id, password)
      setSettingsOpen(false)
      setPassword("")
      setSelectedFile(null)
    }
  }

  const copyDownloadLink = (fileId: string) => {
    const link = `${apiBaseUrl}/download/${fileId}`
    navigator.clipboard.writeText(link)
  }

  return (
    <>
      <div className="space-y-3">
        {files.map((file, index) => (
          <div
            key={file.file_id}
            className="group flex items-center justify-between rounded-xl border border-border bg-secondary/20 p-4 transition-all duration-300 hover:bg-secondary/40 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 animate-fadeIn"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110 border border-primary/20">
                <File className="h-6 w-6 text-primary transition-transform duration-300 group-hover:rotate-12" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground transition-colors duration-200 group-hover:text-primary">
                    {file.original_name}
                  </p>
                  {file.password && <Lock className="h-3 w-3 text-yellow-500" title="Password protected" />}
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatDate(file.upload_date)}
                  {file.file_size && ` • ${formatFileSize(file.file_size)}`}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleOpenSettings(file)}
                className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110"
                title="Settings"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDownload(file.file_id, file.original_name)}
                className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDelete(file.file_id)}
                className="border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 hover:scale-110"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>File Settings</DialogTitle>
            <DialogDescription>
              Configure password protection for this file. When set, users will need to enter the password before
              downloading.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="password">Download Password</Label>
              <Input
                id="password"
                type="text"
                placeholder="Leave empty to remove password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Set a password to protect this file. Leave empty to remove protection.
              </p>
            </div>
            {selectedFile && (
              <div className="space-y-2">
                <Label>Download Link</Label>
                <div className="flex gap-2">
                  <Input readOnly value={`${apiBaseUrl}/download/${selectedFile.file_id}`} className="flex-1" />
                  <Button size="sm" variant="outline" onClick={() => copyDownloadLink(selectedFile.file_id)}>
                    Copy
                  </Button>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSettingsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePassword}>Save Settings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
