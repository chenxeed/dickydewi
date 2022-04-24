<script lang="ts">
  import { slide } from 'svelte/transition';
import { authenticate, getInvitedGuest } from '../module/sheet';
import Entrance from '../components/entrance.svelte'
import Home from '../components/home.svelte'
import song from '../../static/endless-love.mp3';
import { Howl } from 'howler';
import confetti from 'canvas-confetti';
import { onMount } from 'svelte';

let showEntrance = false
let showContent = false
let invitationName = ''
let invited = true

const audio = new Howl({
  src: [song],
  html5: true,
  volume: 0.5,
  loop: true,
  preload: true
});
let muted = false

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function runConfetti () {
  var duration = 15 * 1000;
  var animationEnd = Date.now() + duration;
  var skew = 1;

  (function frame() {
    var timeLeft = animationEnd - Date.now();
    var ticks = Math.max(200, 500 * (timeLeft / duration));
    skew = Math.max(0.8, skew - 0.001);

    confetti({
      particleCount: 1,
      startVelocity: 0,
      ticks: ticks,
      origin: {
        x: Math.random(),
        // since particles fall down, skew start toward the top
        y: (Math.random() * skew) - 0.2
      },
      colors: ['#ffffff'],
      shapes: ['circle'],
      gravity: randomInRange(0.4, 0.6),
      scalar: randomInRange(0.4, 1),
      drift: randomInRange(-0.4, 0.4)
    });

    if (timeLeft > 0) {
      requestAnimationFrame(frame);
    }
  }());
}

function entranceDone () {
  showEntrance = false
  showContent = true
  audio.pause()
  audio.play()
  runConfetti()
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

onMount(async () => {
  const URLParam = new URLSearchParams(window.location.search);
  const pass = URLParam.get('pass');
  invited = await authenticate(pass);
  if (!invited) {
    return
  }

  showEntrance = true

  const guest = getInvitedGuest();
  invitationName = guest.name;
})

</script>
<div class="absolute top-2 w-full transition-all z-50 shadow-lg sm:left-10 sm:w-auto p-4">
  {#if invitationName}
    <div in:slide={{ duration: 1000 }} class="ff-body text-shadow bg-red-100 bg-opacity-10 text-center">
      <p>
        <span class="text-sm">Special Invitation for</span> <span class="text-2xl font-bold">{ invitationName }</span>
      </p>
    </div>
  {:else if invited === false}
    Maaf, alamat undangan Anda tidak valid. Harap kembali menghubungi kontak yang mengirimkan link ini untuk konfirmasi.
  {/if}
</div>
{#if showEntrance}
  <section class="h-full">
    <Entrance on:done={ entranceDone }/>
  </section>
{:else if showContent}
  <div class="h-full">
    <main class="overflow-auto page-height">
      <div class="divide-y-8 divide-yellow-200">
        <div id="home">
          <Home/>
        </div>
      </div>
    </main>
  </div>
  <button
    class="fixed bottom-[80px] left-2 bg-red-200 hover:bg-red-100 text-gray-800 py-2 px-4 rounded inline-flex items-center"
    style={ muted && 'color: #fff; background: rgb(55, 65, 81)' }
    on:click={ toggleMusic }>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-music-note-beamed" viewBox="0 0 16 16">
      <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"/>
      <path fill-rule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z"/>
      <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z"/>
    </svg>
  </button>
{/if}
<style global lang="postcss">
@font-face {
  font-family: "Main";
  src: url("/fonts/CreamCandy.otf");
  font-display: block;
}

@font-face {
  font-family: "Body";
  src: url("/fonts/PlayfairDisplay-Regular.ttf");
  font-display: block;
  font-weight: 300;
}
@font-face {
  font-family: "Body";
  src: url("/fonts/PlayfairDisplay-Bold.ttf");
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
  }
}

html {
  scroll-behavior: smooth;
  height: -webkit-fill-available;
  background: rgb(250,240,243);
  background: linear-gradient(180deg, rgba(250,240,243,1) 0%, rgba(247,225,223,1) 100%);
}

body {
  height: 100%;
  min-height: 100vh;
  min-height: -webkit-fill-available;
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
