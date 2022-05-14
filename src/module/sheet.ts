import axios from 'axios';

interface Guest {
  name: string;
  origin: string;
  category: string;
  pass: string;
  response: string;
  testimonial: string;
  guestCount: string;
}

let invitationList: Guest[]
let invitedGuest: Guest

const SHEETDB_API = 'https://sheetdb.io/api/v1/qnzjjwsx68mkz'

async function fetchInvitationList () {
  const url = SHEETDB_API
  invitationList = await window.fetch(url).then(resp => resp.json());
  return invitationList;
}

export async function authenticate (password: string): Promise<boolean> {
  if (process.env.NODE_ENV !== 'production') {
    invitedGuest = {
      name: 'Test Local',
      category: '',
      origin: '',
      pass: 'aliana',
      response: '',
      testimonial: '',
      guestCount: ''
    }
    return true
  }

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

interface Reservation {
  response: 'Yes'|'No';
  testimonial: string;
  guestCount: number;
}

export async function updateReservation (reservation: Reservation): Promise<boolean> {
  const url = `${SHEETDB_API}/pass/${invitedGuest.pass}`;
  const body = { data: reservation}
  return axios.patch(url, body).then(() => true)
}

export function getInvitedGuest (): Guest {
  return invitedGuest;
}

export function getInvitationList (): Guest[] {
  return invitationList;
}
