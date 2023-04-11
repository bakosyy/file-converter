import axios from "axios"

const axe = axios.create({
  // baseURL: "https://converter.bakyt.space/api",
  baseURL: "http://converter.local/api",
  timeout: 100000
})

export default axe
