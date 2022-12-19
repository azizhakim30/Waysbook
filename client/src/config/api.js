import axios from "axios"

export const API = axios.create({
  // baseURL: "https://waysbookbe-production.up.railway.app/waysbook",

  baseURL: process.env.REACT_APP_BASEURL,
})

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`
  } else {
    delete API.defaults.headers.common["Authorization"]
  }
}
