<template>
  <q-page class="column items-stretch" padding>
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
    <q-btn push color="primary" label="Upload Sheet" size='lg' class='q-mt-md' @click="uploadSheet" />
  </q-page>
</template>

<script>
import TextInputCard from './Cards/TextInputCard';
import TextAreaCard from './Cards/TextAreaCard';
import SelectCard from './Cards/SelectCard';

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'NewCardDeck',
  components: {
    TextInputCard,
    TextAreaCard,
    SelectCard
  },
  computed: {
    ...mapGetters(['cardDeck'])
  },
  methods: {
    ...mapActions(['upsertAnswer', 'fetchCards', 'uploadCards', 'submitAnswers']),
    inputCallback (questionID) {
      const that = this;
      return function (answer) {
        that.upsertAnswer({questionID, answer});
      }
    },
    uploadSheet () {
      const {sectionName, activityName} = this.$route.params;
      this.uploadCards({teacherID: '001', sectionID: sectionName, activityID: activityName})
    }
  },
  mounted() {
    const {sectionName, activityName, mode} = this.$route.params;
    if (mode === 'new') return;
    this.fetchCards({teacherID: '001', sectionID: sectionName, activityID: activityName});
  },
}
</script>

<style>
</style>