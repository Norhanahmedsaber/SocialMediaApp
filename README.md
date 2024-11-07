# SocialMedia App

SocialMedia is a simple React Native app built with Expo that allows users to share their thoughts through posts.

## The app has the following features:

- User authentication (login, signup)
- Post creation and display
- Input validation
- API integration with JSONPlaceholder for post management
- Context API for global state management

This README will guide you through the steps of setting up, running, and understanding the app, as well as provide details on the architecture.

## Table of Contents

- Prerequisites
- Installation
- Project Structure
- Running the Project
- Architecture
- Components
- Context

## Prerequisites

Before running the project, make sure you have the following installed on your machine:

- Node.js: Download and install [Node.js](https://nodejs.org/en).
- Expo CLI: Install Expo CLI globally by running:

```bash
npm install -g expo-cli
```

- Git: Ensure Git is installed on your machine for cloning the repository.

### Installation

Clone the repository:

```bash
git clone https://github.com/Norhanahmedsaber/SocialMediaApp
```

### Install Dependencies:

After cloning the repository, navigate to the project directory and install the necessary dependencies:

```bash
cd <project-name>
npm install
```

### Expo Setup:

If you're using Expo, you can run the project directly in the Expo client. Follow these steps to get started:

### Start Expo Development Server:

```bash
npx expo start --tunnel
```

This will open up the Expo developer tools in your browser.

### Running on a Device:

If you're on a mobile device, you can scan the QR code displayed in the Expo developer tools using the Expo Go app (available on iOS and Android).
Running on an Emulator:

If you prefer to run the app on an emulator, you can run:

```bash
expo start --android
```

(For Android emulators) or

```bash
expo start --ios
```

(For iOS simulators).

### Project Structure

Here’s an overview of the project structure:

```bash
/project-root
├── /assets                 # Images, fonts, and other static assets
│   └── /images
    └── /fonts
├── /components             # Reusable UI components like Button, AppGradient, etc.
│   ├── Button.tsx
│   └── AppGradient.tsx
│   └── profile.tsx
│   └── content.tsx
│   └── icon.tsx
│
├── /context                # Global state management using Context API
│   └── PostContext.tsx
│   └── FontContext.tsx
├──/app
    └──index.tsx
    └──_layout.tsx
    └──(tabs)
│       ├── _layout.tsx
│       ├── Login.tsx
│       ├── AddPost.tsx
│       └── PostList.tsx
├── tsconfig.json
├── global.css               # Global styles and Tailwind configuration
├── package.json             # Project dependencies and configuration
└── README.md                # This file

```

### Running the Project

- Start Expo Project: If you haven't already installed dependencies, do so by running:

```bash
npm install
```

### Run the Project: To start the app, simply use:

```bash
npx expo start --tunnel
```

This will launch the app in the Expo client
