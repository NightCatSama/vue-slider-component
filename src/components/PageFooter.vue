<template>
  <div class="page-footer">
    <div v-if="prevPage" class="page-link page-link--prev">
      ← <router-link :to="prevPage.path">{{ prevPage && prevPage.meta.title }}</router-link>
    </div>
    <div v-if="nextPage" class="page-link page-link--next">
      <router-link :to="nextPage.path">{{ nextPage && nextPage.meta.title }}</router-link> →
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class PageFooter extends Vue {
  get prevPage() {
    return this.$route.meta.prev
  }
  get nextPage() {
    return this.$route.meta.next
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/var';

  .page-footer {
    width: 100%;
    padding: 40px 0;
    margin-top: 50px;
    border-top: 1px solid #eee;

    .page-link {
      color: #666;
      display: flex;
      align-items: center;
      font-size: 14px;
      a {
        font-size: 16px;
        color: $main;
        margin: 0 10px;
      }
      &--prev { float: left; }
      &--next { float: right; }
    }
  }
</style>
