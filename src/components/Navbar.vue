<template>
  <div :class="['navbar', { hide }]">
    <aside class="btn-wrap">
      <div class="hide-btn" @click="hide = true"></div>
      <div class="btn-group">
        <div class="btn switch-btn" @click="hide = !hide"></div>
        <div class="btn language-btn" @click="switchLanguage">{{ nextLanguage }}</div>
        <a class="btn github-btn" :href="homePageUrl" target="_blank"></a>
      </div>
    </aside>
    <div class="content">
      <div class="site-info">
        <div class="name">{{ name }}</div>
        <div class="version">v{{ version }}</div>
        <label for="theme">
          Theme:
          <select id="theme" class="theme" v-model="theme" @change="changeTheme">
            <option value="default">default</option>
            <option value="antd">antd</option>
            <option value="material">material</option>
          </select>
        </label>
      </div>
      <div class="nav-content">
        <div
          v-for="(list, title) in navObj"
          :key="title"
          class="nav-group"
        >
          <div class="nav-title">{{ title }}</div>
          <router-link
            v-for="(item, index) in list"
            :key="index"
            class="nav-item"
            :to="$route.meta.lang + item.route"
            exact
            @click.native="routeClickHandle"
          >
            <span class="nav-name">{{ item.name }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import packageInfo from '../../package.json'
import { getNavObj, LANG } from '../nav/'
import { getTheme } from '../utils'

@Component({})
export default class Navbar extends Vue {
  hide = false
  name = packageInfo.name
  version = packageInfo.version
  homePageUrl = packageInfo.homepage
  theme = getTheme() || 'default'

  get nextLanguage() {
    return this.$route.meta.lang === LANG.ENGLISH ? '🇨🇳' : '🇺🇸'
  }

  get navObj() {
    return getNavObj(this.$route.meta.lang)
  }

  switchLanguage() {
    this.$router.push({
      path: (
        this.$route.meta.lang === LANG.ENGLISH ? LANG.ZH_CN : LANG.ENGLISH
      ) + this.$route.meta.route
    })
  }

  changeTheme(e: Event) {
    const theme = (e.target as any).value
    localStorage.setItem('theme', theme)
    location.reload()
  }

  routeClickHandle() {
    if (document.body.clientWidth < 992) {
      this.hide = true
    }
  }
}
</script>

<style lang="scss">
  @import '../styles/var';
  @import '../styles/media';

  $width: 320px;
  $bgColor: #f2f4f6;
  $gap: 30px;
  $navFont: #7e99b6;

  .navbar {
    position: relative;
    width: $width;
    height: 100vh;
    background-color: $bgColor;
    transition: all .5s;
    z-index: 99;
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

    .btn-group {
      position: absolute;
      left: 100%;
      top: 0;
      transform: translateX(10px);

      .btn {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        cursor: pointer;
        background-color: $bgColor;
        margin-top: 10px;
        display: block;
      }

      .switch-btn {
        background-image: url('../assets/menu.png');
        background-size: 16px;
        background-repeat: no-repeat;
        background-position: center;
      }

      .language-btn {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .github-btn {
        background-image: url('../assets/github.png');
        background-size: 16px;
        background-repeat: no-repeat;
        background-position: center;
      }

      @include max-screen(992px) {
        & {
          display: flex;
          align-items: flex-start;
          transform: translateX(0);
          .btn {
            margin-left: 10px;
          }
        }
      }
    }

    .content {
      height: 100%;
      overflow-y: auto;
    }

    .site-info {
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding: ($gap * 2) $gap;

      .name {
        font-size: 24px;
        font-weight: bold;
      }
      .version {
        font-size: 14px;
        color: #999;
      }
      .theme {
        margin: 15px 0 0 5px;
        width: 80px;
      }
    }

    .nav-content {
      padding: 0 $gap;

      .nav-group {
        margin: 0 0 $gap;

        .nav-title {
          font-size: 18px;
          font-weight: bold;
          color: $navFont;
          margin-bottom: 5px;
        }
        .nav-item {
          display: block;
          padding: 5px 0;
          color: $navFont;
          cursor: pointer;
          text-decoration: none;

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
          &:hover .nav-name::after,
          &.router-link-active .nav-name::after {
            transform: scale(1);
          }
        }
      }
    }
  }
</style>
