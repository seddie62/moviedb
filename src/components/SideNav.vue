<template>
    <div id="side-nav" class="side-nav">
        <p class="side-title">menu</p>
        <a-menu
            :defaultSelectedKeys="['']"
            @click="onClick"
            mode="inline">
            <a-menu-item key="">
                <a-icon type="global" />
                <span>Movies</span>
            </a-menu-item>
            <a-menu-item key="2">
                <a-icon type="desktop" />
                <span>TV</span>
            </a-menu-item>
        </a-menu>
    </div>
</template>

<script>
import EventBus from '../event-bus.js'
export default {
  name: 'SideNav',
  data () {
    return {
      defaultActive: ['']
    }
  },
  mounted () {
    EventBus.$on('updateSideBar', (data) => {
      this.defaultActive = data
    })
  },
  beforeDestroy () {
    EventBus.$off('updateSideBar')
  },
  methods: {
    onClick ({ item, key, keyPath }) {
      this.defaultActive = key
      this.$router.push(`/${key}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.side-nav{
    border-right: 1px solid #edeff4;
}
.side-title{
    font-size: 12px;
    text-transform: uppercase;
    color: #c0c7d0;
    padding: 24px;
    padding-bottom: 0;
}

#side-nav{
    .ant-menu-item-selected {
        background: transparent;
        border-left: 3px solid #fcbc0d;
        color: #fcbc0d;
        background-image: linear-gradient(to right, rgba(252, 188, 13, 0.2) , #ffffff, #ffffff, #ffffff, #ffffff, #ffffff, #ffffff, #ffffff,  #ffffff,  #ffffff, #ffffff, #ffffff);

        &::after{
            // opacity: 0;
            border-right: 1px solid #edeff4
        }
    }

    .ant-menu{
        border: 0;
    }

    .ant-menu-item-active{
        color: #fcbc0d;
    }
}
</style>
