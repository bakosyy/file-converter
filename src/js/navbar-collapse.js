const toggler = document.getElementById("navbar-toggler")
const menu = document.getElementById("navbar-toggle-menu")

const toggleNavbar = () => {
  if (menu.dataset.toggle === "open") {
    menu.classList.replace("opacity-70", "opacity-100")
    menu.classList.replace("-right-full", "right-0")
    menu.dataset.toggle = "closed"
  } else {
    menu.classList.replace("opacity-100", "opacity-70")
    menu.classList.replace("right-0", "-right-full")
    menu.dataset.toggle = "open"
  }
}

toggler.addEventListener("click", toggleNavbar)
