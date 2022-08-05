import axios from 'axios';
import { dev } from '$app/env';

interface Guest {
  name: string;
  origin: string;
  category: string;
  phoneNumber: string;
  pass: string;
  response: string;
  testimonial: string;
  guestCount: number;
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

const SHEETDB_API_ONLINE_GUEST = 'https://sheetdb.io/api/v1/ieqa1l0tcmfqh'
const SHEETDB_API_RESERVATION = 'https://sheetdb.io/api/v1/9z3dmd8qry979'

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
    phoneNumber: data['Phone Number'],
    pass: data.Password,
    response: data.Response,
    testimonial: data.Testimonial,
    guestCount: Number(data['Guest Count'])
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
    phoneNumber: data.phoneNumber,
    pass: password,
    response: data.response,
    testimonial: data.testimonial,
    guestCount: data.guestCount
  }
  return true
}

export async function updateResponse (response: 'Yes'|'No'): Promise<boolean> {
  const url = `${SHEETDB_API_ONLINE_GUEST}/pass/${invitedGuest.pass}`;
  const body = { data: { response }}
  return axios.patch(url, body).then(() => true)
}

export async function updateTestimonial (testimonial: string): Promise<boolean> {
  const url = `${SHEETDB_API_ONLINE_GUEST}/pass/${invitedGuest.pass}`;
  const body = { data: { testimonial }}
  return axios.patch(url, body).then(() => true)
}

export function getInvitedGuest (): Guest {
  return invitedGuest;
}

export async function createReservation (reservation: Reservation): Promise<void> {
  const url = `${SHEETDB_API_RESERVATION}`;
  const body = { data: [reservation] }
  await axios.post(url, body).then(() => true)
  invitedGuest = {
    name: reservation.invitationName,
    category: '',
    origin: '',
    pass: reservation.reservationPass,
    response: reservation.response,
    testimonial: reservation.testimonial,
    guestCount: reservation.guestCount,
    phoneNumber: reservation.phoneNumber
  }
}

export async function updateReservation (reservation: Reservation): Promise<void> {
  const url = `${SHEETDB_API_RESERVATION}/reservationPass/${reservation.reservationPass}`;
  const body = { data: [reservation] }
  await axios.patch(url, body).then(() => true)
  invitedGuest = {
    name: reservation.invitationName,
    category: '',
    origin: '',
    pass: reservation.reservationPass,
    response: reservation.response,
    testimonial: reservation.testimonial,
    guestCount: reservation.guestCount,
    phoneNumber: reservation.phoneNumber
  }
}

const localStorageKey = 'reservationPass'
export function saveReservationPass (password: string): void {
  localStorage.setItem(localStorageKey, password)
}

export function loadReservationPass (): string {
  return localStorage.getItem(localStorageKey)
}
