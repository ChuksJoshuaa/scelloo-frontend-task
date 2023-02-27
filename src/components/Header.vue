<template>
    <div class="mb-2">
        <h2 class="uppercase text-gray-800 font-bold mb-5 pt-3 px-0 md:px-3 text-xl md:text-2xl">Table heading</h2>
        <div class="flex flex-col-reverse md:flex-row justify-between border-b-2 border-gray-300 mt-3">
            <div class="flex justify-between md:justify-start">
                <div v-for="item in getHeader" :key="item.id" :class="chosenHeader === item.name ? 'font-bold text-blue-800 pb-3 border-b-2 border-blue-800' : ''">
                    <button class="text-lg md:text-xl capitalize cursor-pointer mr-1 md:mr-3 px-1 md:px-2" :value="item.name" @click="handle">
                        {{ item.name }}</button>
                </div>
            </div>
            <div class="text-md md:text-lg pt-2 pb-3 md:pt-0 md:pb-0">
                <p class=" text-[#6E6893]">Total Payable amount: <span class="text-lg md:text-xl font-bold text-[#6D5BD0]">$900.00</span><span class="text-lg md:text-xl font-bold text-[#6E6893]"> USD</span></p>
            </div>
        </div>
    </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';

export default {
   name: "Header",

    data() {
        return {
            chosenHeader: "",
        }
    },

    computed: mapGetters(["getHeader"]),

    created() {
        this.chosenHeader = "All"
    },

    methods: {
        ...mapActions(["changePaymentAction", "changeChosenHeaderAction", "setFalseAction"]),

        async handle(e) {
            this.chosenHeader = e.target.value

            this.changePaymentAction(this.chosenHeader)
            this.changeChosenHeaderAction(this.chosenHeader)

            if (this.chosenHeader === "All") {
                this.setFalseAction(false)
            }

            else {
                this.setFalseAction(true)
            }
        },
    }
}
</script>