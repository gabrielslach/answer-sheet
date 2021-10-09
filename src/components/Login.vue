<template>
  <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
    <q-card flat bordered class="q-ma-lg">
      <q-card-section>
        <q-input
          filled
          v-model="username"
          label="Username *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'This field is required.']"
        />

        <q-input
          filled
          type="password"
          v-model="password"
          label="Password *"
          lazy-rules
          :rules="[
            val => val !== null && val !== '' || 'This field is required.'
          ]"
        />
      </q-card-section>
        <q-card-actions>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          <q-btn label="Submit" type="submit" color="primary"/>
        </q-card-actions>
      </q-card>
    </q-form>
</template>

<script>
import { ref } from 'vue';
import {useRouter} from 'vue-router';
import {mapActions, useStore} from 'vuex';

export default {
  methods: {
    ...mapActions(['login'])
  },
  setup () {
    const store = useStore();
    
    const router = useRouter();
    
    const username = ref(null);
    const password = ref(null);

    return {
      username,
      password,

      onSubmit () {
        store.dispatch('login',{username: username.value, password: password.value})
        router.replace({path: '/'})
      },

      onReset () {
        username.value = null
        password.value = null
      }
    }
  }
}
</script>

<style>

</style>