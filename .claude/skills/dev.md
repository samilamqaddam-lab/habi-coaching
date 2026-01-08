# /dev - Start Development Server

Start the Next.js development server on port 3001.

## Instructions

1. Check if port 3001 is already in use
2. If in use, offer to kill the existing process or use another port
3. Start the development server with `npm run dev -- -p 3001`
4. Run in background so the user can continue working
5. Confirm the server is running and provide the URL

## Command

```bash
# Check if port is in use
lsof -ti:3001 && echo "Port 3001 is in use" || npm run dev -- -p 3001
```

## Expected Output

Confirm the dev server is running at http://localhost:3001
