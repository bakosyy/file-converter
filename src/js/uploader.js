const init = () => {
  const dropzoneWrapper = document.querySelector(".dropzoneWrapper")
  const dropzone = document.querySelector(".dropzone")
  const uploadBlock = document.querySelector(".uploader")
  const uploadInput = document.querySelector(".uploadInput")
  const uploadOptions = document.querySelector(".uploadOptions")
  const triggerBtn = document.querySelector(".uploadInputTrigger")
  const stepOne = document.getElementById("step-1")
  const stepTwo = document.getElementById("step-2")
  const stepThree = document.getElementById("step-3")
  const progress = document.querySelector(".progress-bar span")

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const onChange = (e) => {
    // onChange for input[type=file]
    if (e.target === uploadInput) {
      let validatedFiles = handleFilesValidation(e.target.files)

      if (validatedFiles) {
        activateStepOne(validatedFiles)
        activateStepTwo(validatedFiles)
      }
    }

    // onChange for select
    if (e.target === uploadOptions) {
      return uploadInput.files[0] && uploadOptions.value
        ? activateStepThree()
        : undefined
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

  const activateStepPings = (step) => {
    let roundElement = step.querySelector(".roundElement")
    let pingElement = roundElement.previousElementSibling

    roundElement.classList.add("shadow-white-rounded")
    roundElement.innerText = "✓"
    pingElement.classList.remove("animate-ping-slow")
  }

  const deactivateStepPings = (step) => {
    let roundElement = step.querySelector(".roundElement")
    let pingElement = roundElement.previousElementSibling

    pingElement.classList.add("animate-ping-slow")
    roundElement.classList.remove("shadow-white-rounded")

    if (step === stepOne) {
      roundElement.innerText = "1"
    } else if (step === stepTwo) {
      roundElement.innerText = "2"
    } else {
      roundElement.innerText = "3"
    }
  }

  const activateStepOne = (files) => {
    activateStepPings(stepOne)
    progress.style.width = "50%"
  }

  const deactivateStepOne = () => {
    deactivateStepPings(stepOne)
    // let roundElement = stepOne.querySelector(".roundElement")
    // let pingElement = roundElement.previousElementSibling
    // pingElement.classList.add("animate-ping-slow")
    // roundElement.classList.remove("shadow-white-rounded")
    // roundElement.innerText = "1"
    progress.style.width = "0%"
  }

  const activateStepTwo = (files) => {
    stepTwo.classList.remove("opacity-50")
    let roundElement = stepTwo.querySelector(".roundElement")
    let pingElement = roundElement.previousElementSibling
    roundElement.classList.remove("shadow-white-rounded")
    pingElement.classList.add("animate-ping-slow")

    if (isWordDocument(files)) {
      let convertOptions = ["pdf"]

      uploadOptions.length = 1

      convertOptions.forEach((format) => {
        let option = document.createElement("option")
        option.value = format
        option.innerText = capitalizeFirstLetter(format)
        uploadOptions.add(option)
      })
    }
  }

  const activateStepThree = () => {}

  document.addEventListener("drop", onDrop)
  document.addEventListener("dragover", onDragOver)

  triggerBtn.addEventListener("click", onClick)
  uploadInput.addEventListener("change", onChange)
  uploadOptions.addEventListener("change", onChange)

  uploadBlock.addEventListener("dragenter", onDragEnter)
  dropzoneWrapper.addEventListener("dragleave", onDragLeave)
  dropzoneWrapper.addEventListener("dragover", onDragOver)
  dropzoneWrapper.addEventListener("drop", onDrop)
}

if ("draggable" in document.createElement("div")) {
  init()
}
