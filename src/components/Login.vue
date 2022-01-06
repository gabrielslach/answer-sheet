<template>
<div class='root'>
  <q-form
        @submit="onSubmit"
        @reset="onReset"
      >
    <q-card flat bordered class="q-ma-lg">
      <q-card-section>
        <q-input
          filled
          v-model="email"
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
        <q-card-actions class="q-pb-md q-px-md">
          <q-btn label="Submit" class="full-width" type="submit" color="primary"/>
        </q-card-actions>
      </q-card>
    </q-form>

    <div class="q-px-lg">
      <q-btn label="Register" color="primary" class="full-width" outline @click="register()" />
    </div>
</div>
</template>

<script>
import { ref } from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

export default {
  setup () {
    const store = useStore();
    const router = useRouter();
    
    const email = ref(null);
    const password = ref(null);

    return {
      email,
      password,

      onSubmit () {
        store.dispatch('login',{email: email.value, password: password.value})
      },

      register () {
        router.replace({
          name:'register'
        })
      }
    }
  }
}
</script>

<style>

.root {
  max-width: 500px;
}
</style>