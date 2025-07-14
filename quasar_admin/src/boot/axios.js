import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
 })

 // Intercepting requests to add the Authorization token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

// Exporting API methods for use throughout the app
export const apiMethods = {
  login(credentials) {
    return api.post('/auth/login', credentials);
  },
  register(user) {
    return api.post('/auth/register', user);
  },
  createCountry(data) {
    return api.post('/countries', data);
  },
  getUserDetails(userId) {
    return api.get(`/users/${userId}`)
  },
  updateUserDetails(userId, userDetails) {
    return api.put(`/users/${userId}`, userDetails)
  },
  changePassword(userId, passwords) {
    return api.post(`/users/${userId}/change-password`, passwords)
  },
  // Branch methods entities
  getBranches() {
    return api.get('/branches');
  },
  getBranches() {
    return api.get('/branches/simple');
  },
  getBranch(id) {
    return api.get(`/branches/${id}`);
  },
  createBranch(data){
    return api.post('/branches', data);
  },
  updateBranch(branchId, data){
    return api.put(`/branches/${branchId}`, data);
  },


    // Vendor methods entities
    getVendors() {
      return api.get('/vendors');
    },
    getVendor(id) {
      return api.get(`/vendors/${id}`);
    },
    createVendor(data){
      return api.post('/vendors', data);
    },
    updateVendor(vendorID, data){
      return api.put(`/vendors/${vendorID}`, data);
    },



  // Department methods entities
  getDepartments() {
    return api.get('/departments');
  },
  getDepartment(id) {
    return api.get(`/departments/${id}`);
  },
  createDepartment(data){
    return api.post('/departments', data);
  },
  updateDepartment(departmentId, data){
    return api.put(`/departments/${departmentId}`, data);
  },

  // Desk methods entities
  getDesks() {
    return api.get('/desks');
  },
  getDesk(id) {
    return api.get(`/departments/${id}`);
  },
  getdeskByDepartmentID(id){
    return api.get(`/deskByDepartmentID/${id}`);
  },
  createDepartment(data){
    return api.post('/departments', data);
  },
  updateDepartment(departmentId, data){
    return api.put(`/departments/${departmentId}`, data);
  },


  // Country methods entities
  getCountries() {
    return api.get('/countries');
  },
  getCountry(id) {
    return api.get(`/countries/${id}`);
  },
  // States methods entities
  getStates() {
    return api.get('/states');
  },
  getState(id) {
    return api.get(`/states/${id}`);
  },
  getStatesByCountryID(countryID) {
    return api.get(`/states/byCountry/${countryID}`);
  },

}

export { api }