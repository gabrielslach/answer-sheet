<template>
  <q-page class="column items-stretch" padding>
      <sheet-details-card 
        v-for="a in activities" 
        :key="a.activityID"
        :teacherName="a.teacherName"
        :sectionName="a.sectionName" 
        :activityName="a.activityName"
        :noOfSubmission="a.submissions.length"
        />
  </q-page>
</template>

<script>
import SheetDetailsCard from './StudentDashboard/SheetDetailsCard.vue';

import {computed} from 'vue';
import {useStore} from 'vuex';

export default {
  components: { SheetDetailsCard },
  setup() {
    const store = useStore();
    const userInfo = computed(()=>store.getters.getUser);

    store.dispatch('fetchActivitiesBySection', userInfo.value.sectionID);

    const activities = computed(
      ()=>store.getters.getSheets
      );

    return {
      activities,
      userInfo
    }
  }

}
</script>

<style>

</style>