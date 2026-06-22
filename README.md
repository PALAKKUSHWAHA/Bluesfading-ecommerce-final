# Bluesfading 🌊

Bluesfading is a curated lifestyle and aesthetic e-commerce platform dedicated to premium home decor, artistic wall posters, and customized accessories. Built with a unified, soothing blue color palette, the interface balances minimalist layout structures with highly visual imagery to deliver a serene shopping experience.
<img width="1470" height="802" alt="Screenshot 2026-06-22 at 12 57 01 PM" src="https://github.com/user-attachments/assets/b4f548cc-023b-4d71-9bf3-aef6ed25d615" />
---

## 📸 Screenshots

### 🖥️ Discover & Marketplace Feed
An organized, grid-based catalog showcasing product offerings, clear review metrics, promotional badges, and clean interactive navigation.
<img width="1470" height="801" alt="Screenshot 2026-06-22 at 12 57 46 PM" src="https://github.com/user-attachments/assets/28515c15-9734-4724-8eec-c6a35928fee3" />



### 🖥️ Room Inspiration Gallery
A dynamic gallery display highlighting thematic interior combinations—such as Minimalist Living, Dark Academia, and Bohemian setups—to give users curated decor ideas.

<img width="1470" height="802" alt="Screenshot 2026-06-22 at 12 58 07 PM" src="https://github.com/user-attachments/assets/dd06c424-d626-4703-b1aa-765fc96c1a6e" />


### 🖥️ Product Deep Dive Viewport
A premium presentation viewport layout maximizing image space to emphasize the finer textures and print details of the artwork.

<img width="1470" height="800" alt="Screenshot 2026-06-22 at 12 58 29 PM" src="https://github.com/user-attachments/assets/12e34700-9abc-4c53-9caa-8b0a801fe882" />


### 🖥️ Cart & Wishlist Integrations
Seamless action controls directly embedded under visual showcases to provide rapid item tracking and streamlined transactional intent.

<img width="1470" height="800" alt="Screenshot 2026-06-22 at 1 28 37 PM" src="https://github.com/user-attachments/assets/2cf5fd67-ec10-4958-98ea-4ef90e3368b8" />


### 🖥️ Profile & Settings Workspace
A clean, centralized client management screen with structured routing options for order history, saved parameters, and account status indicators.

<img width="1470" height="801" alt="Screenshot 2026-06-22 at 12 59 57 PM" src="https://github.com/user-attachments/assets/2be1551d-90c3-49c3-b38d-44ae94407a7b" />


---

## 🎨 Design System

*   **Primary Accent:** Cool Cerulean (`#8EB1D1`)
*   **Base Theme:** Light Blue Grey (`#C4D8E5`)
*   **Contrast Elements:** Midnight Blue (`#1C2B48`)
*   **Canvas Background:** Platinum (`#E8ECEF`)

## 🛠️ Built With

*   Frontend Architecture (e.g., React / Tailwind CSS / Flutter)
*   State Management Architecture
*   Responsive Vector Graphics & Components
## ✨ Features

### 🛒 User Experience

* **Product Discovery & Search:** Intuitive search and filtering to easily locate specific décor pieces.
* **Category-Based Browsing:** Clean layouts to explore products by room types, aesthetics, or trends.
* **Rich Product Details:** Deep-dive product pages showing images, pricing, descriptions, and availability.
* **Wishlist Management:** Save favorite items for later consideration.
* **Shopping Cart & Checkout:** Persistent cart state with a structured, step-by-step secure checkout flow.
* **Order Management:** View order summaries, tracking statuses, and history.

### 🎨 UI/UX & Architecture

* **Modern Aesthetic Design:** Tailored layout tailored specifically for home decor enthusiasts.
* **Universal Responsiveness:** Adaptive design ensuring beautiful rendering on small mobile screens as well as wide web browsers.
* **Performance Optimized:** Fast loading times, native transition animations, and minimal re-renders.

---

## 📂 Project Structure

The project leverages **Expo Router's file-based routing convention** alongside a modular architecture to separate business logic, UI, and utilities.

```bash
BlueSfading/
├── app/                  # Application screens and file-based routing
│   ├── (auth)/           # Authentication flows (Login, Registration)
│   ├── (tabs)/           # Core application tabs (Home, Categories, Wishlist, Profile)
│   ├── product/          # Product details and dynamic listing screens
│   └── checkout/         # Multi-step checkout pipeline
├── assets/               # Local static media
│   ├── images/           # App banners, default graphics, placeholders
│   └── icons/            # Customized app system icons
├── components/           # Reusable UI elements (Buttons, Cards, Modals)
├── services/             # API clients, network requests, and backend endpoints
├── hooks/                # Custom React hooks for shared state or side-effects
├── utils/                # Helper functions and formatters
├── constants/            # Design tokens, theme colors, and static configuration
├── types/                # Global TypeScript declarations and interfaces
└── package.json          # Manifest file containing scripts and dependencies

```

---

## 🚀 Getting Started

### 1. Prerequisites

Ensure you have Node.js (v18+) and Git installed on your system.

### 2. Installation

Clone the repository and install the project dependencies:

```bash
git clone https://github.com/yourusername/bluesfading.git
cd bluesfading
npm install

```

### 3. Running the Development Server

Boot up the Expo development server locally:

```bash
npx expo start

```

### 4. Platform Deployment

Once the development server is active, interact with the CLI or press the respective hotkeys to run the app on your preferred platform:

* **Android Emulator:** Press `a` (or run `npx expo run:android`)
* **iOS Simulator:** Press `i` (or run `npx expo run:ios`)
* **Web Browser:** Press `w` (or run `npm run web`)
* **Physical Device:** Scan the generated terminal QR code using **Expo Go** (Android) or the iOS Camera app.

---

## 📝 Developer Workflows

### Modifying the Source Code

You can begin customizing the application immediately by editing the entries in the root directories:

* To change the primary dashboard view, edit `app/(tabs)/index.tsx`.
* Global styling settings and colors can be found and adjusted within the `constants/` directory.

### Resetting to a Blank Canvas

If you wish to clear out the boilerplate code and begin building your custom architecture from absolute scratch, run:

```bash
npm run reset-project

```

> **Note:** This command automatically moves the existing starter setup to an `app-example/` folder and provides you with an empty, ready-to-code `app/` folder.

---

## 🔒 Future Enhancements

* **Payment Integration:** Secure checkout utilizing Stripe or Razorpay.
* **Social Proofing:** Real-time customer reviews, visual ratings, and image uploads.
* **Push Notifications:** Reminders for abandoned carts, order status tracking updates, and flash sales.
* **AI Product Recommendations:** Personalized home-page feeds driven by machine learning user preferences.
* **Multi-Vendor Capabilities:** Expand infrastructure to support multiple boutique home decor sellers.

---

## 👩‍💻 Author & Contribution

**Palak Kushwaha**

* *B.Tech in Computer Science & Engineering*
* *Minor in Machine Learning & Artificial Intelligence*

---

## 📄 License

<<<<<<< HEAD
This repository is developed exclusively for educational and portfolio demonstration purposes. All rights reserved.
=======
Metro waiting on exp://192.168.1.2:8082
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Web is waiting on http://localhost:8082

› Using Expo Go
› Press s │ switch to development build

› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press j │ open debugger
› Press r │ reload app
› Press m │ toggle menu
› shift+m │ more tools
› Press o │ open project code in your editor

› Press ? │ show all commands

Logs for your project will appear below. Press Ctrl+C to exit.
Android Bundled 3760ms node_modules/expo-router/entry.js (1452 modules)


Welcome!
👋
Step 1: Try it
Edit app/(tabs)/index.tsx to see changes. Press F12 to open developer tools.
Step 2: Explore
Tap the Explore tab to learn more about what's included in this starter app.
Step 3: Get a fresh start
When you're ready, run npm run reset-project to get a fresh app directory. This will move the current app to app-example.



pwd
cd BluesfadingExpo54
pwd
ls
npm install
npx expo start
npx expo start -c
>>>>>>> f7d07d1 (feat)
# Bluesfading-ecommerce-final
