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
  const stepOnePing = stepOne.querySelector(".pingElement")
  const stepOneRound = stepOne.querySelector(".roundElement")
  const stepTwo = document.getElementById("step-2")
  const stepTwoPing = stepTwo.querySelector(".pingElement")
  const stepTwoRound = stepTwo.querySelector(".roundElement")
  const stepThree = document.getElementById("step-3")
  const stepThreePing = stepThree.querySelector(".pingElement")
  const stepThreeRound = stepThree.querySelector(".roundElement")
  const progress = document.querySelector(".progress-bar span")
  const appScrolled = document.getElementById("app").dataset.scrolled

  /* Variables */
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
      }

      if (!appScrolled) {
        console.log(uploadBlock.getBoundingClientRect())
        console.log("window scrollY" + window.scrollY)
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
  }

  const activateStepTwo = (filetype) => {
    stepTwo.classList.remove("opacity-50")
    stepTwoPing.classList.add("animate-ping-slow")
    stepTwoRound.classList.remove("shadow-white-rounded")

    if (isWordDocument(validatedFiles)) {
      let convertOptions = ["pdf"]

      uploadOptions.length = 1

      convertOptions.forEach((format) => {
        let option = document.createElement("option")
        option.value = format
        option.innerText = capitalizeFirstLetter(format)
        option.classList.add("text-left")
        uploadOptions.add(option)
      })
    }
  }

  const completeStepTwo = () => {
    progress.style.width = "100%"
    stepTwoPing.classList.remove("animate-ping-slow")
    stepTwoRound.classList.add("shadow-white-rounded")
    stepTwoRound.innerText = "✓"
  }

  const activateStepThree = () => {
    stepThree.classList.remove("opacity-50")
    stepThreeRound.classList.remove("shadow-white-rounded")
    stepThreePing.classList.add("animate-ping-slow")
  }

  const resetAllSteps = () => {
    progress.style.width = "0%"
    selectTypes.length = 1
    selectTypes.forEach((format) => {
      let option = document.createElement("option")
      option.value = format
      option.innerText = capitalizeFirstLetter(format)
      option.classList.add("text-left")
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

// uploadInput onchange if validatedFiles
// => step 1: remove pinging
// => step 1: add rounded
// => step 1: set text to '✓'
// => step 1: set progress.width to '50%'
// => step 2: remove opacity-50
// => step 2: remove rounded
// => step 2: add pinging
// => step 2: set text to data-id
// => step 2: update select types
// => step 3: add opacity-50
// else (resetAllSteps)
// => step 1: add pinging
// => step 1: remove rounded
// => step 1: set text to data-id
// => step 1: set progress.width to '0%'
// => step 2: add opacity-50
// => step 2: remove pinging
// => step 2: add rounded
// => step 2: set text to data-id
// => step 2: select all select types
// => step 3: add opacity-50
// => step 3: add rounded
// => step 3: remove pinging

// uploadOptions onchange if validatedFiles && uploadOptions.value
// => step 2: set text to '✓'
// => step 2: add rounded
// => step 2: remove pinging
// => step 2: set progress.width to '100%'
// => step 3: remove opacity-50
// else
// => step 2: remove rounded
// => step 2: add pinging
// => step 2: set text to data-id
// => step 2: set progress.width to '50%'
// => step 3: add opacity-50
