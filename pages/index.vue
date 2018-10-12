<template>
  <v-layout
    justify-center
    align-center>
    <v-flex
      xs12
      sm8
      md6>     
      <v-card class="elevation-12">
        <v-card-title class="headline font-weight-regular blue white--text">直播地址</v-card-title>
        <v-card-text>
          <v-text-field
            box
            placeholder="输入后回车提交"
            hint="如：https://live.bilibili.com/123456"
            @keyup.enter="submit"/>          
        </v-card-text>
      </v-card>     
    </v-flex>
  </v-layout>  
</template>

<script>
export default {
  methods: {
    submit(event) {
      let address = event.target.value
      if (!address) return
      this.$router.push({ path: '/' + this.$utils.b64Encode(address) })
    }
  }
}
</script>
