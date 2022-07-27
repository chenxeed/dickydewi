<script lang="ts">
import { fade } from 'svelte/transition';
import { getInvitedGuest, getInvitationList, updateTestimonial } from '../module/sheet';
import rsvp from '../assets/rsvp.png';
import covid from '../assets/covid-protocol.jpeg';
import livestream from '../assets/livestream.png';

const guest = getInvitedGuest();
const invitations = getInvitationList();
let testimonials = invitations.filter(i => i.testimonial.trim());
let testiPage = 1;
let showTestimonialForm = Boolean(guest.testimonial.trim()) === false;
let message = "";

$: testimonialPagination = testimonials.slice(0, testiPage * 5);
$: showLoadMore = testimonials.length > testiPage * 5;

async function onSubmitTestimonial () {
  await updateTestimonial(encodeHTML(message));
  testimonials = [
    { ...guest, testimonial: message },
    ...testimonials
  ];
  showTestimonialForm = false;
}

function increaseTestiPage () {
  testiPage++;
}

function encodeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

</script>
<div
  class="page-min-height flex flex-col items-center justify-evenly px-2 bg-yellow-100 md:w-[768px] mx-auto">
  {#if guest.category !== 'online'}
  <a href="https://forms.gle/K9f4uH3mMPLmiLZc6" target="_blank">
    <img src={ rsvp } alt="rsvp" class="w-64 my-10 animate-pulse"/>
  </a>
  <p class="italic">
    NOTE: To keep social distancing with each other, the invitation is valid for 2 Person only. We apologize for the inconvenience.
  </p>
  {:else}
  <a href="https://www.instagram.com/italovestoryofkev/" target="_blank">
    <img src={ livestream } alt="live stream" class="w-80 my-10"/>
  </a>
  {/if}
  {#if showTestimonialForm}
  <p
    in:fade="{{ duration: 2000, delay: 1000 }}" out:fade
    class="mt-2 text-lg font-semibold text-center ff-body">
    You can write a testimonial to wish Kelvin & Rita:
  </p>
  <textarea
    in:fade="{{ duration: 2000, delay: 1000 }}" out:fade
    bind:value={message}
    style="height: 200px;" class="shadow-sm mt-1 p-2 block w-full sm:text-sm border-gray-600 rounded-md"></textarea>
    <button
      in:fade="{{ duration: 2000, delay: 1000 }}" out:fade
      class="bg-blue-600 hover:bg-blue-400 text-white text-xs font-bold py-2 px-4 my-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      on:click={ onSubmitTestimonial }>Send</button>
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
  {#if guest.category !== 'online'}
    <div>
      <img src={ covid } alt="covid protocol" class="w-80 md:w-96 my-10"/>
    </div>
  {/if}
</div>
<style lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;

</style>
