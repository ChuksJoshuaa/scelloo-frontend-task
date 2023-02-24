import { createStore } from "vuex";
import { HeaderData } from "../utils/header";
import { UserData } from "../utils/userData";
import { sortData, infoData } from "../utils/conversions";

const store = createStore({
  state() {
    return {
      getHeader: HeaderData,
      data: UserData,
      sortData: sortData,
      infoData: infoData,
      chosenHeaderData: "All",
      paymentStatusData: UserData,
    };
  },

  getters: {
    getHeader(state) {
      return state.getHeader;
    },

    getUserData(state) {
      return state.data;
    },

    getSortData(state) {
      return state.sortData;
    },

    getInfoData(state) {
      return state.infoData;
    },

    getChosenHeaderData(state) {
      return state.chosenHeaderData;
    },

    getPaymentStatusData(state) {
      return state.paymentStatusData;
    },
  },

  actions: {
    async setData({ commit }, payload) {
      const newData = await payload;
      commit("updateData", newData);
    },

    async changePaymentAction({ commit }, payload) {
      const newData = await payload;
      commit("changePaymentStatus", newData);
    },

    async changeSortAction({ commit }, payload) {
      const newData = await payload;
      commit("changeSortData", newData);
    },

    async changeChosenHeaderAction({ commit }, payload) {
      const newData = await payload;
      commit("changeChosenHeaderData", newData);
    },
  },

  mutations: {
    updateData(state, payload) {
      state.data = payload;
    },

    changeSortData(state, payload) {
      state.data = payload;
    },

    changePaymentStatus(state, payload) {
      console.log("changePaymentStatus");
      if (payload === "All") {
        state.data = UserData;
        state.paymentStatusData = UserData;
        return;
      } else {
        const newItem = UserData.filter(
          (item) => item.payment_status === payload
        );
        state.data = newItem;
        state.paymentStatusData = newItem;
        return;
      }
    },

    changeChosenHeaderData(state, payload) {
      state.chosenHeaderData = payload;
    },
  },
});

export default store;
