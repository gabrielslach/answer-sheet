<template>
    <q-card flat bordered horizontal class="basic-card q-my-sm" >
      <q-card-section class='q-pt-xs' >
        <div class="text-subtitle2 description">{{ description }}</div>
        <q-select standout="bg-teal text-white" v-model="model" :options="choices" label='Answer' clearable />
      </q-card-section>
    </q-card>
</template>

<style>
  .basic-card {
    padding: 0.5em;
  }
  .description {
    margin-bottom: 1em;
  }
</style>

<script>
import {ref} from 'vue';

export default {
  name: 'SelectCard',
  props: {
    description: {
      type: String,
      default: ''
    },
    choices: {
      type: Array,
      default: ()=>[]
    }
  },
  
  setup() {
      return {
        model: ref(null)
        }
  }
}
</script>
