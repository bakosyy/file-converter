let collapsers = document.getElementsByClassName("collapser")

Array.from(collapsers).forEach((item) => {
  item.addEventListener("click", function () {
    let collapseParent = item.closest(".collapseParent")
    let content = collapseParent.querySelector(".collapsible")

    if (content.style.maxHeight) {
      content.style.maxHeight = null
    } else {
      content.style.maxHeight = content.scrollHeight + "px"
    }
  })
})

// Array.from(collapsibles).forEach((item) => {
//   item.addEventListener("click", function () {
//     let content = this.nextElementSibling

//     if (content.style.maxHeight) {
//       content.style.maxHeight = null
//     } else {
//       content.style.maxHeight = content.scrollHeight + "px"
//     }
//   })
// })
