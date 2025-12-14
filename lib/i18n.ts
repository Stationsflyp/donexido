export type Language = "en" | "es"

export const translations = {
  en: {
    // Login page
    login: {
      title: "OxcyShop",
      subtitle: "File Host",
      privateExclusive: "Private & Exclusive",
      description:
        "An invite-only file hosting platform for trusted friends. Sign in with Discord to access your private vault.",
      joinFriends: "Join your friends",
      continueDiscord: "Continue with Discord",
      termsPrefix: "By continuing, you agree to our",
      termsLink: "terms of service",
      secured: "Secured by end-to-end encryption",
    },
    // Dashboard
    dashboard: {
      logout: "Logout",
      uploadManageShare: "Upload, manage and share",
      filesAnySize: "files of any size",
      description:
        "Your secure file hosting platform powered by OxcyShop. Upload, organize, and access your files anytime, anywhere.",
      clickDrag: "Click or drag-and-drop",
      filesHere: "your files here",
      maxSize: "Max size",
      selectFile: "Or select a file",
      uploading: "Uploading...",
      pleaseWait: "Please wait",
      filesShared: "Files Shared",
      avgRating: "Avg. Rating",
      yourFiles: "Your Files",
      manageFiles: "Manage and access your uploaded files",
      basic: "Basic",
      premium: "Premium",
    },
    // Toasts
    toasts: {
      success: "Success",
      uploadSuccess: "uploaded successfully!",
      deleteSuccess: "File deleted successfully!",
      error: "Error",
      loadFailed: "Failed to load files. Please try again.",
      uploadFailed: "Could not upload file. Please try again.",
      deleteFailed: "Could not delete file. Please try again.",
      fileTooLarge: "File too large",
      fileTooLargeDesc: "Your {plan} plan allows files up to {maxSize} MB. This file is {fileSize} MB.",
      invalidFileType: "Invalid file type",
      allowedTypes: "Allowed types:",
      storageLimitReached: "Storage limit reached",
      storageLimitDesc: "You have {available} available. Upgrade to Premium for 9 GB storage.",
    },
    // Terms page
    terms: {
      title: "Terms of Service",
      subtitle: "Please read carefully before using OxcyShop File Host",
      privateFriends: "Private Friends-Only Service",
      privateFriendsDesc1:
        "OxcyShop File Host is a private, invite-only file hosting service designed exclusively for trusted friends. This platform is NOT a public service and access is granted solely through invitation.",
      privateFriendsDesc2:
        "By using this service, you acknowledge that this is a personal project maintained for a closed group of users. The service may be modified or discontinued at any time without prior notice.",
      prohibited: "Prohibited Content and Consequences",
      prohibitedWarning: "UPLOADING MALICIOUS FILES, GRABBERS, OR VIRUSES IS STRICTLY PROHIBITED.",
      prohibitedDesc1:
        "If any user is detected uploading malicious content, viruses, grabbers, trojans, or any form of harmful software, their account will be permanently banned immediately and without warning.",
      prohibitedDesc2: "BANNED ACCOUNTS WILL NOT BE REACTIVATED UNDER ANY CIRCUMSTANCES.",
      prohibitedDesc3:
        "We employ automated scanning and manual review processes to detect malicious content. Do not attempt to bypass these systems.",
      storagePlans: "Storage Plans and File Size Limits",
      basicPlan: "Basic Plan (Free):",
      basicMaxFile: "Maximum file size: 13 MB per upload",
      basicStorage: "Total storage space: 1 GB",
      basicSpeed: "Standard upload speed",
      premiumPlan: "Premium Plan:",
      premiumMaxFile: "Maximum file size: 30 MB per upload",
      premiumStorage: "Total storage space: 9 GB",
      premiumSpeed: "Priority upload speed",
      premiumRetention: "Extended file retention",
      fileSizeNote:
        "Files exceeding the maximum size limit for your plan will be automatically rejected and you will receive a notification.",
      liability: "Limitation of Liability",
      liabilityDesc: "OxcyShop File Host and its operators are NOT responsible for:",
      liabilityItem1:
        "Content uploaded by users, including but not limited to malicious files, illegal content, or copyrighted material",
      liabilityItem2: "Any damages, losses, or harm resulting from the use or misuse of this service",
      liabilityItem3: "Data loss, service interruptions, or technical issues",
      liabilityItem4: "Any actions taken by users after downloading files from this platform",
      liabilityItem5: "Third-party claims related to content uploaded or shared through this service",
      liabilityDisclaimer:
        "By using this service, you agree to indemnify and hold harmless OxcyShop File Host and its operators from any claims, damages, or legal actions arising from your use of the platform.",
      privacy: "Privacy and Security",
      privacyDesc1:
        "We take reasonable measures to protect your files and personal information. However, no system is completely secure. You are responsible for maintaining the confidentiality of your account credentials.",
      privacyDesc2:
        "Files uploaded to this platform may be scanned for security purposes. We reserve the right to remove any content that violates these terms or poses a security risk.",
      privacyDesc3:
        "Your Discord username and avatar are collected solely for authentication and identification purposes within the platform.",
      acceptable: "Acceptable Use",
      acceptableDesc: "Users agree to:",
      acceptableItem1: "Use the service only for lawful purposes",
      acceptableItem2: "Not upload files that infringe on intellectual property rights",
      acceptableItem3: "Not share access credentials with unauthorized individuals",
      acceptableItem4: "Not attempt to circumvent storage or file size limitations",
      acceptableItem5: "Not use automated tools to abuse the service",
      acceptableItem6: "Respect the private nature of this platform",
      changes: "Changes to Terms",
      changesDesc:
        "We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the updated terms. Users will be notified of significant changes through the platform.",
      lastUpdated: "Last updated:",
      backToLogin: "Back to Login",
      developer: "Developer",
    },
  },
  es: {
    // Página de login
    login: {
      title: "OxcyShop",
      subtitle: "Alojamiento de Archivos",
      privateExclusive: "Privado y Exclusivo",
      description:
        "Una plataforma de alojamiento de archivos solo por invitación para amigos de confianza. Inicia sesión con Discord para acceder a tu bóveda privada.",
      joinFriends: "Únete a tus amigos",
      continueDiscord: "Continuar con Discord",
      termsPrefix: "Al continuar, aceptas nuestros",
      termsLink: "términos de servicio",
      secured: "Protegido con cifrado de extremo a extremo",
    },
    // Dashboard
    dashboard: {
      logout: "Cerrar sesión",
      uploadManageShare: "Sube, gestiona y comparte",
      filesAnySize: "archivos de cualquier tamaño",
      description:
        "Tu plataforma segura de alojamiento de archivos impulsada por OxcyShop. Sube, organiza y accede a tus archivos en cualquier momento y lugar.",
      clickDrag: "Haz clic o arrastra y suelta",
      filesHere: "tus archivos aquí",
      maxSize: "Tamaño máx",
      selectFile: "O selecciona un archivo",
      uploading: "Subiendo...",
      pleaseWait: "Por favor espera",
      filesShared: "Archivos Compartidos",
      avgRating: "Calificación Promedio",
      yourFiles: "Tus Archivos",
      manageFiles: "Gestiona y accede a tus archivos subidos",
      basic: "Básico",
      premium: "Premium",
    },
    // Notificaciones
    toasts: {
      success: "Éxito",
      uploadSuccess: "subido exitosamente!",
      deleteSuccess: "Archivo eliminado exitosamente!",
      error: "Error",
      loadFailed: "Error al cargar archivos. Por favor intenta de nuevo.",
      uploadFailed: "No se pudo subir el archivo. Por favor intenta de nuevo.",
      deleteFailed: "No se pudo eliminar el archivo. Por favor intenta de nuevo.",
      fileTooLarge: "Archivo demasiado grande",
      fileTooLargeDesc: "Tu plan {plan} permite archivos de hasta {maxSize} MB. Este archivo pesa {fileSize} MB.",
      invalidFileType: "Tipo de archivo inválido",
      allowedTypes: "Tipos permitidos:",
      storageLimitReached: "Límite de almacenamiento alcanzado",
      storageLimitDesc: "Tienes {available} disponibles. Actualiza a Premium para 9 GB de almacenamiento.",
    },
    // Página de términos
    terms: {
      title: "Términos de Servicio",
      subtitle: "Por favor lee cuidadosamente antes de usar OxcyShop File Host",
      privateFriends: "Servicio Privado Solo para Amigos",
      privateFriendsDesc1:
        "OxcyShop File Host es un servicio privado de alojamiento de archivos solo por invitación diseñado exclusivamente para amigos de confianza. Esta plataforma NO es un servicio público y el acceso se otorga únicamente mediante invitación.",
      privateFriendsDesc2:
        "Al usar este servicio, reconoces que este es un proyecto personal mantenido para un grupo cerrado de usuarios. El servicio puede ser modificado o descontinuado en cualquier momento sin previo aviso.",
      prohibited: "Contenido Prohibido y Consecuencias",
      prohibitedWarning: "SUBIR ARCHIVOS MALICIOSOS, GRABBERS O VIRUS ESTÁ ESTRICTAMENTE PROHIBIDO.",
      prohibitedDesc1:
        "Si se detecta que algún usuario sube contenido malicioso, virus, grabbers, troyanos o cualquier forma de software dañino, su cuenta será baneada permanentemente de inmediato y sin previo aviso.",
      prohibitedDesc2: "LAS CUENTAS BANEADAS NO SERÁN REACTIVADAS BAJO NINGUNA CIRCUNSTANCIA.",
      prohibitedDesc3:
        "Empleamos escaneo automatizado y procesos de revisión manual para detectar contenido malicioso. No intentes eludir estos sistemas.",
      storagePlans: "Planes de Almacenamiento y Límites de Tamaño de Archivo",
      basicPlan: "Plan Básico (Gratis):",
      basicMaxFile: "Tamaño máximo de archivo: 13 MB por subida",
      basicStorage: "Espacio de almacenamiento total: 1 GB",
      basicSpeed: "Velocidad de subida estándar",
      premiumPlan: "Plan Premium:",
      premiumMaxFile: "Tamaño máximo de archivo: 30 MB por subida",
      premiumStorage: "Espacio de almacenamiento total: 9 GB",
      premiumSpeed: "Velocidad de subida prioritaria",
      premiumRetention: "Retención de archivos extendida",
      fileSizeNote:
        "Los archivos que excedan el límite de tamaño máximo de tu plan serán rechazados automáticamente y recibirás una notificación.",
      liability: "Limitación de Responsabilidad",
      liabilityDesc: "OxcyShop File Host y sus operadores NO son responsables de:",
      liabilityItem1:
        "Contenido subido por usuarios, incluyendo pero no limitado a archivos maliciosos, contenido ilegal o material con derechos de autor",
      liabilityItem2: "Cualquier daño, pérdida o perjuicio resultante del uso o mal uso de este servicio",
      liabilityItem3: "Pérdida de datos, interrupciones del servicio o problemas técnicos",
      liabilityItem4: "Cualquier acción tomada por usuarios después de descargar archivos de esta plataforma",
      liabilityItem5: "Reclamos de terceros relacionados con contenido subido o compartido a través de este servicio",
      liabilityDisclaimer:
        "Al usar este servicio, aceptas indemnizar y eximir de responsabilidad a OxcyShop File Host y sus operadores de cualquier reclamo, daño o acción legal que surja del uso de la plataforma.",
      privacy: "Privacidad y Seguridad",
      privacyDesc1:
        "Tomamos medidas razonables para proteger tus archivos e información personal. Sin embargo, ningún sistema es completamente seguro. Eres responsable de mantener la confidencialidad de las credenciales de tu cuenta.",
      privacyDesc2:
        "Los archivos subidos a esta plataforma pueden ser escaneados con fines de seguridad. Nos reservamos el derecho de eliminar cualquier contenido que viole estos términos o represente un riesgo de seguridad.",
      privacyDesc3:
        "Tu nombre de usuario y avatar de Discord se recopilan únicamente con fines de autenticación e identificación dentro de la plataforma.",
      acceptable: "Uso Aceptable",
      acceptableDesc: "Los usuarios aceptan:",
      acceptableItem1: "Usar el servicio solo para fines legales",
      acceptableItem2: "No subir archivos que infrinjan derechos de propiedad intelectual",
      acceptableItem3: "No compartir credenciales de acceso con personas no autorizadas",
      acceptableItem4: "No intentar eludir las limitaciones de almacenamiento o tamaño de archivo",
      acceptableItem5: "No usar herramientas automatizadas para abusar del servicio",
      acceptableItem6: "Respetar la naturaleza privada de esta plataforma",
      changes: "Cambios a los Términos",
      changesDesc:
        "Nos reservamos el derecho de modificar estos términos en cualquier momento. El uso continuo del servicio después de los cambios constituye la aceptación de los términos actualizados. Los usuarios serán notificados de cambios significativos a través de la plataforma.",
      lastUpdated: "Última actualización:",
      backToLogin: "Volver al inicio",
      developer: "Desarrollador",
    },
  },
}

export function getTranslation(lang: Language) {
  return translations[lang]
}
