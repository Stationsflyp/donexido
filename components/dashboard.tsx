"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { FileList } from "@/components/file-list"
import { HardDrive, LogOut, Upload, FileUp, TrendingUp, HardDriveDownload, Star, Crown, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface DashboardProps {
  token: string
  user: { username: string; avatar: string }
  onLogout: () => void
}

export interface FileItem {
  file_id: string
  original_name: string
  upload_date: string
  file_size?: number
  password?: string
}

type UserPlan = "basic" | "premium"

export function Dashboard({ token, user, onLogout }: DashboardProps) {
  const [files, setFiles] = useState<FileItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [userPlan, setUserPlan] = useState<UserPlan>("basic")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://64.181.220.231:8000"

  const planLimits = {
    basic: {
      maxFileSize: 13 * 1024 * 1024, // 13 MB
      totalStorage: 1 * 1024 * 1024 * 1024, // 1 GB
    },
    premium: {
      maxFileSize: 30 * 1024 * 1024, // 30 MB
      totalStorage: 9 * 1024 * 1024 * 1024, // 9 GB
    },
  }

  // --- CORRECCIÓN: define formatBytes antes de cualquier uso ---
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
  }

  const fetchFiles = async () => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append("token", token)

      const response = await fetch(`${API_BASE_URL}/my_files`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to fetch files")
      }

      const data = await response.json()
      // Map backend response to frontend interface
      const mappedFiles = (data.files || []).map((f: any) => ({
        file_id: f.stored,
        original_name: f.name,
        upload_date: new Date().toISOString(), // Backend doesn't return date
        file_size: 0, // Backend doesn't return size
      }))
      setFiles(mappedFiles)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load files. Please try again.",
      })
      console.error("Error fetching files:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchFiles()
  }, [token])

  const handleFileSelect = (file: File) => {
    const maxSize = planLimits[userPlan].maxFileSize
    const maxSizeMB = maxSize / (1024 * 1024)

    if (file.size > maxSize) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: `Your ${userPlan} plan allows files up to ${maxSizeMB} MB. This file is ${(file.size / (1024 * 1024)).toFixed(2)} MB.`,
        duration: 5000,
      })
      return
    }

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
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: `Allowed types: ${allowedExtensions.join(", ")}`,
      })
      return
    }

    const totalSize = files.reduce((sum, f) => sum + (f.file_size || 0), 0)
    const totalStorageLimit = planLimits[userPlan].totalStorage

    if (totalSize + file.size > totalStorageLimit) {
      const availableSpace = totalStorageLimit - totalSize
      toast({
        variant: "destructive",
        title: "Storage limit reached",
        description: `You have ${formatBytes(availableSpace)} available. Upgrade to Premium for 9 GB storage.`,
        duration: 5000,
      })
      return
    }

    setSelectedFile(file)
    handleFileUpload(file)
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

  const handleFileUpload = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("token", token)

    setIsUploading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      await response.json()

      toast({
        title: "Success",
        description: `${file.name} uploaded successfully!`,
      })

      await fetchFiles()
      setSelectedFile(null)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "Could not upload file. Please try again.",
      })
      console.error("Error uploading file:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileDelete = async (fileId: string) => {
    try {
      const formData = new FormData()
      formData.append("token", token)
      formData.append("file_id", fileId)

      const response = await fetch(`${API_BASE_URL}/delete`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Delete failed")
      }

      toast({
        title: "Success",
        description: "File deleted successfully!",
      })

      await fetchFiles()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Delete Failed",
        description: "Could not delete file. Please try again.",
      })
      console.error("Error deleting file:", error)
    }
  }

  const handleDownload = (fileId: string, fileName: string) => {
    const downloadUrl = `${API_BASE_URL}/download/${fileId}`
    window.open(downloadUrl, "_blank")
  }

  const handleSetPassword = async (fileId: string, password: string) => {
    try {
      const formData = new FormData()
      formData.append("token", token)
      formData.append("file_id", fileId)
      formData.append("password", password)

      const response = await fetch(`${API_BASE_URL}/set_password`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to set password")
      }

      toast({
        title: "Success",
        description: "Password set successfully!",
      })

      await fetchFiles()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Could not set password. Please try again.",
      })
      console.error("Error setting password:", error)
    }
  }

  const totalFiles = files.length
  const totalSize = files.reduce((sum, file) => sum + (file.file_size || 0), 0)
  const storagePercentage = (totalSize / planLimits[userPlan].totalStorage) * 100

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute top-1/3 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-20 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <header className="border-b border-border/50 bg-card/30 backdrop-blur-xl sticky top-0 z-50 animate-slideInRight">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary animate-pulse-glow">
              <HardDrive className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">OxcyShop</h1>
              <p className="text-xs text-primary">File Host</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-card/50 border border-border/50">
              {user.avatar ? (
                <img src={user.avatar || "/placeholder.svg"} alt={user.username} className="h-8 w-8 rounded-full" />
              ) : (
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">{user.username}</span>
                <Badge variant={userPlan === "premium" ? "default" : "secondary"} className="text-xs">
                  {userPlan === "premium" && <Crown className="h-3 w-3 mr-1" />}
                  {userPlan.charAt(0).toUpperCase() + userPlan.slice(1)}
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fadeIn">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text leading-tight">
              Upload, manage and share
            </h2>
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">files of any size</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Your secure file hosting platform powered by OxcyShop. Upload, organize, and access your files anytime,
              anywhere.
            </p>
          </div>

          <div className="flex justify-center mb-12 animate-scaleIn" style={{ animationDelay: "0.2s" }}>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !isUploading && fileInputRef.current?.click()}
              className={`relative cursor-pointer transition-all duration-500 ${
                isUploading ? "pointer-events-none" : ""
              }`}
            >
              <div
                className={`absolute inset-0 rounded-full transition-all duration-500 ${
                  isDragging
                    ? "bg-gradient-to-r from-primary via-primary/50 to-primary animate-border-spin scale-110"
                    : ""
                }`}
                style={{ padding: "4px" }}
              />

              <div
                className={`relative w-80 h-80 rounded-full flex flex-col items-center justify-center transition-all duration-500 ${
                  isDragging
                    ? "bg-card border-4 border-primary shadow-2xl shadow-primary/30 scale-110"
                    : "bg-card border-4 border-primary/30 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20 hover:scale-105"
                }`}
              >
                {isUploading ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                      <div className="h-20 w-20 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                      <Upload className="h-10 w-10 text-primary absolute inset-0 m-auto" />
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-foreground">Uploading...</p>
                      <p className="text-sm text-muted-foreground mt-1">Please wait</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={`transition-all duration-300 ${isDragging ? "scale-125" : "scale-100"}`}>
                      <div className="relative">
                        <div
                          className={`p-6 rounded-full transition-all duration-300 ${
                            isDragging ? "bg-primary/30 animate-pulse-glow" : "bg-primary/20"
                          }`}
                        >
                          <FileUp className={`h-16 w-16 text-primary ${isDragging ? "animate-float" : ""}`} />
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 text-center">
                      <p className="text-lg font-semibold text-foreground">Click or drag-and-drop</p>
                      <p className="text-sm text-muted-foreground mt-1">your files here</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Max size: {planLimits[userPlan].maxFileSize / (1024 * 1024)} MB
                      </p>
                      <button className="mt-4 text-primary hover:underline text-sm font-medium">
                        Or select a file
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

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

          <div
            className="flex flex-wrap justify-center gap-8 mb-16 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 animate-fadeIn"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/20">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalFiles}</p>
                <p className="text-sm text-muted-foreground">Files Shared</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/20">
                <HardDriveDownload className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{formatBytes(totalSize)}</p>
                <p className="text-sm text-muted-foreground">
                  of {formatBytes(planLimits[userPlan].totalStorage)} ({storagePercentage.toFixed(1)}%)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/20">
                <Star className="h-6 w-6 text-primary fill-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">5.0/5</p>
                <p className="text-sm text-muted-foreground">Avg. Rating</p>
              </div>
            </div>
          </div>

          <div className="animate-fadeIn" style={{ animationDelay: "0.6s" }}>
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-foreground mb-2">Your Files</h3>
              <p className="text-sm text-muted-foreground">Manage and access your uploaded files</p>
            </div>

            <Card className="border-border bg-card/50 backdrop-blur-sm hover-lift">
              <div className="p-6">
                <FileList
                  files={files}
                  isLoading={isLoading}
                  onDelete={handleFileDelete}
                  onDownload={handleDownload}
                  onSetPassword={handleSetPassword}
                  apiBaseUrl={API_BASE_URL}
                />
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
