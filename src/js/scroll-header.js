const nav = document.querySelector("header nav")
const navChild = nav.querySelector("div")

const onScroll = () => {
  window.scrollY > 31 ? makeFixed() : makeAbsolute()
}

const makeFixed = () => {
  nav.classList.remove("md:absolute")
  nav.classList.remove("md:p-2")
  nav.classList.remove("md:bg-transparent")
  nav.classList.add("md:shadow-md")
  navChild.classList.remove("md:mt-6")
}

const makeAbsolute = () => {
  nav.classList.add("md:absolute")
  nav.classList.add("md:p-2")
  nav.classList.add("md:bg-transparent")
  nav.classList.remove("md:shadow-md")
  navChild.classList.add("md:mt-6")
}

window.addEventListener("scroll", onScroll)

window.dispatchEvent(new Event("scroll"))
