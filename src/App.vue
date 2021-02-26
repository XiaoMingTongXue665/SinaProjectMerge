<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        isRouterAlive: true
      }
    },
    methods: {
      reload() {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      }
    },
    components: {},
    mounted() {
      let width = $("body").width();
      if (width >= 1200) {
        let fontsize = width / 1920 * 40;//fontsize为当前屏幕的基数字体，相对于设计稿计算得到的。
        $("html").css("font-size", `${fontsize}px`)
      }//当加载页面的时候设置生效
      window.onresize = () => {//当页面尺寸改变的时候生效
        return (() => {
          let width = $("body").width();
          if (width >= 1200) {
            let fontsize = width / 1920 * 40;
            $("html").css("font-size", `${fontsize}px`)
          }
        })()
      }
    }

  }
</script>
