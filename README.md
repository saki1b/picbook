
# Wedding Instant Photo Gallery

This is a React-based web application that creates a real-time photo gallery for events like weddings. Guests can view and download photos as they are uploaded to a shared Firebase Storage folder.

## Features

-   **Real-time Updates**: Automatically refreshes every 10 seconds to fetch new photos.
-   **Firebase Integration**: Connects directly to a Firebase Storage bucket.
-   **Responsive Design**: A beautiful grid layout that works on mobile phones, tablets, and desktops.
-   **Photo Downloads**: Guests can easily download their favorite photos with a single click.
-   **Client-side Search**: Instantly filter photos by their filename.
-   **Easy to Deploy**: Ready to be deployed on services like Netlify or Firebase Hosting.

---

## 1. Firebase Setup

Before running this application, you need to create and configure a Firebase project.

### Step 1: Create a Firebase Project

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Click **"Add project"** and follow the on-screen instructions to create a new project. Give it a name like "My Wedding Gallery".

### Step 2: Set up Firebase Storage

1.  In your new project's console, go to the **Storage** section from the left-hand menu.
2.  Click **"Get started"**.
3.  Follow the setup wizard. When prompted for security rules, you can start in **test mode** for now. We will update these rules later.
4.  Select a location for your storage bucket and click **"Done"**.

### Step 3: Configure Storage Security Rules

For guests to view photos without logging in, you need to make the storage path public.

1.  In the Storage section, go to the **Rules** tab.
2.  Replace the existing rules with the following. This rule allows anyone to **read** (`get`, `list`) files under the `events/` path but does not allow them to write, update, or delete.

    ```
    rules_version = '2';
    service firebase.storage {
      match /b/{bucket}/o {
        // Allow public read access to photos in any event's public folder
        match /events/{eventId}/public/{allPaths=**} {
          allow read: if true;
          allow write: if false;
        }
      }
    }
    ```

3.  Click **"Publish"** to save your new rules.

### Step 4: Get Your Firebase Configuration Keys

1.  Go back to your Project Overview in the Firebase Console.
2.  Click the **Web icon (`</>`)** to add a web app to your project.
3.  Give your app a nickname (e.g., "Gallery Web App") and click **"Register app"**.
4.  Firebase will show you your configuration keys. It will look like this:

    ```javascript
    const firebaseConfig = {
      apiKey: "AIza...",
      authDomain: "your-project-id.firebaseapp.com",
      projectId: "your-project-id",
      storageBucket: "your-project-id.appspot.com",
      messagingSenderId: "...",
      appId: "..."
    };
    ```

5.  **Copy this entire object.**

---

## 2. Project Configuration

### Step 1: Add Firebase Config to Your Code

1.  Open the file `services/firebase.ts` in your project.
2.  You will see a placeholder `firebaseConfig` object. **Replace the entire placeholder object** with the one you copied from the Firebase console.

### Step 2: Set Your Event ID

1.  Open the file `App.tsx`.
2.  At the top of the `App` component, find this line:
    ```typescript
    const EVENT_ID = 'YOUR_EVENT_ID_HERE'; // <-- IMPORTANT: CHANGE THIS
    ```
3.  Change `'YOUR_EVENT_ID_HERE'` to a unique identifier for your event, for example, `'sarah-and-john-2024'`. This will be used in your Firebase Storage path.

---

## 3. Uploading Photos

Your gallery is configured to fetch photos from `events/<EVENT_ID>/public`.

1.  Go to **Storage** in your Firebase Console.
2.  Click the **"Create folder"** button.
3.  Name the first folder `events` and create it.
4.  Navigate into the `events` folder.
5.  Create another folder inside `events` with the **exact same `EVENT_ID`** you set in `App.tsx` (e.g., `sarah-and-john-2024`).
6.  Navigate into your event ID folder.
7.  Create a final folder named `public`.
8.  You should now be in the path `events/<YOUR_EVENT_ID>/public`.
9.  Click **"Upload file"** and select the photos you want to display in the gallery. As you upload photos here, they will automatically appear in your web app.

---

## 4. Local Development

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  You will need a local development server like Vite or Parcel to run the project. For example, using Vite:
    ```bash
    npm install -D vite @vitejs/plugin-react
    # Create vite.config.ts if needed
    npx vite
    ```

---

## 5. Deployment

To share the gallery with your guests, you need to deploy it to a hosting service.

### Step 1: Build the Project

You need a build tool to compile the TypeScript and React code into static HTML, CSS, and JavaScript files.

```bash
# This command needs to be configured with a build tool like Vite or Create React App
# For example, if using Vite:
npm run build
```

This will create a `dist` (or `build`) directory containing your static website.

### Step 2: Deploy to Netlify (Easy)

1.  Go to [Netlify](https://app.netlify.com/).
2.  Log in or sign up.
3.  Drag and drop your entire `dist` (or `build`) folder onto the Netlify dashboard.
4.  Netlify will upload your files and give you a public URL for your gallery!

### Step 3: Deploy to Firebase Hosting (Alternative)

1.  Install the Firebase CLI:
    ```bash
    npm install -g firebase-tools
    ```
2.  Log in to Firebase:
    ```bash
    firebase login
    ```
3.  Initialize Firebase Hosting in your project root:
    ```bash
    firebase init hosting
    ```
4.  Follow the prompts:
    -   Select **"Use an existing project"** and choose your Firebase project.
    -   What do you want to use as your public directory? Enter `dist` (or `build`).
    -   Configure as a single-page app (SPA)? **Yes**.
    -   Set up automatic builds and deploys with GitHub? **No** (for now).
5.  Deploy your app:
    ```bash
    firebase deploy --only hosting
    ```
6.  The CLI will give you a URL where your gallery is live.
