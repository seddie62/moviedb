<template>
    <div class="bg-gray h-100">
        <search-bar></search-bar>
        <a-spin :spinning="moviesLoading">
            <div class="movie-div">
                <movie-component :movie="movie" v-for="(movie, index) in movies" :key="index"></movie-component>
            </div>
        </a-spin>
        <div class="flex justify-content-end">
            <a-pagination @change="handlePageChange" simple :defaultCurrent="page" :total="count" />
        </div>
    </div>
</template>

<script>
import SearchBar from '../components/SearchBar'
import Movie from '../components/Movie'
import { mapGetters } from 'vuex'
export default {
  name: 'HomePage',
  components: {
    'movie-component': Movie,
    SearchBar
  },
  methods: {
    handlePageChange (page) {
      this.$store.dispatch('getMovies', { page: page, cache: false })
    }
  },
  computed: {
    ...mapGetters(['movies', 'moviesState', 'moviesMeta']),
    moviesLoading () {
      return this.moviesState === 'LOADING'
    },
    page () {
      return this.moviesMeta.page
    },
    count () {
      return this.moviesMeta.total_results
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-gray{
    padding: 24px;
}
.hidden{
    overflow: hidden;
}
.movie-div{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 24px;
    margin-bottom: 12px;
    overflow-y: scroll;
    height: calc(100vh - (200px));
}
</style>
