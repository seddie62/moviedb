<template>
    <div id="movie-comp">
        <a-card class="movie-card" :bordered="false">
            <!-- card images -->
            <img slot="cover" class="img-card" :src="`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`" alt="">
            <div class="movie-card-content">
                <!-- movie card content -->
                <!-- middle content -->
                <div>
                    <p class="movie-title">{{movie.title}}</p>
                    <div class="flex align-items-center">
                        <a-icon class="mr-2 gray" type="calendar"></a-icon>
                        <p class="movie-subtitle gray-text m-0 p-0">{{movie.release_date}}</p>
                    </div>
                </div>
                <!-- middle content -->
                <div class="flex sub-content mt-3">
                    <!-- overview div -->
                    <div class="half-and-half">
                        <a-divider orientation="left">overview</a-divider>
                        <p class="overview">{{movie.overview}}</p>
                    </div>
                    <a-divider class="the-middle-divider" type="vertical"></a-divider>
                    <!-- genres div -->
                    <div class="half-and-half">
                        <a-divider orientation="right">genres</a-divider>
                        <div class="flex genres justify-content-end">
                            <ul>
                                <li v-for="(item, index) in movieGenres" :key="index">
                                    {{item.name || '-'}}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- footer content -->
                <div class="flex align-items-center  justify-content-between mt-2">
                    <div class="flex align-items-center">
                        <a-rate allowHalf :value="rate" disabled />
                        <p class="p-0 m-0 f-12">{{movie.vote_count}} votes</p>
                    </div>
                    <div>
                        <a-button @click="goToDetail" class="transparent-button" type="default">
                            MORE<a-icon type="double-right" />
                        </a-button>
                    </div>
                </div>
            </div>
        </a-card>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Movie',
  props: ['movie'],
  methods: {
    goToDetail () {
      this.$router.push(`/movie/${this.movie.id}`)
    }
  },
  computed: {
    ...mapGetters(['genres']),
    // movie genres
    movieGenres () {
      var newMovieGenres = []

      this.movie.genre_ids.forEach(element => {
        var g = this.genres.find(genre => genre.id === element)
        newMovieGenres.push(g)
      })

      return newMovieGenres
    },
    // movie rating
    rate () {
      return this.movie.vote_average / 2
    }
  }
}
</script>

<style lang="scss" scoped>
#movie-comp{
    width: 49%;
    margin: 1% 0;

    .movie-title{
        padding: 0;
        margin: 0;
        font-weight: bold;
    }

    .movie-subtitle{
        font-weight: 500;
        color: #bababa;
    }

    .the-middle-divider{
        height: 100%;
    }
}
.half-and-half{
    width: 50%;
    font-size: 12px;
    border-bottom: 1px solid #e8e8e8;
}
.sub-content{
    height: 210px;
}
.gray{
    color: #bababa;
}

.genres{
    right {
        padding-top: 8px;
        float: right;
        text-align: right;
    }
    right ul{
        margin:0;
        padding:0;
    }
    right a{
        display:block;
        color: black;
        text-decoration: none;
    }
    ul {
        direction:rtl;
        // list-style-image: url(http://australianetwork.com/img/icon_arrow_left_black.png);
    }
}
</style>
