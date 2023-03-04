let collapsers = document.getElementsByClassName("collapser")

Array.from(collapsers).forEach((item) => {
  const onClick = (e) => {
    let collapseParent = item.closest(".collapseParent")
    let content = collapseParent.querySelector(".collapsible")

    if (content.style.maxHeight) {
      content.style.maxHeight = null
    } else {
      content.style.maxHeight = content.scrollHeight + "px"
    }
  }

  item.addEventListener("click", onClick)
})
