<template>
  <q-page class="column items-stretch" padding>
      <create-sheet-card/>
      <sheet-details-card v-for="i in [0,1,2,3,4,5,6,7]" :key="i" />
  </q-page>
</template>

<script>
import CreateSheetCard from './TeacherDashboard/CreateSheetCard.vue'
import SheetDetailsCard from './TeacherDashboard/SheetDetailsCard.vue'
export default {
  components: { CreateSheetCard, SheetDetailsCard },

}
</script>

<style>

</style>