<template>
    <div class="bg-white h-full w-full rounded-lg border border-gray-100 mt-7">
        <div class="flex flex-wrap justify-between p-3 relative">
            <div class="flex mb-2">
                <button  class="border border-[#C6C2DE] h-[50px] text-xl mr-4 rounded-lg w-24 text-[#25213B]" @click="chooseButton">
                    <img src="https://res.cloudinary.com/chuksmbanaso/image/upload/v1677060094/filter_r9w0yl.png" class="inline-block"/>
                     Filter
                </button>
                <div class="relative">
                    <input v-model="searchText" @keyup="searchInput" class="p-3 pl-12 min-w-[200px] w-[250px] md:w-[550px] bg-gray-100 outline-0 focus:outline-0 hover:border hover:border-[#6D5BD0] rounded-lg" placeholder="Search User by Name, Email or Date">
                    <img src="https://res.cloudinary.com/chuksmbanaso/image/upload/v1677060122/search_rstzys.png" class="absolute top-3 left-2 z-50">
                </div>
            </div>
            <div v-if="showFilter" class="absolute z-40 bg-white border-2 border-gray-200 shadow w-[230px] h-auto mt-[8em] ml-[5em]">
                <div class="flex justify-between py-3 px-3 items-center">
                    <h2 class="text-md md:text-lg text-gray-900 font-bold uppercase">Sort by:</h2>
                    <button @click="closeFilterButton" @focus="closeFilterButton">
                        <img
                       src="https://res.cloudinary.com/chuksmbanaso/image/upload/v1677082323/close_o0kgvc.png" class="inline-block w-5 h-5 cursor-pointer font-bold" />
                    </button>
                </div>
                <div class="border-b border-gray-400">
                    <div v-for="item in getSortData" :key="item.id" class="px-3 flex justify-between mb-2 py-1 text-md md:text-lg" :class="item.name === chosenSort ? `${sortColor}`:''"
                        @click="changeSort" @keydown="changeSort">
                        <button class="capitalize cursor-pointer" :class="item.name === chosenSort ? 'font-semibold leading-2 text-gray-900':'font-medium text-gray-400'" :value="item.name">{{ item.name }}</button>
                        <span class="h-6 w-6 rounded-full p-2" :class="item.name === chosenSort ? 'bg-[#4A4AFF]' : 'bg-white'">
                            <p class="h-1 w-1 rounded-full p-1 bg-white"></p>
                        </span>
                    </div>
                </div>
                <h2 class="py-3 px-3 text-md font-bold text-gray-900 md:text-lg uppercase">Users:</h2>
                <div>
                    <div v-for="item in getInfoData" :key="item.id" class="px-3 flex justify-between mb-2 py-1  text-md md:text-lg" :class="item.name === activeUsers ? `${activeColor}`:''"
                    @click="changeActiveUsers" @keydown="changeActiveUsers" 
                    >
                        <button class="capitalize cursor-pointer"
                        :class="item.name === activeUsers ? 'font-semibold leading-2 text-gray-900' : 'font-medium text-gray-400'" :value="item.name">{{ item.name }}</button>
                        <span class="h-6 w-6 rounded-full p-2" :class="item.name === activeUsers ? 'bg-[#4A4AFF]':'bg-white'">
                            <p class="h-1 w-1 rounded-full p-1 bg-white"></p>
                        </span>
                    </div>
                </div>
            </div>
            <div class="">
                <button class="p-3 bg-[#6D5BD0] text-white font-medium rounded-lg" @click="yes">PAY DUES</button>
            </div>
        </div>

        <div>
          <UserContent :data="getUserData.slice(startnum, newNum)"/>
          <!-- <UserContent :data="newData.slice(startnum, endnum + newNum)"/> -->
        </div>
         

        <div v-if="searchText.length === 0" class="flex flex-nowrap gap-24 justify-end bg-[#F4F2FF] text-[#6E6893] p-6">
            <div class="">Rows per page 
              <select v-model="intervalnum" @change="increaseNum" class="bg-transparent">
                <option v-for="(option, index) in pageNum" :key="index" :value="option" >{{ option }}</option>
              </select> 
            </div>
            <div >{{ getUserData.length > 0 ? startnum + 1 : 0 }} - {{ getUserData.length < newNum ? getUserData.length : newNum }} of {{ getUserData.length }}</div>
            <div class="flex gap-16">
              <button @click="prevPage" :disabled="getSetFalse">
                <img src="https://res.cloudinary.com/chuksmbanaso/image/upload/v1677060093/arrow-left_ggscnm.png" class="h-fit cursor-pointer"/></button> 
              <button @click="nextPage" :disabled="getSetFalse">
                <img src="https://res.cloudinary.com/chuksmbanaso/image/upload/v1677060098/arrow-right_l2w7bb.png" class="h-fit cursor-pointer"/>
              </button>
            </div>
        </div>
        <div v-else class="flex flex-nowrap gap-24 justify-end bg-[#F4F2FF] text-[#6E6893] p-6">
            <div class="">Rows per page 
              <select v-model="intervalnum" class="bg-transparent">
                  <option v-for="(option, index) in pageNum" :key="index" :value="option" >{{ option }}</option>
              </select> 
            </div>
              <div >{{ getUserData.length > 0 ? startnum + 1 : 0 }} - {{ getUserData.length < newNum ? getUserData.length : newNum }} of {{ getUserData.length }}</div>
            <div class="flex gap-16">
              <button @click="prevPage" :disabled="getSetFalse">
                <img src="https://res.cloudinary.com/chuksmbanaso/image/upload/v1677060093/arrow-left_ggscnm.png" class="h-fit cursor-pointer"/>
              </button> 
              <button @click="nextPage" :disabled="getSetFalse">
                <img src="https://res.cloudinary.com/chuksmbanaso/image/upload/v1677060098/arrow-right_l2w7bb.png" class="h-fit cursor-pointer"/>
              </button> 
            </div>
        </div>
    </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import UserContent from "./UserContent.vue";
import _ from "lodash"

export default {
    name: "Body",

  components: { UserContent },

    data() {
        return {
          showFilter: false,
          chosenSort: '',
          activeUsers: '',
          sortColor: '',
          activeColor: '',
          searchText: '',
          startnum: 0,
          endnum: 10,
          intervalnum: 10,
          pages: 1,
          pageNum: [2, 4, 6, 8, 10],
          clearSearchLength: false,
          newNum: 10,
          newData: [],
        }
  },

   


    created() {
      this.chosenSort = "Default"
      this.activeUsers = "All"
  },

  mounted() {
    this.newData = this.getPaginateData[this.getPage]
    this.setData(this.newData)
  },

    watch: {
      newData: function () {
        console.log(this.newData)
      }
    },

  computed: mapGetters(["getSortData", "getInfoData", "getUserData",
    "getPaymentStatusData", "getPayDue", "getPaginateData", "getPage", "getChosenHeaderData", "getSetFalse"]),

    methods: {
         ...mapActions(["setData", "changeSortAction", "prevPageAction", "nextPageAction", "changeChosenHeaderAction", "setFalseAction"]),
        closeFilterButton() {
            this.showFilter = false
        },

        chooseButton() {
            if (this.showFilter) {
                this.showFilter = false
            }
            else {
                this.showFilter = true
            }
        },

        changeSort(e) {
            this.chosenSort = e.target.value

            const chosenData = this.chosenSort

            const sortData = _.sortBy(this.getUserData, [
                function (o) {
                    if (chosenData === "First Name") {
                         return o.first_name;
                    }

                    if (chosenData === "Last Name") {
                        return o.last_name;
                    }

                    if (chosenData === "Email") {
                        return o.email
                    }
                },])

              this.changeSortAction(sortData)

            this.sortColor = 'bg-[#F4F2FF]'

            setTimeout(() => {
                this.sortColor = ''
            }, 1000);
        },

        changeActiveUsers(e) {
            this.activeUsers = e.target.value

            console.log(this.activeUsers)

            this.activeColor = 'bg-[#F4F2FF]'

            setTimeout(() => {
                this.activeColor = ''
            }, 1000);
      },

      increaseNum() {
        console.log(this.intervalnum) 
        this.newNum = this.intervalnum
      },

      searchInput() {
          let check = this.getUserData
          let randomCheck = this.getPaymentStatusData
        if (this.searchText.length === 0) {
            randomCheck = randomCheck.slice(this.startnum, this.endnum)
            this.setData(randomCheck)
            if (this.getChosenHeaderData === 'All') {
              this.setFalseAction(false)
            }
          } else {
            let searchResult = new RegExp(`${this.searchText}`, 'gi')
            check = check.filter((item) => item.first_name.match(searchResult) || item.last_name.match(searchResult) || item.email.match(searchResult) || item.payment_date.match(searchResult) || item.due_date.match(searchResult))
            check = check.slice(this.startnum, this.endnum)
            this.setData(check)

            if (check.length <= 10) {
              this.setFalseAction(true)
            }
          }
          
      },

      yes() {
        //Send to the api endpoint labelled ‘mark-paid’.
        const filteredPaidFromUnpaid = this.getPayDue.filter((item) => item.payment_status !== 'Paid')
        if (filteredPaidFromUnpaid.length === 0) {
          alert('please check the unpaid or overdue box before clicking on pay dues')
        }
        else {
          alert("Pay due is successful")
          console.log(filteredPaidFromUnpaid)
        }
      },

      nextPage() {
          const newPage = () => {
            let nextPage = this.getPage + 1;
            if (nextPage > this.getPaginateData.length - 1) {
                nextPage = 0;
              }
              return nextPage;
          };

        let index = newPage()
        this.nextPageAction(index)


        this.newData = this.getPaginateData[this.getPage]
        this.changeChosenHeaderAction(this.getChosenHeaderData)
        this.setData(this.newData)
      },

      prevPage() {
        const newPage = () => {
          let prevPage = this.getPage - 1;
          if (prevPage < 0) {
            prevPage = this.getPaginateData.length - 1;
          }
          return prevPage;
        }

        let index = newPage()

        this.prevPageAction(index)

        this.newData = this.getPaginateData[this.getPage]
        this.changeChosenHeaderAction(this.getChosenHeaderData)
        this.setData(this.newData)
      },
    }
}

</script>