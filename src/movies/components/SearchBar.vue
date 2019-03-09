<template>
    <div id="search">
        <a-card :bordered="false">
            <div class="flex justify-content-between w-100 align-items-center">
                <a-input placeholder="Search..." class="no-border-input" v-model="search">
                    <a-icon slot="prefix" type="search" />
                </a-input>
                <div class="flex align-items-center h-100">
                    <a-select
                        showSearch
                        :loading="genresLoading"
                        placeholder="Select a genre"
                        optionFilterProp="children"
                        style="width: 200px"
                        @focus="handleFocus"
                        @blur="handleBlur"
                        @change="handleChange"
                        :filterOption="filterOption">
                        <a-select-option :value="genre.id" v-for="(genre, index) in genres" :key="index">{{genre.name}}</a-select-option>
                    </a-select>
                    <a-divider class="h-100" type="vertical" />
                    <a-icon class="bar-icon" type="filter"></a-icon>
                </div>
            </div>
        </a-card>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SearchBar',
  data () {
    return {
      search: ''
    }
  },
  methods: {
    handleChange (value) {
      console.log(`selected ${value}`)
    },
    handleBlur () {
      console.log('blur')
    },
    handleFocus () {
      console.log('focus')
    },
    filterOption (input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  },
  computed: {
    ...mapGetters(['genres', 'genresState']),
    genresLoading () {
      return this.genresState === 'LOADING'
    }
  }
}
</script>

<style lang="scss" scoped>
#search{
    height: 60px;
    // -webkit-box-shadow: 0px 0px 18px 0px rgba(191,187,191,0.62);
    // -moz-box-shadow: 0px 0px 18px 0px rgba(191,187,191,0.62);
    // box-shadow: 0px 0px 18px 0px rgba(191,187,191,0.62);
    .ant-card{
        box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);
        box-shadow: 0 2px 20px 1px rgba(0, 0, 0, 0.06);
        border-radius: 4px;
        padding: 0px;
        height: 60px;
    }

    .bar-icon{
        font-size: 18px;
        margin-left: 16px;
        color: #b5bdc8;
    }
}
</style>
