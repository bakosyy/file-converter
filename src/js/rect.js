const el = document.querySelector(".rect")
const btn = document.querySelector("button")
const scroller = document.querySelector(".scroller")

btn.addEventListener("click", () => {
  const rect = el.getBoundingClientRect()
  console.log(rect)
})

scroller.addEventListener("click", () => {
  const rect = el.getBoundingClientRect()

  window.scroll({
    top: rect.top - 44
  })
})

btn.dispatchEvent(new Event("click"))
