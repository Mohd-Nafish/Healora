# Healora

**Smart healthcare at your fingertips**

Healora is a modern React Native healthcare app built with **Expo** and **TypeScript**. Browse doctors, book appointments, and get AI-powered symptom guidance — all in a clean white-and-blue UI inspired by apps like Practo and Apollo.

---

## Screenshots

| Home | AI Assistant | Doctor profile | Booking | Bookings |
| :---: | :---: | :---: | :---: | :---: |
| <img width="240" alt="Home screen" src="https://github.com/user-attachments/assets/76af33cf-3b28-4cde-b7d4-56ca974b4232" /> | <img width="240" alt="AI Assistant screen" src="https://github.com/user-attachments/assets/7efd76f5-6048-4f3f-b8df-ca367dd6e33b" /> | <img width="240" alt="Doctor profile screen" src="https://github.com/user-attachments/assets/771dbcf6-1d9d-4337-b2af-935dce1f9c6a" /> | <img width="240" alt="Booking screen" src="https://github.com/user-attachments/assets/deb96221-dcf4-4e06-b4c6-0bc1a1f4348e" /> | <img width="240" alt="Booking screen" src="https://github.com/user-attachments/assets/9768f761-6937-4a9a-97ea-7f7282cb9e54" /> |

---

## Features

### Home
- Browse doctors from a local API (`json-server`)
- Real-time search by **name**, **specialty**, and **hospital**
- Horizontal **specialty filters** (All, Cardiologist, Dentist, Neurologist, and more)
- Premium **doctor cards** with photos, ratings, experience, and fees
- Empty state when no results match

### Doctor profile & booking
- Detailed doctor screen (about, fee, available slots)
- **Book appointment** flow with date picker, time slots, and patient form
- Appointments saved locally on device (AsyncStorage)
- Success confirmation and redirect to **Bookings** tab

### AI Assistant
- Chat-style **symptom checker** powered by **Google Gemini**
- Quick suggestion chips (Fever, Headache, Cough, Chest pain, Anxiety)
- Structured AI responses in separate cards:
  - Possible causes
  - Recommended specialist
  - Basic precautions
- Typing indicator while the AI responds
- Offline fallback when API quota is exceeded

### Bookings
- View all confirmed appointments
- Doctor photo, visit date/time, patient details, and fee
- Persists across app restarts (no backend required)

---

## Tech stack

| Layer | Technology |
|--------|------------|
| Framework | [Expo SDK 56](https://docs.expo.dev/) |
| Language | TypeScript |
| Navigation | [Expo Router](https://docs.expo.dev/router/introduction/) (file-based) |
| UI | React Native, Reanimated, Lucide icons |
| HTTP | Axios |
| AI | `@google/generative-ai` (Gemini) |
| Local storage | `@react-native-async-storage/async-storage` |
| Mock API | [json-server](https://github.com/typicode/json-server) |

---

## Project structure

```
src/
├── app/                    # Expo Router routes
│   ├── (tabs)/             # Bottom tabs: Home, AI Assistant, Bookings
│   ├── doctor-details.tsx
│   └── booking.tsx
├── components/             # Reusable UI (DoctorCard, ChatBubble, etc.)
├── screens/                # Screen logic
├── services/               # API & Gemini & appointment storage
├── types/                  # TypeScript interfaces
├── constants/              # Colors, specialties, design tokens
└── utils/                  # Filters, booking dates, error helpers
db.json                     # Doctor data for json-server
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm
- [Expo Go](https://expo.dev/go) on a physical device, or iOS Simulator / Android Emulator
- A [Google Gemini API key](https://aistudio.google.com/apikey) (for AI Assistant)

---

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy the example env file and add your Gemini API key:

```bash
cp .env.example .env
```

Edit `.env`:

```env
EXPO_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

> **Note:** Never commit `.env` to git. The key is loaded via `EXPO_PUBLIC_*` at build time. Restart Expo after changing `.env`.

### 3. Start the doctor API (json-server)

In a **separate terminal**, from the project root:

```bash
json-server --watch db.json
```

The API runs at `http://localhost:3000`. Doctors are available at:

```
http://localhost:3000/doctors
```

### 4. Start the Expo app

```bash
npx expo start
```

Then press:

- `i` — iOS Simulator  
- `a` — Android Emulator  
- Scan QR code — Expo Go on your phone  

**Android emulator:** the app uses `10.0.2.2` instead of `localhost` to reach json-server on your machine.

**Physical device:** use your computer’s LAN IP in `src/services/doctorService.ts` if `localhost` does not work.

---

## Available scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo dev server |
| `npm run ios` | Open on iOS simulator |
| `npm run android` | Open on Android emulator |
| `npm run web` | Open in web browser |
| `npm run lint` | Run ESLint |

---

## App navigation

| Tab | Screen | Description |
|-----|--------|-------------|
| **Home** | `HomeScreen` | Doctor list, search, filters |
| **AI Assistant** | `SymptomCheckerScreen` | Gemini symptom chat |
| **Bookings** | `AppointmentsScreen` | Saved appointments |

Stack screens (from Home):

- **Doctor profile** → **Book appointment**

---

## Doctor data (`db.json`)

Each doctor includes:

- `id`, `name`, `specialty`, `hospital`
- `rating`, `experience`, `fee`
- `image` (randomuser.me portraits)
- `about`, `availableSlots`

You can edit `db.json` while json-server is running; it reloads automatically.

---

## AI Assistant notes

- Primary model: `gemini-2.5-flash` (with fallbacks if unavailable)
- Responses are parsed as JSON and shown in structured cards
- If all models fail or quota is exceeded, general **offline guidance** is shown instead of a raw API error

---

## Design

- White background with blue accent (`#2563EB`)
- Human Interface Guidelines–inspired spacing and touch targets
- Subtle card shadows, rounded corners, and press animations
- Functional components only; beginner-friendly folder layout

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| No doctors loading | Ensure `json-server --watch db.json` is running on port 3000 |
| AI not responding | Check `EXPO_PUBLIC_GEMINI_API_KEY` in `.env` and restart Expo |
| Android can’t reach API | json-server must run on your host; app uses `10.0.2.2:3000` |
| Bookings empty | Complete a booking from Home → Doctor → Book Appointment |

---

## License

See [LICENSE](LICENSE) in this repository.

---

## Learn more

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Native](https://reactnative.dev/)
