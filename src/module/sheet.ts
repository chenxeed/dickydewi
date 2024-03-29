import axios from 'axios';
import { dev } from '$app/env';
// const dev = false

interface Guest {
  name: string;
  origin: string;
  category: string;
  phoneNumber: string;
  pass: string;
  response: string;
  testimonial: string;
  guestCount: number;
  source: 'public' | 'guest';
}

interface AuthGuestResponse {
  Name: string;
  Category: string;
  ONLINE: string;
  Password: string;
  'Guest Count': string;
  Response: string;
  Testimonial: string;
  'Phone Number': string;
}


interface Reservation {
  reservationPass: string;
  response: 'Yes'|'No';
  testimonial: string;
  guestCount: number;
  invitationName: string;
  phoneNumber: string;
}

let invitedGuest: Guest

const SHEETDB_API_ONLINE_GUEST = import.meta.env.VITE_SHEETDB_API_ONLINE_GUEST
const SHEETDB_API_RESERVATION = import.meta.env.VITE_SHEETDB_API_RESERVATION

const fakeReservation: Reservation = {
  invitationName: 'Test Ajah',
  guestCount: 5,
  phoneNumber: '0123456789',
  reservationPass: '12345',
  response: 'Yes',
  testimonial: 'sehat selalu'
}

const fakeGuest: AuthGuestResponse = {
  Name: 'Test Guest',
  "Guest Count": "5",
  "Phone Number": "081237123612",
  Category: "well..",
  ONLINE: "ONLINE",
  "Password": "12345",
  Response: "Yes",
  "Testimonial": "Sehat selalu"
}

export async function authenticate (password: string): Promise<boolean> {

  const { data } = dev ?
    await Promise.resolve<{ data: AuthGuestResponse }>({ data: fakeGuest }) :
    await axios.get<AuthGuestResponse>(`${SHEETDB_API_ONLINE_GUEST}/search?Password=${password}&single_object=true`)

  if (!data.Name || !data.ONLINE) {
    return false
  }

  invitedGuest = {
    name: data.Name,
    category: data.Category,
    origin: '',
    phoneNumber: data['Phone Number'].replace(/"/g, ''),
    pass: data.Password,
    response: data.Response,
    testimonial: data.Testimonial,
    guestCount: Number(data['Guest Count']),
    source: 'guest'
  }
  return true
}

export async function authReservation (password: string): Promise<boolean> {
  const { data } = dev ?
    await Promise.resolve<{ data: Reservation }>({ data: fakeReservation }) :
    await axios.get<Reservation>(`${SHEETDB_API_RESERVATION}/search?reservationPass=${password}&single_object=true`)

  if (!data.invitationName) {
    return false
  }

  invitedGuest = {
    name: data.invitationName,
    category: '',
    origin: '',
    phoneNumber: data.phoneNumber.replace(/"/g, ''),
    pass: password,
    response: data.response,
    testimonial: data.testimonial,
    guestCount: data.guestCount,
    source: 'public'
  }
  return true
}

export async function updateResponse (response: 'Yes'|'No'): Promise<boolean> {
  const url = `${SHEETDB_API_ONLINE_GUEST}/pass/${invitedGuest.pass}`;
  const body = { data: { response }}
  return dev ? Promise.resolve(true) : axios.patch(url, body).then(() => true)
}

export async function loadTestimonials (): Promise<{ name: string; testimonial: string }[]> {
  const { data } = await axios.get(`/testimonials.json`)
  return data
}

export function getInvitedGuest (): Guest {
  return invitedGuest;
}

export async function createReservation (reservation: Reservation): Promise<void> {
  const publicReservation: Reservation = {
    ...reservation,
    phoneNumber: `"${reservation.phoneNumber}"`
  }
  const url = `${SHEETDB_API_RESERVATION}`;
  const body = { data: [publicReservation] }
  if (dev) {
    await Promise.resolve()
  } else {
    await axios.post(url, body).then(() => true)
  }
  invitedGuest = {
    name: reservation.invitationName,
    category: '',
    origin: '',
    pass: reservation.reservationPass,
    response: reservation.response,
    testimonial: reservation.testimonial,
    guestCount: reservation.guestCount,
    phoneNumber: reservation.phoneNumber,
    source: 'public'
  }
}

export async function updateReservation (reservation: Reservation): Promise<void> {
  const guestReservation: Partial<AuthGuestResponse> = {
    "Guest Count": `${reservation.guestCount}`,
    "Phone Number": `"${reservation.phoneNumber}"`,
    Response: reservation.response,
    Testimonial: reservation.testimonial
  }
  const publicReservation: Reservation = {
    ...reservation,
    phoneNumber: `"${reservation.phoneNumber}"`
  }
  const reservationData = invitedGuest.source === 'guest' ? guestReservation : publicReservation
  const body = { data: [reservationData] }
  const url = invitedGuest.source === 'guest' ? `${SHEETDB_API_ONLINE_GUEST}/Password/${invitedGuest.pass}` : `${SHEETDB_API_RESERVATION}/reservationPass/${reservation.reservationPass}`;
  if (dev) {
    await Promise.resolve()
  } else {
    await axios.patch(url, body).then(() => true)
  }
  invitedGuest = {
    name: reservation.invitationName,
    category: '',
    origin: '',
    pass: reservation.reservationPass,
    response: reservation.response,
    testimonial: reservation.testimonial,
    guestCount: reservation.guestCount,
    phoneNumber: reservation.phoneNumber,
    source: invitedGuest.source
  }
}

const localStorageKey = 'reservationPass'
export function saveReservationPass (password: string): void {
  localStorage.setItem(localStorageKey, password)
}

export function loadReservationPass (): string {
  return localStorage.getItem(localStorageKey)
}
