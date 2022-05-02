<script lang="ts">
import { fade, slide } from 'svelte/transition';
import { createEventDispatcher, onMount } from 'svelte';
import invitationPhoto from '../assets/entrance.png';
import detailPhoto from '../assets/detail.png';
import loadingGif from '../assets/loading.gif';

const dispatch = createEventDispatcher();

let imageLoaded = false

let open = false
let entrance: HTMLElement;

onMount(async () => {

  const imgElement = document.createElement('img')
  imgElement.src = invitationPhoto
  imgElement.alt = "invitation entrance"
  imgElement.style.visibility = 'hidden'
  imgElement.style.height = '0px'
  imgElement.onload = () => {
    imageLoaded = true
    setTimeout(() => {
      const imgContainer = document.getElementById('entranceImage')
      imgContainer.appendChild(imgElement)
      imgElement.style.visibility = "visible"
      imgElement.style.height = 'auto'
      imgElement.style.maxHeight = '100vh'
    }, 100)
  }
  document.body.appendChild(imgElement)
  // Preload the detail photo
  const imgDetailElement = document.createElement('img')
  imgDetailElement.src = detailPhoto
  imgDetailElement.alt = "invitation detail"
  imgDetailElement.style.visibility = 'hidden'
  imgDetailElement.style.height = '0px'
  document.body.appendChild(imgDetailElement)
})

function entranceDone(ev: TransitionEvent) {
  if (ev.target === entrance) {
    setTimeout(() => {
      dispatch('done')
    }, 1000)
  }
}

function openInvitation () {
  open = true
  dispatch('open')
}

</script>
<div class="entrance w-full h-full" class:open style="perspective: 500px">
  <div
    bind:this={entrance}
    class="entrance-container relative flex items-center justify-center w-full h-full"
		on:transitionend={entranceDone}>
    {#if imageLoaded}
      <div
        in:fade={{ duration: 1000, delay: 1000 }} id="entranceImage" class="max-h-screen shadow-lg"
        on:click={ openInvitation } />
      <div
        in:slide={{ duration: 1000, delay: 3000 }} class="absolute bottom-10 left-1/2 transform -translate-x-1/2 sm:bottom-52">
        {#if open === false}
        <button
          class="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
          on:click={ openInvitation }>
          Open
          <span class="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
        </button>
        {/if}
      </div>
    {:else}
      <img src={loadingGif} alt="loading" />
    {/if}
  </div>
</div>
<style lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;

/* OPEN ANIMATION */
.entrance.open {
  @apply overflow-hidden;
}

.entrance.open .entrance-container {
  @apply
    transition-all ease-in;
  transition-duration: 1s;
  transform: rotateY(90deg) scale(0.8);
}
</style>
