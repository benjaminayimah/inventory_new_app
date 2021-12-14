<template>
    <div class="content-main-holder">
        <div class="page-title-holder row">
            <div class="col-6 col"><h4>Product categories</h4></div>
            <div class="col-6 col"><a class="btn mebtn-primary" href="#" @click.prevent="$store.commit('CategoryFormToggle', 'save')">Add category</a></div>
        </div>
        <div class="main-table-hold mt-4">
            <div v-if="getCategories == ''" class="empthy-table-state">
                <div class="container">
                    <div>
                        <p class="p1">You don’t have any category yet!</p>
                        <p class="p2 pb-3">Begin by adding categories for your products.</p>
                        <p class="p3"><a class="btn mebtn-primary" href="#" @click.prevent="$store.commit('CategoryFormToggle', 'save')">Add category</a></p>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="card-header border-0">
                <div class="form-row align-items-center">
                    <div class="col-sm-3 my-1">
                        <input type="text" class="form-control" id="inlineFormInputName" placeholder="Search product...">
                    </div>
                    <div class="col-sm-3 my-1">
                        <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                            <option selected>Choose...</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                    <div class="col-sm-3 my-1">
                        <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                            <option selected>Choose...</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                    <div class="col-sm-3 text-right">
                        <a href="#" class="btn mebtn-alt">Clear all</a>
                    </div>
                </div>
                <div class="mt-4 flex" id="thead_pagination_wrap">
                    <div class="label">Showing <a href="">All products (30)</a></div>
                    <div>
                        <ul class="pagination" role="navigation">
                            <li class="page-item disabled" aria-disabled="true" aria-label="« Previous">
                                <span class="page-link" aria-hidden="true">‹</span>
                            </li>
                            <li class="page-item active" aria-current="page"><span class="page-link">1</span></li>
                            <li class="page-item"><a class="page-link" href="#item?page=2">2</a></li>
                            <li class="page-item"><a class="page-link" href="#item?page=3">3</a></li>
                            <li class="page-item"><a class="page-link" href="#item?page=4">4</a></li>
                            <li class="page-item"><a class="page-link" href="#item?page=5">5</a></li>
                            <li class="page-item">
                                <a class="page-link" href="#item?page=2" rel="next" aria-label="Next »">›</a>
                            </li>
                        </ul>
                    </div>
                </div>
            <!--<div>{{ getCheckedItems }}</div>-->
                </div>
                <div class="table-responsive">
                        <table id="products" class="table align-items-center table-flush no-border">
                            <thead class="thead-light">
                            <tr>
                                <th>
                                    <label class="checkbox-hold">
                                        <input type="checkbox"  :checked="$store.getters.getAllchecks" id="th_checkbox" @change="setAllcheck('th_checkbox')">
                                        <span class="checkbox-custom" ></span>
                                    </label>  
                                </th>
                                <th id="title_th">
                                    <span v-show="!$store.getters.getAllchecks">Category title</span>
                                    <div v-show="$store.getters.getAllchecks" class="table-actions">
                                        <ul>
                                            <li><a href="#" class="edit btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path class="edit-icon icon" d="M0,12.67V16H3.33l9.83-9.83L9.83,2.84ZM15.74,3.59a.88.88,0,0,0,0-1.25h0L13.66.26a.88.88,0,0,0-1.25,0h0L10.78,1.89l3.33,3.33Z" transform="translate(0 0)"/></svg><span>Edit selection</span></a></li>
                                            <li><a @click.prevent="$store.dispatch('bulkDeleteCategories')" href="#" class="del btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.2 16"><path class="icon delete-icon" d="M.87,14.22A1.77,1.77,0,0,0,2.61,16h7a1.76,1.76,0,0,0,1.74-1.78V3.56H.87ZM12.2.89h-3L8.28,0H3.92L3.05.89H0V2.67H12.2Z" transform="translate(0 0)"/></svg><span>Delete selection</span></a></li>
                                        </ul>
                                    </div>
                                </th>
                
                                <th><span v-show="!$store.getters.getAllchecks">Date created</span></th>
                            </tr>
                            </thead>
                            <tbody id="product_tbody">
                                <table-row  v-for="item in getCategories" :key="item.id" v-bind:item="item" />
                            </tbody>          
                        </table>
                </div>
                <ul class="pagination ml-3" role="navigation">
                    <li class="page-item disabled" aria-disabled="true" aria-label="« Previous">
                        <span class="page-link" aria-hidden="true">‹</span>
                    </li>
                    <li class="page-item active" aria-current="page"><span class="page-link">1</span></li>
                    <li class="page-item"><a class="page-link" href="#item?page=2">2</a></li>
                    <li class="page-item"><a class="page-link" href="#item?page=3">3</a></li>
                    <li class="page-item"><a class="page-link" href="#item?page=4">4</a></li>
                    <li class="page-item"><a class="page-link" href="#item?page=5">5</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#item?page=2" rel="next" aria-label="Next »">›</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import TableRow from '../includes/CategoryTableRow.vue'
export default {
    name: 'Categories',
    components: {TableRow},
    computed: mapGetters(['getCategories', 'getCheckedItems', 'getCheckedItems', 'getToken']),
    data() {
        return {
            checked: false,
        me: false,
        }
    },
    methods: {
        ...mapActions({
            categories: 'fetchCategories'
        }),
        setAllcheck(e) {
            let input = document.getElementById(e)
            input.checked ? this.$store.commit('setCheckAll'): this.$store.commit('unCheckAll')
        },
        fetchCategories() {
            this.categories(this.getToken)
        }
    },
    created() {
       this.fetchCategories()
    }
}
</script>

<style scoped>

#title_th{
    width: 70%;
}




</style>