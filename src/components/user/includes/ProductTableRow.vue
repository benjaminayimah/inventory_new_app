<template>
    <tr :id="'ptr_'+item.id" class="no-class">
        <td>
            <label class="checkbox-hold">
                <input :id="item.id"  type="checkbox" v-model="checked" @change="checkState(item.id)">
                <span class="checkbox-custom" ></span>
            </label>
        </td>
        <td class="prod-cell">
            <div class="flex">
                <div class="prod-img" :style="item.cover_img? { backgroundImage: 'url('+this.getHostname+'/storage/'+ this.getUser.id+'/'+item.cover_img+')'} : { backgroundImage: 'url('+this.getHostname+'/storage/default_product.png'+')'}">
                <!--<img height="50px" width="50px" style="border-radius: 5px" :src="item.cover_img? this.getHostname+'/storage/'+ this.getUser.id+'/'+item.cover_img : this.getHostname+'/storage/default_product.png'" alt="image">-->
            </div>
            <div class="pl-3">
                <div class="prod-name">{{ item.name }}</div>
                <div v-if="item.price" class="prod-sub">GH₵ {{ item.price }}</div>
            </div> </div>  
        </td>
        <td><div class="td-status-wrap" v-bind:class="[(item.status === 'active' ? 'status-active' : ''), (item.status === 'draft' ? 'status-draft' : ''), (item.status === 'disabled' ? 'status-disabled' : '')]"><span>{{ item.status | capitalize }}</span></div></td>
        <td>{{ item.quantity }}</td>
        <td>{{ item.product_type }}</td>
        <td>
            <span class="item-date">{{ item.created_at | formatDate }}</span>
            <div class="table-actions">
                <ul>
                    <li><router-link :to="'product-edit/'+item.id+'/'+item.name" class="edit btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path class="edit-icon icon" d="M0,12.67V16H3.33l9.83-9.83L9.83,2.84ZM15.74,3.59a.88.88,0,0,0,0-1.25h0L13.66.26a.88.88,0,0,0-1.25,0h0L10.78,1.89l3.33,3.33Z" transform="translate(0 0)"/></svg><span>Edit</span></router-link></li>
                    <li><a @click.prevent="$store.dispatch('deleteProduct', item.id)" href="#" class="del btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.2 16"><path class="icon delete-icon" d="M.87,14.22A1.77,1.77,0,0,0,2.61,16h7a1.76,1.76,0,0,0,1.74-1.78V3.56H.87ZM12.2.89h-3L8.28,0H3.92L3.05.89H0V2.67H12.2Z" transform="translate(0 0)"/></svg><span>Delete</span></a></li>
                </ul>
            </div>
        </td>
    </tr> 
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'ProductTableRow',
    props: ['item'],
    computed: mapGetters(['getAllchecks', 'getHostname', 'getUser']),
    data() {
        return {
            checked: false
        }
    },
    methods: {
        checkState(id) {
            this.checked ? this.$store.commit('setThisCheck', id): this.$store.commit('minusThisCheck', id)
            
        }
    }
    
}
</script>

<style scoped>
.table-actions{
    display: none;
}
.prod-img{
    height: 50px;
    width: 50px;
    position: relative;
    border-radius: 5px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}
.prod-sub{
    color: #C1C1C1;
    font-size: 0.9em;
}




</style>