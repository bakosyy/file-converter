import "../css/style.css"
import "../js/collapsible"
import axios from "axios"

let btn = document.querySelector("button")
let fileToken = new URLSearchParams(document.location.search).get("fileToken")
let url = `http://converter.local/api/test-convert/${fileToken}`

const btnClickHandler = () => {}
axios
  .get(url, {
    responseType: "blob"
  })
  .then((res) => {
    console.log(res)

    const link = document.createElement("a")
    link.href = URL.createObjectURL(res.data)
    link.innerText = "Download"
    link.setAttribute("download", "file.pdf")
    btn.after(link)
  })
  .catch((err) => console.log(err))

btn.addEventListener("click", btnClickHandler)
