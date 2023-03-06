const init = () => {
  /* Selectors */
  const dropzoneWrapper = document.querySelector(".dropzoneWrapper")
  const dropzone = document.querySelector(".dropzone")
  const uploadBlock = document.querySelector(".uploader")
  const uploadInput = document.querySelector(".uploadInput")
  const uploadInputText = document.querySelector(".uploadInputText")
  const uploadOptions = document.querySelector(".uploadOptions")
  const triggerBtn = document.querySelector(".uploadInputTrigger")
  const stepOne = document.getElementById("step-1")
  const stepTwo = document.getElementById("step-2")
  const stepThree = document.getElementById("step-3")
  const progress = document.querySelector(".progress-bar span")

  /* Variables */
  let validatedFiles
  const selectTypes = ["pdf"]

  /* Helper functions */
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  /* Listeners */
  const onChange = (e) => {
    // onChange for input[type=file]
    if (e.target === uploadInput) {
      validatedFiles = handleFilesValidation(e.target.files)

      if (validatedFiles) {
        activateStepOne()
        activateStepTwo()
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

  const deactivateStepPings = (step) => {
    let roundElement = step.querySelector(".roundElement")
    let pingElement = roundElement.previousElementSibling

    pingElement.classList.remove("animate-ping-slow")
    roundElement.classList.add("shadow-white-rounded")

    roundElement.innerText = "✓"
  }

  const activateStepPings = (step) => {
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

  const activateStepOne = () => {
    deactivateStepPings(stepOne)
    progress.style.width = "50%"
  }

  const deactivateStepOne = () => {
    deactivateStepPings(stepOne)
    progress.style.width = "0%"
  }

  const activateStepTwo = () => {
    stepTwo.classList.remove("opacity-50")
    let roundElement = stepTwo.querySelector(".roundElement")
    let pingElement = roundElement.previousElementSibling
    roundElement.classList.remove("shadow-white-rounded")
    pingElement.classList.add("animate-ping-slow")

    if (isWordDocument(validatedFiles)) {
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

  const deactivateStepTwo = () => {
    console.log(123)
  }

  const activateStepThree = () => {
    console.log(123)
  }

  const deactivateStepThree = () => {
    console.log(123)
  }

  /* Events */
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

/* Initialize */
if ("draggable" in document.createElement("div")) {
  init()
}

// if (currentStep == 1)

// uploadInput onchange if validatedFiles
// => step 1: remove pinging
// => step 1: add rounded
// => step 1: set text to '✓'
// => step 1: set progress.width to '50%'
// => step 2: remove opacity-50
// => step 2: add pinging
// => step 2: remove rounded
// => step 2: set text to data-id
// => step 2: update select types
// => step 3: add opacity-50
// else
// => step 1: add pinging
// => step 1: remove rounded
// => step 1: set text to data-id
// => step 1: set progress.width to '50%'
// => step 2: add opacity-50
// => step 2: remove pinging
// => step 2: add rounded
// => step 2: set text to data-id
// => step 2: select all select types
// => step 3: add opacity-50

// uploadOptions onchange if validatedFiles && uploadOptions.value
// => step 2: add rounded
// => step 2: set text to '✓'
// => step 2: remove pinging
// => step 2: set progress.width to '100%'
// => step 3: remove opacity-50
// else
// => step 2: remove rounded
// => step 2: add pinging
// => step 2: set text to data-id
// => step 2: set progress.width to '50%'
// => step 3: add opacity-50

// convert btn onclick
// => ...
