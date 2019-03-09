<template>
    <a-spin :spinning="loading">
        <a-card title="Reviews" :bordered="false" class="rounded movie-detail-genre">
            <div>
                <a-comment v-for="(review, index) in movieReviews" :key="index">
                    <a slot="author">{{review.author}}</a>
                    <a-avatar :src="review.url" alt="Han Solo" slot="avatar"/>
                    <p slot="content">{{review.content}}</p>
                </a-comment>
            </div>
        </a-card>
    </a-spin>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MovieReviews',
  data () {
    return {
      likes: '2',
      dislikes: '2'
    }
  },
  computed: {
    ...mapGetters(['movieReviews', 'movieReviewsState']),
    loading () {
      return this.movieReviewsState === 'LOADING'
    }
  }
}
</script>

<style lang="scss" scoped>
.movie-detail-genre{
    height: auto;
}
$font-size: 12px;
$line-height: 1.4;
$lines-to-show: 5;

.overview {
//   display: block; /* Fallback for non-webkit */
//   display: -webkit-box;
//   max-width: 400px;
//   height: $font-size*$line-height*$lines-to-show; /* Fallback for non-webkit */
//   margin: 0 auto;
// //   font-size: $font-size;
//   line-height: $line-height;
//   -webkit-line-clamp: $lines-to-show;
//   -webkit-box-orient: vertical;
//   overflow: hidden;
//   text-overflow: ellipsis;
white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
