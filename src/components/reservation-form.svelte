<script lang="ts">
import { getInvitedGuest, createReservation, updateReservation } from '../module/sheet';
import { slide } from 'svelte/transition';
import { createEventDispatcher, onMount } from 'svelte';

const dispatch = createEventDispatcher()

export let canOpenInvitation = false;

let alertMessage = ''
let submitting = false
let isSubmitted = false

let isGuest = false
let alreadySubmit = false
let invitationName = ''
let phoneNumber = ''
let personComing = 1
let testimonial = ''
let reservationPass = ''
let isComing = null
const maxPerson = 20

$: reservationUrl = `https://dickydewiwedding.site/?reservation=${reservationPass}`

onMount(() => {
  const guest = getInvitedGuest();
  if (guest) {
    invitationName = guest.name;
    phoneNumber = guest.phoneNumber
    isComing = guest.response === 'Yes'
    testimonial = guest.testimonial
    personComing = guest.guestCount
    isGuest = guest.source === 'guest'
    reservationPass = guest.pass
    alreadySubmit = Boolean(guest.response)
  }
})

function incrementPersonComing () {
  if (personComing < maxPerson) {
    personComing++
  }
}

function decrementPersonComing () {
  if (personComing > 1) {
    personComing--
  }
}

function onChangeTestimonial (e) {
  const target = e.target as HTMLTextAreaElement
  testimonial = target.value
}

async function copyReservationURL () {
  await navigator.clipboard.writeText(reservationUrl)
  window.alert('URL telah disalin')
}

async function submitReservation () {
  // Validate the form inputted
  alertMessage = ''
  if (!invitationName) {
    alertMessage = 'Mohon isi Nama Anda'
    return
  }
  if (isComing === null) {
    alertMessage = 'Mohon konfirmasi kehadiran Anda'
    return
  }
  if (isComing === true && personComing < 1) {
    alertMessage = 'Mohon isi jumlah orang yang akan datang'
    return
  }

  submitting = true
  try {
    if (reservationPass || isGuest) {
      await updateReservation({
        reservationPass,
        guestCount: isComing ? personComing : 0,
        response: isComing ? 'Yes' : 'No',
        testimonial: encodeHTML(testimonial),
        invitationName,
        phoneNumber: `${phoneNumber}`
      })
    } else {
      reservationPass = `${Math.round(Math.random() * 100000000)}`
      await createReservation({
        reservationPass,
        guestCount: isComing ? personComing : 0,
        response: isComing ? 'Yes' : 'No',
        testimonial: encodeHTML(testimonial),
        invitationName,
        phoneNumber: `${phoneNumber}`
      })
    }
    isSubmitted = true
    dispatch('submitted')
  } finally {
    submitting = false
  }
}

function encodeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}
</script>
<div
  transition:slide
  class="absolute bottom-2 left-1/2 transform -translate-x-1/2 p-2 w-full max-w-sm z-50">
  <div class="frame-border">
    {#if alertMessage}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <span class="block sm:inline text-sm">{ alertMessage }</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg
          class="fill-current h-6 w-6 text-red-500 absolute top-1 right-1"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          on:click={ () => alertMessage = '' }><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
      </span>
    </div>
    {/if}
    {#if !isSubmitted}
      <div class="mb-4 text-center font-bold">
        {#if alreadySubmit}
          <h2>Ubah Reservasi</h2>
        {:else}
          <h2>Formulir Reservasi</h2>
        {/if}
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="fullname">
          Nama Anda *
        </label>
        <input
          required
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="fullname"
          type="text"
          placeholder="Nama Anda"
          readonly={isGuest}
          bind:value={invitationName}>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="phone">
          Nomor Telepon (Opsional)
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="phone"
          type="text"
          placeholder="cth: 08123456789"
          bind:value={phoneNumber}>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="iscoming">
          Apakah Anda bisa menghadiri acara pernikahan kami?
        </label>
        <div class="flex justify-around">
          <button on:click={() => isComing = true} type="button" class="bg-white py-2 px-3 border w-20 border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" class:bg-green-200={isComing === true}>Ya</button>
          <button on:click={() => isComing = false} type="button"
            class:bg-gray-500={isComing === false}
            class:text-gray-700={isComing !== false}
            class:text-white={isComing === false}
            class="bg-white py-2 px-3 border w-20 border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Tidak</button>
        </div>
      </div>
      {#if isComing === true}
        <div transition:slide class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="incoming">
            Berapa orang yang akan datang?
          </label>
          <div class="flex justify-between">
            <button on:click={decrementPersonComing} type="button" class="bg-white py-2 px-8 text-4xl border border-gray-300 rounded-md shadow-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">-</button>
            <input
              class="shadow appearance-none border border-gray-500 rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline w-12"
              type="text" value={ personComing } readonly/>
            <button on:click={incrementPersonComing} type="button" class="bg-white py-2 px-8 text-4xl border border-gray-300 rounded-md shadow-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">+</button>
          </div>
        </div>
      {/if}
      {#if isComing !== undefined}
        <div transition:slide class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="testimonial">
            Testimonial
          </label>
          <textarea
            id="testimonial" rows="3"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 p-2 block w-full sm:text-sm border border-gray-300 rounded-md"
            placeholder="Berikan ucapan dan doa Anda untuk Dicky & Dewi"
            on:change={ onChangeTestimonial }>{ testimonial }</textarea>
        </div>
      {/if}
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
          disabled={submitting}
          on:click={ submitReservation }>
          { submitting ? 'Sending...' : 'Submit' }
        </button>
        <button
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
          disabled={submitting}
          on:click={ () => dispatch('close') }>
          Batal
        </button>
      </div>
    {:else}
      <p class="font-bold">Terimakasih atas reservasi Anda!</p>
      {#if isGuest === false}
        <p class="mt-2">Silahkan simpan URL dibawah ini sebagai bukti reservasi Anda:</p>
        <input
          type="text"
          class="
            form-control
            block
            w-full
            mt-2
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-gray-100 bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
          "
          id="reservationURL"
          value={reservationUrl}
          aria-label="reservation URL"
          readonly
          on:click={copyReservationURL}
        />
      {/if}
      <p class="mt-2 italic text-sm font-bold border bg-yellow-300 p-2 animate-pulse">*Tanpa mengurangi rasa hormat, mohon untuk tidak mengirimkan karangan bunga dikarenakan keterbatasan ruangan</p>
      <div class="text-center mt-4">
        {#if canOpenInvitation}
          <button
            class="bg-yellow-600 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center" type="button"
            on:click={ () => dispatch('open-invitation') }>
            Lihat Undangan
          </button>
        {:else}
          <button
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
            on:click={ () => dispatch('close') }>
            Tutup
          </button>

        {/if}
      </div>
    {/if}
  </div>
</div>
