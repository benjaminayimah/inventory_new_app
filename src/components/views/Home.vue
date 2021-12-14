<template>
  <div class="hello container-fluid">
    <div class="loader lazy-loader"></div>
    <a class="btn mebtn-primary" href=""><span>Add product</span><i class="lazy-loader"></i></a>
      <div v-if="auth"><router-link :to="{ name: 'Dashboard' }">Dashboard</router-link></div>
      <router-link v-else :to="{ name: 'Signin' }">Sign In</router-link>
    <h1>{{ msg }}</h1>
    <h1>{{ $store.getters.getCount }}</h1>
    <button class="btn btn-primary mr-3" @click="$store.commit('reduceCounter')">-</button>
    <button class="btn btn-primary" @click="$store.commit('increaseCounter')">+</button>
    <div class="drag" contenteditable="true" draggable="true"></div>
    <div class="drag-zone" dropzone="true"></div>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <button id="nalo" class="btn nalo-btn mr-4">BUTTON</button>
    <button id="nalo2" class="btn nalo-btn">BUTTON</button>

    
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  computed: mapGetters(['auth']),
  data() {
      return {
          msg: this.$store.getters.getMessage
      }
  },
  methods: {
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  background-color: #ffffff !important;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.nalo-btn{
  padding: 10px 20px;
  font-weight: 300;
  border-radius: 8px;
  font-size: 0.95em;
  
}
#nalo{
  background-color: #435daa;
  border: none;
  color: #ffffff;
}

#nalo:hover {
  background-color: #2b4288;
}
#nalo:active {
  background-color: #435daa;
  box-shadow: 0 0 0 0.2rem rgb(38 143 255 / 40%) !important;
}
#nalo:focus,#nalo2:focus {
  box-shadow: none;
}
#nalo2{
  background-color: transparent;
  border: 1px solid #435daa;
  color: #435daa;
}
#nalo2:hover {
  background-color: #F2F3F7;
  border: 1px solid #F2F3F7;
}
#nalo2:active {
  background-color: #eff2ff;
  border: 1px solid #F2F3F7;
  box-shadow: 0 0 0 0.2rem rgb(38 143 255 / 40%) !important;
}
.drag {
  border: 1px #4444 solid;
  height: 50px;
  width: 300px;
  background-color: #ddd;
}
.drag-zone {
  margin-top: 30px;
  border: 1px #4444 solid;
  height: 100px;
}

</style>
