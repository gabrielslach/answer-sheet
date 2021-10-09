<template>
    <q-card flat bordered horizontal class="basic-card q-my-sm" >
      <q-card-section class='q-pt-xs' >
        <div class="text-subtitle2 description">{{ description }}</div>
        <q-input standout="bg-teal text-white" v-model.lazy="inputValue" type='textarea' placeholder='Answer' />
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

export default {
  name: 'TextAreaCard',
  props: {
    description: {
      type: String,
      default: ''
    },
    callback: {
      type: Function,
      default: () => {}
    }
  },

  data() {
    return {
      inputValue: ''
    }
  },
  
  watch: {
    inputValue (val) {
      this.callback(val);
    }
  }
}
</script>
