import axios from 'axios';
import { Platform } from 'react-native';

import type { Doctor } from '@/types/doctor';

// Android emulator: use 10.0.2.2 instead of localhost to reach your machine
const host = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const API_URL = `http://${host}:3000/doctors`;

export async function fetchDoctors(): Promise<Doctor[]> {
  const response = await axios.get<Doctor[]>(API_URL);
  return response.data;
}
