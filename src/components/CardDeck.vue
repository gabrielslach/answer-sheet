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

export default {
  name: 'CardDeck',
  components: {
    TextInputCard,
    TextAreaCard,
    SelectCard
  }
}
</script>

<style>
</style>