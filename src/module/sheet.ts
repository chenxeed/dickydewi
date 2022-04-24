import axios from 'axios';

interface Guest {
  name: string;
  origin: string;
  category: string;
  pass: string;
  response: string;
  testimonial: string;
}

let invitationList: Guest[]
let invitedGuest: Guest

const SHEETDB_API = 'https://sheetdb.io/api/v1/md7ki0pkldlpq'

async function fetchInvitationList () {
  const url = SHEETDB_API
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

export async function updateResponse (response: 'Yes'|'No'): Promise<boolean> {
  const url = `${SHEETDB_API}/pass/${invitedGuest.pass}`;
  const body = { data: { response }}
  return axios.patch(url, body).then(() => true)
}

export async function updateTestimonial (testimonial: string): Promise<boolean> {
  const url = `${SHEETDB_API}/pass/${invitedGuest.pass}`;
  const body = { data: { testimonial }}
  return axios.patch(url, body).then(() => true)
}

export function getInvitedGuest (): Guest {
  return invitedGuest;
}

export function getInvitationList (): Guest[] {
  return invitationList;
}
