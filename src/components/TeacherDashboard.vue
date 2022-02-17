<template>
  <div class="row">
    <div class="col-2">
      <Menu/>
    </div>
    <div class="col-6">
      <q-page class="column items-stretch" padding>
          <create-sheet-card/>
          <sheet-details-card
            v-for="a in activities" 
            :key="a.activityID"
            :teacherName="a.teacherName"
            :sectionName="a.sectionName" 
            :activityName="a.activityName"
            :activityID="a.activityID"
            :noOfSubmission="a.submissions.length"
            />
      </q-page>
    </div>
  </div>
</template>

<script>
import CreateSheetCard from './TeacherDashboard/CreateSheetCard.vue';
import SheetDetailsCard from './TeacherDashboard/SheetDetailsCard.vue';

import {useStore} from 'vuex';
import { computed } from '@vue/runtime-core';
import Menu from './General/Menu.vue';

export default {
  components: { CreateSheetCard, SheetDetailsCard, Menu },
  setup() {
    const store = useStore();
    
    const userInfo = computed(()=>store.getters.getUser);

    store.dispatch('fetchActivitiesByTeacher', userInfo.value.uid);
    
    const activities = computed(
      ()=>store.getters.getSheets
      );

    return {
      activities,
    }
  }

}
</script>

<style>

</style>