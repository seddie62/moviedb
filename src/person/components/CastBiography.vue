<template>
    <a-spin :spinning="loading">
        <div class="cast-biography">
            <h4 class="my-2">{{person.name}}</h4>
            <h5>biography</h5>
            <p>{{person.biography}}</p>
        </div>
    </a-spin>
</template>

<script>
import { mapGetters } from 'vuex'
import { LOADING } from '../../utils/constants'
export default {
  name: 'CastBiography',
  computed: {
    ...mapGetters(['person', 'personState']),
    loading () {
      return this.personState === LOADING
    }
  }
}
</script>

<style lang="scss" scoped>
.cast-biography{
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
</style>
