# Smart Plug Backend

This is the backend service for the Smart Plug App, based on the `capstone-backend-mosquitto` project.

## Setup

1. **Install dependencies**
   - Using npm:
     ```bash
     npm install
     ```
   - Or using yarn:
     ```bash
     yarn
     ```

2. **Environment variables**
   - Copy `.env.example` to `.env` and fill in real values:
     ```bash
     cp .env.example .env
     ```
   - Update database, MQTT broker, and JWT secret values as needed.

## Running the server

```bash
npm start
```

Or, if the project uses a different script (e.g. `dev`), run:

```bash
npm run dev
```

Check `package.json` scripts if these commands differ.
