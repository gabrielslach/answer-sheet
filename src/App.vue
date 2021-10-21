<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal elevated>
        <q-toolbar>
          <q-btn flat round dense icon="menu" class="q-mr-sm" />
          <q-toolbar-title>{{ this.$store.state.appTitle }}</q-toolbar-title>

          <ExcelUploader/>
          <q-btn v-if="authToken" outline flat stack style="color: white;" icon="logout" label='Logout' class="q-ml-lg" @click="handleLogout" />
        </q-toolbar>
      </q-header>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import ExcelUploader from './components/ExcelUploader.vue';
import {useStore} from 'vuex';
import { computed } from 'vue';

export default {
  name: 'LayoutDefault',

  components: {
    ExcelUploader
  },

  setup() {
    const store = useStore();

    const authToken = computed(()=> store.getters.getAuthToken);

    const handleLogout = () => {
      store.dispatch("logout")
      };

    return {
      handleLogout,
      authToken
    }
  }
}
</script>
