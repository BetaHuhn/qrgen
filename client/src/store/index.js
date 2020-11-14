import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

function defaultState () {
  return {
    show: "form",
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
      state.show = "result";
    },
    displayRedirect(state){
      state.show = "redirect";
    },
    displayLoading(state){
      state.show = "loading";
    },
    inputInvalid(state){
      state.show = "form";
      state.inputInvalid = true;
    },
    display404 (state) {
      state.show = "notFound";
    },
    displayError (state, response) {
        state.error = true;
        state.errorMsg = (response != undefined ) ? "Error: " + response : defaultState().errorMsg
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
    async createShort ({ commit }, url) {
      commit("displayLoading");
      const api = "/api/create"
      const options = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url: url })
      };
      fetch(api, options)
        .then( response => {
          if (!response.ok) { throw response }
          return response.json()
        })
        .then( json => {
          if(json.status === 200){
            commit("removeError")
            commit("setResponse", {code: json.result.code, url: json.result.url})
            return
          }

          commit("displayError")
        })
        .catch( err => {
          if (err.status === 404) {
            return commit("inputInvalid")
          }

          if (err.text) {
            return err.text().then( errorMessage => {
              commit("displayError", errorMessage)
            })
          }

          commit("displayError")
        })
    },
    async getFromCode ({ commit }, code) {
      commit("displayRedirect");
      const api = "/api?code=" + code;
      const options = {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      };
      fetch(api, options)
        .then( response => {
          if (!response.ok) { throw response }
          return response.json()
        })
        .then( json => {
          if(json.status == 200){
            window.location.replace(json.result.url);
          }else {
            commit("display404")
          }
        })
        .catch( err => {
          if (err.text) {
            err.text().then( errorMessage => {
              commit("displayError", errorMessage)
            })
          } else {
            commit("displayError")
          }
        })
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
