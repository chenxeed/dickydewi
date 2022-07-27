<script lang="ts">
import { slide, fade } from 'svelte/transition';
import { getInvitedGuest } from '../module/sheet';
import photo1 from '../assets/photo-1.jpg';
import photo2 from '../assets/photo-2.jpg';
import ring from '../assets/ring.svg';
import glass from '../assets/glass.svg';

const guest = getInvitedGuest();

</script>

<div
  class="relative page-min-height flex flex-col max-w-lg m-auto lg:max-w-none overflow-hidden justify-around lg:justify-evenly">
  <div
    transition:fade="{{ duration: 3000, delay: 500 }}"
    class="absolute z-0 w-full h-full shadow-2xl bg-no-repeat bg-left-top bg-auto sm:w-[600px] lg:self-start"
    style="background-image: url('{photo1}')"/>
  <div
    transition:fade="{{ duration: 3000, delay: 500 }}"
    class="hidden absolute z-0 w-full h-full shadow-2xl bg-no-repeat bg-left-top bg-auto sm:w-[600px] sm:self-end lg:block"
    style="background-image: url('{photo2}'); transform: scaleX(-1)"/>
  <p
    class="relative z-10 text-md text-center text-shadow lg:mt-0"
    transition:slide="{{ duration: 2000, delay: 1000 }}">You are cordially invited to attend the wedding of</p>
  <p
    class="relative z-10 text-5xl text-center ff-main lg:mt-0 text-yellow-600"
    transition:slide="{{ duration: 2000, delay: 3000 }}">
      Kelvin and Rita
  </p>
  <p
    class="relative z-10 text-xl px-4 self-start lg:self-center lg:text-center bg-gray-50 bg-opacity-80 p-4 w-60 lg:w-auto"
    transition:slide="{{ duration: 2000, delay: 5000 }}">
    {#if guest.category !== 'online'}
      Saturday, 29 Jan 22,<br>
      {#if ['semua', 'pemberkatan'].includes(guest.category.toLowerCase())}
      <div class="w-full border-t-2 border-gray-400 my-1"/>
      <img src={ ring } alt="ring" class="w-4 inline"/> Holy Matrimony
      <br/>10.30 - 12.00
      <br/>
      {/if}
      {#if ['semua', 'resepsi'].includes(guest.category.toLowerCase())}
      <div class="w-full border-t-2 border-gray-400 my-1"/>
      <img src={ glass } alt="ring" class="w-6 inline"/> Reception Night
      <br/>18.00 - 20.00
      <br/>
      {/if}
      <div class="w-full border-t-2 border-gray-400 my-1"/>
      <a href="https://www.google.com/maps?ll=-6.18038,106.724483&z=14&t=m&hl=en&gl=ID&mapclient=embed&cid=9664184628718228892" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin-map-fill inline" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"/>
          <path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"/>
        </svg>
        <span class="text-lg">HARRIS Suites Puri Mansion, Jakarta Barat</span><br>
      </a>
    {:else}
      Saturday, 29th Jan' 2022,<br>10.30 - 12.00
      <br/>
      <a class="text-blue-900" href="https://www.instagram.com/italovestoryofkev/" target="_blank">
        <span class="text-lg">Instagram Live</span><br>
        <span class="text-sm">#italovestoryofkev</span>
      </a>
    {/if}
  </p>
  <p
    class="relative z-10 text-base italic text-right self-end lg:self-center bg-gray-50 bg-opacity-80 p-4"
    transition:slide="{{ duration: 2000, delay: 7000 }}">
    <span>"True love is the joy of life."</span>
    <br>- John Clarke
  </p>
</div>
