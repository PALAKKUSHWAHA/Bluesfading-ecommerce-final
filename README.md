# Bluesfading 👾

Welcome to **BlueSfading**, a modern, cross-platform e-commerce mobile and web application dedicated to aesthetic home décor. Built using **React Native**, **Expo (Router)**, and **TypeScript**, this application offers a visually stunning, responsive, and seamless shopping experience across Android, iOS, and Web platforms from a single codebase.

---
## 📸 Interface & User Journey

### 1. Welcome Splash Screen
The entryway features an immersive, multi-aesthetic mood board designed to capture the brand's visual identity instantly and guide the user onward.

<img src="image_636183.jpg" width="100%" alt="Welcome Screen"/>

### 2. Discover & Home Feed
A personalized dashboard showcasing trending categories (Wall Posters, Canvas Paintings, Dreamcatchers) alongside dynamic "Highlights of the Day" collections.

<img src="image_6361a9.jpg" width="100%" alt="Homepage Interface"/>

### 3. Curated Marketplace
An organized, grid-based catalog showcasing product offerings, clear review metrics, promotional badges, and clean interactive elements.

<img src="image_6361e3.jpg" width="100%" alt="Product Catalog Grid"/>

### 4. Product Deep Dive
A premium presentation viewport layout maximizing image space to emphasize the finer textures and print details of the artwork.

<img src="image_636526.jpg" width="100%" alt="Product Details View"/>

### 5. Profile & Settings Workspace
A clean, centralized client management screen with structured routing options for order history, saved parameters, and settings.

<img src="image_636580.png" width="100%" alt="User Profile View"/>

---

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| **Frontend Framework** | React Native (Expo SDK) |
| **Routing & Navigation** | Expo Router (File-based) |
| **Language** | TypeScript |
| **State Management** | React Context API / Redux Toolkit |
| **Network & API** | Axios / REST APIs |
| **UI Components** | React Native Paper & Custom Reusable UI |
| **Design & Tooling** | Figma, VS Code, Git |

---

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
