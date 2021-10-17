<template>
  <q-page class="column items-stretch" padding>
      <create-sheet-card/>
      <sheet-details-card 
        v-for="sheet in sheets" 
        :key="sheet.sheetID" 
        :sectionName="sheet.sectionID" 
        :activityName="sheet.sheetID" 
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

    store.dispatch('fetchSheets', '001');

    const sheets = computed(
      ()=>store.getters.getSheets
      );

    return {
      sheets
    }
  }

}
</script>

<style>

</style>