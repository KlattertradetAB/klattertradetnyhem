# Projektstruktur & Återanvändbara Komponenter

Detta dokument beskriver hur projektet är uppbyggt och vilka delar som är fristående nog att flyttas till andra projekt.

## 📂 Översikt
Projektet är en **React (Vite)** applikation med **TypeScript**.

```
/ (Rotkatalog)
├── index.html              # Startpunkt (Innehåller PWA-scriptet)
├── index.tsx               # React startpunkt
├── App.tsx                 # Huvud-router och layout
├── tailwind.config.js      # CSS-inställningar (om det används lokalt)
├── vite.config.ts          # Bygg-inställningar
│
├── 📁 gemenskap/           # VÅR HUVUDKOD FÖR COMMUNITYT
│   ├── 📁 components/      # Byggstenar (Knappar, Modaler, Chattfönster) - **Kopiera härifrån!**
│   ├── 📁 services/        # Logik (AI, Databas, Notiser)
│   ├── 📁 hooks/           # Funktioner (t.ex. installation av app)
│   └── 📁 my-app/          # (IGNORERA - Tom mall som kan tas bort)
│
├── 📁 pages/               # Hela sidor (Hem, Om oss, Login)
│
└── 📁 public/              # Bilder och filer (sw.js, manifest.json, walking_goat.png)
```

---

## 🧩 Moduler att återanvända

Här är de bästa bitarna att plocka till andra projekt:

### 1. PWA & Installation (App-känsla)
Vill du göra en annan hemsida till en app? Ta dessa filer:
*   `gemenskap/hooks/usePWAInstall.ts` - Logiken.
*   `gemenskap/components/InstallGuideModal.tsx` - Den snygga guiden.
*   `gemenskap/components/InstallButton.tsx` - Knappen (valfri).
*   `public/sw.js` - Motorn (Service Worker).
*   `public/manifest.json` - Appens ID-kort (Namn, iconer).
*   **Viktigt:** Glöm inte scriptet i `index.html` som startar allt!

### 2. AI & Chatt (Gemini)
För att lägga in en AI-bot i ett annat projekt:
*   `gemenskap/services/gemini.ts` - Kopplingen till Google Gemini.
*   `gemenskap/components/CommunityChat.tsx` - Själva chatt-rutan.
*   **Viktigt:** Du behöver en API-nyckel i `.env` eller inställningar.

### 3. Autentisering & Databas (Supabase)
Om du behöver inloggning någon annanstans:
*   `gemenskap/services/supabase.ts` - Kopplingen.
*   `gemenskap/services/auth.ts` - Inloggningsfunktioner.
*   `gemenskap/components/LoginForm.tsx` - Inloggningsformuläret.

### 4. UI Komponenter (Snygga delar)
*   **SettingsModal:** `gemenskap/components/SettingsModal.tsx` (Inkluderar nu Admin-delen).
*   **Navigation:** `components/Navigation.tsx` (Menyn).
*   **Footer:** `gemenskap/components/Footer.tsx`.
*   **Den vandrande geten:** 🐐
    *   Koden ligger i botten av `pages/LoginPage.tsx`.
    *   Bilden: `public/walking_goat.png`.

---

## 🧹 Städning
Mappen `gemenskap/my-app` verkar vara en tom mall som råkat hamna där. Den kan du troligen radera för att minska förvirring.
