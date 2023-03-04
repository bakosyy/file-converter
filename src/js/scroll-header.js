const header = document.querySelector("header")

const onHeaderScroll = () => {
  if (window.scrollY > 50) {
    makeWhite()
  } else {
    makeTransparent()
  }
}

const makeWhite = () => {
  header.classList.add("bg-white", "border-b", "border-[#e4e4e4]")
}

const makeTransparent = () => {
  header.classList.remove("bg-white", "border-b", "border-[#e4e4e4]")
}

/**
 * Making header white if window.scrollY is more than 50.
 * It can happen when we scroll the page and refresh the page.
 */
if (window.scrollY > 50) {
  makeWhite()
}

window.addEventListener("scroll", onHeaderScroll)
