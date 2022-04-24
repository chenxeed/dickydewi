<script lang="ts">
import detailPhoto from '../assets/detail.png';

let imageLoaded = false
</script>
<div class="relative flex items-center justify-center w-100 h-screen" style="perspective: 500px">
  <img
    class="detail-photo max-h-screen shadow-lg"
    class:hide="{ imageLoaded === false }"
    src={detailPhoto}
    alt="detail"
    on:load={ () => imageLoaded = true }/>
</div>
<style lang="postcss">

.detail-photo {
  @apply
    transition-all ease-in;
  transition-duration: 1s;
}

.detail-photo.hide {
  transform: rotateY(-90deg) scale(0.8);
}
</style>
