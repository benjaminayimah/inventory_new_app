<template>
    <div class="content-main-holder">
        <div class="page-title-holder row">
            <div class="col-6 col flex"><router-link :to="{name: 'Allproducts'}" class="btn mebtn-alt flex"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 18"><path class="icon-arrow-back" d="M22,7.5H5.74l5.37-5.39L9,0,0,9l9,9,2.11-2.12L5.74,10.5H22Z" transform="translate(0 0)"/></svg>Back</router-link><h4>Add product</h4></div>
        </div>
        <alerts />
        <form id="product_table">
            <div class="mt-4 row">
                <div class="col-md-7">
                    <div class="inner-form-hold">
                        <div class="product-details-hold">
                            <div class="form-group">
                                <label for="productTitle">Title: <span class="required">*Required</span></label>
                                <input type="text" v-model="form.name" class="form-control" id="productTitle" placeholder="Title of product eg. iPhone 12 Pro max">
                            </div>
                            <div class="form-group">
                                <label for="description">Description: <span class="required">*Required</span></label>
                                <textarea name="description" v-model="form.description" id="description" class="form-control" rows="8"></textarea>
                            </div>
                        </div>
                        <div class="product-details-hold">
                            <div class="form-group">
                                <label for="image">Product image: <span class="required">*Required</span></label>
                                <div class="image-hold">
                                    <input class="form-control hide" @change="uploadTemp" name="image" id="prod_img" type="file" ref="img">
                                    <div v-if="imageUploaded" class="image-in flex">
                                        <div class="imghold-div" v-for="img in form.tempImage" :key="img.id" v-bind:style="{backgroundImage: 'url('+getHostname+'/storage/'+getUser.id+'/temp/'+img.image+')'}">
                                            <button class="btn" @click.prevent="deltmp(img.image)">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3.86 3.86"><path class="icon-close" d="M2.39,1.93,3.77.55a.32.32,0,0,0,0-.46.34.34,0,0,0-.46,0L1.93,1.47.55.09A.33.33,0,0,0,.1.09.32.32,0,0,0,.1.55L1.48,1.93.1,3.31a.32.32,0,0,0,0,.46.33.33,0,0,0,.45,0L1.93,2.39,3.31,3.77a.34.34,0,0,0,.46,0,.32.32,0,0,0,0-.46Z" transform="translate(0 0)"/></svg>
                                            </button>
                                        </div>
                                        <div class="imghold-div2" v-if="form.tempImage.length < 3">
                                            <div v-if="doingtempUpload" class="imghold-div-uploading">
                                                <div class="progress-wrap">
                                                    <span id="progress" :style="{width: this.progress}"></span>
                                                </div>
                                            </div>
                                            <div v-else class="addTo">
                                                <p>
                                                    <button class="btn" @click.prevent="uploadClick('prod_img')">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3.86 3.86"><path class="icon-close" d="M2.39,1.93,3.77.55a.32.32,0,0,0,0-.46.34.34,0,0,0-.46,0L1.93,1.47.55.09A.33.33,0,0,0,.1.09.32.32,0,0,0,.1.55L1.48,1.93.1,3.31a.32.32,0,0,0,0,.46.33.33,0,0,0,.45,0L1.93,2.39,3.31,3.77a.34.34,0,0,0,.46,0,.32.32,0,0,0,0-.46Z" transform="translate(0 0)"/></svg>
                                                    </button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else class="empty-state">
                                        <p>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><g><path class="icon-upload" d="M28.5,19.5v6a3,3,0,0,1-3,3H4.5a3,3,0,0,1-3-3v-6" transform="translate(0 0)"/><path class="icon-upload" d="M22.5,9,15,1.5,7.5,9" transform="translate(0 0)"/><path class="icon-upload" d="M15,1.5v18" transform="translate(0 0)"/></g></svg>
                                        </p>
                                        <p>
                                            <a class="btn mebtn-alt" href="#" @click.prevent="uploadClick('prod_img')">Select image</a>
                                        </p>
                                        <p>
                                            <span>or drop image to upload</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="product-details-hold">
                            <div class="form-row">
                                <div class="col-6">
                                    <label for="productPrice">Price:</label>
                                    <input @change="calcProfit" type="text" v-model="form.price" class="form-control" id="productPrice" placeholder="GH₵  0.00">
                                </div>
                                <div class="col-6">
                                <label for="productCompared">Compared price:</label>
                                    <input type="text" v-model="form.compared" class="form-control" id="productCompared" placeholder="GH₵  0.00">
                            </div>
                            </div>
                            <div class="form-row">
                                <div class="col-6">
                                    <label for="cpu">Cost per unit:</label>
                                    <input @change="calcProfit" type="text" v-model="form.cpu" class="form-control" id="cpu" placeholder="GH₵  0.00">
                                    <span class="under-input-label">*Customers won’t see this.</span>
                                </div>
                                <div class="col-6">
                                <div class="flex mt-4">
                                    <div class="col-6">
                                        <label for="profit">Profit:</label>
                                        <div><span id="profit">GH₵ {{ form.profit }}</span></div>
                                    </div>
                                    <div class="col-6">
                                        <label for="profitMargin">Profit margin:</label>
                                        <div><span id="profitMargin">{{ form.profitMargin }} %</span></div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="product-details-hold">
                            <div class="form-group">
                                <label for="quantity">Quantity:</label>
                                <input type="text" class="form-control" v-model="form.quantity" id="quantity" placeholder="0">
                            </div>
                            <div class="form-row">
                                <div class="col-6">
                                    <label for="SKU">SKU (Stock Keeping Unit):</label>
                                    <input type="text" v-model="form.sku" class="form-control" id="SKU" placeholder="0">
                                </div>
                                <div class="col-6">
                                <label for="barcode">Barcode(ISBN, Batch No.):</label>
                                    <input type="text" v-model="form.barcode" class="form-control" id="barcode" placeholder="0">
                            </div>
                            </div>
                            <div class="form-group">
                                <label class="checkbox-hold">
                                    <input  type="checkbox" v-model="form.track">
                                    <span class="checkbox-custom"></span>
                                    <span class="chk-label">Track quantity.</span>
                                </label>
                                <label class="checkbox-hold">
                                    <input  type="checkbox" v-model="form.continue">
                                    <span class="checkbox-custom"></span>
                                    <span class="chk-label">Continue selling even when item is out of stock.</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="inner-form-hold">
                        <div class="product-details-hold">
                            <div class="form-group">
                                <label for="status">Status:</label>
                                <select class="custom-select mr-sm-2" id="status" v-model="form.status">
                                    <option selected value="">Active</option>
                                    <option value="2">Draft</option>
                                    <option value="0">Disabled</option>
                                </select>
                                <span class="under-input-label">*This product will be visible online immediately.</span>
                            </div>
                        </div>
                        <div class="product-details-hold">
                            <div class="form-group">
                                <div class="super-label mb-3"><strong>Organization</strong></div>
                                <label for="category">Category:</label>
                                <select v-model="form.category" class="custom-select mr-sm-2" id="category">
                                    <option selected value="">Select a category</option>
                                    <option v-for="category in getCategories" :key="category.id" :value="category.id">{{ category.name }}</option>
                                </select>
                                <span class="under-input-label">Add this product to a category.</span>
                            </div>
                            <div class="form-group">
                                <label for="productType">Product type:</label>
                                <input type="text" v-model="form.type" class="form-control" id="productType" placeholder="eg. shoe">
                            </div>
                            <div class="form-group">
                                <label for="tag">Tag:</label>
                                <div class="custom-checkhold">
                                    <a id="tag_trigger" href="#" @click.prevent="$store.commit('showTagDrop')">eg. best seller</a>
                                    <div class="custom-check-list" v-show="getTagdrop">
                                        <label class="checkbox-hold">
                                            <input  type="checkbox" v-model="form.tags.bs">
                                            <span class="checkbox-custom"></span>
                                            <span class="chk-label">Best seller</span>
                                        </label>
                                        <label class="checkbox-hold">
                                            <input  type="checkbox" v-model="form.tags.new">
                                            <span class="checkbox-custom"></span>
                                            <span class="chk-label">New arrival</span>
                                        </label>
                                    </div>
                                </div>
                                <span class="under-input-label">Create a tag for your product.</span>
                                <div class="flex mt-3" id="tags">
                                    <span v-if="form.tags.bs" id="">Best seller<svg @click="uncheckCustom('bs')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.48 11.4"><g><path class="icon-close" d="M1.41,1.56l9.48,9.25" transform="translate(-0.41 -0.41)"/><path class="icon-close" d="M1.41,10.81l9.42-9.4" transform="translate(-0.41 -0.41)"/></g></svg></span>
                                    <span v-if="form.tags.new">New arrival<svg @click="uncheckCustom('new')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.48 11.4"><g><path class="icon-close" d="M1.41,1.56l9.48,9.25" transform="translate(-0.41 -0.41)"/><path class="icon-close" d="M1.41,10.81l9.42-9.4" transform="translate(-0.41 -0.41)"/></g></svg></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-4 mb-4 container">
                    <a class="btn mebtn-seconday mr-3" href="#">Discard</a><a class="btn mebtn-primary" href="#" @click.prevent="doUpload">Submit</a> 
                </div>
            </div>
        </form>
        
    </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import Alerts from '../includes/Alerts.vue'

export default {
  components: { Alerts },
    name: 'AddProduct',
    computed: mapGetters(['getToken', 'getHostname', 'getUser', 'getCategories', 'getTagdrop']),
    data() {
        return {
            form: {
                name: '',
                description: '',
                image: '',
                tempImage: [],
                price: '',
                compared: '',
                cpu: '',
                profit:  '0',
                profitMargin: '0',
                quantity: '',
                sku: '',
                barcode: '',
                track: true,
                continue: true,
                status: '',
                category: '',
                type: '',
                tags: { bs: false, new: false},
            },
            doingtempUpload: false,
            imageUploaded: false,
            progress: '0',
        }
    },
    created() {
        this.fetchCategories()
    },
    methods: {
        ...mapActions({
            categories: 'fetchCategories'
        }),
        fetchCategories() {
            this.categories(this.getToken)
        },
        calcProfit() {
            this.form.profit = this.form.price - this.form.cpu
            let pm =  (this.form.profit-this.form.cpu)/this.form.profit
            this.form.profitMargin = pm.toFixed(2)
        },
        uncheckCustom(id) {
            if (id === 'bs') {
                this.form.tags.bs = false
            }else {
                this.form.tags.new = false
            }
        },
        uploadClick(id) {
            document.getElementById(id).click()
        },
        uploadTemp() {
            this.imageUploaded = true
            this.doingtempUpload = true
            this.progress = '40%'
            this.form.image = this.form.image = this.$refs.img.files[0];
            let formData = new FormData();
            formData.append('image', this.form.image);
            axios.post( this.getHostname+'/api/temp-upload?token='+this.getToken,
                    formData,
                    {
                        headers: {
                            'Content-Type': ['multipart/form-data', 'application/json']
                        },
                    }
            ).then((res) => {
                this.progress = '100%'
                const newImg = {
                    id: res.data.id,
                    image: res.data.img,
                }
                this.form.tempImage.push(newImg)
                this.form.image = null
                document.getElementById('prod_img').value = null
                this.doingtempUpload = false
            }).catch((err) => {
                console.log(err)
                    
            })
            
        },
        doUpload() {
            axios.post( this.getHostname+'/api/products?token='+this.getToken,
                    this.form,
                    {
                        headers: {
                            'Content-Type': ['application/json']
                        },
                    }
            ).then((res) => {
                const payload = {
                    id: 'success',
                    title: res.data.title,
                    body: res.data.body
                }
                this.$store.commit('showAlert', payload)
                window.scrollTo(0,0)
            }).catch(() => {
                const payload = {
                    id: 'danger',
                    title: 'Submition error',
                    body: 'please fill out the required fields.'
                }
                this.$store.commit('showAlert', payload)
                window.scrollTo(0,0)
                    
            })
            
        },
        deltmp(id) {
            //api call
            axios.delete(this.getHostname+'/api/temp-upload/'+id+'?token='+this.getToken)
            .then(() => {
                this.form.tempImage = this.form.tempImage.filter(img => img.image !== id)
                if(this.form.tempImage.length < 1) {
                    this.imageUploaded = false
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
.content-main-holder{
    padding: 10px 15px;
    width: 80%;
    margin: 0 auto;
}





label{
    position: relative;
    width: 100%;
    color: rgba(21, 31, 57, 0.7);
}
.required{
    position: absolute;
    right: 0;
    font-size: 0.7em;
    color: rgba(21, 31, 57, 0.5);
}

.form-group,.form-row{
    margin-bottom: 30px ;
}
.form-group:last-child,.form-row:last-child{
    margin-bottom: 0;
}
.image-hold{
    border: 1px dashed rgba(21, 31, 57, 0.4);
    border-radius: 6px;
    height: auto;
}
.image-hold .empty-state{
    text-align: center;
    padding: 40px;
}
.image-in{
    text-align: left;
    padding: 20px;
}
.image-hold svg{
    height: 28px;
}
.image-hold p span{
    color: rgba(21, 31, 57, 0.6);
}
.icon-upload{
    fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:3px;
}
.under-input-label{
    color: rgba(21, 31, 57, 0.6);
    font-size: 0.9em;
    margin-top: 7px;
    display: block;
    
}
.checkbox-hold .checkbox-custom{
    border-color: #ced4da;
}
.chk-label{
    margin-left: 34px;
}
.mebtn-primary{
    padding-left: 25px;
    padding-right: 25px;
}

.checkbox-custom {
     border: 2px solid rgba(21, 31, 57, 0.6);
}
.checkbox-hold{
    margin-left: 0;
}


.imghold-div, .imghold-div2{
    height: 160px;
    width: 150px;
    margin-right: 20px;
    position: relative;
    border-radius: 6px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    text-align: center;
}
.imghold-div{
    border: 1px solid #ddd;
}

.prodImg{
    width: 100%;
}
.image-in div:last-child{
    margin-right: 0;
}

.imghold-div button, .imghold-div2 button{
    position: absolute;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    height: 34px;
    width: 34px;
    right: -15px;
    top: -15px;
    padding: 0;
    text-align: center;
    line-height: 31px;
}
.imghold-div button svg{
    height: 12px;
}
.imghold-div button .icon-close{
    fill: #ffffff;
}
.addTo {
    width: 100%;
    height: 100%;
    border: 1px #ddd dashed;
    border-radius: 6px;
}
.addTo button{
    border: none;
    border-radius: 50%;
    height: 48px;
    width: 48px;
    padding: 8px;
    background-color: rgba(0, 70, 235, 0.05);
    top: 35% !important;
    right: 35% !important;

 }
.addTo svg{ 
    transform: rotate(45deg);
    height: 15px
}
.addTo svg .icon-close{
    fill: rgb(0, 72, 235);
}
.imghold-div-uploading{
    padding: 77px 10px;
    border: 1px #ddd solid;
    border-radius: 6px;
}
.imghold-div-uploading .progress-wrap{
    position: relative;
    height: 6px;
    width: 100%;
    background-color: #eeeeee;
    border-radius: 2px;
}
.progress-wrap span{
    position: absolute;
    display: block;
    background-color: rgb(0, 72, 235);
    left: 0;
    height: 6px;
    border-radius: 2px;
    transition: 0.5s all;
}
#tags span{
    display: block;
    background-color: rgba(21, 31, 57, 0.1);
    padding: 5px 15px;
    margin-right: 5px;
    font-size: 0.9em;
    border-radius: 20px;
}
#tags span:last-child{
    margin-left: 0;
}
#tags span svg{
    height: 10px;
    margin-left: 7px;
    cursor: pointer;
    
}

.custom-checkhold{
    position: relative;
}
.custom-checkhold .custom-check-list{
    position: absolute;
    right: 0;
    top: -50px;
    width: 230px;
    box-shadow: 0 2px 3px 2px rgba(0, 0, 0, 0.01);
    background-color: #ffffff;
    border-radius: 14px;
    padding: 35px 18px;
    border: 1px solid #F0F5FC;
    box-shadow: 0 1px 10px 0 rgb(0 0 0 / 6%);
    z-index: 101;
}
.custom-checkhold .custom-check-list label:last-child{
    margin-bottom: 0px;
}
.custom-checkhold .custom-check-list label{
    margin-bottom: 18px;
}
#tag_trigger{
    color: rgba(21, 31, 57, 0.3);
    display: block;
    text-decoration: none !important;
    border: 1px solid #ced4da;
    border-radius: 6px;
    padding: 12px;
}
.custom-check-list a{
    position: absolute;
    right: 0;
    top: 0;
    padding: 6px 12px;
}
.custom-check-list a svg{
    height: 12px;
}.custom-check-list a .icon-close, #tags span .icon-close{
    fill:none;stroke:#0048eb;stroke-linecap:round;stroke-width:2px;
}
.custom-select {
    line-height: 31px;
    border-radius: 6px;
    height: auto;
}



</style>