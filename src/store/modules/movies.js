import { MOVIES_FETCH, MOVIES_STATE, SET_MOVIES_META, SET_MOVIES_FILTERS, GET_MOVIE, MOVIE_STATE,
  GET_MOVIE_REVIEWS, GET_MOVIE_REVIEWS_STATE, GET_MOVIE_CAST, GET_MOVIE_CAST_STATE, GET_CURRENT_CAST, GET_CURRENT_CAST_STATE } from './store_constants'
import { apiCall } from '../../utils/apiCall'

// state
const state = {
  movies: {
    data: [],
    state: 'NO_DATA',
    filters: {},
    meta: {},
    count: 0
  },
  currentMovie: {
    data: {},
    reviews: [],
    cast: [],
    state: 'NO_DATA',
    reviewsState: 'NO_DATA',
    castState: 'NO_DATA'
  },
  currentCast: {
    data: {},
    state: 'NO_DATA'
  }
}

// getters
const getters = {
  // all movies
  movies: state => state.movies.data,
  moviesState: state => state.movies.state,
  moviesCount: state => state.movies.count,
  moviesMeta: state => state.movies.meta,

  //   current movie
  movie: state => state.currentMovie.data,
  //   current movie review
  movieReviews: state => state.currentMovie.reviews,
  //   current movie cast
  movieCast: state => state.currentMovie.cast,
  movieState: state => state.currentMovie.state,
  movieReviewsState: state => state.currentMovie.reviewsState,
  movieCastState: state => state.currentMovie.castState,

  //   current cast
  currentCast: state => state.currentCast.data,
  currentCastState: state => state.currentCast.state
}

// mutations
const mutations = {
  // set all movies
  [MOVIES_FETCH] (state, payload) {
    state.movies.data = payload.results
    state.movies.count = payload.total_results
  },
  [MOVIES_STATE] (state, payload) {
    state.movies.state = payload
  },

  //   set current movie
  [GET_MOVIE] (state, payload) {
    state.currentMovie.data = payload
  },
  [MOVIE_STATE] (state, payload) {
    state.currentMovie.state = payload
  },

  // set current movie reviews
  [GET_MOVIE_REVIEWS] (state, payload) {
    state.currentMovie.reviews = payload
  },
  [GET_MOVIE_REVIEWS_STATE] (state, payload) {
    state.currentMovie.reviewsState = payload
  },

  //   cast
  [GET_MOVIE_CAST] (state, payload) {
    state.currentMovie.cast = payload
  },
  [GET_MOVIE_CAST_STATE] (state, payload) {
    state.currentMovie.castState = payload
  },

  //   set movies filters
  [SET_MOVIES_FILTERS] (state, payload) {
    state.movies.filters = payload
  },
  //   set movies meta data
  [SET_MOVIES_META] (state, payload) {
    state.movies.meta = {
      page: payload.page,
      total_pages: payload.total_pages,
      total_results: payload.total_results
    }
  },

  //   set current cast
  [GET_CURRENT_CAST] (state, payload) {
    state.currentCast.data = payload
  },
  [GET_CURRENT_CAST_STATE] (state, payload) {
    state.currentCast.state = payload
  }
}

// actions
const actions = {
  // fetch all movies
  [MOVIES_FETCH] ({ commit }, { cache = true, page = 1 } = {}) {
    commit(MOVIES_STATE, 'LOADING')
    // configuration
    if (cache && state.movies.data.length !== 0) {
      commit(MOVIES_STATE, 'DATA')
    } else {
      return new Promise((resolve, reject) => {
        apiCall({
          url: `discover/movie?api_key=24b0bd8ee93b847008cd2091a7e2704a&page=${page}`,
          method: 'GET'
        }).then((response) => {
          commit(MOVIES_STATE, 'DATA')
          console.log('response', response)
          commit(MOVIES_FETCH, response.data)
          commit(SET_MOVIES_META, response.data)
          resolve(response)
        }).catch((error) => {
          commit(MOVIES_STATE, 'ERROR')
          console.log(error)
          reject(error)
        })
      })
    }
  },

  //   get single movie
  [GET_MOVIE] ({ commit }, id) {
    commit(MOVIE_STATE, 'LOADING')
    return new Promise((resolve, reject) => {
      apiCall({
        url: `movie/${id}?api_key=24b0bd8ee93b847008cd2091a7e2704a`,
        method: 'GET'
      }).then((response) => {
        commit(MOVIE_STATE, 'DATA')
        console.log('single movie', response)
        commit(GET_MOVIE, response.data)
        resolve(response)
      }).catch((error) => {
        commit(MOVIE_STATE, 'ERROR')
        reject(error)
      })
    })
  },

  //   get single movie review
  [GET_MOVIE_REVIEWS] ({ commit }, id) {
    commit(GET_MOVIE_REVIEWS_STATE, 'LOADING')
    return new Promise((resolve, reject) => {
      apiCall({
        url: `/movie/${id}/reviews?api_key=24b0bd8ee93b847008cd2091a7e2704a`,
        method: 'GET'
      }).then((response) => {
        commit(GET_MOVIE_REVIEWS_STATE, 'DATA')
        commit(GET_MOVIE_REVIEWS, response.data.results)
        resolve(response)
      }).catch((error) => {
        commit(GET_MOVIE_REVIEWS_STATE, 'ERROR')
        reject(error)
      })
    })
  },

  //   get single movie cast
  [GET_MOVIE_CAST] ({ commit }, id) {
    commit(GET_MOVIE_CAST_STATE, 'LOADING')
    return new Promise((resolve, reject) => {
      apiCall({
        url: `/movie/${id}/credits?api_key=24b0bd8ee93b847008cd2091a7e2704a`,
        method: 'GET'
      }).then((response) => {
        commit(GET_MOVIE_CAST_STATE, 'DATA')
        commit(GET_MOVIE_CAST, response.data.cast)
        resolve(response)
      }).catch((error) => {
        commit(GET_MOVIE_CAST_STATE, 'ERROR')
        reject(error)
      })
    })
  },

  //   get single movie cast
  [GET_CURRENT_CAST] ({ commit }, id) {
    commit(GET_CURRENT_CAST_STATE, 'LOADING')
    return new Promise((resolve, reject) => {
      apiCall({
        url: `/movie/${id}/credits?api_key=24b0bd8ee93b847008cd2091a7e2704a`,
        method: 'GET'
      }).then((response) => {
        commit(GET_CURRENT_CAST_STATE, 'DATA')
        commit(GET_CURRENT_CAST, response.data)
        resolve(response)
      }).catch((error) => {
        commit(GET_CURRENT_CAST_STATE, 'ERROR')
        reject(error)
      })
    })
  },

  [SET_MOVIES_FILTERS] ({ commit, dispatch }, filters) {
    commit(SET_MOVIES_FILTERS, filters)
    dispatch(MOVIES_FETCH, { page: filters.page })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
