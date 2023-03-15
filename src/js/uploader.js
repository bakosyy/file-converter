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
  }
  console.log(uploadBlock)
  /* Events */
  document.addEventListener("drop", onDrop)
  document.addEventListener("dragover", onDragOver)
  triggerBtn.addEventListener("click", onClick)
  uploadBlock.addEventListener("change", onChange)
  uploadBlock.addEventListener("change", scrollToStep)
  uploadBlock.addEventListener("dragenter", onDragEnter)
  dropzoneWrapper.addEventListener("dragleave", onDragLeave)
  dropzoneWrapper.addEventListener("dragover", onDragOver)
  dropzoneWrapper.addEventListener("drop", onDrop)
}

if ("draggable" in document.createElement("div")) {
  init()
}
