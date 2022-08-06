<script lang="ts">
import { fade } from 'svelte/transition';
import { loadTestimonials, getInvitedGuest } from '../module/sheet';
import rsvp from '../assets/rsvp.png';
import covid from '../assets/covid-protocol.jpeg';
import { onMount } from 'svelte';
import ReservationForm from './reservation-form.svelte';

let testimonials = []
let testiPage = 1;
let showReservation = false;

$: testimonialPagination = testimonials.slice(0, testiPage * 5);
$: showLoadMore = testimonials.length > testiPage * 5;

function appendTestimonial () {
  // Remove the current testimonial if exist
  const guest = getInvitedGuest()
  testimonials = testimonials.filter(testi => testi.name !== guest.name)
  testimonials.unshift({ name: guest.name, testimonial: guest.testimonial })
}

export function openRSVP () {
  showReservation = true
}

onMount(async function () {
  testimonials = await loadTestimonials()
})

function increaseTestiPage () {
  testiPage++;
}

</script>
<div
  class="page-min-height flex flex-col items-center justify-evenly px-2 bg-yellow-100 md:w-[768px] mx-auto">
  <img src={ rsvp } alt="rsvp" class="w-64 my-10 animate-pulse cursor-pointer" on:click={ () => showReservation = true }/>
  {#if showReservation}
    <ReservationForm on:close={ () => showReservation = false } on:submitted={ appendTestimonial }/>
  {/if}
  <p
    in:fade="{{ duration: 2000, delay: 1000 }}" out:fade
    class="mt-2 relative z-10 text-4xl font-extrabold text-center ff-main text-yellow-600">
    Testimonial
  </p>
  <div class="ff-body overflow-auto w-full mb-10">
    {#each testimonialPagination as testi}
      <p class="border-2 bg-gray-100 p-2">
        <span class="text-base">{ testi.name }</span><br>
        <span class="text-sm">"{@html testi.testimonial.replace(/(?:\r\n|\r|\n)/g, '<br>') }"</span>
      </p>
    {/each}
    {#if showLoadMore}
    <button
      class="bg-blue-600 hover:bg-blue-400 text-white text-xs font-bold py-2 px-4 my-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded"
    on:click={ increaseTestiPage }>Load More</button>
    {/if}
  </div>
  <div>
    <img src={ covid } alt="covid protocol" class="w-80 md:w-96 my-10"/>
  </div>
</div>
<style lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;

</style>
