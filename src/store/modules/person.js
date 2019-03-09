import { GET_CURRENT_CAST, GET_CURRENT_CAST_STATE, GET_CURRENT_CAST_MOVIES, GET_CURRENT_CAST_MOVIES_STATE,
  GET_CURRENT_CAST_TV, GET_CURRENT_CAST_TV_STATE, GET_PERSON_URI } from './store_constants'
import { apiCall } from '../../utils/apiCall'

// state
const state = {
  person: {
    data: {},
    state: 'NO_DATA',
    movies: [],
    tv: [],
    moviesState: 'NO_DATA',
    tvState: 'NO_DATA'
  }
}

// getters
const getters = {
  //   current cast
  person: state => state.person.data,
  personState: state => state.person.state,
  //   current cast movies and tv
  personMovies: state => state.person.movies,
  personTV: state => state.person.tv,
  personMoviesState: state => state.person.moviesState,
  personTVState: state => state.person.tvState
}

// mutations
const mutations = {
  //   set current cast
  [GET_CURRENT_CAST] (state, payload) {
    state.person.data = payload
  },
  [GET_CURRENT_CAST_STATE] (state, payload) {
    state.person.state = payload
  },
  //   set current cast movies
  [GET_CURRENT_CAST_MOVIES] (state, payload) {
    state.person.movies = payload.cast
    state.person.tv = payload.tv
  },
  [GET_CURRENT_CAST_MOVIES_STATE] (state, payload) {
    state.person.moviesState = payload
  },
  //   set current cast movies
  [GET_CURRENT_CAST_TV] (state, payload) {
    state.person.tv = payload.cast
  },
  [GET_CURRENT_CAST_TV_STATE] (state, payload) {
    state.person.tvState = payload
  }
}

// actions
const actions = {
  //   get single movie cast
  [GET_CURRENT_CAST] ({ commit }, personId) {
    commit(GET_CURRENT_CAST_STATE, 'LOADING')
    return new Promise((resolve, reject) => {
      apiCall({
        url: `${GET_PERSON_URI}${personId}?api_key=24b0bd8ee93b847008cd2091a7e2704a`,
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
  //   get single movie cast movies
  [GET_CURRENT_CAST_MOVIES] ({ commit }, personId) {
    commit(GET_CURRENT_CAST_MOVIES_STATE, 'LOADING')
    return new Promise((resolve, reject) => {
      apiCall({
        url: `${GET_PERSON_URI}${personId}/movie_credits?api_key=24b0bd8ee93b847008cd2091a7e2704a`,
        method: 'GET'
      }).then((response) => {
        commit(GET_CURRENT_CAST_MOVIES_STATE, 'DATA')
        commit(GET_CURRENT_CAST_MOVIES, response.data)
        resolve(response)
      }).catch((error) => {
        commit(GET_CURRENT_CAST_MOVIES_STATE, 'ERROR')
        reject(error)
      })
    })
  },
  //   get single movie cast tv shows
  [GET_CURRENT_CAST_TV] ({ commit }, personId) {
    commit(GET_CURRENT_CAST_TV_STATE, 'LOADING')
    return new Promise((resolve, reject) => {
      apiCall({
        url: `${GET_PERSON_URI}${personId}/tv_credits?api_key=24b0bd8ee93b847008cd2091a7e2704a`,
        method: 'GET'
      }).then((response) => {
        commit(GET_CURRENT_CAST_TV_STATE, 'DATA')
        commit(GET_CURRENT_CAST_TV, response.data)
        resolve(response)
      }).catch((error) => {
        commit(GET_CURRENT_CAST_TV_STATE, 'ERROR')
        reject(error)
      })
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
