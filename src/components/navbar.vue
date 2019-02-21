<template>
  <div :class="['navbar', { hide }]">
    <div class="hide-btn" @click="hide = true"></div>
    <div class="switch-btn" @click="hide = !hide"></div>
    <div class="site-info">
      <div class="name">{{ name }}</div>
      <div class="version">v{{ version }}</div>
    </div>
    <div class="nav-content">
      <div
        v-for="(list, title) in navObj"
        :key="title"
        class="nav-group"
      >
        <div class="nav-title">{{ title }}</div>
        <div
          v-for="(item, index) in list"
          :key="index"
          class="nav-item"
          @click="$router.push({ path: item.route })"
        >
          <span class="nav-emoji">{{ item.emoji }}</span>
          <span class="nav-name">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import packageInfo from '../../package.json'
import { getNavObj } from '../nav/'

@Component({})
export default class Navbar extends Vue {
  hide = false
  name = packageInfo.name
  version = packageInfo.version

  get navObj() {
    return getNavObj(this.$route.meta.lang)
  }
}
</script>

<style lang="scss">
  @import '../styles/var';
  @import '../styles/media';

  $width: 250px;
  $bgColor: #f2f4f6;
  $gap: 30px;
  $navFont: #7e99b6;

  .navbar {
    position: relative;
    width: $width;
    height: 100vh;
    background-color: $bgColor;
    transition: all .5s;
    &.hide {
      margin-left: -$width;
    }
    .hide-btn {
      display: none;
      position: absolute;
      right: 20px;
      top: 20px;
      width: 16px;
      height: 16px;
      cursor: pointer;
      background-image: url('../assets/close.png');
      background-size: 100%;
      background-repeat: no-repeat;
    }
    .switch-btn {
      position: absolute;
      right: 0;
      top: 10px;
      width: 28px;
      height: 28px;
      transform: translateX(38px);
      cursor: pointer;
      background-image: url('../assets/menu.png');
      background-size: 16px;
      background-repeat: no-repeat;
      background-color: $bgColor;
      background-position: center;
    }
    @include max-screen(992px) {
      & {
        position: fixed;
        width: 100vw;
        left: 0;
        top: 0;
        &.hide {
          margin-left: 0;
          transform: translateX(-100%);
        }
        .hide-btn {
          display: block;
        }
      }
    }

    .site-info {
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding: $gap;

      .name {
        font-size: 18px;
        font-weight: bold;
      }
      .version {
        font-size: 14px;
        color: #999;
      }
    }

    .nav-content {
      padding: 0 $gap;

      .nav-group {
        margin-bottom: 15px;

        .nav-title {
          font-size: 18px;
          font-weight: bold;
          color: $navFont;
          margin-bottom: 5px;
        }
        .nav-item {
          padding: 5px 0;
          color: $navFont;
          cursor: pointer;

          .nav-name {
            position: relative;
            &::after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 2px;
              background-color: $navFont;
              transition: all .3s;
              transform: scale(0);
              transform-origin: left;
            }
          }
          &:hover .nav-name::after {
            transform: scale(1);
          }
        }
      }
    }
  }
</style>
