import "../css/style.css"
import "../js/collapsible"
import axe from "../js/axiosConfig"
import convertableTypes from "../js/convertableTypes"

const tbody = document.querySelector("tbody")
const fileName = tbody.querySelector(".convert-name")
const convertingSpinner = tbody.querySelector(".converting-indicator")
const downloadButton = tbody.querySelector(".download-button")
const conversionHeading = document.querySelector(".converting-text")
const conversionIntro = document.getElementById("converting-intro")
const successMessage = conversionIntro.querySelector(".success-message")
const processingMessage = conversionIntro.querySelector(".processing-message")
const conversions = document.querySelector("table")

let fileInfo
let fileToken = new URLSearchParams(document.location.search).get("fileToken")

const removeExtension = (filename) => {
  let splitArray = filename.split(".")
  let filenameWOExtension = splitArray.filter(
    (item, index) => index !== splitArray.length - 1
  )
  return filenameWOExtension.join(".")
}

const generateFilename = (fileInfo) => {
  let originalName = removeExtension(fileInfo["file_name"])
  let originalExtension = fileInfo["from_extension"]
  let possibleExtensions = convertableTypes[originalExtension]
  let extension = possibleExtensions.find(
    (item) => item === fileInfo["to_extension"]
  )
  return `${originalName}.${extension}`
}

const updateFileInfo = (fileInfo) => {
  tbody.classList.remove("hidden")

  fileName.innerText = generateFilename(fileInfo)
}

const showDownloadLinks = (convertedFile) => {
  fileName.classList.add(
    "text-[#2487EB]",
    "hover:text-[#1061b1]",
    "hover:underline"
  )

  downloadButton.classList.replace("hidden", "inline-block")

  const onDownloadHandler = () => {
    const link = document.createElement("a")
    link.href = URL.createObjectURL(convertedFile)
    link.setAttribute("download", fileName.innerText)
    link.click()
    URL.revokeObjectURL(link.href)
  }

  fileName.addEventListener("click", onDownloadHandler)
  downloadButton.addEventListener("click", onDownloadHandler)
}

const showFileSuccessInfo = () => {
  conversionHeading.innerText = "All Done!"
  conversionIntro.classList.add("border-[#c3e6cb]")
  conversionIntro.classList.replace("bg-white", "bg-[#d4edda]")
  successMessage.classList.remove("hidden")
  processingMessage.classList.add("hidden")
}

const showFileNotFoundInfo = () => {
  conversionHeading.innerText = "No files found"
  processingMessage.classList.add("text-[#3B3B3B]")
  processingMessage.innerHTML = `
    <p>Sorry, we couldn't find details for any uploaded files.</p>
    <p>If you entered an email address when converting we'll be in touch soon. If you converted files 24 hours ago they have now expired.</p>
    <p>If you need further help please contact <a href="mailto:support@converter.info" class="text-[#2487EB] hover:text-[#1061b1] hover:underline">our support team</a>.</p>
  `
  conversions.classList.add("hidden")
}

const showCreditsEndedInfo = () => {
  conversionHeading.innerText = "Website credits ended"
  processingMessage.classList.add("text-[#3B3B3B]")
  processingMessage.innerHTML = `
    <p>Sorry, looks like pdf conversion credits ended.</p>
    <p>Try to convert video files to mp3 instead or contact the website creator to update the conversion credits.</p>
    <p>If you need further help please contact <a href="mailto:support@converter.info" class="text-[#2487EB] hover:text-[#1061b1] hover:underline">our support team</a>.</p>
  `
  conversions.classList.add("hidden")
}

const showServerErrorInfo = () => {
  conversionHeading.innerText = "Services unavailable"
  processingMessage.classList.add("text-[#3B3B3B]")
  processingMessage.innerHTML = `
    <p>We apologize for the inconvenience.</p>
    <p>Our file conversion services are currently unavailable.</p>
    <p>Please try again later or contact <a href="mailto:support@converter.info" class="text-[#2487EB] hover:text-[#1061b1] hover:underline">our support team</a> for further assistance.</p>
  `
  conversions.classList.add("hidden")
}

const showConvertSpinner = () => {
  convertingSpinner.classList.replace("hidden", "inline-flex")
}

const hideConvertSpinner = () => {
  convertingSpinner.classList.replace("inline-flex", "hidden")
}

/** Request: Verifying if token is correct
 *  Returns file information
 */
const verifyToken = async () => {
  try {
    const req = await axe.get(`/verify/${fileToken}`)
    return req.data
  } catch (err) {}
}

/* Request: Checking if conversion is already done */
const checkAlreadyConverted = async () => {
  try {
    const req = await axe.get(`/download/${fileToken}`, {
      responseType: "blob",
    })

    return req.data
  } catch (err) {}
}

/* Request: Convert file request */
const convertFile = async () => {
  try {
    const req = await axe.get(`/convert/${fileToken}`, {
      responseType: "blob",
    })

    return req.data
  } catch (err) {
    fileInfo["to_extension"] === "pdf"
      ? showCreditsEndedInfo()
      : showServerErrorInfo()
  }
}

/* Implementation */
const makeRequests = async () => {
  fileInfo = await verifyToken()

  if (fileInfo) {
    updateFileInfo(fileInfo)
    showConvertSpinner()

    const convertedFile = await checkAlreadyConverted()
    if (convertedFile) {
      hideConvertSpinner()
      showDownloadLinks(convertedFile)
      showFileSuccessInfo()
    }
    // If File is not converted yet
    else {
      const convertedFile = await convertFile()
      if (convertedFile) {
        hideConvertSpinner()
        showDownloadLinks(convertedFile)
        showFileSuccessInfo()
      }
    }
  }
  // If token is invalid
  else {
    showFileNotFoundInfo()
  }
}

makeRequests()
