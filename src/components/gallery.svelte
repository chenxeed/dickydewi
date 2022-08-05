<script lang="ts">
import { fade } from 'svelte/transition';
import { viewport } from '../helper/useViewport'
import Gallery from 'svelte-image-gallery'
import { onDestroy, onMount } from 'svelte';
import gallery1 from '../assets/gallery/1.jpg';
import gallery2 from '../assets/gallery/2.jpg';
import gallery3 from '../assets/gallery/3.jpg';
import gallery4 from '../assets/gallery/4.jpg';
import gallery5 from '../assets/gallery/5.jpg';
import gallery6 from '../assets/gallery/6.jpg';
import gallery7 from '../assets/gallery/7.jpg';
import gallery8 from '../assets/gallery/8.jpg';
import gallery9 from '../assets/gallery/9.jpg';
import gallery10 from '../assets/gallery/10.jpg';
import gallery11 from '../assets/gallery/11.jpg';
import gallery12 from '../assets/gallery/12.jpg';

let showTitle = false;
let windowSize = document.body.clientWidth;
$: galleryMaxColumnWidth = windowSize < 640 ? 100 : 250;

const images = [gallery1, gallery2, gallery3, gallery5, gallery4, gallery11, gallery6, gallery7, gallery8, gallery9, gallery12, gallery10];

onMount(() => {
  window.addEventListener('resize', onWindowResized)
})

onDestroy(() => {
  window.removeEventListener('resize', onWindowResized)
})

function onWindowResized () {
  windowSize = document.body.clientWidth;
}

</script>
<div class="pb-24 flex flex-col px-2 bg-yellow-50">
  <div
    use:viewport
    on:enterViewport={() => showTitle = true}
    class="w-full">
    {#if showTitle}
      <p
        transition:fade="{{ duration: 2000, delay: 1000 }}"
        class="text-center font-semibold text-4xl mt-10 ff-main">Gallery</p>
      <div class="mt-10 md:w-[768px] mx-auto gallery">
        <Gallery gap={10} maxColumnWidth={galleryMaxColumnWidth}>
          {#each images as image, i}
            <img
              src={image}
              alt={`gallery-${i}`}/>
          {/each}
        </Gallery>
      </div>
    {/if}
  </div>
</div>
<style lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;

:global(.gallery img) {
  opacity: .9; transition: all .2s;
  @apply border-4 border-white focus:scale-125 focus:z-10 ;
  box-shadow: 2px 2px 5px black;
}
</style>
