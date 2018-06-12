import Cookies from 'js-cookie';

const user = {
  namespaced: true,
  state: {},
  mutations: {
    logout(state, vm) {
      Cookies.remove('user');
    },
    login(state, info) {
      

    }
  }
};

export default user;
