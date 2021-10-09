export default {
  data() {
    return {
      inputValue: ''
    }
  },
  watch: {
    inputValue (val) {
      console.log('val', val)
    }
  }
}