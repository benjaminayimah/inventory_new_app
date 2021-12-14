import axios from 'axios'
//import { setTimeout } from 'core-js';
//import auth from './auth'
export default {
    state: {
        hostname: 'http://localhost:8000',
        token: localStorage.getItem('token') || null,
        user: {},
        avatar: require('@/assets/img/avatar-default.png'),
        unpinSidebar: false,
        sideExpand: false,
        toggleSideDrop1: false,
        toggleSideDrop2: false,
        products : [],
        categories: [],
        productCheckall: false,
        checkedItems: [],
        showOverlay: false,
        alert: { status: { show: false, success: false, danger: false, warning: false, info: false }, title: 'this tile', body: 'this is body' },
        CategoryFormEdit: {show: false, id: '', name: ''},
        drops: {
            overlay: false,
            types: {tagDrop: false}
        },
        
        //acctToggle: false,


        
       
        message: '',
        count: 0
    },
    mutations: {
        //authentication
        setAuthToken(state, payload){
            state.token = payload;
        },
        setUser(state, payload) {
            state.user = payload
        },
        destroyToken(state){
            localStorage.removeItem('token')
            state.token = null
            location.reload()
        },
        toggleSideNav(state){
            state.unpinSidebar = !state.unpinSidebar
        },
        sidebarExpand(state){
            if(state.unpinSidebar === true){
                state.sideExpand = true
            }
        },
        sidebarRetract(state){
            if(state.unpinSidebar === true){
                state.sideExpand = false 
            }
        },
        toggleDrop(state, payload){
            if(payload === 'toggleSideDrop1') {
              state.toggleSideDrop1 = !state.toggleSideDrop1
              state.toggleSideDrop2 = false
            }else{
                state.toggleSideDrop2 = !state.toggleSideDrop2
                state.toggleSideDrop1 = false
            }
            
        },
        setThisCheck(state, payload) {
            if (!state.productCheckall) {
                state.productCheckall = true
            }
            state.checkedItems.push(payload)
            
            let row = document.getElementById('ptr_'+payload)
            row.attributes.class.value = 'row-checked'
            //window.console.log(row)
        },
        minusThisCheck(state, payload) {
            const i = state.checkedItems.indexOf(payload)
            if (i > -1) {
                state.checkedItems.splice(i, 1)
            }
            if(state.checkedItems.length < 1) {
                state.productCheckall = false
            }
            let row = document.getElementById('ptr_'+payload)
            row.attributes.class.value = ''

        },
        setCheckAll(state) {
            state.checkedItems = []
            let selected = document.getElementById('product_tbody')
            for (let i = 0; i < selected.rows.length; i++) {
                let row = selected.rows[i]
                let checkbox = row.firstChild.firstChild.firstChild
                let id = checkbox.attributes.id.value
                checkbox.checked = true
                row.attributes.class.value = 'row-checked'
                state.checkedItems.push(Number(id))
            }
            state.productCheckall = true      
        },
        unCheckAll(state) {
            let selected = document.getElementById('product_tbody')
            for (let i = 0; i < selected.rows.length; i++) {
                let row = selected.rows[i]
                row.firstChild.firstChild.firstChild.checked = false
                row.attributes.class.value = ''
            } 
            state.checkedItems = [] 
            state.productCheckall = false 
        },
        removeProduct: (state, id) => { 
            state.products = state.products.filter(product => product.id !== id)
            const i = state.checkedItems.indexOf(id)
            if (i > -1) {
                state.checkedItems.splice(i, 1)
            }
            if(state.checkedItems.length < 1) {
                state.productCheckall = false
            }

        },
        removeCategory: (state, id) => { 
            state.categories = state.categories.filter(category => category.id !== id)
            const i = state.checkedItems.indexOf(id)
            if (i > -1) {
                state.checkedItems.splice(i, 1)
            }
            if(state.checkedItems.length < 1) {
                state.productCheckall = false
            }

        },
        bulkRemoveproducts(state) {
            let checkedItms = state.checkedItems
            let product = state.products
            for (let i = product.length - 1; i>=0 ; i--) {
                for (let j = 0; j< checkedItms.length; j++) {
                    if (product[i] && (product[i].id === checkedItms[j] )) {
                        product.splice(i, 1)
                    } 
                } 
            }
            state.checkedItems = []
            state.productCheckall = false 
        },
        bulkRemoveCategories(state) {
            let checkedItms = state.checkedItems
            let category = state.categories
            for (let i = category.length - 1; i>=0 ; i--) {
                for (let j = 0; j< checkedItms.length; j++) {
                    if (category[i] && (category[i].id === checkedItms[j] )) {
                        category.splice(i, 1)
                    } 
                } 
            }
            state.checkedItems = []
            state.productCheckall = false 
        },
        unCheckAllAndEmpty(state) {
            state.checkedItems = []
            state.productCheckall = false
        },

        fetchProducts(state, payload) {
            state.products = payload
        },
        fetchMessage(state, payload) {
            state.message = payload
        },
        increaseCounter(state){
            state.count++
        },
        reduceCounter(state){
            state.count--
        },
        closeOverlay(state){
            state.showOverlay = false
        },
        showOverlay(state){
            state.showOverlay = true
        },
        CategoryFormToggle(state, payload){
            this.commit('clearCategoryFormTog')
            if(payload !== 'save') {
                state.CategoryFormEdit.show = true
                state.CategoryFormEdit.id = payload.id
                state.CategoryFormEdit.name = payload.name
            }
            this.commit('showOverlay') 
        },
        clearCategoryFormTog(state){
            state.CategoryFormEdit.show = false
            state.CategoryFormEdit.id = ''
            state.CategoryFormEdit.name = ''
        },
        updateCategoryForm(state, payload) {
            state.categories.forEach(element => {
                if (element.id === payload.id) {
                    element.name = payload.name
                }
            });
            state.CategoryFormEdit.name = payload.name
        },
        fetchCategories(state, payload) {
            state.categories = payload
        },
        addToCategories(state, payload) {
            state.categories.push(payload)
        },
        showAlert(state, payload) {
            this.commit('dismisAlert')
            if(payload.id === 'success'){
                state.alert.status.show = true
                state.alert.status.success = true
                state.alert.title = payload.title
                state.alert.body = payload.body
            }else if(payload.id === 'danger'){
                state.alert.status.show = true
                state.alert.status.danger = true
                state.alert.title = payload.title
                state.alert.body = payload.body
            }
            /*setTimeout(() => {
                this.commit('dismisAlert')
            }, 5000);*/
            
        },
        dismisAlert(state) {
            for (let i in state.alert.status)
            state.alert.status[i] = false
            state.alert.body = ''
            state.alert.title = ''
        },
        //drops
        showTagDrop(state) {
            state.drops.overlay = true
            state.drops.types.tagDrop = true
        },
        dismissDrop(state) {
            state.drops.overlay = false
            for (let i in state.drops.types)
            state.drops.types[i] = false
        }
    },
    actions: {
        async signIn(state, credentials){
            const res = await axios.post(this.getters.getHostname+'/api/sign-in', credentials)
            try {
                state.commit('setAuthToken', res.data.token)
                localStorage.setItem('token', res.data.token)
                //location.reload()
            } catch(e) {
                console.log(e)
            }   
        },
        getAuthUser(state, payload) {            
            axios.post(this.getters.getHostname+'/api/user?token='+payload)
            .then((res) => {
                state.commit('setUser', res.data.user)   
            }).catch(() => {
                state.commit('destroyToken')    
            })      
        },
        async Logout(state){
            axios.delete(this.getters.getHostname+'/api/logout')
            state.commit('destroyToken') 
        },
        
        async fetchProducts(state, payload){
            state.commit('unCheckAllAndEmpty')
            const res = await axios.get(this.getters.getHostname+'/api/products?token='+payload)
            state.commit('fetchProducts', res.data.products)
            //console.log(res.data.products) 
        },
        async deleteProduct(state, id) {
            const res = await axios.delete(this.getters.getHostname+'/api/products/'+id+'?token='+this.getters.getToken)
            state.commit('removeProduct', id)
            console.log(res.data)
        },
        async bulkDelproducts(state) {
            let checkedItms = this.getters.getCheckedItems
            axios.post( this.getters.getHostname+'/api/bulk-del-products?token='+this.getters.getToken,
                [checkedItms],
                    {
                        headers: {
                            'Content-Type': ['application/json']
                        },
                    }
            ).then(() => {
            state.commit('bulkRemoveproducts')
            }).catch((err) => {
                console.log(err)
                    
            })
            //const res = await axios.delete(this.getters.getHostname+'/api/bulk-delete/'+checkedItms+'?token='+this.getters.getToken)
            //console.log(res)
            
            //state.commit('bulkRemoveproducts')
        },
        async deleteCategory(state, id) {
            axios.delete(this.getters.getHostname+'/api/category/'+id+'?token='+this.getters.getToken)
            .then(() => {
                state.commit('removeCategory', id)
            }).catch((err) => {
                console.log(err)
                    
            })
        },
        async bulkDeleteCategories(state) {
            let checkedItms = this.getters.getCheckedItems
            axios.post( this.getters.getHostname+'/api/bulk-del-categories?token='+this.getters.getToken,
                [checkedItms],
                    {
                        headers: {
                            'Content-Type': ['application/json']
                        },
                    }
            ).then(() => {
            state.commit('bulkRemoveCategories')
            }).catch((err) => {
                console.log(err)
                    
            })
        },
        async fetchCategories(state, payload){
            state.commit('unCheckAllAndEmpty')
            const res = await axios.get(this.getters.getHostname+'/api/category?token='+payload)
            state.commit('fetchCategories', res.data.categories)
            //console.log(res.data.categories) 
        }
        

    },
    modules: {
        //auth
    },
    getters: {
        getHostname: (state) => state.hostname,
        auth(state){
            return state.token !== null
        },
        getUser(state) {
            return state.user
        },
        getToken: (state) => state.token,
        getAvatar: (state) => state.avatar,
        getSidebar: (state) => state.unpinSidebar,
        getSideExpand: (state) => state.sideExpand,
        getSideDrop1: (state) => state.toggleSideDrop1,
        getSideDrop2: (state) => state.toggleSideDrop2,
        getProducts: (state) => state.products,
        getAllchecks: (state) => state.productCheckall,
        getCheckedItems: (state) => state.checkedItems,
        getCategories: (state) => state.categories,
        getOverlay: (state) => state.showOverlay,
        getAlert: (state) => state.alert,
        getCategoryFormEdit: (state) => state.CategoryFormEdit,
        getTagdrop: (state) => state.drops.types.tagDrop,
        getDropState: (state) => state.drops.overlay,

        

        






        //getAcctToggle: (state) => state.acctToggle,


        
        getMessage(state){
            return state.message
        },
        getCount: (state) => state.count
    }
}
