<template>
  <q-page class="column items-stretch" padding>
      <TextInputCard/>
      <SelectCard/>
      <TextAreaCard/>
  </q-page>
</template>

<script>
import TextInputCard from './Cards/TextInputCard';
import TextAreaCard from './Cards/TextAreaCard.vue';
import SelectCard from './Cards/SelectCard.vue';

import { mapGetters } from 'vuex';

export default {
  name: 'CardDeck',
  components: {
    TextInputCard,
    TextAreaCard,
    SelectCard
  },
  computed: {
    ...mapGetters(['getCards'])
  },
  mounted() {
    console.log('cards', this.$state ,this.getCards());
  }
}
</script>

<style>
</style>