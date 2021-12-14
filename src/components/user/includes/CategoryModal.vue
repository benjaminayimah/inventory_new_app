<template>
    <div class="overlay-bg" v-show="this.getOverlay">
          <div class="overlay-body">
              <a class="cls-overlay" href="#" @click.prevent="$store.commit('closeOverlay')" @mousedown.prevent="dismissValidation">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.57 13.57"><path d="M8.3,6.71l4.8-4.8A1.12,1.12,0,0,0,11.51.33L6.72,5.13,1.91.33A1.11,1.11,0,0,0,.33.19,1.13,1.13,0,0,0,.2,1.78a.8.8,0,0,0,.13.13l4.8,4.8-4.8,4.8a1.12,1.12,0,0,0,.13,1.58,1.11,1.11,0,0,0,1.45,0l4.81-4.8,4.79,4.8a1.12,1.12,0,1,0,1.72-1.45l-.13-.13Z" transform="translate(0.07 0.07)"/></svg>
              </a>
              <div class="modal-title">
                  <h6 v-if="getCategoryFormEdit.show">Edit category, <a href="#">{{ getCategoryFormEdit.name }}</a></h6>
                  <h6 v-else>Add New Category</h6>
              </div>
              <div v-if="validation.status.success" :class="validation.status.success? 'validation-success': ''">
                  <span>{{ validation.message | capitalize}}</span>
              </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                        <label>Category name:</label>
                        <div class="input-hold" :class="[(validation.status.danger ? 'validation-error' : ''), (validation.status.warning ? 'validation-warning' : '')]">
                            <input v-if="getCategoryFormEdit.show" class="form-control"  v-model="getCategoryFormEdit.name" @focus="dismissValidation" name="category" type="text" :placeholder="getCategoryFormEdit.name">
                            <input v-else class="form-control" v-model="form.category" @focus="dismissValidation" name="category" type="text" placeholder="Enter category name">
                            <span v-if="validation.status.show">{{ validation.message | capitalize}}</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <a href="#" class="btn mebtn-primary w-100" v-if="getCategoryFormEdit.show" @click.prevent="updateCategory">Save</a>
                        <a href="#" class="btn mebtn-primary w-100" v-else @click.prevent="submitCategory">Add</a>
                    </div>
                    </form>
                </div>
          </div>
      </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    name: 'CategoryModal',
      computed: mapGetters(['getCategoryFormEdit', 'getToken', 'getHostname', 'getOverlay']),
    data() {
        return {
            form: {
                category: ''
            },
            validation: {
                status: {show: false, success: false, danger: false}, message: 'error'
            }
        }
    },
    methods: {
        async submitCategory() {
            this.dismissValidation()
            axios.post( this.getHostname+'/api/category?token='+this.getToken, this.form
            ).then((res) => {
                if(res.data.status === 1) {
                    this.$store.commit('addToCategories', res.data.categories)
                    this.validation.message = res.data.message
                    this.validation.status.success = true
                }
                if(res.data.status === 2) {
                    this.validation.message = res.data.message
                    this.validation.status.show = true
                    this.validation.status.danger = true
                    
                }
            }).catch((err) => {
                if(err.response.status === 422) {
                    this.validation.message = err.response.data.errors.category
                    this.validation.status.show = true
                    this.validation.status.danger = true
                }
                console.log(err.response)
            })
        },
        async updateCategory() {
            this.dismissValidation()
            axios.put( this.getHostname+'/api/category/'+this.getCategoryFormEdit.id+'?token='+this.getToken,
            { category: this.getCategoryFormEdit.name}
            ).then((res) => {
                if(res.data.status === 1) {
                    const newCat = {
                        id: this.getCategoryFormEdit.id,
                        name: res.data.category
                    }
                    this.$store.commit('updateCategoryForm', newCat)
                    this.validation.message = res.data.message
                    this.validation.status.success = true
                    this.form.category = ''
                }
                if(res.data.status === 2) {
                    this.validation.message = res.data.message
                    this.validation.status.show = true
                    this.validation.status.danger = true
                }
            }).catch((err) => {
                if(err.response.status === 422) {
                    this.validation.message = err.response.data.errors.category
                    this.validation.status.show = true
                    this.validation.status.danger = true
                }
                console.log(err.response)
            })
        },
        dismissValidation() {
            for (let i in this.validation.status)
            this.validation.status[i] = false
            this.validation.message = ''
        }
    }
}
</script>

<style scoped>
.modal-hold{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    overflow-y: scroll;
    z-index: 500;

}
.modal-container{
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 40px;
    background-color: #ffffff;
    margin-top: 5%;
    margin-bottom: 5%;
    position: relative;
    border-radius: 3px;
}
.cls-icon{fill:none;stroke:#505050;stroke-width:2px;}
.cls-modal{
    position: absolute;
    right: 10px;
    top: 10px;
}
.cls-modal svg{
    height: 17px;
}

.input-hold{margin-top:3px}
    
    input[type=text]{
        height: 45px;
    }
    
    

    /* side bar unpinned/toggled */
    .sidebar-unpinned #main_page{
        margin-left: 85px;
    }
    .sidebar-unpinned .top-nav{
        padding-left: 85px;
}

.overlay-bg{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.25);
    z-index: 999999;
    -webkit-backdrop-filter: saturate(180%) blur(10px);
    backdrop-filter: saturate(180%) blur(10px);
}
.overlay-body{
    max-width: 500px;
    width: 80%;
    background-color: #ffffff;
    margin: 0 auto;
    border-radius: 12px;
    margin-top: 100px;
    position: relative;
    padding: 30px;
}
.cls-overlay{
    position: absolute;
    padding: 10px;
    right: 10px;
    top: 10px;
}
.cls-overlay svg{
    height: 15px;
}
.modal-title{
    margin-bottom: 20px;
}
.modal-body{
    padding: 0;
    margin-top: 20px;
}
.modal-body input{
    border-radius: 6px;
}
.modal-body label{
    color: rgba(21, 31, 57, 0.5);
}

</style>