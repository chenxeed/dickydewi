<script lang="ts">
import { fly } from 'svelte/transition';
import { createEventDispatcher, onMount } from 'svelte';
// import photo1 from '../assets/photo-1.jpg';
import flowerFrameTop from '../assets/flower-frame-top.png';
import flowerFrameBottom from '../assets/flower-frame-bottom.png';
import dickyDewiEntrance from '../assets/dicky-dewi-entrance.jpg';
import saveTheDate from '../assets/save-the-date.png';
import { authenticate, getInvitedGuest, createReservation, authReservation, updateReservation, saveReservationPass, loadReservationPass } from '../module/sheet';
import { slide } from 'svelte/transition';

const dispatch = createEventDispatcher();

let invitationName = ''
let phoneNumber = ''
let invited = true

let open = false
let pass = ''
let entrance: HTMLElement;

let reservation = false
let isComing = null
let personComing = 1
let submitting = false
let isSubmitted = false
let testimonial = ''
let reservationPass = ''
const maxPerson = 8
let alertMessage = ''

$: reservationUrl = `https://dickydewiwedding.site/?reservation=${reservationPass}`

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

  submitting = true
  try {
    if (reservationPass) {
      await updateReservation({
        reservationPass,
        guestCount: isComing ? personComing : 0,
        response: isComing ? 'Yes' : 'No',
        testimonial,
        invitationName,
        phoneNumber: `"${phoneNumber}"`
      })
    } else {
      reservationPass = `${Math.round(Math.random() * 100000000)}`
      await createReservation({
        reservationPass,
        guestCount: isComing ? personComing : 0,
        response: isComing ? 'Yes' : 'No',
        testimonial,
        invitationName,
        phoneNumber: `"${phoneNumber}"`
      })
      // Help the user to easily revisit their reservation by storing the password
      saveReservationPass(reservationPass)
    }
    isSubmitted = true
  } finally {
    submitting = false
  }
}

onMount(async () => {
  const URLParam = new URLSearchParams(window.location.search);
  // First, check the password from online guest
  pass = URLParam.get('pass');
  if (pass) {
    invited = await authenticate(pass);
    if (invited) {
      const guest = getInvitedGuest();
      invitationName = guest.name;
      return
    } else {
      pass = ''
    }
  }
  // If not, check the password from online reservation
  reservationPass = URLParam.get('reservation') || loadReservationPass();
  if (reservationPass) {
    invited = await authReservation(reservationPass);
    if (invited) {
      const guest = getInvitedGuest();
      invitationName = guest.name;
      phoneNumber = guest.phoneNumber.replace(/\"/g, '')
      isComing = guest.response === 'Yes'
      testimonial = guest.testimonial
      personComing = guest.guestCount
      if (!URLParam.get('reservation')) {
        window.history.replaceState(null, '', window.location.href + `?reservation=${reservationPass}`)
      }
      return
    } else {
      reservationPass = ''
    }
  }

  invited = false
  return
})

function entranceDone(ev: TransitionEvent) {
  if (ev.target === entrance) {
    dispatch('done')
  }
}

function openInvitation () {
  open = true
}

function showReservation () {
  reservation = true
}

function clickSubmit () {
  if (invitationName && pass) {
    openInvitation()
  } else {
    showReservation()
  }
}

</script>
<div class="entrance flex items-center" class:open>
  <div
    bind:this={entrance}
    class="entrance-container"
		on:transitionend={entranceDone}>
    <img src={flowerFrameTop} alt="flower-frame-top" class="absolute top-0 right-0"/>
    <img src={flowerFrameBottom} alt="flower-frame-bottom" class="absolute bottom-0 left-0"/>
    <div class="p-8 h-full w-3/4">
      <img src={dickyDewiEntrance} alt="flower-frame-bottom" class="h-full object-cover" style="object-position: 65% 0"/>
    </div>
    {#if invitationName}
      <div class="absolute top-4 left-0 bg-yellow-300 p-4 transition-all" transition:fly>
        <p>Special Invitation for</p>
        <p class="text-2xl font-bold">{ invitationName }</p>
      </div>
    {/if}
    <div class="absolute right-4 top-0 mt-56 w-60 flex flex-col items-end">
      <div
        class="flex justify-end"
        in:fly={{ duration: 2000, delay: 2000 }}>
        <img src={saveTheDate} alt="save the date" class="w-28 h-28">
      </div>
      <p class="mt-5 text-right bg-opacity-50 bg-white p-2 rounded" in:fly={{ duration: 2000, delay: 2000 }}>for the wedding of</p>
      <p class="mt-5 text-right ff-main bg-opacity-50 bg-white p-2 rounded" in:fly={{ duration: 2000, delay: 3000 }}>
        <span class="text-5xl text-yellow-700">Dicky</span>
        <span class="text-3xl">and</span>
        <span class="text-5xl text-yellow-700">Dewi</span>
      </p>
      {#if !reservation}
        <div class="mt-5">
          <button
            class="bg-yellow-600 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded w-full transition-all animate-pulse"
            on:click={ clickSubmit }
            in:fly={{ duration: 2000, delay: 4000 }}>
            {#if invitationName && pass}
              Open Invitation
            {:else}
              Reservasi
            {/if }
          </button>
        </div>
      {/if}
    </div>
    {#if reservation}
      <div
        transition:slide
        class="absolute bottom-2 left-1/2 transform -translate-x-1/2 p-2 w-full max-w-sm">
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8">
          {#if alertMessage}
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span class="block sm:inline">{ alertMessage }</span>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                class="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                on:click={ () => alertMessage = '' }><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>
          {/if}
          {#if !isSubmitted}
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
                <button on:click={() => isComing = false} type="button" class="bg-white py-2 px-3 border w-20 border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" class:bg-gray-500={isComing === false}>Tidak</button>
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
                    class="shadow appearance-none border border-gray-500 rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline w-10"
                    type="text" value={ personComing } />
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
                  placeholder="Tuliskan ucapan dan doa Anda untuk Dicky & Dewi"
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
            </div>
          {:else}
            <p>Terimakasih atas reservasi Anda!</p>
            <p>Silahkan simpan URL ini sebagai bukti reservasi Anda:</p>
            <input
              type="text"
              class="
                form-control
                block
                w-full
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
            />
            <div class="text-center mt-4">
              <button
                class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center" type="button"
                on:click={ () => reservation = false }>
                Tutup
              </button>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </div>
  <!-- Preload here so it's already loaded after the entrance-->
  <!-- <img src={photo1} class="w-0 h-0" alt="invitation-background-hidden"/> -->
</div>
<style lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;

.entrance {
  min-height: 100vh;
  /* mobile viewport bug fix */
  min-height: -webkit-fill-available;
}

.entrance-container {
  @apply relative items-center h-screen max-w-xl m-auto sm:border-2 sm:border-yellow-300 lg:h-[700px] lg:rounded-tr-3xl lg:rounded-bl-3xl lg:mt-20;
}

/* OPEN ANIMATION */
.entrance.open {
  @apply overflow-hidden;
}

.entrance.open .entrance-container {
  @apply
    transition-all ease-in opacity-0;
  transition-duration: 1s;
  transform: scale(1.5);
}

</style>
