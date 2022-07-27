<script lang="ts">
import gift_bca from '../assets/gift-bca.jpeg';

let showGift = false

</script>
<div
  class="page-min-height flex flex-col items-center justify-evenly px-2 bg-yellow-100 md:w-[768px] mx-auto">
  <p class="text-center font-semibold text-4xl mt-10 ff-main">Gift</p>
  <p class="p-2">
    We're so happy just to have you be present as part of our wedding ceremony. If you still wish to send us a gift,
    we are thankful and happily accept it as part of our joy!
  </p>
  <div>
    <button
      class="bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 my-4 border-b-4 border-blue-700 hover:border-blue-500 rounded w-40 h-24 text-lg animate-pulse flex justify-around items-center"
      style={ showGift ? `transition: all 0.5s; height: 0; margin: 0; padding: 0; opacity: 0; border: 0` : '' }
      on:click={ () => showGift = true }>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-index-thumb" viewBox="0 0 16 16">
          <path d="M6.75 1a.75.75 0 0 1 .75.75V8a.5.5 0 0 0 1 0V5.467l.086-.004c.317-.012.637-.008.816.027.134.027.294.096.448.182.077.042.15.147.15.314V8a.5.5 0 0 0 1 0V6.435l.106-.01c.316-.024.584-.01.708.04.118.046.3.207.486.43.081.096.15.19.2.259V8.5a.5.5 0 1 0 1 0v-1h.342a1 1 0 0 1 .995 1.1l-.271 2.715a2.5 2.5 0 0 1-.317.991l-1.395 2.442a.5.5 0 0 1-.434.252H6.118a.5.5 0 0 1-.447-.276l-1.232-2.465-2.512-4.185a.517.517 0 0 1 .809-.631l2.41 2.41A.5.5 0 0 0 6 9.5V1.75A.75.75 0 0 1 6.75 1zM8.5 4.466V1.75a1.75 1.75 0 1 0-3.5 0v6.543L3.443 6.736A1.517 1.517 0 0 0 1.07 8.588l2.491 4.153 1.215 2.43A1.5 1.5 0 0 0 6.118 16h6.302a1.5 1.5 0 0 0 1.302-.756l1.395-2.441a3.5 3.5 0 0 0 .444-1.389l.271-2.715a2 2 0 0 0-1.99-2.199h-.581a5.114 5.114 0 0 0-.195-.248c-.191-.229-.51-.568-.88-.716-.364-.146-.846-.132-1.158-.108l-.132.012a1.26 1.26 0 0 0-.56-.642 2.632 2.632 0 0 0-.738-.288c-.31-.062-.739-.058-1.05-.046l-.048.002zm2.094 2.025z"/>
        </svg>
        Send Gift
      </button>
  </div>
  <div
    style={ showGift && `transition: all 0.5s; opacity: 1; height: auto;` }
    class="mt-4 opacity-0 h-0">
    <img src={ gift_bca } alt="gift bca" class="w-80 mb-5 h-full" />
  </div>
  <div
    style={ showGift && `transition: all 0.5s; opacity: 1; height: auto;` }
    class="my-4 opacity-0 h-0 text-center border-2 bg-gray-50 p-2">
    <p class="font-bold flex justify-center items-center">
      Gift Address
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gift ml-1" viewBox="0 0 16 16">
        <path d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 14.5V7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A2.968 2.968 0 0 1 3 2.506V2.5zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43a.522.522 0 0 0 .023.07zM9 3h2.932a.56.56 0 0 0 .023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0V3zM1 4v2h6V4H1zm8 0v2h6V4H9zm5 3H9v8h4.5a.5.5 0 0 0 .5-.5V7zm-7 8V7H2v7.5a.5.5 0 0 0 .5.5H7z"/>
      </svg>
    </p>
    <p>
      Apartemen City Resort, Tower Marigold Lt.12 No 17, Cengkareng Tim., Kecamatan Cengkareng, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11730
    </p>
  </div>

</div>
