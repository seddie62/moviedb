<template>
    <a-card title="genres" :bordered="false" class="rounded h-200 movie-detail-genre">
        <div class="flex flex-wrap">
            <a-tag v-for="genre in genres" :key="genre.id" color="#fcbc0d">{{genre.name}}</a-tag>
        </div>
    </a-card>
</template>

<script>
export default {
  name: 'MovieGenres',
  props: ['genres']
}
</script>
