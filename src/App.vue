<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal elevated>
        <q-toolbar>
          <q-btn flat round dense icon="menu" class="q-mr-sm" />
          <q-toolbar-title>Answer Sheet</q-toolbar-title>

          <ExcelUploader/>
        </q-toolbar>
      </q-header>
    <q-page-container>
      <CardDeck />
    </q-page-container>
  </q-layout>
</template>

<script>
import CardDeck from './components/CardDeck.vue';
import ExcelUploader from './components/ExcelUploader.vue';


export default {
  name: 'LayoutDefault',

  components: {
    CardDeck,
    ExcelUploader
  },
}
</script>
