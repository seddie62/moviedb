<template>
    <div class="full-height hidden">
        <the-header class="pre-height"></the-header>
        <a-row class="page-height">
            <a-col :span="5" class="h-100">
                <side-nav></side-nav>
            </a-col>
            <a-col :span="19" class="h-100 bg-gray">
                <router-view></router-view>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import SideNav from '../components/SideNav'
import Header from '../components/Header'

export default {
  name: 'HomePage',
  components: {
    'the-header': Header,
    SideNav
  },
  mounted () {
    this.$store.dispatch('getMovies')
    this.$store.dispatch('getGenres')
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
</style>
