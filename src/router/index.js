import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/movies/pages/HomePage'
import MovieDetail from '@/movies/pages/MovieDetail'
import CastDetail from '@/person/pages/CastDetail'
import Client from '@/pages/Client'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Client,
      children: [
        {
          path: '/',
          name: 'HomePage',
          component: HomePage
        },
        {
          path: '/movie/:id',
          name: 'MovieDetail',
          component: MovieDetail
        },
        {
          path: '/cast/:id',
          name: 'CastDetail',
          component: CastDetail
        }
      ]
    }
  ]
})
