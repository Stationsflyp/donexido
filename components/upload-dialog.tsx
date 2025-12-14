"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X, File, FileUp } from "lucide-react"

interface UploadDialogProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (file: File) => void
}

export function UploadDialog({ isOpen, onClose, onUpload }: UploadDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    // Validate file types
    const allowedExtensions = [
      ".exe",
      ".txt",
      ".lua",
      ".py",
      ".js",
      ".json",
      ".md",
      ".zip",
      ".rar",
      ".pdf",
      ".doc",
      ".docx",
    ]
    const fileName = file.name.toLowerCase()
    const isAllowed = allowedExtensions.some((ext) => fileName.endsWith(ext))

    if (!isAllowed) {
      alert(`File type not allowed. Allowed types: ${allowedExtensions.join(", ")}`)
      return
    }

    setSelectedFile(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    try {
      await onUpload(selectedFile)
      setSelectedFile(null)
    } finally {
      setIsUploading(false)
    }
  }

  const handleClose = () => {
    if (!isUploading) {
      setSelectedFile(null)
      onClose()
    }
  }

  const formatFileSize = (bytes: number) => {
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card border-border animate-scaleIn">
        <DialogHeader>
          <DialogTitle className="text-foreground">Upload File</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Select a file to upload to your storage
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {!selectedFile ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="flex cursor-pointer flex-col items-center justify-center p-8 transition-all duration-300"
            >
              <div
                className={`relative flex h-48 w-48 items-center justify-center rounded-full border-4 border-dashed transition-all duration-500 ${
                  isDragging
                    ? "border-primary bg-primary/20 scale-110 animate-pulse-glow"
                    : "border-border bg-secondary/30 hover:border-primary/50 hover:bg-secondary/50 hover:scale-105"
                }`}
              >
                <div className={`transition-all duration-300 ${isDragging ? "scale-125" : "scale-100"}`}>
                  <FileUp
                    className={`h-20 w-20 ${isDragging ? "text-primary animate-float" : "text-muted-foreground"}`}
                  />
                </div>

                {/* Animated ring */}
                <div
                  className={`absolute inset-0 rounded-full border-2 transition-all duration-500 ${
                    isDragging ? "border-primary scale-110 opacity-50" : "border-transparent scale-100"
                  }`}
                />
              </div>

              <div className="mt-6 text-center">
                <p className="text-base font-semibold text-foreground">Drop your file here</p>
                <p className="mt-2 text-sm text-muted-foreground">or click to browse</p>
                <p className="mt-4 text-xs text-muted-foreground px-4 leading-relaxed">
                  Allowed: .exe, .txt, .lua, .py, .js, .json, .md, .zip, .rar, .pdf, .doc, .docx
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-secondary/50 p-4 animate-fadeIn">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 animate-scaleIn">
                    <File className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{selectedFile.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedFile(null)}
                  disabled={isUploading}
                  className="hover:bg-destructive/20 hover:text-destructive transition-all duration-200"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileSelect(e.target.files[0])
              }
            }}
          />

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isUploading}
              className="flex-1 bg-transparent transition-all duration-200 hover:scale-105"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-105"
            >
              {isUploading ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Uploading...
                </span>
              ) : (
                "Upload"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
