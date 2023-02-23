<template>
  <div class="container mx-auto">
    <div class="mb-2">
      <Header />
    </div>
    <div class="rounded-lg bg-white border border-gray-100 mt-7">
      <Body />
    </div>
  </div>
</template>


<script>
import Body from './components/Body.vue';
import Header from './components/Header.vue';

export default {
  components: { Body, Header },
}
</script>