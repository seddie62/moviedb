<template>
    <a-spin :spinning="loading">
        <div class="cast-info">
            <div class="flex align-items-center my-2">
                <h5>name</h5>
                <h4 class="p-0 m-0">{{person.name}}</h4>
            </div>
            <div class="flex align-items-center my-2">
                <h5>known for</h5>
                <h4 class="p-0 m-0">{{person.known_for_department}}</h4>
            </div>
            <div class="flex align-items-center my-2">
                <h5>gender</h5>
                <h4 class="p-0 m-0">{{gender}}</h4>
            </div>
            <div class="flex align-items-center my-2">
                <h5>birthday</h5>
                <h4 class="p-0 m-0">{{person.birthday}}</h4>
            </div>
            <div class="flex align-items-center my-2">
                <h5>place of birth</h5>
                <h4 class="p-0 m-0">{{person.place_of_birth}}</h4>
            </div>
        </div>
    </a-spin>
</template>

<script>
import { mapGetters } from 'vuex'
import { LOADING } from '../../utils/constants'
export default {
  name: 'PersonalInfo',
  computed: {
    ...mapGetters(['person', 'personState']),
    loading () {
      return this.personState === LOADING
    },
    gender () {
      return this.person.gender === 1 ? 'Male' : 'Female'
    }
  }
}
</script>

<style lang="scss" scoped>
.cast-info{
  h5{
    font-size: 11px;
    text-transform: uppercase;
    color: #bababa;
    font-weight: bold;
    width: 30%;
  }
  p{
    font-size: 12px;
  }
}
</style>
