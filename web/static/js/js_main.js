let form
let textarea
let input
let item
let dataList
let selectedList
let categoriesUl = document.createElement("ul")
let selectedUl = document.createElement("ul")
categoriesUl.className = `categories__list`
selectedUl.className = `selected-categories__list`
let categoriesArray
let selectedCategories = []

window.addEventListener("load", () => {
  getData()
  form = document.getElementsByTagName("form")[0]
  textarea = document.querySelector("#id_location01")
  input = document.querySelector("#id_request")
  input.before(selectedUl)
  form.addEventListener("click", function (e) {
    addSelectedHandler(e)
  })
  selectedList = document.querySelector(".selected-categories__list")

  item = document.querySelector(".categories__item")
  input.addEventListener("focus", () => {
    input.after(categoriesUl)
    dataList = document.querySelector(".categories__list")
    dataList.innerHTML = renderCategories(categoriesArray, "categories__item")
  })

  input.addEventListener("input", (e) => {
    input.value == ""
      ? input.classList.add("empty")
      : input.classList.remove("empty")

    if (input.value !== "") {
      let searched = searchData(e.target.value)
      dataList.innerHTML = renderCategories(searched, "categories__item")
    }
  })

  input.addEventListener("keypress", (e) => {
    console.log("e", e)
    if (e.key === "Enter") {
      addSelectedHandler(e)
    }
  })
})

async function getData() {
  const response = await fetch("http://127.0.0.1:8080/api/categories_json/")
  const { data } = await response.json()
  categoriesArray = data
}

function addCategory(category) {
  console.log("selectedCategories", selectedCategories)
  if (selectedCategories.includes(category)) {
    deleteIfExist(category)
  } else {
    selectedCategories.push(category)
  }
}
function deleteIfExist(category) {
  console.log(
    "selectedCategories.splice(selectedCategories.indexOf(category),1)"
  )
  selectedCategories.splice(selectedCategories.indexOf(category), 1)
}
function addSelectedHandler(e) {
  if (e.target.value && e.target.className == "style_task_form") {
    addCategory(e.target.value)
    renderSelectedCategoriesElement()
    recalcInputWidth()
  }

  if (e.target && e.target.id == "selectjs") {
    addCategory('Emails & Contacts Scraper')
    renderSelectedCategoriesElement()
    recalcInputWidth()
  }

  if (e.target && e.target.className.split(" ")[0] == "categories__item") {
    addCategory(e.target.firstElementChild.textContent)
    renderSelectedCategoriesElement()
    recalcInputWidth()
  }

  if (e.target && e.target.className == "categories__value") {
    addCategory(e.target.textContent)
    renderSelectedCategoriesElement()
    recalcInputWidth()
  }
  console.log("e.target", e.target)
  if (
    e.target.parentElement &&
    e.target.parentElement.className == "selected-categories__item"
  ) {
    deleteCategory(e.target.parentElement.firstChild.data)
    renderSelectedCategoriesElement()
    recalcInputWidth()
  }
  input.value = ""
  dataList.innerHTML = renderCategories(categoriesArray, "categories__item")

  if (selectedCategories) {
    textarea.value = selectedCategories.join("\n")
  }
}

function deleteCategory(value) {
  selectedCategories = selectedCategories.filter(
    (category) => category != value
  )
}
function renderCategories(renderArray, className, span = false) {
  let result = ``
  if (renderArray) {
    renderArray.forEach((category) => {
      let isSelected = selectedCategories.includes(category) ? true : false
      let elem = document.createElement("li")

      span
        ? (elem.className = `selected-categories__item`)
        : (elem.className = `categories__item ${
            isSelected ? "active-selected" : "inactive"
          }`)
      elem.innerHTML = span
        ? `${category}<span class="selected-categories__cross">&#10005;</span>`
        : isSelected
        ? `<div class="categories__value">${category}</div>`
        : `<div class="categories__value">${category}</div>`

      result += elem.outerHTML
    })
  }
  return result
}

function renderSelectedCategoriesElement() {
  selectedList.innerHTML = renderCategories(
    selectedCategories,
    "selected-categories__item",
    true
  )
  if (selectedCategories.length > 3) {
    selectedList.innerHTML = renderCategories(
      selectedCategories.slice(0, 3),
      "selected-categories__item",
      true
    )
  }
}
function recalcInputWidth() {
  if (selectedList.clientWidth > 220) {
    selectedList.lastElementChild.outerHTML = `<li class='selected-categories__item selected-array'>${selectedCategories.length}...<span class="selected-categories__cross"></span></li>`
  } else {
    selectedList.innerHTML = renderCategories(
      selectedCategories,
      "selected-categories__item",
      true
    )
  }
  input.style = `padding-left: ${selectedList.clientWidth + 10}px;`
}
function searchData(value) {
  let result
  if (categoriesArray) {
    result = categoriesArray.filter((item) => item.includes(value))
  }
  return result
}
