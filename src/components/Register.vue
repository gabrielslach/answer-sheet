<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-ma-md" >
      <q-stepper v-model="step" ref="stepper" header-nav flat bordered animated vertical class="q-my-lg root" >
        <q-step :name="1" title="Personal Information" icon="person_outlined" :done="!!name" >
          <q-input
            filled
            v-model="name"
            label="Name *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'This field is required.']"
          />

          <q-stepper-navigation>
            <q-btn @click="$refs.stepper.next()" color="primary" label="Continue" :disabled="!name" />
          </q-stepper-navigation>

        </q-step>

        <q-step :name="2" title="Additional Information" caption="Optional" icon="create_new_folder" :done="step > 2" >
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
            <q-btn label="Register" type="submit" color="primary" :disabled="!name"/>
            <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
  </q-form>
</template>

<script>
import { ref, watch, computed } from 'vue';
import {useStore} from 'vuex';

export default {
  setup () {
    const store = useStore();
    
    const name = ref(null);
    const teacher = ref(null);
    const section = ref(null);

    const step = ref(1);

    store.dispatch('fetchTeachers');

    const teachers = computed(
      ()=>store.getters.getTeachers
    );

    const sections = computed(
      ()=>store.getters.getSections
    );

    watch(teacher, (val) => {
      store.dispatch('fetchSections', val.value);
      section.value = null;
    })

    return {
      name,
      teacher,
      section,
      teachers,
      sections,
      step,

      onSubmit () {
        const teacherVal = teacher.value || {};
        const sectionVal = section.value || {};
        store.dispatch('addUserToDB',{
          name: name.value, 
          teacher: teacherVal.value, 
          section: sectionVal.value
          });
      },

      onReset () {
        name.value = null
        teacher.value = null
        section.value = null
      },
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