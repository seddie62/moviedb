<template>
    <a-spin :spinning="loading">
        <div class="cast-movies">
            <div class="flex flex-wrap">
                <a-card id="cast-card" class="cast-card rounded" v-for="(cast, index) in data.slice(0, number)" :key="index" hoverable style="width: 140px">
                    <img alt="" :src="`https://image.tmdb.org/t/p/w200${cast.poster_path}`" slot="cover"/>
                    <a-card-meta>
                        <template slot="title"><p class="m-0 f-12">{{cast[title]}}</p></template>
                        <template slot="description"><p class="mb-1 f-12">{{cast.character}}</p></template>
                    </a-card-meta>
                </a-card>
                <div class="h-300 flex align-items-center">
                    <a-button :disabled="noMoreDataToShow" @click="loadMore" class="transparent-button" type="default">
                        MORE<a-icon type="double-right" />
                    </a-button>
                </div>
            </div>
        </div>
    </a-spin>
</template>

<script>
export default {
  name: 'CastMovies',
  props: ['data', 'loading', 'type'],
  data () {
    return {
      number: 5
    }
  },
  computed: {
    title () {
      return this.type === 'tv' ? 'original_name' : 'title'
    },
    noMoreDataToShow () {
      return this.number >= this.data.length
    }
  },
  methods: {
    // load more movies
    loadMore () {
      this.number += 5
    }
  }
}
</script>

<style lang="scss" scoped>
.cast-movies{
  h5{
    font-size: 11px;
    text-transform: uppercase;
    color: #bababa;
    font-weight: bold;
  }
  p{
    font-size: 12px;
  }
}
.cast-card{
  margin: 10px;
}
.h-300{
    height: 300px;
}
</style>
