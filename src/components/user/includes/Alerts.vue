<template>
<div class="status-alert">
        <div class="alert" v-bind:class="[(getAlert.status.success ? 'success-alert' : ''), (getAlert.status.danger ? 'danger-alert' : ''), (getAlert.status.warning ? 'warning-alert' : ''), (getAlert.status.info ? 'info-alert' : '')]" v-if="getAlert.status.show">
            <a href="#" class="alert-close" @click.prevent="closeAlert"></a>
            <div class="flex">
                <div class="i-hold"><i></i></div>
                <h5 class="alert-title">{{ getAlert.title | capitalize}}</h5>
            </div>
            <div class="alert-body">{{ getAlert.body | capitalize }}</div>
        </div>
<!--
        <div class="danger-alert alert" v-if="getAlert.danger">
            <a href="#" class="alert-close"></a>
            <div class="flex">
                <div class="i-hold"><i></i></div>
                <h5 class="alert-title">{{ getAlert.title | capitalize}}</h5>
            </div>
            <div class="alert-body">{{ getAlert.body | capitalize }}</div>
        </div>
        <div class="warning-alert alert" v-if="getAlert.warning">
            <a href="#" class="alert-close"></a>
            <div class="flex">
                <div class="i-hold"><i></i></div>
                <h5 class="alert-title">{{ getAlert.title | capitalize}}</h5>
            </div>
            <div class="alert-body">{{ getAlert.body | capitalize }}</div>
        </div>
        <div class="info-alert alert" v-if="getAlert.info">
            <a href="#" class="alert-close"></a>
            <div class="flex">
                <div class="i-hold"><i></i></div>
                <h5 class="alert-title">{{ getAlert.title | capitalize}}</h5>
            </div>
            <div class="alert-body">{{ getAlert.body | capitalize }}</div>
        </div>-->
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
    name: 'Alerts',
    computed: mapGetters(['getAlert']),
    methods: {
        closeAlert() {
            this.$store.commit('dismisAlert')
            
        }
    }
}
</script>
<style scoped>

</style>