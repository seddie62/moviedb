<template>
    <div id="cast-detail" class="bg-gray p-24">
        <a-spin :spinning="loading">
            <a-row>
                <a-col :span="6">
                    <a-card class="rounded" :bordered="false">
                        <!-- person image -->
                        <img slot="cover" class="img-card rounded" :src="`https://image.tmdb.org/t/p/w500${person.profile_path}`" alt="">
                    </a-card>
                </a-col>
                <a-col :span="17" :offset="1">
                    <a-card class="rounded img-card card-12" :bordered="false">
                        <a-tabs id="orange-tab">
                            <a-tab-pane tab="Personal Info" key="1">
                                <personal-info></personal-info>
                            </a-tab-pane>
                            <a-tab-pane tab="Biography" key="2">
                                <cast-biography></cast-biography>
                            </a-tab-pane>
                            <a-tab-pane tab="Movies" key="3">
                                <cast-movies :data="personMovies" :loading="moviesLoading" type="movie"></cast-movies>
                            </a-tab-pane>
                            <a-tab-pane tab="TV" key="4">
                                <cast-movies :data="personTV" :loading="tvLoading" type="tv"></cast-movies>
                            </a-tab-pane>
                        </a-tabs>
                    </a-card>
                </a-col>
            </a-row>
        </a-spin>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CastBiography from '../components/CastBiography'
import PersonalInfo from '../components/PersonalInfo'
import CastMovies from '../components/CastMovies'
import { GET_CURRENT_CAST, GET_CURRENT_CAST_MOVIES, GET_CURRENT_CAST_TV } from '../../store/modules/store_constants.js'

export default {
  name: 'MovieDetail',
  components: {
    PersonalInfo,
    CastMovies,
    CastBiography
  },
  created () {
    this.init(this.$route.params.id)
  },
  methods: {
    // all functions and APIs to be called on init
    init (id) {
      this.$store.dispatch(GET_CURRENT_CAST, id)
      this.$store.dispatch(GET_CURRENT_CAST_MOVIES, id)
      this.$store.dispatch(GET_CURRENT_CAST_TV, id)
    }
  },
  computed: {
    ...mapGetters(['person', 'personState', 'personTV', 'personMovies', 'personTVState', 'personMoviesState']),
    loading () {
      return this.personState === 'LOADING'
    },
    moviesLoading () {
      return this.personTVState === 'LOADING'
    },
    tvLoading () {
      return this.personMoviesState === 'LOADING'
    }
  }
}
</script>

<style lang="scss" scoped>
.img-card{
    min-height: 400px;
}
#cast-detail{
    margin-bottom: 12px;
    overflow-y: scroll;
    height: calc(100vh - (70px));
}
</style>
