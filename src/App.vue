<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal elevated>
        <q-toolbar>
          <q-btn flat round dense icon="menu" class="q-mr-sm" />
          <q-toolbar-title>{{ this.$store.state.appTitle }}</q-toolbar-title>

          <q-btn v-if="authToken" outline flat stack style="color: white;" icon="logout" label='Logout' class="q-ml-lg" @click="handleLogout" />
        </q-toolbar>
      </q-header>
    <q-page-container>
      <q-dialog v-model="isLoading" full-height full-width>
        <q-inner-loading :showing="true">
          <q-spinner size="100px" color="primary" :thickness="10" />
        </q-inner-loading>
      </q-dialog>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import {useStore} from 'vuex';
import { computed } from 'vue';

export default {
  name: 'LayoutDefault',

  setup() {
    const store = useStore();

    const authToken = computed(()=> store.getters.getAuthToken);
    const isLoading = computed(()=> store.getters.isLoadingStatus);

    const handleLogout = () => {
      store.dispatch("logout")
      };

    return {
      handleLogout,
      authToken,
      isLoading
    }
  }
}
</script>
