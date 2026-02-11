#!/bin/bash
echo "Scanning for hardcoded keys..."
grep -r "VITE_SUPABASE_URL" . --exclude-dir=node_modules --exclude-dir=.git --exclude=.env.local
grep -r "VITE_SUPABASE_ANON_KEY" . --exclude-dir=node_modules --exclude-dir=.git --exclude=.env.local
grep -r "AIza" . --exclude-dir=node_modules --exclude-dir=.git --exclude=.env.local

echo "Scan complete. If only environment variable references are shown above, the codebase is secure."
