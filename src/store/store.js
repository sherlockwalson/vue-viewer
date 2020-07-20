import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    books:'aaaa',
    parameterColAndRow:{
        // rows:1,
        // cols:1,
    }
  },
  mutations: {
    //所有mutations中的方法的第一个参数一定是state变量，用来进行对state中的状态的操作
    //第二个参数是可选参数，用于调用该 mutations 方法的时候传参
    colsAndRows(state,data){
        console.log(data)
        state.parameterColAndRow =data 
        // state.parameterColAndRow.cols = data.cols
        console.log(state.parameterColAndRow)
    }
  }
})

export default store