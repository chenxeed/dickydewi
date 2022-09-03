<script lang="ts">
import gift from '../assets/gift-cimb.png';

const accountNumber = '733222999500'
let copyAccountCopy = 'Copy Nomor Rekening'

async function copyAccount () {
  await navigator.clipboard.writeText(accountNumber)
  copyAccountCopy = 'Berhasil disalin'
  setTimeout(() => {
    copyAccountCopy = 'Copy Nomor Rekening'
  }, 2000)
}

</script>
<div
  class="page-min-height flex flex-col items-center justify-evenly px-2 bg-yellow-100 md:w-[768px] mx-auto">
  <p class="text-center font-semibold text-4xl mt-10 ff-main">Gift</p>
  <p class="p-2">
    Kami kedua mempelai sangat berbahagia atas kehadiran dan doa restu anda
    di acara Resepsi pernikahan kami, & jika Memberi adalah ungkapan cinta kasih
    yang tulus dari Anda, Kami sangat menghargai dan berterima kasih sebagai
    ucapan doa untuk pernikahan kami.
  </p>
  <div class="mt-4">
    <img src={ gift } alt="gift rekening CIMB" class="w-80 h-full" />
    <p class="text-center mt-2">
      No. Rekening: <span class="font-bold font-mono">733222999500</span><br>
      Nama: <span class="font-bold">Dicky Kusumohardjo</span><br>
      <button
        class="bg-gray-100 hover:bg-gray-200 py-2 px-4 my-4 mt-2 border-b-4 border-gray-700 hover:border-gray-500 rounded text-lg animate-pulse inline-flex justify-around items-center"
        on:click={ copyAccount }>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
        </svg>&nbsp;
        { copyAccountCopy }
      </button>
    </p>
  </div>
</div>
