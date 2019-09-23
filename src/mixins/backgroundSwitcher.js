export default {

  data: () => ({
    images: [],
    activeImg: null
  }),

  mounted() {
    // Form array with 8 images and choose one randomly
    for (let i = 1; i <= 8; i++) {
      this.images.push({src: `img${i}.jpg`});
    }
    this.activeImg = this.getRandImgSrc()
  },

  methods: {
    getRandImgSrc() {
      const randIndex = Math.floor(Math.random() * this.images.length)
      return require(`@/assets/img/${this.images[randIndex].src}`)
    }
  },

}