let collapsibles = document.getElementsByClassName("collapsible")

Array.from(collapsibles).forEach((item) => {
  item.addEventListener("click", function () {
    let content = this.nextElementSibling

    if (content.style.maxHeight) {
      content.style.maxHeight = null
    } else {
      content.style.maxHeight = content.scrollHeight + "px"
    }
  })
})
