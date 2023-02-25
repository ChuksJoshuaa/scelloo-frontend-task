
<template>
    <div class="">
     <div class="flex flex-nowrap bg-[#F4F2FF] p-4 px-0 border-y-1 border-[#D9D5EC] overflow-x-auto text-[#6E6893] font-medium">
          <div class="w-1/3 overflow-x-auto text-sm md:text-lg px-3"><input type="checkbox" v-model="allChecked" class="p-2 w-5 h-5 rounded-md"/></div>
          <div class="w-[65%] overflow-x-auto text-sm md:text-lg">NAME</div>
          <div class="w-[70%] overflow-x-auto text-sm md:text-lg">USER STATUS</div>
          <div class="w-[35%] overflow-x-auto text-sm md:text-lg">PAYMENT STATUS</div>
          <div class="w-[35%] overflow-x-auto text-sm md:text-lg">AMOUNT</div>
          <div class="w-1/5 overflow-x-auto text-sm md:text-lg text-right px-5"><img src="https://res.cloudinary.com/chuksmbanaso/image/upload/v1677082353/More_v9ezsg.png" class="inline-block"></div>
      </div>
      <div v-for="item in data" :key="item.id" v-if="data.length > 0">
          <div class="flex flex-nowrap p-4 px-3 pt-3 overflow-x-auto border-b border-[#D9D5EC]" :class="showingdown && item.first_name === nameValue ? 'bg-[#F2F0F9]':''">
              <div class="w-1/3 overflow-x-auto text-sm md:text-lg">
                <input type="checkbox" v-model="selected" :value="item"  class="p-2 w-5 h-5 rounded-md inline-block"/> 
                <button class="inline-block ml-4 mt-3" :value="item.first_name" @click="toggleShow" v-if="showingdown && item.first_name === nameValue" @focus="toggleShow">
                  <img  src="https://res.cloudinary.com/chuksmbanaso/image/upload/v1677082229/Up_sp1wbo.png"  class="-mt-3 ml-4 h-5 w-5 inline-block cursor-pointer"  /> 
                </button>
                <button v-else class="inline-block ml-4 mt-3" :value="item.first_name" @click="toggleShow" @focus="toggleShow">
                   <img  src="https://res.cloudinary.com/chuksmbanaso/image/upload/v1677082472/down-arrow_ic4hw3.png"  class="-mt-3 ml-4 h-5 w-5 inline-block cursor-pointer"/>
                </button>
              </div>
              <div class="w-3/4 overflow-x-auto text-sm md:text-lg">{{ item.first_name }} {{ item.last_name }} <br> <span class="text-gray-400 text-sm md:text-lg">{{ item.email }}</span></div>
              <div class="w-9/12 overflow-x-auto text-sm md:text-lg">
                  <span class="rounded-2xl px-2" :class="{ 'bg-[#E6E6F2] text-[#4A4AFF]': item.user_status == 'Active', 'text-[#6E6893] bg-[#F2F0F9]': item.user_status == 'Inactive' }"><span 
                    :class="{ 'bg-[#4A4AFF]': item.user_status == 'Active', 'bg-[#6E6893]': item.user_status == 'Inactive' }" class="w-2 h-2 mr-1 inline-block rounded-full"></span>{{ item.user_status }}</span>
                  <p class="py-2 text-gray-400">Last login : {{ item.last_seen }}</p>
              </div>
              <div class="w-5/12 overflow-x-auto text-sm md:text-lg">
                  <span class="rounded-2xl px-2" :class="{ 'bg-[#CDFFCD] text-[#007F00]': item.payment_status == 'Paid', 'text-[#CE8500] bg-[#FFECCC]': item.payment_status == 'Unpaid', 'text-[#D30000] bg-[#FFE0E0]': item.payment_status == 'Overdue' }">
                  <span :class="{ 'bg-[#007F00]': item.payment_status == 'Paid', 'bg-[#CE8500]': item.payment_status == 'Unpaid', 'bg-[#D30000]': item.payment_status == 'Overdue' }" class="w-2 h-2 mr-1 inline-block rounded-full"></span>{{ item.payment_status }}</span>
                  <p class="py-2 text-gray-400">{{ item.payment_status == 'Paid' ? 'Paid on' : item.payment_status == 'Unpaid' ? 'Dues on' : item.payment_status == 'Overdue' ? 'Dued on' : '' }} {{ item.payment_status == 'Paid' ? item.payment_date : item.due_date }}</p>
              </div>
              <div class="w-1/4 overflow-x-auto text-md">{{ item.symbol }}{{ item.amount }} <br><span class="block pl-2 text-sm text-gray-400">{{ item.currency }}</span></div>
              <div class="w-1/3 overflow-x-auto">
                <div v-if="showEdit && item.first_name === editName">
                  <div class="bg-white w-[180px] shadow border border-gray-400 h-auto absolute right-12 rounded-md">
                      <div :class="(i.name === choseEditName ? 'bg-purple-100 font-semibold rounded-sm' : '')" v-for="i in getEditData" :key="i.id">
                        <button :value="i.name" class="px-3 text-md md:text-lg font-medium" @click="changeEdit"
                          :class="i.color">{{ i.name }}
                        </button>
                      </div>
                      <button class="absolute top-[-0.6em] right-[-0.5em]" @click="removeEdit">
                        <img src="https://res.cloudinary.com/chuksmbanaso/image/upload/v1677082323/close_o0kgvc.png" class="inline-block w-7 h-7" />
                      </button>
                  </div>
                </div>
                <button v-else  :value="item.first_name" class="p-2 list-button w-full text-right text-[#6E6893] gap-4 rounded-md" variant="success" @focus="toggleEdit">
                  <span  class="inline-block mr-5">view more</span>
                  <img  src="https://res.cloudinary.com/chuksmbanaso/image/upload/v1677082353/More_v9ezsg.png" class="inline-block"/> 
                </button>
              </div>    
          </div>
        

          <div class="bg-[#F4F2FF]" v-if="showingdown === true && nameValue === item.first_name">
              <div class="flex flex-nowrap bg-[#F2F0F9] p-4 pl-40 border-y-1 border-[#D9D5EC] overflow-x-auto">
                  <div class="w-1/4 overflow-x-auto text-sm md:text-lg">DATE</div>
                  <div class="w-1/4 overflow-x-auto text-sm md:text-lg">USER ACTIVITY</div>
                  <div class="w-1/4 overflow-x-auto text-sm md:text-lg">DETAILS <img src="https://res.cloudinary.com/chuksmbanaso/image/upload/v1677082327/details_fk7prk.png" 
                    class="inline-block ml-3 -mt-1"></div>
              </div>
              <div v-if="item.user_activity.length > 0">
                  <div v-for="(activity, index) in item.user_activity" :key="index" class="">
                      <div class="flex flex-nowrap p-4 pl-40 mt-3 overflow-x-auto border-b border-[#D9D5EC]">
                          <div class="w-1/4 overflow-x-auto text-sm">{{ activity.date }}</div>
                          <div class="w-1/4 overflow-x-auto text-sm md:text-lg">
                              {{ activity.activity }}
                          </div>
                          <div class="w-1/4 overflow-x-auto text-sm md:text-lg">
                              {{ activity.details }}
                          </div>
                      </div>

                  </div>
              </div>
              <div v-else>
                  <p class="text-xl text-center p-5 text-[#6E6893]">NO RECORDS FOUND</p>
              </div>
          </div>
      </div>
      <div v-else class="text-center py-9 bg-[#F4F2FF]">
         <h3 class="text-lg md:text-3xl">No Search Result</h3>
      </div>
    </div>
</template>




<script>
import { mapGetters } from "vuex";

export default {
  name: "UserContent",

  data() {
    return {
      showingdown: false,
      showEdit: false,
      allChecked: false,
      nameValue: "",
      checkArray: [],
      selected: [],
      editName: "",
      choseEditName: "Edit"
    }
  },

  props: ["data"],

  computed: mapGetters(["getEditData"]),

   watch: {
    data: function () {
       this.data
     },

    allChecked(val) { this.selected = val ? this.data.map(item => item) : [] }
  },
  
  methods: {
    toggleShow(e) {
      const value = e.target.value
      this.nameValue = value
      if (this.showingdown) {
        this.showingdown = !this.showingdown
      }
      else {
        this.showingdown = !this.showingdown
      }
    },

    toggleEdit(e) {
      const value = e.target.value
      this.editName = value
      this.showEdit = true
    },

    removeEdit() {
      this.showEdit = false
    },

    changeEdit(e) {
      const value = e.target.value
      this.choseEditName = value
    }
  }
}
</script>