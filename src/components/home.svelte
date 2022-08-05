<script lang="ts">
import { slide, fade } from 'svelte/transition';
import { getInvitedGuest } from '../module/sheet';
import photo1 from '../assets/photo-1.jpg';
import photo2 from '../assets/photo-2.jpg';
import videoPortrait from '../assets/bg-portrait.webm';
import glass from '../assets/glass.svg';

const guest = getInvitedGuest();
</script>

<div
  class="relative page-min-height flex flex-col max-w-lg m-auto lg:max-w-none overflow-hidden justify-around lg:justify-evenly">
  <video
    autoplay
    loop
    muted
    class="absolute z-10 w-auto min-w-full min-h-full max-w-none">
    <source
      src={videoPortrait}
      type="video/webm"
    />
    <div
      transition:fade="{{ duration: 3000, delay: 500 }}"
      class="absolute z-0 w-full h-full shadow-2xl bg-no-repeat bg-left-top bg-auto sm:w-[600px] lg:self-start"
      style="background-image: url('{photo1}')"/>
    <div
      transition:fade="{{ duration: 3000, delay: 500 }}"
      class="hidden absolute z-0 w-full h-full shadow-2xl bg-no-repeat bg-left-top bg-auto sm:w-[600px] sm:self-end lg:block"
      style="background-image: url('{photo2}'); transform: scaleX(-1)"/>
  </video>
  <p
    class="relative z-10 text-md text-center text-shadow lg:mt-0 bg-gray-100 bg-opacity-80 p-4"
    transition:slide="{{ duration: 2000, delay: 1000 }}">Dengan penuh hormat, kami mengundang Anda untuk menghadiri acara pernikahan dari</p>
  <p
    class="relative z-10 text-center lg:mt-0 text-yellow-200 p-2 rounded-sm text-stroke"
    transition:slide="{{ duration: 2000, delay: 3000 }}">
      <span class="text-3xl ff-main">Dicky</span><br>
      <span class="text-base">Putra dari (Alm) Bapak Piettono Tjondro Kusumohardjo dan Ibu Emilia Tjandrawaty Widjaja</span>
  </p>
  <p
  class="relative z-10 text-center lg:mt-0 text-yellow-200 p-2 rounded-sm text-stroke">&</p>
  <p
    class="relative z-10 text-center lg:mt-0 text-yellow-200 p-2 rounded-sm text-stroke"
    transition:slide="{{ duration: 2000, delay: 3000 }}">
      <span class="text-3xl ff-main">Dewi</span><br>
      <span class="text-base">Putri dari Bapak Liem Siauw Bing dan Ibu Tan Yusiani Sutanto</span>
  </p>
  <div
    class="relative z-10 text-xl px-4 self-start lg:self-center lg:text-center bg-gray-50 bg-opacity-80 p-4 w-60 lg:w-auto"
    transition:slide="{{ duration: 2000, delay: 5000 }}">
    Saturday, 29 Jan 22,<br>
    <div class="w-full border-t-2 border-gray-400 my-1"/>
    <img src={ glass } alt="ring" class="w-4 inline"/> Resepsi Pernikahan
    <br/>17.30
    <br/>
    <div class="w-full border-t-2 border-gray-400 my-1"/>
    <a href="https://g.page/merusaka?share" target="_blank">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin-map-fill inline" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"/>
        <path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"/>
      </svg>
      <span class="text-lg">Merusaka Nusa Dua, Bali</span><br>
    </a>
  </div>
  <p
    class="relative z-10 text-base italic text-right self-end lg:self-center bg-gray-50 bg-opacity-80 p-4"
    transition:slide="{{ duration: 2000, delay: 7000 }}">
    <span>"True love is the joy of life."</span>
    <br>- John Clarke
  </p>
</div>
