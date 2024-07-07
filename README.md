# Personal Journal App

## Description

This is a mobile application built with React Native and Expo that allows users to create, manage, and categorize personal journal entries. The app provides features such as user authentication, journal entry creation and management, category-based organization, and summary views.

## Features

- User Authentication (Login/Register)
- Create, Read, Update, and Delete journal entries
- Categorize journal entries
- View all journal entries
- Filter journal entries by category
- User settings management
- Summary view of journal entries

## Prerequisites

- Node.js
- npm 
- Expo CLI ()

## Installation

1. Clone the repository:
   - `git clone https://github.com/bryokn/journal-app.git`
   - cd journal-app
2. Install dependencies:
   - npm install

## Running the App

1. Start the Expo development server:
   ` npm expo start` or `npm start`
2. Use the Expo Go app on your mobile device to scan the QR code, or run on an emulator/simulator.

## Development

- The main application logic is in the `app/` directory.
- React components are located in the `components/` directory.
- API services are defined in `service/api.js`.
- Styling constants are in `constants/Colors.ts`.

## API Configuration

The app communicates with a backend API. The API URL is defined in `service/api.js`. Make sure to update this URL to match your backend server:

   `const API_URL = 'http://your-api-url.com';` (If running on your local machine, use your machines IP address. On Ubuntu you can get this by typing `ifconfig` on terminal.)

The backend for this project can be found at `https://github.com/bryokn/journal_backend.git`

### Make sure your backend is running before running the app(frontend)


## Contact
Kipkirui Brian - `kipkiruibn@gmail.com`