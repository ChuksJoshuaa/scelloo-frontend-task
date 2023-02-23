<template>
    <div class="bg-white h-full w-full">
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
                <h2 class="py-3 px-3 text-sm md:text-lg uppercase">Sort by:</h2>
                <div class="border-b border-gray-400">
                    <div v-for="item in getSortData" :key="item.id" class="px-3 flex justify-between mb-2 py-1 text-sm md:text-md" :class="item.name === chosenSort ? `${sortColor}`:''"
                        @click="changeSort" @keypress="changeSort">
                        <button class="capitalize cursor-pointer" :class="item.name === chosenSort ? 'font-semibold leading-2 text-gray-700':'font-medium text-gray-400'" :value="item.name">{{ item.name }}</button>
                        <span class="h-6 w-6 rounded-full p-2" :class="item.name === chosenSort ? 'bg-blue-400' : 'bg-white'">
                            <p class="h-1 w-1 rounded-full p-1 bg-white"></p>
                        </span>
                    </div>
                </div>
                <h2 class="py-3 px-3 text-sm md:text-lg uppercase">Users:</h2>
                <div>
                    <div v-for="item in getInfoData" :key="item.id" class="px-3 flex justify-between mb-2 py-1  text-sm md:text-md" :class="item.name === activeUsers ? `${activeColor}`:''"
                    @click="changeActiveUsers" @keypress="changeActiveUsers" 
                    >
                        <button class="capitalize cursor-pointer"
                        :class="item.name === activeUsers ? 'font-semibold leading-2 text-gray-700' : 'font-medium text-gray-400'" :value="item.name">{{ item.name }}</button>
                        <span class="h-6 w-6 rounded-full p-2" :class="item.name === activeUsers ? 'bg-blue-400':'bg-white'">
                            <p class="h-1 w-1 rounded-full p-1 bg-white"></p>
                        </span>
                    </div>
                </div>
            </div>
            <div class="">
                <button class="p-3 bg-[#6D5BD0] text-white font-medium rounded-lg">PAY DUES</button>
            </div>
        </div>

        <UserContent :data="data"/>
    </div>
</template>


<script>
import { mapGetters } from "vuex";
import UserContent from "./UserContent.vue";

export default {
    name: "Body",

    components: { UserContent },

    props: ["data"],

    data() {
        return {
            showFilter: false,
            chosenSort: '',
            activeUsers: '',
            sortColor: '',
            activeColor: '',
            searchText: '',
        }
    },


    created() {
        this.chosenSort = "Default"
        this.activeUsers = "All"

        
    },

    computed: mapGetters(["getSortData", "getInfoData", "getUserData"]),

    methods: {
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

            console.log(this.chosenSort)

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


        searchInput() {
            console.log(this.searchText)
        }

        

    }
}

</script>