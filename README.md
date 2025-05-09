# Insurance Calculator Sample Project

This is a fullstack sample project consisting of a React frontend (`client`) and a Node.js backend (`server`).

## Setup Instructions

### Prerequisites

- MongoDB (for the backend)
- Playwright (for frontend testing)

## Client (Frontend)

React application with Playwright for end-to-end testing.

Setup:

```bash
cd client
npm install
npm start
```

```bash
Run tests (Playwright):
npm test
```

### Environment Variables
- `REACT_APP_BFF_URL` : http://localhost:4000

## Server (BFF)

Node.js backend with Jest for unit testing.

Setup:

```bash
cd server
npm install
npm dev
```

```bash
Run tests (Jest):
npm test
```

### Environment Variables
- `API_BASE_URL`: https://your-api-base-url.com
- `API_KEY`: your-api-key-here
- `MONGO_URI`: mongodb://localhost:27017/premiumdb