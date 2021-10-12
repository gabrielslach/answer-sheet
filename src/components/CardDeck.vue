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
import gql from 'graphql-tag';

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
    ...mapActions(['upsertAnswer']),
    inputCallback (questionID) {
      const that = this;
      return function (answer) {
        that.upsertAnswer({questionID, answer});
      }
    }
  },
  mounted() {
    console.log('l55', this.$route.params);
  },
  apollo: {
    cardDeck: {
      query: gql`query cardDeckCall($sectionID: String!, $activityID: String!) {
        cardDeck: getCardDeck(sheetInfo: {
          teacherID:"001",
          sectionID: $sectionID,
          activityID: $activityID
        }) {
          CardType,
          Description,
          CorrectAnswer,
          Choices,
        }
      }`,
      variables() {
        const {
          sectionName,
          activityName
        } = this.$route.params;
        return {
          sectionID: sectionName,
          activityID: activityName
        }
      }
    }
  },
  data() {
    return {
      cardDeck: []
    }
  }
}
</script>

<style>
</style>