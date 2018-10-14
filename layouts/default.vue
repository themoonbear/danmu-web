<template>
  <v-app dark>
    <v-toolbar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-title v-text="title"/>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container 
        fluid 
        fill-height>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      :right="right"
      v-model="rightDrawer"
      temporary
      fixed
    >
      <v-list>
        <v-subheader 
          two-line>已支持直播平台</v-subheader>
        <v-list-tile 
          v-for="(item, i) in platforms" 
          :key="i">
          <v-list-tile-content>
            <v-list-tile-title v-text="item"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-footer
        height="auto"
        absolute
        color="blue">
        <v-layout
          row
          justify-center>
          <v-btn
            flat
            href="https://github.com/themoonbear/danmu-web/issues/new">
            <span>问题反馈</span>
          </v-btn>
        </v-layout>      
      </v-footer>    
    </v-navigation-drawer>
    <v-footer
      :fixed="fixed"
      app
    >
      <v-flex
        text-xs-center
        white--text
        xs12
      >
        <span>Copyright &copy; 2018 Moonbear Studio</span>
      </v-flex>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      fixed: false,
      right: true,
      rightDrawer: false,
      title: 'OBS 弹幕云插件',
      platforms: ['B站'],
      bottomNav: 'feedback'
    }
  }
}
</script>
