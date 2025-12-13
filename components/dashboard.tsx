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

export function Dashboard({ user, onLogout }: DashboardProps) {
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
    basic: { maxFileSize: 13 * 1024 * 1024, totalStorage: 1 * 1024 * 1024 * 1024 },
    premium: { maxFileSize: 30 * 1024 * 1024, totalStorage: 9 * 1024 * 1024 * 1024 },
  }

  const fetchFiles = async () => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append("username", user.username) // <--- usamos username en lugar de token

      const response = await fetch(`${API_BASE_URL}/my_files`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Failed to fetch files")

      const data = await response.json()
      const mappedFiles = (data.files || []).map((f: any) => ({
        file_id: f.stored,
        original_name: f.name,
        upload_date: new Date().toISOString(),
        file_size: f.size || 0,
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
  }, [])

  const handleFileSelect = (file: File) => {
    const maxSize = planLimits[userPlan].maxFileSize
    if (file.size > maxSize) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: `Your ${userPlan} plan allows files up to ${(maxSize / (1024 * 1024)).toFixed(2)} MB.`,
      })
      return
    }

    const allowedExtensions = [".exe", ".txt", ".lua", ".py", ".js", ".json", ".md", ".zip", ".rar", ".pdf", ".doc", ".docx"]
    if (!allowedExtensions.some(ext => file.name.toLowerCase().endsWith(ext))) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: `Allowed types: ${allowedExtensions.join(", ")}`,
      })
      return
    }

    const totalSize = files.reduce((sum, f) => sum + (f.file_size || 0), 0)
    if (totalSize + file.size > planLimits[userPlan].totalStorage) {
      const availableSpace = planLimits[userPlan].totalStorage - totalSize
      toast({
        variant: "destructive",
        title: "Storage limit reached",
        description: `You have ${formatBytes(availableSpace)} available.`,
      })
      return
    }

    setSelectedFile(file)
    handleFileUpload(file)
  }

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true) }
  const handleDragLeave = () => setIsDragging(false)
  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files[0]) handleFileSelect(e.dataTransfer.files[0]) }

  const handleFileUpload = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("username", user.username) // <--- username en lugar de token

    setIsUploading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/upload`, { method: "POST", body: formData })
      if (!response.ok) throw new Error("Upload failed")
      await response.json()
      toast({ title: "Success", description: `${file.name} uploaded successfully!` })
      await fetchFiles()
      setSelectedFile(null)
    } catch (error) {
      toast({ variant: "destructive", title: "Upload Failed", description: "Could not upload file." })
      console.error(error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileDelete = async (fileId: string) => {
    try {
      const formData = new FormData()
      formData.append("username", user.username)
      formData.append("file_id", fileId)

      const response = await fetch(`${API_BASE_URL}/delete`, { method: "POST", body: formData })
      if (!response.ok) throw new Error("Delete failed")

      toast({ title: "Success", description: "File deleted successfully!" })
      await fetchFiles()
    } catch (error) {
      toast({ variant: "destructive", title: "Delete Failed", description: "Could not delete file." })
      console.error(error)
    }
  }

  const handleDownload = (fileId: string) => window.open(`${API_BASE_URL}/download/${fileId}`, "_blank")

  const handleSetPassword = async (fileId: string, password: string) => {
    try {
      const formData = new FormData()
      formData.append("username", user.username)
      formData.append("file_id", fileId)
      formData.append("password", password)

      const response = await fetch(`${API_BASE_URL}/set_password`, { method: "POST", body: formData })
      if (!response.ok) throw new Error("Failed to set password")

      toast({ title: "Success", description: "Password set successfully!" })
      await fetchFiles()
    } catch (error) {
      toast({ variant: "destructive", title: "Failed", description: "Could not set password." })
      console.error(error)
    }
  }

  const totalFiles = files.length
  const totalSize = files.reduce((sum, f) => sum + (f.file_size || 0), 0)
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
  }
  const storagePercentage = (totalSize / planLimits[userPlan].totalStorage) * 100

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Fondo y animaciones */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      {/* Header */}
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
                <img src={user.avatar} alt={user.username} className="h-8 w-8 rounded-full" />
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
            <Button variant="ghost" size="sm" onClick={onLogout} className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-12 relative z-10">
        {/* Contenido principal */}
        {/* Aquí va todo tu layout de uploads y FileList (igual que tu código) */}
        <div className="animate-fadeIn" style={{ animationDelay: "0.6s" }}>
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
      </main>
    </div>
  )
}
