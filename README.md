## Smart Plug App – Demo Repository

This repository is a **copy of the original Smart Plug project repo**, created specifically for **demonstration purposes**. It is intended to showcase:

- **Backend**: Example implementation of the Smart Plug backend, including integration with **Mosquitto (MQTT)**.
- **Frontend**: A **React Native + Expo** mobile app that has been **modified to be suitable for a demo**, not for production use.

### Repository structure

- `backend/` – Backend code for the Smart Plug project, including MQTT (Mosquitto) integration and APIs used by the app.
- `frontend/` – Expo/React Native mobile app used to demonstrate the Smart Plug UI and flows.

### Frontend (demo) – how to run

1. **Install dependencies**

   ```bash
   cd frontend
   npm install
   # or
   yarn
   ```

2. **Configure environment variables**

   Create a `.env` file inside `frontend` (this file is **not** committed to Git). At minimum, you will need variables similar to:

   ```bash
   API_BASE_URL=https://your-backend-url-or-local-tunnel
   MQTT_HOST=your-mosquitto-host
   MQTT_PORT=your-mosquitto-port
   ```

   - **Adjust the values** to point to the backend instance and Mosquitto broker you are using for the demo.
   - Make sure the mobile device/emulator **can reach** the backend and MQTT broker (same network, correct ports, etc.).

3. **Start the Expo app**

   From `frontend`:

   ```bash
   npm start
   # or
   yarn start
   ```

   Then run on your preferred target:

   ```bash
   npm run android
   npm run ios
   npm run web
   ```

### Backend (Mosquitto + API)

- The backend in `backend/` is an **implementation example** used for the Smart Plug demo.
- It exposes APIs used by the frontend and connects to a **Mosquitto MQTT broker** for publishing/subscribing to Smart Plug topics.
- To run it correctly, you will need to:
  - Provide a proper `.env` file in `backend` with your backend and Mosquitto configuration (host, port, credentials, topics, etc.).
  - Start Mosquitto and ensure the backend can reach it.

Since this is a **demo-focused copy**, some configuration, security, and deployment details may be simplified compared to the original production repo. Review and adjust environment variables, credentials, and network configuration before using it beyond demo purposes.

