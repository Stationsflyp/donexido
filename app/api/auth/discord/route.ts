import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 })
    }

    console.log("[v0] Server: Exchanging code for token...")

    const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID
    const clientSecret = process.env.DISCORD_CLIENT_SECRET
    const redirectUri = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI

    console.log("[v0] Server: Using client_id:", clientId)
    console.log("[v0] Server: Redirect URI:", redirectUri)
    console.log("[v0] Server: Client secret exists:", !!clientSecret)

    if (!clientId || !clientSecret) {
      console.error("[v0] Missing Discord credentials in environment variables")
      return NextResponse.json({ error: "Server configuration error - missing credentials" }, { status: 500 })
    }

    const formData = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri || "",
    })

    console.log("[v0] Server: Sending request to Discord...")

    const response = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    })

    const responseText = await response.text()
    console.log("[v0] Discord response status:", response.status)

    if (!response.ok) {
      console.error("[v0] Discord API error:", response.status, responseText)
      return NextResponse.json(
        {
          error: `Discord API error: ${response.status}`,
          details: responseText,
        },
        { status: response.status },
      )
    }

    let data
    try {
      data = JSON.parse(responseText)
    } catch (e) {
      console.error("[v0] Failed to parse Discord response:", responseText)
      return NextResponse.json({ error: "Invalid response from Discord" }, { status: 500 })
    }

    if (!data.access_token) {
      console.error("[v0] No access token from Discord:", data)
      return NextResponse.json({ error: "No access token received from Discord" }, { status: 400 })
    }

    console.log("[v0] Server: Token received successfully")
    console.log("[v0] Server: Fetching user info...")

    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    })

    if (!userResponse.ok) {
      const userError = await userResponse.text()
      console.error("[v0] Failed to fetch user info:", userResponse.status, userError)
      return NextResponse.json({ error: "Failed to fetch user info from Discord" }, { status: userResponse.status })
    }

    const userData = await userResponse.json()
    console.log("[v0] Server: User data received:", userData.username)

    // Whitelist check
    const WHITELIST = ["998836610516914236", "1384032725014548591"]
    if (!WHITELIST.includes(userData.id)) {
      console.warn(`[v0] User ${userData.username} (${userData.id}) is not in the whitelist. Access denied.`)
      return NextResponse.json({ error: "Access denied. You are not authorized to access this application." }, { status: 403 })
    }

    // Authenticate with Python backend to get the real token
    const pythonBackendUrl = process.env.NEXT_PUBLIC_API_URL || "https://emerald-blocking-moment-witness.trycloudflare.com"
    console.log("[v0] Server: Authenticating with Python backend at", pythonBackendUrl)

    let token

    try {
      const authResponse = await fetch(`${pythonBackendUrl}/auth_discord`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: userData.username,
        }).toString(),
      })

      if (!authResponse.ok) {
        console.warn("[v0] Python backend auth failed or not supported:", authResponse.status)
        // Fallback to generated token if backend is unreachable or doesn't support auth
        token = Buffer.from(`${userData.id}:${Date.now()}`).toString("base64")
      } else {
        const authData = await authResponse.json()
        token = authData.token
        console.log("[v0] Server: Received token from backend")
      }
    } catch (error) {
      console.error("[v0] Failed to authenticate with backend:", error)
      token = Buffer.from(`${userData.id}:${Date.now()}`).toString("base64")
    }

    const user = {
      id: userData.id,
      username: userData.username,
      avatar: userData.avatar ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png` : "",
      plan: "premium", // All whitelisted users are premium
    }

    // Generate a simple token (in production, use JWT with proper signing)
    // const token = Buffer.from(`${userData.id}:${Date.now()}`).toString("base64")

    console.log("[v0] Server: Authentication successful")

    return NextResponse.json({
      token: token,
      user: {
        username: user.username,
        avatar: user.avatar,
        plan: user.plan,
      },
    })
  } catch (error) {
    console.error("[v0] Server error during authentication:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
