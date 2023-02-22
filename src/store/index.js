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
  },

  actions: {
    changePaymentStatus(state, payload) {
      console.log("changePaymentStatus");
      if (payload === "All") {
        return (state.data = UserData);
      } else {
        const newItem = UserData.filter(
          (item) => item.payment_status === payload
        );
        return (state.data = newItem);
      }
    },
  },
});

export default store;
