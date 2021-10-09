<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal elevated>
        <q-toolbar>
          <q-btn flat round dense icon="menu" class="q-mr-sm" />
          <q-toolbar-title>{{ this.$store.state.appTitle }}</q-toolbar-title>

          <ExcelUploader/>
        </q-toolbar>
      </q-header>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import ExcelUploader from './components/ExcelUploader.vue';

export default {
  name: 'LayoutDefault',

  components: {
    ExcelUploader
  },
}
</script>
