<script lang="ts">
import { fly } from 'svelte/transition';
import flowerFrameTop from '../assets/flower-frame-top.png';
import flowerFrameBottom from '../assets/flower-frame-bottom.png';
import dickyDewiEntrance from '../assets/dicky-dewi-entrance.jpg';
import saveTheDate from '../assets/save-the-date.png';
import { authenticate, getInvitedGuest, createReservation, authReservation, updateReservation, saveReservationPass, loadReservationPass } from '../module/sheet';
import { createEventDispatcher, onMount } from 'svelte';
import ReservationForm from './reservation-form.svelte'


const dispatch = createEventDispatcher();

let isGuest = false
let invitationName = ''
let invited = true

let open = false
let pass = ''
let entrance: HTMLElement;

let reservation = false
let canReservation = false
let isComing = null
let reservationPass = ''

onMount(async () => {
  const URLParam = new URLSearchParams(window.location.search);
  // First, check the password from online guest
  pass = URLParam.get('pass');
  if (pass) {
    invited = await authenticate(pass);
    if (invited) {
      const guest = getInvitedGuest();
      invitationName = guest.name;
      isComing = guest.response === 'Yes' ? true : guest.response === 'No' ? false : null
      canReservation = true
      isGuest = true
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
      isComing = guest.response === 'Yes'
      if (!URLParam.get('reservation')) {
        window.history.replaceState(null, '', window.location.href + `?reservation=${reservationPass}`)
      }
    } else {
      reservationPass = ''
    }
  }
  canReservation = true
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

function reservationFormSubmitted () {
  const reservedGuest = getInvitedGuest()
  invitationName = reservedGuest.name
  isComing = reservedGuest.response === 'Yes' ? true : reservedGuest.response === 'No' ? false : null
  if (isGuest === false) {
    // Help the user to easily revisit their reservation by storing the password
    saveReservationPass(reservedGuest.pass)
    window.history.replaceState(null, '', window.location.href + `?reservation=${reservedGuest.pass}`)
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
      <img src={dickyDewiEntrance} alt="flower-frame-bottom" class="h-full object-cover" style="object-position: 50% 0"/>
    </div>
    {#if invitationName}
      <div class="absolute top-4 left-0 bg-yellow-300 transition-all" transition:fly>
        <div class="p-4">
          <p>Special Invitation for</p>
          <p class="text-xl font-bold text-shadow">
            { invitationName }
          </p>
        </div>
        <div style="font-size: 8px" class="pb-1 px-1">Kami mohon maaf jika ada kesalahan pada nama atau gelar</div>
      </div>
    {/if}
    <div class="absolute right-4 top-0 mt-56 w-60 flex flex-col items-end">
      <div
        class="flex justify-end"
        in:fly={{ duration: 2000, delay: 2000 }}>
        <img src={saveTheDate} alt="save the date" class="w-28 h-28">
      </div>
      <p class="mt-5 text-right bg-opacity-50 text-shadow" in:fly={{ duration: 2000, delay: 2000 }}>for the wedding of</p>
      <p class="mt-5 text-right ff-main bg-opacity-50 bg-white p-2 rounded text-yellow-600 text-shadow" in:fly={{ duration: 2000, delay: 3000 }}>
        <span class="text-5xl">Dicky</span><br>
        <span class="text-3xl">&</span>
        <span class="text-5xl">Dewi</span>
      </p>
      {#if canReservation && !reservation && !isGuest}
        <div class="mt-5">
          <button
            class="bg-yellow-800 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded w-full transition-all animate-pulse"
            on:click={ showReservation }
            in:fly={{ duration: 2000, delay: 1000 }}>
            {#if invitationName && reservationPass && isComing !== null}
              Ubah Reservasi
            {:else}
              Reservasi
            {/if}
          </button>
        </div>
      {/if}
      {#if invitationName && !reservation}
        <div class="mt-5">
          <button
            class="bg-yellow-600 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded w-full transition-all animate-pulse"
            on:click={ openInvitation }
            in:fly={{ duration: 2000, delay: 1000 }}>
            Buka Undangan
          </button>
        </div>
      {/if}
    </div>
    {#if reservation}
      <ReservationForm
        canOpenInvitation
        on:submitted={ reservationFormSubmitted }
        on:close={ () => reservation = false }
        on:open-invitation={ openInvitation }/>
    {/if}
  </div>
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
