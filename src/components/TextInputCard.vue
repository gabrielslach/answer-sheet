<template>
  <q-page class="flex flex-center">
    <q-card flat bordered horizontal class="basic-card" >
      <q-card-section class='q-pt-xs' >
        <div class="text-subtitle2 description">{{ description }}</div>
        <q-input standout="bg-teal text-white" v-model="text" placeholder='Answer' />
        <q-select standout="bg-teal text-white" v-model="model" :options="options" label='Answer' />
        <q-input standout="bg-teal text-white" v-model="text" type='textarea' placeholder='Answer' />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style>
  .basic-card {
    width: 50%;
    padding: 0.5em;
  }
  .description {
    margin-bottom: 1em;
  }
</style>

<script>
import {ref} from 'vue';

export default {
  name: 'TextInputCard',
  data() {
    return {
      description: ''
    };
  },
  created() {
    this.description = '1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
  },
  setup() {
    return {
      model: ref(null),
      options: [
        'A.', 'B.', 'C.'
      ]
    }
  }
}
</script>
