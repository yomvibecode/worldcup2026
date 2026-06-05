# FIFA World Cup 2026 Tracker

Live standings and bracket tracker powered by football-data.org, hosted on Netlify.

## Deploy to Netlify (5 minutes)

### 1. Drag & drop deploy
1. Go to **app.netlify.com** and log in (or sign up free)
2. On your dashboard, drag the entire `worldcup2026` folder onto the deploy dropzone
3. Netlify will assign you a URL like `https://random-name-123.netlify.app`

### 2. Add your API key (required for live data)
1. In your Netlify dashboard, go to **Site configuration → Environment variables**
2. Click **Add a variable**
3. Set:
   - **Key:** `FOOTBALL_DATA_API_KEY`
   - **Value:** your key from football-data.org
4. Click **Save**, then go to **Deploys → Trigger deploy → Deploy site**

### 3. (Optional) Set a custom domain
In **Domain management**, you can add a free `your-name.netlify.app` subdomain
or connect your own domain.

## Project structure

```
worldcup2026/
├── index.html                    # Main app
├── netlify.toml                  # Netlify config + redirects
├── netlify/functions/
│   ├── standings.js              # Proxy → football-data.org/standings
│   └── matches.js                # Proxy → football-data.org/matches
└── README.md
```

## How it works

The browser never touches football-data.org directly (which blocks CORS).
Instead it calls `/api/standings` and `/api/matches` — clean URLs that
Netlify rewrites to serverless functions. Those functions run server-side,
inject the API key from the environment variable, and return the data.

Your API key is never exposed in the browser or in the code.

## Free tier limits

- **football-data.org free tier:** 10 requests/minute, World Cup data included
- **Netlify free tier:** 125k function invocations/month, 100GB bandwidth
  Both are more than enough for personal use.
