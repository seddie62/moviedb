<template>
    <div id="movie-detail" class="bg-gray p-24">
        <a-spin :spinning="loading">
            <a-card class="rounded" :bordered="false">
                <!-- card images -->
                <img slot="cover" class="img-card rounded" :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`" alt="">
                <div>
                    <a-menu v-model="current" mode="horizontal">
                        <a-menu-item key="details">Details</a-menu-item>
                        <a-menu-item key="reviews">Reviews</a-menu-item>
                        <a-menu-item key="cast">Cast</a-menu-item>
                    </a-menu>
                </div>
            </a-card>
            <div class="mt-3">
                <a-row>
                    <a-col :span="6">
                        <movie-genres :genres="genres"></movie-genres>
                    </a-col>
                    <a-col :span="17" :offset="1">
                        <movie-overview :overview="overview" v-if="isDetail"></movie-overview>
                        <movie-reviews v-if="isReview"></movie-reviews>
                        <movie-cast v-if="isCast"></movie-cast>
                    </a-col>
                </a-row>
            </div>
        </a-spin>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MovieGenres from '../components/MovieGenres'
import MovieOverview from '../components/MovieOverview'
import MovieCast from '../components/MovieCast'
import MovieReviews from '../components/MovieReviews'

export default {
  name: 'MovieDetail',
  components: {
    MovieReviews,
    MovieOverview,
    MovieGenres,
    MovieCast
  },
  data () {
    return {
      current: ['details']
    }
  },
  created () {
    this.$store.dispatch('getMovie', this.$route.params.id)
    this.$store.dispatch('getMovieReviews', this.$route.params.id)
    this.$store.dispatch('getMovieCast', this.$route.params.id)
  },
  computed: {
    ...mapGetters(['movie', 'movieState']),
    loading () {
      return this.movieState === 'LOADING'
    },
    genres () {
      return this.movie ? this.movie.genres : []
    },
    overview () {
      return this.movie ? this.movie.overview : []
    },
    // if menu is detail
    isDetail () {
      return this.current[0] === 'details'
    },
    // if menu is cast
    isCast () {
      return this.current[0] === 'cast'
    },
    // if menu is review
    isReview () {
      return this.current[0] === 'reviews'
    }
  }
}
</script>

<style lang="scss" scoped>
.img-card{
    height: 400px;
}
#movie-detail{
    margin-bottom: 12px;
    overflow-y: scroll;
    height: calc(100vh - (70px));
}
</style>
