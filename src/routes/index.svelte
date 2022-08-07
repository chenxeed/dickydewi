<script lang="ts">
import { fade } from 'svelte/transition'
import Entrance from '../components/entrance.svelte'
import Home from '../components/home.svelte'
import Gallery from '../components/gallery.svelte'
import Join from '../components/join.svelte'
import song from '../../static/joker-queen.mp3';
import { Howl } from 'howler';

let showEntrance = true
const audio = new Howl({
  src: [song],
  volume: 0,
  loop: true,
  autoplay: false,
  preload: true
});
let muted = false
let joinComponent

function scrollTo (targetId: string) {
  const target = document.getElementById(targetId)
  if (target) {
    target.scrollIntoView({
      behavior: 'smooth'
    })
    setTimeout(() => {
      target.scrollIntoView({
        behavior: 'smooth'
      })
    }, 500)
  }
}

function openRSVP () {
  joinComponent.openRSVP()
}

function entranceDone () {
  showEntrance = false
  setTimeout(() => {
    audio.volume(0)
    audio.play()
    setTimeout(() => {
      toggleMusic()
      setTimeout(() => {
        audio.volume(0.5)
        toggleMusic()
      }, 100)
    }, 100)
  }, 1000)
}

function toggleMusic () {
  if (muted === false) {
    audio.pause()
    muted = true
  } else {
    audio.play()
    muted = false
  }
}

</script>
<div class="ff-body text-xl">
  {#if showEntrance}
    <section>
      <Entrance on:done={ entranceDone }/>
    </section>
  {:else}
    <div in:fade>
      <div class="h-screen">
        <main class="overflow-auto page-height">
          <div class="divide-y-8 divide-yellow-200">
            <div id="home">
              <Home/>
            </div>
            <div id="gallery">
              <Gallery/>
            </div>
            <div>
              <Join bind:this={joinComponent}/>
            </div>
            <div class="w-full h-10 text-center text-xs text-yellow-200 bg-gray-600">
              Copyright @ <a href="https://chenxeed.com" target="_blank">chenxeed</a> 2022<br>
              Music by <a href="https://www.youtube.com/watch?v=r5Lr7NC50z0" target="_blank">Joker and the Queen - Ed Sheeran</a>
            </div>
            <div class="h-[70px]"/>
          </div>
        </main>
        <nav class="flex-grow-0 flex justify-around items-center border-t-2 border-gray-500 fixed bottom-0 z-30 w-full text-yellow-200 bg-gray-600 bg-opacity-90">
          <a class="flex flex-col items-center" href="#home" on:click|preventDefault={() => scrollTo('home')}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Home
          </a>
          <div class="border-l-2 border-gray-500 w-1 h-full"></div>
          <a class="flex flex-col items-center" href="#gallery" on:click|preventDefault={() => scrollTo('gallery')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-collection-play-fill" viewBox="0 0 16 16">
              <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm6.258-6.437a.5.5 0 0 1 .507.013l4 2.5a.5.5 0 0 1 0 .848l-4 2.5A.5.5 0 0 1 6 12V7a.5.5 0 0 1 .258-.437z"/>
            </svg>
            Gallery
          </a>
          <div class="border-l-2 border-gray-500 w-1 h-full"></div>
          <a class="flex flex-col items-center" href="#join" on:click|preventDefault={() => { scrollTo('join'); openRSVP() } }>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
            </svg>
            RSVP
          </a>
          <div class="border-l-2 border-gray-500 w-1 h-full"></div>
          <a class="flex flex-col items-center" href="#testimonial" on:click|preventDefault={() => { scrollTo('testimonial'); } }>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
            </svg>
            Testimonial
          </a>
        </nav>
      </div>
    </div>
    <button
      class="fixed bottom-[80px] left-2 bg-blue-200 hover:bg-blue-100 text-gray-800 py-2 px-4 rounded inline-flex items-center z-20"
      style={ muted && 'color: #fff; background: rgb(55, 65, 81)' }
      on:click={ toggleMusic }>
      {#if muted}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stop-circle-fill" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.5 5A1.5 1.5 0 0 0 5 6.5v3A1.5 1.5 0 0 0 6.5 11h3A1.5 1.5 0 0 0 11 9.5v-3A1.5 1.5 0 0 0 9.5 5h-3z"/>
        </svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-music-note-beamed" viewBox="0 0 16 16">
          <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"/>
          <path fill-rule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z"/>
          <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z"/>
        </svg>
      {/if}
    </button>
  {/if}
</div>
<style global lang="postcss">
@font-face {
  font-family: "Main";
  src: url("/fonts/DancingScript-Regular.ttf");
  font-display: block;
}

@font-face {
  font-family: "Body";
  src: url("/fonts/Raleway-ExtraLight.ttf");
  font-display: block;
  font-weight: 300;
}
@font-face {
  font-family: "Body";
  src: url("/fonts/Raleway-Medium.ttf");
  font-weight: bold;
  font-display: block;
}

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  @responsive {
    .ff-main {
      font-family: 'Main', cursive;
    }

    .ff-body {
      font-family: 'Body', cursive;
      font-weight: 300;
    }

    .text-shadow {
      text-shadow: 0 2px 4px rgba(0,0,0,0.10);
    }

    .text-shadow-md {
      text-shadow: 0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08);
    }

    .text-shadow-lg {
      text-shadow: 0 15px 30px rgba(0,0,0,0.11), 0 5px 15px rgba(0,0,0,0.08);
    }

    .text-shadow-none {
      text-shadow: none;
    }

    .text-shadow {
      text-shadow: 1px 1px 2px #000;
    }

    .frame-border {
      box-shadow: 3px 3px 5px 2px rgb(0 0 0 / 10%);
      border: 5px double rgb(75, 85, 99) !important;
      @apply bg-gray-100 rounded px-8 pt-6 pb-8;
    }

    .text-gradient-bg {
      background: rgba(255, 255, 255, 0.5);
    }
  }
}

html {
  scroll-behavior: smooth;
  height: -webkit-fill-available;
}

nav {
  height: 70px;
}

.page-height {
  height: 100vh;
}

.page-min-height {
  min-height: 87vh;
}

</style>
