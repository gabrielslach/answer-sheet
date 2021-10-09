<template>
  <q-page class="column items-stretch" padding>
    <div v-for="card in getCards" :key="card">
      <TextInputCard 
        v-if="card.CardType === 'text-input'"
        :description="card.Description"
        :callback="inputCallback(card.id)"
        />
      <SelectCard 
        v-if="card.CardType === 'multiple-choice'"
        :description="card.Description"
        :choices="card.choices"
        :callback="inputCallback(card.id)"
        />
      <TextAreaCard 
        v-if="card.CardType === 'essay'"
        :description="card.Description"
        :callback="inputCallback(card.id)"
        />
    </div>
    <q-btn push color="primary" label="Submit" size='lg' class='q-mt-md' />
  </q-page>
</template>

<script>
import TextInputCard from './Cards/TextInputCard';
import TextAreaCard from './Cards/TextAreaCard';
import SelectCard from './Cards/SelectCard';

import { mapGetters, mapActions } from 'vuex';

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
  methods: {
    ...mapActions(['recordAnswer']),
    inputCallback: (questionID) => (ans) => {
      this.recordAnswer(questionID, ans);
    }
  }
}
</script>

<style>
</style>