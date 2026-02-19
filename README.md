# Nimble Gravity – Bot Filter Challenge

Mini React application built with Vite and TypeScript to connect to the Nimble Gravity API and submit a job application.

## Tech Stack

- React
- TypeScript
- Vite
- Native Fetch API
- CSS (custom responsive layout)

## Features

- Fetch candidate data by email
- Retrieve available job positions
- Submit application per job
- Per-item loading and error handling
- Auto-hide feedback messages
- Responsive layout (mobile + desktop)
- Custom loading overlay
- Custom favicon and footer

## Installation

Clone the repository:

- git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
- cd YOUR_REPO
- npm install
- npm run dev

## Notes

- Only the relevant position ("Fullstack developer") returns a successful submission.
- Network errors are handled and displayed in the UI.
- Submission feedback auto-hides after a few seconds.
