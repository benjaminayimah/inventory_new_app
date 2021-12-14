<template>
  <div>
    <li><router-link :to="{ name: 'Home'}">Home</router-link></li>
      <h1>Sign in</h1>
      <form>
                
                        <div class="form-group">
                        <label>Email:</label>
                        <div class="input-hold">
                            <input class="form-control" name="Email" type="email" v-model="form.email" placeholder="Email">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Password:</label>
                        <div class="input-hold">
                            <input class="form-control" name="name" type="password" v-model="form.password" placeholder="Password">
                        </div>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary" href="#" @click.prevent="submitSignin">Sign in</button>
                    </div>
                    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Signin',
  data() {
      return {
          form: {
              email: 'benjaminayimah@gmail.com',
              password: 'ajf1432#@!'
          }
      }
  },
  methods: {
      ...mapActions({
          signIn: 'signIn'
      }),
      submitSignin(){
          this.signIn(this.form)
      }

/* 
const token = res.data.token
            localStorage.setItem('token', token)
            this.$store.commit('setAuthentication', token)
            this.$store.commit('setToken', token)
                    /* this.$router.replace({name: 'Home'})*/
      
  }
}
</script>

<style scoped>

</style>
