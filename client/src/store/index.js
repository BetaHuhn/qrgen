import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

function defaultState () {
  return {
    showResult: false,
    code: "",
    url: "",
    inputInvalid: false,
    error: false,
    errorMsg: 'An error ocurred, please try again.'
  }
}

const state = defaultState()

export default new Vuex.Store({
  state: state,
  modules: {
  },
  mutations:{
    setResponse (state, data) {
      state.code = data.code
      state.url = data.url
      state.showResult = true
    },
    displayError (state, res) {
      if(res.status == 405){
        state.inputInvalid = true;
      }else{
        state.error = true;
        state.errorMsg = (res.response != undefined ) ? "Error: " + res.response : defaultState().errorMsg
      }
    },
    removeError (){
      state.error = false;
      state.inputInvalid = false;
      state.errorMsg = defaultState().errorMsg;
    },
    resetState (state) {
      Object.assign(state, defaultState())
    }
  },
  actions:{
    async retrieveAPIData (context) {
      const api = "https://qrgen.cc/api/create"
      const options = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url: context.state.url })
      };
      const res = await (await fetch(api, options)).json()
      if(res.status == 200){
        context.commit("removeError")
        context.commit("setResponse", {code: res.data.code, url: res.data.url})
      }else{
        console.log(res)
        context.commit("displayError", res)
      }
    },
    changeUrl( { state }, newUrl){
      state.url = newUrl;
    },
    resetState(context){
      context.commit("resetState")
    },
    showResult(context, data){
      context.commit("setResponse", data)
    }
  }
})
