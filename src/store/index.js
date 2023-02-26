import { createStore } from "vuex";
import { HeaderData } from "../utils/header";
import { UserData } from "../utils/userData";
import { sortData, infoData, editData, paginate } from "../utils/conversions";

const store = createStore({
  state() {
    return {
      getHeader: HeaderData,
      data: UserData,
      sortData: sortData,
      infoData: infoData,
      chosenHeaderData: "All",
      paymentStatusData: UserData,
      editData: editData,
      payDue: [],
      paginateData: paginate(UserData),
      page: 0,
      setFalse: false,
    };
  },

  getters: {
    getHeader(state) {
      return state.getHeader;
    },

    getPaginateData(state) {
      return state.paginateData;
    },

    getSetFalse(state) {
      return state.setFalse;
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

    getEditData(state) {
      return state.editData;
    },

    getPayDue(state) {
      return state.payDue;
    },

    getPage(state) {
      return state.page;
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

    async changePayDueAction({ commit }, payload) {
      const newData = await payload;
      commit("changePayDue", newData);
    },

    async nextPageAction({ commit }, payload) {
      const index = await payload;
      commit("nextPage", index);
    },

    async prevPageAction({ commit }, payload) {
      const index = await payload;
      commit("prevPage", index);
    },

    async setFalseAction({ commit }, payload) {
      const check = await payload;
      commit("setFalseI", check);
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
      if (payload === "All") {
        state.data = state.paginateData[state.page];
        state.paymentStatusData = state.paginateData[state.page];
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

    changePayDue(state, payload) {
      state.payDue = payload;
    },

    nextPage(state, payload) {
      state.page = payload;
    },

    prevPage(state, payload) {
      state.page = payload;
    },

    setFalseI(state, payload) {
      state.setFalse = payload;
    },
  },
});

export default store;
