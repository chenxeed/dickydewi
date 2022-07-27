import axios from 'axios';

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

let invitationList: Guest[]
let invitedGuest: Guest

const SHEETDB_API_ONLINE_GUEST = 'https://sheetdb.io/api/v1/i7qp8w0epae9o'
const SHEETDB_API_RESERVATION = 'https://sheetdb.io/api/v1/9z3dmd8qry979'

async function fetchInvitationList () {
  const url = SHEETDB_API_ONLINE_GUEST
  invitationList = await window.fetch(url).then(resp => resp.json());
  return invitationList;
}

export async function authenticate (password: string): Promise<boolean> {
  const invitationList = await fetchInvitationList();
  invitedGuest = undefined
  invitationList.forEach((guest) => {
    if (guest.pass === password) {
      invitedGuest = guest
    }
  })
  if (invitedGuest) {
    return true
  } else {
    return false
  }
}

export async function authReservation (password: string): Promise<boolean> {
  const { data } = await axios.get<Reservation>(`${SHEETDB_API_RESERVATION}/search?reservationPass=${password}&single_object=true`)

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

export function getInvitationList (): Guest[] {
  return invitationList;
}

interface Reservation {
  reservationPass: string;
  response: 'Yes'|'No';
  testimonial: string;
  guestCount: number;
  invitationName: string;
  phoneNumber: string;
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
