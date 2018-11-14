
const empty = [[0, 0, 0, 0], [0, 0, 0, 0]]

export default {
  props: ['data'],
  mounted() {
    this.build(this.data)
  },
  data() {
    return {
      block: empty
    }
  },
  watch: {
    $props: {
      deep: true,
      handler(nextProps) {
        this.build(nextProps.data)
      }
    }
  },
  methods: {
    build(type) {
      console.log(34, type)
      this.block = type
    }
  }
}
