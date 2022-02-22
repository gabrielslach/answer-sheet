<template>
  <q-page class="column items-stretch" padding>
    <excel-uploader />
    <div v-for="card in cardDeck" :key="card">
      <TextInputCard 
        v-if="card.CardType === 'text-input'"
        :description="card.Description"
        :callback="inputCallback(card.id)"
        />
      <SelectCard 
        v-if="card.CardType === 'multiple-choice'"
        :description="card.Description"
        :choices="card.Choices"
        :callback="inputCallback(card.id)"
        />
      <TextAreaCard 
        v-if="card.CardType === 'essay'"
        :description="card.Description"
        :callback="inputCallback(card.id)"
        />
    </div>
    <q-btn v-if="cardDeck.length > 0" push color="primary" label="Save" icon="save" size='lg' class='q-mt-md' @click="uploadSheet" />
  </q-page>
</template>

<script>
import TextInputCard from './Cards/TextInputCard';
import TextAreaCard from './Cards/TextAreaCard';
import SelectCard from './Cards/SelectCard';
import ExcelUploader from './ExcelUploader.vue';

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'NewCardDeck',
  components: {
    TextInputCard,
    TextAreaCard,
    SelectCard,
    ExcelUploader
  },
  computed: {
    ...mapGetters(['cardDeck'])
  },
  methods: {
    ...mapActions(['upsertAnswer', 'fetchCards', 'editActivity']),
    inputCallback (questionID) {
      const that = this;
      return function (answer) {
        that.upsertAnswer({questionID, answer});
      }
    },
    uploadSheet () {
      const {activityID} = this.$route.params;
      this.editActivity(activityID);
    }
  },
  mounted() {
    const {activityID, mode} = this.$route.params;
    if (mode === 'new') return;

    this.fetchCards(activityID);
  },
}
</script>

<style>
</style>