<template>
  <q-page class="column items-stretch" padding>
      <sheet-details-card 
        v-for="sheet in sheets" 
        :key="sheet.sheetID"
        :teacherName="userInfo.teacherID"
        :sectionName="sheet.sectionID" 
        :activityName="sheet.sheetID" 
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

    store.dispatch('fetchSheets', userInfo.value.teacherID);

    const sheets = computed(
      ()=>store.getters.getSheets
      );

    return {
      sheets,
      userInfo
    }
  }

}
</script>

<style>

</style>