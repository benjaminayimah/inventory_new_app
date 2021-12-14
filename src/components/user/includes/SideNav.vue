<template>
    <section id="side_menu" class="side-menu" v-bind:class="{'sidebar-expand': $store.getters.getSideExpand}" @mouseover="$store.commit('sidebarExpand')" @mouseout="$store.commit('sidebarRetract')">
      <div class="container-fluid">
          <div class="head">
              <div class="head-wrap hd-wrap1">
                  <router-link :to="{name: 'Home'}" id="logo"><img alt="LOGO" :src="require('@/assets/img/logo.png')" /></router-link>
              </div>
              <div class="head-wrap">
                  <button @click="$store.commit('toggleSideNav')" class="sidebar-toggle" type="button">
                  <span class="icon icon-bar"></span>
                  <span class="icon icon-bar"></span>
                  <span class="icon icon-bar"></span>
              </button>
              </div>
          </div>
          <div id="sidenav_wrap">
            <ul id="side_nav">
              <li class="menu-active menu-item"><router-link class="nav-a" :to="{ name: 'Dashboard'}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path class="icon icon-dashboard" d="M0,10H8V0H0Zm0,8H8V12H0Zm10,0h8V8H10ZM10,0V6h8V0Z" transform="translate(0 0)"/></svg><span class="nav-label">Dashboard</span><i></i></router-link></li>
              <li class="menu-item"><router-link class="nav-a" :to="{ name: 'Orders'}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.14 20"><g><path class="cls-1" d="M13,8,5.38,3.12" transform="translate(-0.12 -0.03)"/><path class="cls-1" d="M17.26,13.57V6.4a1.82,1.82,0,0,0-.9-1.55L10.08,1.27a1.79,1.79,0,0,0-1.79,0L2,4.85a1.78,1.78,0,0,0-.9,1.55v7.17A1.79,1.79,0,0,0,2,15.13L8.3,18.71a1.79,1.79,0,0,0,1.79,0l6.27-3.58a1.79,1.79,0,0,0,.9-1.56Z" transform="translate(-0.12 -0.03)"/><path class="cls-1" d="M1.38,5.39l7.81,4.78L17,5.39" transform="translate(-0.12 -0.03)"/><path class="cls-1" d="M9.19,19V9.49" transform="translate(-0.12 -0.03)"/></g></svg><span class="nav-label">Orders</span><i></i></router-link></li>
              <li class="menu-item menu-dropdown" v-bind:class="{'sidedrop-toggled' : $store.getters.getSideDrop1}">
                <a class="nav-a" @click.prevent="$store.commit('toggleDrop', 'toggleSideDrop1')" href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.02 21"><g><path class="cls-2" d="M19,12.21l-6.73,6.73a1.87,1.87,0,0,1-2.65,0h0l-8.07-8V1.5h9.39L19,9.56a1.87,1.87,0,0,1,0,2.65Z" transform="translate(0 0)"/><path class="cls-2" d="M6.19,6.19h0" transform="translate(0 0)"/></g></svg><span class="nav-label">Products</span><i><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 8.47"><path class="drop-arrow" d="M1.41,1.41,7,7.4l5.46-6" transform="translate(-0.41 -0.41)"/></svg></i>
                </a>
                <ul class="dropdown">
                  <li><router-link :to="{ name: 'Allproducts' }">All products</router-link></li>
                  <li><router-link :to="{ name: 'Addproduct' }">Add product</router-link></li>
                  <li><router-link :to="{ name: 'Inventory' }">Inventory</router-link></li>
                  <li><router-link :to="{ name: 'Categories' }">Categories</router-link></li>
                  <li><a href="#">Discounts</a></li>
                </ul>
                </li>
              <li class="menu-item"><router-link class="nav-a" :to="{ name: ''}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.35 19.65"><g><path class="cls-3" d="M16.3,18.36V16.51a3.7,3.7,0,0,0-3.7-3.7H5.2a3.7,3.7,0,0,0-3.7,3.7h0v1.85" transform="translate(0 -0.2)"/><path class="cls-3" d="M12.6,5.4A3.7,3.7,0,1,1,8.9,1.7h0A3.7,3.7,0,0,1,12.6,5.4Z" transform="translate(0 -0.2)"/><path class="cls-3" d="M21.85,18.36V16.51a3.69,3.69,0,0,0-2.77-3.58" transform="translate(0 -0.2)"/><path class="cls-3" d="M15.38,1.83a3.7,3.7,0,0,1,0,7.17" transform="translate(0 -0.2)"/></g></svg><span class="nav-label">Customers</span><i></i></router-link></li>
              <li class="menu-item"><router-link class="nav-a" :to="{ name: ''}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.34 19.35"><path class="cls-4" d="M17.79,19.35H1.53A1.54,1.54,0,0,1,0,17.82V14.26a1.53,1.53,0,0,1,1.53-1.53H6.11V7.64A1.52,1.52,0,0,1,7.64,6.11h5.1V1.55A1.55,1.55,0,0,1,14.29,0h3.5a1.55,1.55,0,0,1,1.55,1.55V17.79A1.56,1.56,0,0,1,17.79,19.35Z" transform="translate(0 0)"/></svg><span class="nav-label">Analytics</span><i></i></router-link></li>
              <hr>
              <li class="menu-item menu-dropdown" v-bind:class="{'sidedrop-toggled' : $store.getters.getSideDrop2}">
                <a class="nav-a" @click.prevent="$store.commit('toggleDrop', 'toggleSideDrop2')" href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.02 21"><g><path class="cls-2" d="M19,12.21l-6.73,6.73a1.87,1.87,0,0,1-2.65,0h0l-8.07-8V1.5h9.39L19,9.56a1.87,1.87,0,0,1,0,2.65Z" transform="translate(0 0)"/><path class="cls-2" d="M6.19,6.19h0" transform="translate(0 0)"/></g></svg><span class="nav-label">Online store</span><i><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 8.47"><path class="drop-arrow" d="M1.41,1.41,7,7.4l5.46-6" transform="translate(-0.41 -0.41)"/></svg></i>
                </a>
                <ul class="dropdown">
                  <li><a href="#">All products</a></li>
                  <li><a href="#">Inventory</a></li>
                  <li><a href="#">Categories</a></li>
                  <li><a href="#">Discounts</a></li>
                </ul>
                </li>
          </ul>
          <ul id="sidenav_bottom">
            <li class="menu-item"><router-link class="nav-a" :to="{ name: ''}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.29 19.29"><g><path class="cls-5" d="M12,9.64A2.36,2.36,0,1,1,9.64,7.29,2.36,2.36,0,0,1,12,9.64Z" transform="translate(0 0)"/><path class="cls-5" d="M15.46,12a1.29,1.29,0,0,0,.26,1.43l0,.05a1.57,1.57,0,0,1-2.19,2.25l0,0,0,0a1.31,1.31,0,0,0-1.85,0,1.3,1.3,0,0,0-.36.9v.13a1.58,1.58,0,1,1-3.15,0v-.07a1.29,1.29,0,0,0-.84-1.18,1.28,1.28,0,0,0-1.43.26l-.05,0a1.57,1.57,0,1,1-2.25-2.19l0,0,0,0a1.31,1.31,0,0,0,0-1.85,1.3,1.3,0,0,0-.9-.36H2.57a1.58,1.58,0,0,1,0-3.15h.07a1.31,1.31,0,0,0,1.19-.85,1.31,1.31,0,0,0-.26-1.43l0,0A1.58,1.58,0,0,1,5.75,3.58h0l0,0a1.31,1.31,0,0,0,1.43.26h.07A1.29,1.29,0,0,0,8.07,2.7V2.57a1.57,1.57,0,0,1,3.14,0v.07a1.32,1.32,0,0,0,1.32,1.3,1.35,1.35,0,0,0,.9-.37l.05,0A1.57,1.57,0,0,1,15.7,5.75h0l0,0a1.31,1.31,0,0,0-.26,1.43v.07a1.3,1.3,0,0,0,1.19.78h.13a1.57,1.57,0,1,1,0,3.14h-.07a1.32,1.32,0,0,0-1.18.79Z" transform="translate(0 0)"/></g></svg><span class="nav-label">Settings</span></router-link></li>
          </ul>
          </div>
      </div>
  </section>
</template>
<script>
export default {
    name: 'SideNav'
}
</script>

<style scoped>
.head{ 
    position: relative;
    padding: 15px 0;
    display: flex;
    width: 100%;
    height: 65px;
    }
    .head-wrap{
        width: 50%;
    }
    
.sidebar-toggle {
    float: right;
    padding: 10px;
    background-color: transparent;
    background-image: none;
    border: none;
    cursor: pointer;
    height: 38px;
    width: 38px;
    transition: 0.2s linear;
    
}
.sidebar-toggle .icon-bar {
    background: rgba(21, 31, 57, 0.6);
    border-color: transparent;
    display: block;
    width: 16px;
    height: 2px;
    transition: 0.3s ease-in;
}
.sidebar-toggle .icon-bar:first-child, .sidebar-toggle .icon-bar:nth-child(3) {
    width: 12px;
    transform: translateX(4px);
}
.sidebar-toggle .icon-bar + .icon-bar {
    margin-top: 3px;
}
.sidebar-toggle:hover .icon-bar {
    background: rgba(21, 31, 57, 1);
}


#logo img{
    height: 40px;
    padding: 10px;
}

#side_nav, #sidenav_bottom {
        padding-left: 0;
        margin: 20px 0;
    }
    #side_nav .menu-item, #sidenav_bottom .menu-item {
        list-style-type: none;
        margin-bottom: 5px;
        border-radius: 10px;
    }
    #side_nav .menu-item .nav-a, #sidenav_bottom .menu-item .nav-a {
        display: flex;
        text-decoration: none;
        padding: 13px 18px;
        color: rgba(21, 31, 57, 0.6);
        transition: 0.2s ease;
        line-height: 26px;
        height: 52px;
    }
     #side_nav .menu-item:hover .nav-a,#sidenav_bottom .menu-item:hover .nav-a{
        color: #0048EB; 
    }
    .menu-active{
        background-color: rgba(0, 72, 235, 0.05) !important;
    }
    .menu-active .nav-a .nav-label{
        color: #0048EB;
        font-weight: 500;
    }
    #side_nav .menu-item .nav-a span.nav-label, #sidenav_bottom .menu-item .nav-a .nav-label{
      margin-left: 18px;
      min-width: 136px;
      
    }
    #side_nav .menu-item .nav-a svg .icon, #sidenav_bottom .menu-item .nav-a svg .icon{
      fill:#000000;
    }

    .icon-dashboard{
      fill:#0048eb !important;
    }
#side_nav .menu-item .nav-a svg, #sidenav_bottom .menu-item .nav-a svg{
  height: 15px;
  margin-top: 6px;
}
#side_nav .menu-item .nav-a i, #sidenav_bottom .menu-item .nav-a i{
  margin-top: -3px;
}
#side_nav hr{
  border-top: 1px solid #F0F5FC;
  margin: 2em 0;
}



.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.2px;}
.cls-2{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:3px;}
.cls-3{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:3px;}
.cls-4{fill:#000;}
.cls-5{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}
.drop-arrow{fill:none;stroke:rgba(21, 31, 57, 0.6);stroke-linecap:round;stroke-width:2px;}


.menu-item .nav-a i svg{
  height: 8px !important;
}
#sidenav_bottom{
  bottom: 0;
  position: absolute;
  width: 88%;
}
.menu-dropdown{
  position: relative;
}
.dropdown{
  padding-bottom: 10px;
  display: none;
}
.dropdown li{
  list-style-type: none;
}
.dropdown li a{
  display: block;
  padding: 10px;
  font-size: 0.9em;
  height: auto;
  line-height: 10px;
  color: rgba(21, 31, 57, 0.6);
  transition: ease-in 0.2s all;
}
.dropdown li:hover a{
  color: #0048eb;
  text-decoration: none;
}
.sidedrop-toggled .dropdown{
  display: block;
}

.sidedrop-toggled li a{
  line-height: 15px !important;
  display: block !important;
}
.sidedrop-toggled a i svg{
  transform: rotate(180deg)
}


/* side bar unpinned/toggled */

.sidebar-unpinned .side-menu{
    max-width: 85px;
}

.sidebar-unpinned #side_nav li a span.nav-label,.sidebar-unpinned #sidenav_bottom li .nav-label, .sidebar-unpinned .hd-wrap1, .sidebar-unpinned #side_nav li a i{
    display: none;
}



.sidebar-unpinned .head {
    text-align: center;
}
.sidebar-unpinned .sidebar-toggle{
    float: none;
}
.sidebar-unpinned .sidebar-toggle .icon-bar:first-child, .sidebar-unpinned .sidebar-toggle .icon-bar:nth-child(3) {
    width: 16px;
    transform: translateX(0px);
}
.sidebar-unpinned .head-wrap{
    width: 100%;
}

.sidebar-unpinned .sidedrop-toggled .dropdown{
  display: none;
}
.sidebar-unpinned .sidebar-expand .sidedrop-toggled .dropdown{
  display: block;
}


/* side bar expanded */
.sidebar-expand{
    max-width: 250px !important;
}
.sidebar-expand #side_nav li a span.nav-label, .sidebar-expand #sidenav_bottom li a span.nav-label, .sidebar-expand #side_nav li a i{
    display: block;
}
.sidebar-expand .sidebar-toggle{
    float: right
}

.sidebar-expand .head-wrap{
    width: 50%;
}
.sidebar-expand .hd-wrap1{
    display: flex;
}

.dropdown{
  display: none;
}


</style>