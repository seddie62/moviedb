<template>
    <a-card title="overview" :bordered="false" class="rounded h-200 movie-detail-genre">
        <div>
            <p>{{overview}}</p>
        </div>
    </a-card>
</template>

<script>
export default {
  name: 'MovieOverview',
  props: ['overview']
}
</script>

<style lang="scss" scoped>

</style>
