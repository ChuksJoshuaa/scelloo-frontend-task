<template>
  <div class="container mx-auto">
    <div class="mb-2">
       <Header />
    </div>
    <div class="rounded-lg bg-white border border-gray-100 mt-7">
      <BodyContent />
    </div>
  </div>
</template>


<script>
import Header from './components/Header.vue';
import BodyContent from './components/BodyContent.vue';

export default {
  components: { Header, BodyContent },


}
</script>