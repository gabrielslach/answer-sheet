<template>
  <q-page class="column items-stretch" padding>
      <create-sheet-card/>
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
import CreateSheetCard from './TeacherDashboard/CreateSheetCard.vue';
import SheetDetailsCard from './TeacherDashboard/SheetDetailsCard.vue';

import {useStore} from 'vuex';
import { computed } from '@vue/runtime-core';

export default {
  components: { CreateSheetCard, SheetDetailsCard },
  setup() {
    const store = useStore();
    
    const userInfo = computed(()=>store.getters.getUser);

    store.dispatch('fetchActivitiesByTeacher', userInfo.value.teacherID);
    
    const activities = computed(
      ()=>store.getters.getSheets
      );

    return {
      activities
    }
  }

}
</script>

<style>

</style>