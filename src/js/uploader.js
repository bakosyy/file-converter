import axios from "axios"

const init = () => {
  /* Selectors */
  const dropzoneWrapper = document.querySelector(".dropzoneWrapper")
  const dropzone = document.querySelector(".dropzone")
  const uploadBlock = document.querySelector(".uploader")
  const uploadInput = document.querySelector(".uploadInput")
  const uploadInputText = document.querySelector(".uploadInputText")
  const uploadOptions = document.querySelector(".uploadOptions")
  const triggerBtn = document.querySelector(".uploadInputTrigger")
  const convertBtn = document.querySelector("button.convert")
  const stepOne = document.getElementById("step-1")
  const stepOnePing = stepOne.querySelector(".pingElement")
  const stepOneRound = stepOne.querySelector(".roundElement")
  const stepTwo = document.getElementById("step-2")
  const stepTwoPing = stepTwo.querySelector(".pingElement")
  const stepTwoRound = stepTwo.querySelector(".roundElement")
  const stepThree = document.getElementById("step-3")
  const stepThreePing = stepThree.querySelector(".pingElement")
  const stepThreeRound = stepThree.querySelector(".roundElement")
  const progress = document.querySelector(".progress-bar span")
  const filelist = document.querySelector(".filelist")
  const overallProgress = document.querySelector(".upload-progress-label")
  const uploadProgress = document.querySelector(".upload-progress")
  const uploadProgressBar = uploadProgress.querySelector(".progress-bar")
  const uploadProgressBarText = uploadProgress.querySelector(".progress-value")
  const progressInTable = document.querySelector("table .progress-value")
  const filename = filelist.querySelector(".filename")
  const filesize = filelist.querySelector(".filesize")
  const deleteFileBtn = filelist.querySelector(".close")

  /* State */
  let validatedFiles
  const selectTypes = ["pdf", "mp3"]

  /* Helper functions */
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  /* Listeners */
  const onChange = (e) => {
    // onChange for input[type=file]
    if (e.target === uploadInput) {
      resetAllSteps()
      validatedFiles = handleFilesValidation(e.target.files)
      if (validatedFiles) {
        completeStepOne()
        activateStepTwo()
        collapseFilelist()
      }
    }

    // onChange for select
    if (e.target === uploadOptions) {
      if (uploadInput.files[0] && uploadOptions.value) {
        completeStepTwo()
        activateStepThree()
      }
    }
  }

  const onClick = () => {
    uploadInput.click()
  }

  const onDragEnter = (e) => {
    e.stopPropagation()

    dropzoneWrapper.classList.remove("hidden")
  }

  const onDragLeave = (e) => {
    dropzoneWrapper.classList.add("hidden")
  }

  const onDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const onDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.target === dropzone) {
      // handleFileConverting
    }
  }

  const scrollToStep = (e) => {
    // Defining client browser width
    let width = window.innerWidth
    let stepTwoBounding = stepTwo.getBoundingClientRect()
    let stepThreeBounding = stepThree.getBoundingClientRect()
    let uploaderBounding = uploadBlock.getBoundingClientRect()

    // If file input was changed
    if (e.target === uploadInput && validatedFiles) {
      if (width <= 768) {
        window.scrollTo({ top: stepTwoBounding.top - 77 - 15 + window.scrollY })
      } else {
        window.scrollTo({
          top: uploaderBounding.top - 77 - 15 + window.scrollY
        })
      }
    }

    // If select options were changed
    if (e.target === uploadOptions && validatedFiles && width <= 768) {
      window.scrollTo({ top: stepThreeBounding.top - 77 - 15 + window.scrollY })
    }
  }

  /* Implementation functions */
  const isValidFile = (file) => {
    return file.size > 0
  }

  const isAllowedType = (file) => {
    return [
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ].includes(file.type)
  }

  const isWordDocument = (files) => {
    return [
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ].includes(files[0].type)
  }

  const handleFilesValidation = (files) => {
    const validFiles = [...files].filter(isValidFile)
    const allowedTypeFiles = validFiles.filter(isAllowedType)

    return allowedTypeFiles.length
      ? allowedTypeFiles
      : alert(
          "Make sure the file is not empty. Allowed formats are: .doc, .docx"
        )
  }

  const completeStepOne = () => {
    progress.style.width = "50%"
    stepOnePing.classList.remove("animate-ping-slow")
    stepOneRound.classList.add("shadow-white-rounded")
    stepOneRound.innerText = "✓"

    triggerBtn.classList.replace("bg-[#9bf759]", "bg-[#e0e0e0]")
    triggerBtn.classList.replace("border-[#5cd510]", "border-[#cfcfcf]")
    triggerBtn.classList.replace("hover:bg-[#5cd510]", "hover:bg-[#d1d1d1]")
    triggerBtn.classList.replace("hover:border-[#4db70b]", "hover:bg-[#b0b0b0]")
  }

  const activateStepTwo = (filetype) => {
    stepTwo.classList.remove("opacity-50")
    stepTwoPing.classList.add("animate-ping-slow")
    stepTwoRound.classList.remove("shadow-white-rounded")
    uploadOptions.classList.replace("bg-[#e0e0e0]", "bg-white")

    if (isWordDocument(validatedFiles)) {
      let convertOptions = ["pdf"]

      uploadOptions.length = 1

      convertOptions.forEach((format) => {
        let option = document.createElement("option")
        option.value = format
        option.innerText = capitalizeFirstLetter(format)
        option.classList.add("md:text-left")
        uploadOptions.add(option)
      })
    }
  }

  const completeStepTwo = () => {
    progress.style.width = "100%"
    stepTwoPing.classList.remove("animate-ping-slow")
    stepTwoRound.classList.add("shadow-white-rounded")
    stepTwoRound.innerText = "✓"
    uploadOptions.classList.replace("bg-white", "bg-[#e0e0e0]")
  }

  const activateStepThree = () => {
    stepThree.classList.remove("opacity-50")
    stepThreeRound.classList.remove("shadow-white-rounded")
    stepThreePing.classList.add("animate-ping-slow")

    convertBtn.classList.replace("bg-[#e0e0e0]", "bg-[#9bf759]")
    convertBtn.classList.replace("border-[#cfcfcf]", "border-[#5cd510]")
    convertBtn.classList.add("hover:bg-[#5cd510]")
    convertBtn.classList.add("hover:border-[#4db70b]")
    convertBtn.nextElementSibling.classList.remove("hidden")
  }

  const resetAllSteps = () => {
    progress.style.width = "0%"
    selectTypes.length = 1
    selectTypes.forEach((format) => {
      let option = document.createElement("option")
      option.value = format
      option.innerText = capitalizeFirstLetter(format)
      option.classList.add("md:text-left")
      uploadOptions.add(option)
    })

    stepOnePing.classList.add("animate-ping-slow")
    stepOneRound.classList.remove("shadow-white-rounded")
    stepOneRound.innerText = 1
    stepTwo.classList.add("opacity-50")
    stepTwoPing.classList.remove("animate-ping-slow")
    stepTwoRound.classList.add("shadow-white-rounded")
    stepTwoRound.innerText = 2
    stepThree.classList.add("opacity-50")
    stepThreeRound.classList.add("shadow-white-rounded")
    stepThreePing.classList.remove("animate-ping-slow")

    triggerBtn.classList.replace("bg-[#e0e0e0]", "bg-[#9bf759]")
    triggerBtn.classList.replace("border-[#cfcfcf]", "border-[#5cd510]")
    triggerBtn.classList.replace("hover:bg-[#d1d1d1]", "hover:bg-[#5cd510]")
    triggerBtn.classList.replace("hover:bg-[#b0b0b0]", "hover:border-[#4db70b]")
    uploadOptions.classList.replace("bg-white", "bg-[#e0e0e0]")

    convertBtn.classList.replace("bg-[#9bf759]", "bg-[#e0e0e0]")
    convertBtn.classList.replace("border-[#5cd510]", "border-[#cfcfcf]")
    convertBtn.classList.remove("hover:bg-[#5cd510]")
    convertBtn.classList.remove("hover:border-[#4db70b]")
    convertBtn.nextElementSibling.classList.add("hidden")
  }

  const showFileInformation = ({ name, size }) => {
    let sizeValue
    let sizeInBytes = size
    let sizeInKB = (sizeInBytes / 1000).toFixed(2)
    let sizeInMB = (sizeInBytes / 1000 / 1000).toFixed(2)

    if (sizeInMB >= 1) {
      sizeValue = sizeInMB + " MB"
    } else if (sizeInKB >= 1) {
      sizeValue = sizeInKB + " KB"
    } else {
      sizeValue = sizeInBytes + " B"
    }

    filename.innerText = name
    filesize.innerText = sizeValue
  }

  const collapseFilelist = () => {
    filelist.style.maxHeight = filelist.scrollHeight + "px"

    showFileInformation(validatedFiles[0])
  }

  const clearFilelist = () => {
    filelist.style.maxHeight = 0

    validatedFiles = []

    uploadInput.value = ""

    resetAllSteps()
  }

  const verifyFile = () => {
    if (!validatedFiles) {
      alert("Please select your files to convert (in Step 1).")
    } else if (validatedFiles && !uploadOptions.value) {
      alert("Please choose the format to convert your files to (in Step 2).")
    } else {
      return true
    }
  }

  const changeStepButtonsStyles = () => {
    triggerBtn.classList.add("opacity-50")
    uploadOptions.classList.add("opacity-50")
    convertBtn.parentElement.classList.add("opacity-50")

    stepThreePing.classList.remove("animate-ping-slow")
    stepThreeRound.classList.add("shadow-white-rounded")
    stepThreeRound.innerText = "✓"
  }

  const makeStepButtonsDisabled = () => {
    uploadInput.setAttribute("disabled", "")
    uploadOptions.setAttribute("disabled", "")
    convertBtn.removeEventListener("click", handleUploadFile)
  }

  const makeDeleteFileBtnUnclickable = () => {
    deleteFileBtn.removeEventListener("click", clearFilelist)
    deleteFileBtn.style.cursor = "auto"
  }
  console.log(window.location)
  const uploadFile = () => {
    const formdata = new FormData()
    formdata.append("uploadFile", validatedFiles[0])
    formdata.append("conversionType", uploadOptions.value)

    const onUploadProgress = (e) => {
      let progress = Math.round(e.progress * 100)
      console.log(e)
      if (progress > 0) {
        overallProgress.classList.replace("md:hidden", "md:block")
        uploadProgress.classList.remove("hidden")
        uploadProgressBar.style.width = `${progress}%`
        uploadProgressBarText.innerText = `${progress}%`
        progress !== 100
          ? (progressInTable.innerText = `${progress}% uploaded`)
          : (progressInTable.innerText = `Converting`)
      }
    }

    axios
      .post("http://converter.local/api/upload", formdata, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress
      })
      .then((res) => {
        if (res.status === 200) {
          document.location.href = "https://google.com"
        }
      })
      .catch((err) => {
        progressInTable.innerText = "Error occured"
        setTimeout(() => {
          alert("Service unavailable, try again later.")
          document.location.reload()
        }, 500)
      })
  }

  const handleUploadFile = () => {
    if (verifyFile()) {
      makeStepButtonsDisabled()
      changeStepButtonsStyles()
      makeDeleteFileBtnUnclickable()
      uploadFile()
    }
  }

  /* Events */
  document.addEventListener("drop", onDrop)
  document.addEventListener("dragover", onDragOver)
  dropzoneWrapper.addEventListener("dragleave", onDragLeave)
  dropzoneWrapper.addEventListener("dragover", onDragOver)
  dropzoneWrapper.addEventListener("drop", onDrop)
  triggerBtn.addEventListener("click", onClick)
  uploadBlock.addEventListener("change", onChange)
  uploadBlock.addEventListener("change", scrollToStep)
  uploadBlock.addEventListener("dragenter", onDragEnter)
  deleteFileBtn.addEventListener("click", clearFilelist)
  convertBtn.addEventListener("click", handleUploadFile)
}

if ("draggable" in document.createElement("div")) {
  init()
}

const params = new URLSearchParams(document.location.search)
console.log([...params])
