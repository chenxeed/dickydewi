<script lang="ts">
import { slide } from 'svelte/transition';
import { onMount } from 'svelte';
import { updateReservation, getInvitedGuest } from '../module/sheet';

import detailPhoto from '../assets/detail.png';

let imageLoaded = false
let showReservationButton = false
let showReservationForm = false
let isComing = undefined
let personComing = 1
let submitting = false
let isSubmitted = false
let testimonial = ''
const maxPerson = 8

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
  submitting = true
  const resp = await updateReservation({
    guestCount: isComing ? personComing : 0,
    response: isComing ? 'Yes' : 'No',
    testimonial
  })
  if (resp) {
    isSubmitted = true
  }
  submitting = false
}

onMount(() => {
  setTimeout(() => {
    imageLoaded = true
  }, 100)

  setTimeout(() => {
    showReservationButton = true
  }, 5000)

  const guest = getInvitedGuest()
  if (guest) {
    testimonial = guest.testimonial
    isComing = guest.response === 'Yes' ? true : guest.response === 'No' ? false : undefined
    personComing = Number(guest.guestCount) || 1
  }
})
</script>
<div class="relative flex items-center justify-center w-100 h-screen" style="perspective: 500px">
  <img
    class="detail-photo max-h-screen shadow-lg"
    class:hide="{ imageLoaded === false }"
    src={detailPhoto}
    alt="detail"/>
  {#if showReservationButton}
  <button
    in:slide
    class="absolute bottom-10 right-10 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded sm:bottom-64 sm:left-[70%] sm:transform sm:-translate-x-1/2 sm:w-32"
    on:click={ () => showReservationForm = true }>
    Reservation
    <span class="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
      <span class="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
    </span>
  </button>
  {/if}
  {#if showReservationForm}
  <div
    transition:slide
    class="absolute bottom-2 left-1/2 transform -translate-x-1/2 p-2 w-full max-w-sm">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8">
      {#if !isSubmitted}
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Are you able to attend?
          </label>
          <div class="flex justify-around">
            <button on:click={() => isComing = true} type="button" class="bg-white py-2 px-3 border w-20 border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" class:bg-green-200={isComing === true}>Yes</button>
            <button on:click={() => isComing = false} type="button" class="bg-white py-2 px-3 border w-20 border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" class:bg-gray-500={isComing === false}>No</button>
          </div>
        </div>
        {#if isComing === true}
          <div transition:slide class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              How many person are coming?
            </label>
            <div class="flex justify-between">
              <button on:click={decrementPersonComing} type="button" class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">-</button>
              <input
                class="shadow appearance-none border border-gray-500 rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline w-10"
                type="text" value={ personComing } />
              <button on:click={incrementPersonComing} type="button" class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">+</button>
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
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 p-2 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Write your wish for Dicky and Dewi here"
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
            on:click={ () => showReservationForm = false }>
            Cancel
          </button>
        </div>
      {:else}
        <p>Thank you for your reservation!</p>
        <div class="text-center mt-4">
          <button
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center" type="button"
            on:click={ () => showReservationForm = false }>
            Close
          </button>
        </div>
      {/if}
    </div>
  </div>
  {/if}
</div>
<style lang="postcss">

.detail-photo {
  @apply
    transition-all ease-in;
  transition-duration: 1s;
}

.detail-photo.hide {
  transform: rotateY(-90deg) scale(0.8);
}
</style>
