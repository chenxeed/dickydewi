<script lang="ts">
import { slide, fade } from 'svelte/transition';
import { getInvitedGuest } from '../module/sheet';
import photo1 from '../assets/photo-1.jpg';
import photo2 from '../assets/photo-2.jpg';
import videoPortraitMp4 from '../assets/bg-portrait.mp4';
import videoPortraitWebm from '../assets/bg-portrait.webm';
import glass from '../assets/glass.svg';
import clothes from '../assets/icons8-clothes-50.png';

const guest = getInvitedGuest();
</script>

<div
  class="relative page-min-height flex flex-col max-w-lg m-auto lg:max-w-none overflow-hidden justify-around lg:justify-evenly">
  <div class="absolute z-10 w-auto min-w-full min-h-full max-w-none">
    <video
      in:fade="{{ duration: 2000, delay: 1000 }}"
      data-autoplay="" autoplay webkit-playsinline="" playsinline loop muted data-object-fit="cover"
      class="absolute z-10 w-auto min-w-full min-h-full max-w-none">
      <source src={videoPortraitMp4} type="video/mp4" />
      <source src={videoPortraitWebm} type="video/webm" />
      <div
        transition:fade="{{ duration: 3000, delay: 500 }}"
        class="absolute z-0 w-full h-full shadow-2xl bg-no-repeat bg-left-top bg-auto sm:w-[600px] lg:self-start"
        style="background-image: url('{photo1}')"/>
      <div
        transition:fade="{{ duration: 3000, delay: 500 }}"
        class="hidden absolute z-0 w-full h-full shadow-2xl bg-no-repeat bg-left-top bg-auto sm:w-[600px] sm:self-end lg:block"
        style="background-image: url('{photo2}'); transform: scaleX(-1)"/>
    </video>
    <div class="w-full h-full absolute z-10 top-0 left-0 bg-white bg-opacity-50"/>
  </div>
  <p
    class="relative z-10 text-sm text-center lg:mt-0 p-4"
    transition:slide="{{ duration: 2000, delay: 1000 }}">Dengan penuh hormat, kami mengundang Anda untuk menghadiri acara pernikahan dari</p>
  <p
    class="relative z-10 text-center lg:mt-0 p-2 rounded-sm text-shadow"
    transition:slide="{{ duration: 2000, delay: 3000 }}">
      <span class="text-4xl ff-main text-yellow-200 text-stroke">Dicky Kusumohardjo</span><br>
      <span class="text-base text-yellow-300 font-bold">Putra dari (Alm) Bapak Piettono Tjondro Kusumohardjo dan Ibu Emilia Tjandrawaty Widjaja</span>
      <br><span class="text-3xl ff-main text-yellow-200">&</span><br>
      <span class="text-4xl ff-main text-yellow-200">Dewi Suryani Halim</span><br>
      <span class="text-base text-yellow-300 font-bold">Putri dari Bapak Liem Siauw Bing dan Ibu Tan Yusiani Sutanto</span>
  <div
    class="relative z-10 text-base px-4 self-center text-center p-4 text-shadow"
    transition:slide="{{ duration: 2000, delay: 5000 }}">
    <img src={ glass } alt="ring" class="w-4 inline"/> <span class="font-bold">Resepsi Pernikahan</span>
    <div class="w-full border-t-2 border-gray-400 my-1"/>
    <div class="font-bold">Minggu, 18 Sep 22, 17.30 WITA</div>
    <div class="w-full border-t-2 border-gray-400 my-1"/>
    <a href="https://g.page/merusaka?share" target="_blank">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin-map-fill inline" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"/>
        <path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"/>
      </svg>
      <span class="text-blue-800 font-bold">Merusaka Nusa Dua, Bali</span><br>
    </a>
    <div class="w-full border-t-2 border-gray-400 my-1"/>
    <div class="font-bold">
      <img src={ clothes } alt="ring" class="w-4 inline"/> Dresscode: Garden Party, Warna Pastel
    </div>
  </div>
  <p
    class="relative z-10 text-base italic text-right self-end lg:self-center p-4"
    transition:slide="{{ duration: 2000, delay: 7000 }}">
    <span class="text-xs">"Kebahagiaan duniawi terbesar yang dapat dialami atau dirasakan manusia adalah perpaduan dari pernikahan yang mengikat dua hati yang saling mencintai menjadi satu."</span>
    <br>
    <span class="text-sm">Sutta Pitaka - Digha Nikaya</span>
  </p>
</div>
