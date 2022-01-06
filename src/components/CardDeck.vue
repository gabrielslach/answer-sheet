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
    <q-btn push color="primary" label="Submit" size='lg' class='q-mt-md' @click="handleSubmit" />
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
    handleSubmit () {
      const {teacherName, sectionName, activityName} = this.$route.params;
      this.submitAnswers({teacherID: teacherName, sectionID: sectionName, activityID: activityName});
    }
  },
  mounted() {
      const {teacherName, sectionName, activityName} = this.$route.params;
    this.fetchCards({teacherID: teacherName, sectionID: sectionName, activityID: activityName});
  },
}
</script>

<style>
</style>