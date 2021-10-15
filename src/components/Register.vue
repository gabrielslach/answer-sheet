<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-ma-md" >
      <q-stepper v-model="step" ref="stepper" flat bordered animated vertical class="q-my-lg root" >
        <q-step :name="1" title="Create Account" icon="settings" :done="step > 1" >
          <q-input
            filled
            v-model="email"
            label="Email *"
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
          
          <q-stepper-navigation>
            <q-btn v-if="step < 3" @click="$refs.stepper.next()" color="primary" label="Continue" />
          </q-stepper-navigation>

        </q-step>

        <q-step :name="2" title="Personal Information" icon="person_outlined" :done="step > 2" >
          <q-input
            filled
            v-model="name"
            label="Name *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'This field is required.']"
          />

          <q-stepper-navigation>
            <q-btn v-if="step < 3" @click="$refs.stepper.next()" color="primary" label="Continue" />
            <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
          </q-stepper-navigation>

        </q-step>

        <q-step :name="3" title="Additional Information" caption="Optional" icon="create_new_folder" :done="step > 3" >
          <q-select
            filled 
            v-model="teacher" 
            :options="teachers" 
            label='Teacher' 
            clearable
            />
          <q-select 
            filled 
            v-model="section" 
            :options="sections" 
            label='Section' 
            clearable />

          <q-stepper-navigation>
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
  </q-form>
</template>

<script>
import { ref } from 'vue';
//import {useRouter} from 'vue-router';
import {useStore} from 'vuex';

export default {
  setup () {
    const store = useStore();
    
    //const router = useRouter();
    
    const email = ref(null);
    const password = ref(null);
    const name = ref(null);
    const teacher = ref(null);
    const section = ref(null);
    const teachers = ref([]);
    const sections = ref([]);

    const step = ref(1);

    return {
      email,
      password,
      name,
      teacher,
      section,
      teachers,
      sections,
      step,

      onSubmit () {
        store.dispatch('addUserToAuth',{
          email: email.value, 
          password: password.value
          });
      },

      onReset () {
        email.value = null
        password.value = null
        name.value = null
        teacher.value = null
        section.value = null
      }
    }
  }
}
</script>

<style>
  .root {
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
</style>