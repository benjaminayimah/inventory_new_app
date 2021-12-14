<template>
<div id="admin_home" v-bind:class="{'sidebar-unpinned' : $store.getters.getSidebar}" >
  <!-- side nav -->
  <side-nav />
  <!---->
  <section id="main_page">
      <nav class="top-nav">
          <div class="topnav-wrapper">
              <div class="topnav-hold1" id="topnav_search_hold">
                  <div class="input-group0">
                    <input type="text" placeholder="Search store..." class="form-control">
                  <button type="submit" class="btn search-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23.81"><path d="M22.64,21.69,17,15.8a9.64,9.64,0,1,0-7.36,3.43,9.43,9.43,0,0,0,5.5-1.74l5.72,5.94a1.25,1.25,0,1,0,1.8-1.73h0ZM9.62,2.51A7.11,7.11,0,1,1,2.51,9.62h0A7.11,7.11,0,0,1,9.62,2.51Z" transform="translate(0 -0.01)" class="search-icon"></path>
                        </svg>
                      </button>
                  </div>
              </div>
              <div class="topnav-hold2">
                  <ul id="acct_holder">
                      <li>
                          <a class="noti-a" href=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><g><path class="noti-icon" d="M7.5,17.5h5a2.5,2.5,0,0,1-5,0ZM1.25,16.25a1.25,1.25,0,0,1,0-2.5h.63A5.44,5.44,0,0,0,3.75,10V6.25A6.19,6.19,0,0,1,9.88,0H10a6.19,6.19,0,0,1,6.25,6.13V10a5.44,5.44,0,0,0,1.87,3.75h.63a1.25,1.25,0,0,1,0,2.5Z" transform="translate(0 0)"/></g></svg></a>
                      </li>
                      <i></i>
                      <li class="acct-wrap" v-bind:class="{'toggle-acct-in' : this.acctToggle}">
                          <a class="acct-a" href="#" @click.prevent="toggleAcct" @mouseup="removeEvent" @mouseout="addEvent">
                              <span><img :src="this.$store.getters.getAvatar" /></span>
                              <span><strong>{{ this.getUser.name }}</strong></span>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 8.47"><path class="drop-arrow" d="M1.41,1.41,7,7.4l5.46-6" transform="translate(-0.41 -0.41)"/></svg>
                          </a>
                          <ul id="acct_dropdown">
                              <li><a href="#">Manage Account</a></li>
                              <li><a href="#">Settings</a></li>
                              <li><a href="#" @click.prevent="$store.commit('destroyToken')">Logout</a></li>
                          </ul>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>
    <!--Overlay-->
    <div id="drop_overlay" v-show="getDropState" @mousedown="$store.commit('dismissDrop')"></div>
      <category-modal />
      <!-- -->
      
      <div id="content_main">
          <router-view></router-view>
      </div>
  </section>  
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import CategoryModal from './includes/CategoryModal.vue'
import SideNav from './includes/SideNav.vue'

export default {
  name: 'AdminHome',
  components: {SideNav, CategoryModal},
  computed: mapGetters(['getToken', 'getUser', 'getHostname', 'getDropState']),
  data() {
    return {
      toggleSideDrop2: false,
      acctToggle: false
    }
  },
  created() {
        this.fetchUser()
    },
    methods: {
        ...mapActions({
            user: 'getAuthUser'
        }),
        fetchUser(){
            this.user(this.getToken)
        },
        _(x) {
            return document.getElementById(x)
        },
        
        toggleAcct() {
            this.acctToggle = !this.acctToggle
            if (this.acctToggle === true) {
                this._('admin_home').addEventListener('mouseup', this.dismisDrop)   
            }
        },
        dismisDrop() {
            if(this.acctToggle === true){
                this.acctToggle = false
            }
        },
        removeEvent() {
            this._('admin_home').removeEventListener('mouseup', this.dismisDrop) 
        },
        addEvent() {
            this._('admin_home').addEventListener('mouseup', this.dismisDrop)   
        }

    }
  
}
</script>

<style scoped>

/* side bar unpinned/toggled */

.sidebar-unpinned #main_page{
  margin-left: 65px !important;
}
.sidebar-unpinned .top-nav{
  padding-left: 65px !important;
}



.dd{display: none !important;}

.drop-arrow{fill:none;stroke:rgba(21, 31, 57, 0.6);stroke-linecap:round;stroke-width:2px;}


.admin-content-main-nav{
    margin: 30px 0;
}
.admin-content-main-nav ul{
    padding-left: 0;
}
.admin-content-main-nav ul li{
    list-style-type: none;
    display: inline-block;
    margin-right: 10px;
}
.admin-content-main-nav ul li a{
    padding: 8px 10px;
    text-decoration: none;
    color: #505050;
    background-color: rgb(231, 231, 231);
    border-radius: 2px;
}

.admin-content-main-nav ul li:hover a{
    color: #000000; 
}
.admin-content-main-nav ul li:hover .add-icon{
    stroke: #000000; 
}
.admin-content-main-nav ul li a svg{
    height: 14px;
    margin-bottom: 3px;
    margin-right: 5px;
}
.admin-content-main{
    border-top: 1px solid #e4e4e4;
    padding: 40px 0;
}
.add-icon{fill:none;stroke:#505050;stroke-width:3px;}


.side-menu{
    position: fixed;
    top: 0;
    bottom: 0;
    display: block;
    overflow-y: auto;
    width: 100%;
    max-width: 250px;
    z-index: 100;
    transition: 0.2s all linear;
    background-color: #ffffff;
    border-right: 1px solid #F0F5FC;
        
}

#main_page{
    margin-left: 250px;
    position: relative;
    transition: 0.2s all linear;
    box-sizing: border-box;

}
.navbar{
    padding: 20px;
}



.top-nav{
    border-bottom: 1px solid #F0F5FC;
    height: 65px;
    position: fixed;
    width: 100%;
    background-color: #ffffff;
    left: 0;
    padding-left: 250px;
    transition: 0.2s all linear;
    z-index: 10;
}


.logout{
    padding: 13px 15px;
    color: rgba(255, 0, 0,1);
    text-decoration: none;
    display: block;
}


.topnav-hold1, .topnav-hold2{
    line-height: 45px;
}
.topnav-hold1{
    float: left;
}
.topnav-hold2{
    float: right;
}

.topnav-wrapper{
    padding: 10px 50px;
    display: block;
    height: 65px;
}


#topnav_search_hold .input-group0 {
    border-radius: 14px;
    width: auto;
    display: flex;
    flex-wrap: nowrap !important;
    position: relative;
    
}
#topnav_search_hold .form-control {
    border: none !important;
    background-color: #f8f8f8;
    font-size: 0.9rem;
    border-radius: 10px;
    padding-left: 50px;
    padding-right: 15px;
    height: 45px;
    border: 1px solid #ffffff;
    width: 240px;
    transition: 0.1s all;
}
#topnav_search_hold .form-control:focus {
box-shadow: 0 0 0 0.03rem rgb(0 0 0 / 18%);
width: 320px;

}

.search-btn{
    background-color: #f8f8f8;
    padding-left: 15px;
    padding-right: 15px;
    border-top-left-radius: 14px !important;
    border-bottom-left-radius: 14px !important;
    position: absolute;
    height: 45px;
    z-index: 5;
}
#topnav_search_hold .btn:focus{
    box-shadow: none ;
}

.search-btn svg {
    height: 15px;
}
.search-icon{
    fill:rgba(21, 31, 57, 0.6);
}
.acct-wrap{
    position: relative;
}
.noti-a, .acct-a{
    padding: 8px;
    border-radius: 10px;
}

.acct-wrap span{
    display: inline-block;
    padding: 0 7px;
}
.acct-wrap span img{
    height: 30px;
    border-radius: 50%;
}
.acct-wrap svg{
    height: 8px !important;
}
#acct_holder{
    padding-left: 0;
    margin-bottom: 0;
}
#acct_holder li{
    list-style-type: none;
    display: inline-block
}
#acct_holder i{
    border-right: 1px solid#e7eef8;
    margin-right: 30px;
    height: 30px;
}
#acct_holder li:first-child{
    margin-right: 30px;
}

#acct_holder li a{
    color: rgba(21, 31, 57, 0.6);
}
#acct_holder li a svg{
    height: 18px;
   
}
.noti-icon{
    opacity:0.6;isolation:isolate; fill: rgba(21, 31, 57, 0.6);
}
#acct_dropdown{ 
    position: absolute;
    background-color: #ffffff;
    padding: 8px 0;
    margin: 0;
    border-radius: 10px;
    min-width: 200px;
    top: 54px;
    background-color: #ffffff;
    box-shadow: 0 1px 10px 0 rgba(0,0,0,.06);
    visibility: hidden;
    opacity: 0;
    transition: 0.3s ease;
    transform: translateY(-3px);
    right: 0px;
}
.toggle-acct-in #acct_dropdown{
    visibility: visible !important;
    opacity: 1  !important;
    transform: translateY(2px) !important;
}
.toggle-acct-in a svg{
    transform: rotate(180deg);
}

    


#acct_dropdown li{ 
    list-style-type: none;
    display: block;
    margin: 0 !important;
}
#acct_dropdown li a{ 
    display: block;
    text-decoration: none;
    padding: 2px 20px;
    color: rgba(21, 31, 57, 0.6);
}
#acct_dropdown li:hover a{
    color: #0048eb;
}

/* global main container */

#content_main{
    padding:  90px 50px 30px 50px;
    background-color: #F5F8FC;
    
}


#drop_overlay{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0);
    z-index: 100;
}







/* modal css */

</style>
