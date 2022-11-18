let form_add
let textarea_add
let input_add
let item_add
let dataList_add
let selectedList_add
let categoriesUl_add = document.createElement("ul")
let selectedUl_add = document.createElement("ul")
categoriesUl_add.className = `categories__listADD`
selectedUl_add.className = `selected-categories__listADD`
let categoriesArray_add
let selectedCategories_add = []

window.addEventListener("load", () => {
  getDataADD()
  form_add = document.getElementsByTagName("form")[0]
  textarea_add = document.querySelector("#id_additionals")
  input_add = document.querySelector("#id_request_for_add")
  input_add.before(selectedUl_add)
  form_add.addEventListener("click", function (e) {
    addSelectedHandlerADD(e)
  })
  selectedList_add = document.querySelector(".selected-categories__listADD")

  item_add = document.querySelector(".categories__itemADD")
  input_add.addEventListener("focus", () => {
    input_add.after(categoriesUl_add)
    dataList_add = document.querySelector(".categories__listADD")
    dataList_add.innerHTML = renderCategoriesADD(categoriesArray_add, "categories__itemADD")

  })

  input_add.addEventListener("input", (e) => {
    input_add.value == ""
      ? input_add.classList.add("emptyADD")
      : input_add.classList.remove("emptyADD")

    if (input_add.value !== "") {
      let searched_add  = searchDataADD(e.target.value)
      dataList_add.innerHTML = renderCategoriesADD(searched_add, "categories__itemADD")
    }
  })

  input_add.addEventListener("keypress", (e) => {
    console.log("e", e)
    if (e.key === "Enter") {
      addSelectedHandlerADD(e)
    }
  })
})

async function getDataADD() {
  const responseADD = await fetch("http://127.0.0.1:8000/api/categories_json/")
  const { additional } = await responseADD.json()
  categoriesArray_add = additional
}

function addCategoryADD(category) {
  console.log("selectedCategories_add", selectedCategories_add)
  if (selectedCategories_add.includes(category)) {
    deleteIfExistADD(category)
  } else {
    selectedCategories_add.push(category)
  }
}
function deleteIfExistADD(category) {
  console.log(
    "selectedCategories_add.splice(selectedCategories_add.indexOf(category),1)"
  )
  selectedCategories_add.splice(selectedCategories_add.indexOf(category), 1)
}
function addSelectedHandlerADD(e) {
  if (e.target.value && e.target.className == "cls_request_for_add") {
    addCategoryADD(e.target.value)
    renderSelectedCategoriesElementADD()
    recalcInputWidthADD()
  }

  if (e.target && e.target.id == "selectjs") {
    addCategoryADD('Emails & Contacts Scraper')
    renderSelectedCategoriesElementADD()
    recalcInputWidthADD()
  }

  if (e.target && e.target.className.split(" ")[0] == "categories__itemADD") {
    addCategoryADD(e.target.firstElementChild.textContent)
    renderSelectedCategoriesElementADD()
    recalcInputWidthADD()
  }

  if (e.target && e.target.className == "categories__valueADD") {
    addCategoryADD(e.target.textContent)
    renderSelectedCategoriesElementADD()
    recalcInputWidthADD()
  }
  console.log("e.target", e.target)
  if (
    e.target.parentElement &&
    e.target.parentElement.className == "selected-categories__itemADD"
  ) {
    deleteCategoryADD(e.target.parentElement.firstChild.data)
    renderSelectedCategoriesElementADD()
    recalcInputWidthADD()
  }
  try {
      input_add.value = ""
      dataList_add.innerHTML = renderCategoriesADD(categoriesArray_add, "categories__itemADD")
  } catch (err) {
      //pass
  }
  if (selectedCategories_add) {
    textarea_add.value = selectedCategories_add.join("\n")
  }
}

function deleteCategoryADD(value) {
  selectedCategories_add = selectedCategories_add.filter(
    (category) => category != value
  )
}
function renderCategoriesADD(renderArray, className, span = false) {
  let result_add = ``
  if (renderArray) {
    renderArray.forEach((category) => {
      let isSelected_add = selectedCategories_add.includes(category) ? true : false
      let elem_add = document.createElement("li")

      span
        ? (elem_add.className = `selected-categories__itemADD`)
        : (elem_add.className = `categories__itemADD ${
            isSelected_add ? "active-selectedADD" : "inactiveADD"
          }`)
      elem_add.innerHTML = span
        ? `${category}<span class="selected-categories__crossADD">&#10005;</span>`
        : isSelected_add
        ? `<div class="categories__valueADD">${category}</div>`
        : `<div class="categories__valueADD">${category}</div>`

      result_add  += elem_add.outerHTML
    })
  }
  return result_add
}

function renderSelectedCategoriesElementADD() {
  selectedList_add.innerHTML = renderCategoriesADD(
    selectedCategories_add,
    "selected-categories__itemADD",
    true
  )
  if (selectedCategories_add.length > 3) {
    selectedList_add.innerHTML = renderCategoriesADD(
      selectedCategories_add.slice(0, 3),
      "selected-categories__itemADD",
      true
    )
  }
}
function recalcInputWidthADD() {
  if (selectedList_add.clientWidth > 220) {
    selectedList_add.lastElementChild.outerHTML = `<li class='selected-categories__itemADD selected-arrayADD'>${selectedCategories_add.length}...<span class="selected-categories__crossADD"></span></li>`
  } else {
    selectedList_add.innerHTML = renderCategoriesADD(
      selectedCategories_add,
      "selected-categories__itemADD",
      true
    )
  }
  input_add.style = `padding-left: ${selectedList_add.clientWidth + 10}px;`
}
function searchDataADD(value) {
  let result_add
  if (categoriesArray_add) {
    result_add = categoriesArray_add.filter((item_add) => item_add.includes(value))
  }
  return result_add
}

// const popup = document.querySelector(".categories__listADD");
// document.onclick = function (e) {
//     if (e.target.className != "categories__listADD" && e.target.className != "categories__itemADD" && e.target.className != "categories__valueADD" && e.target.className != "active-selectedADD" && e.target.className != "inactiveADD" && e.target.className != "div_blADD" && e.target.id != "selectjs" ) {
//         try {
//             document.querySelector(".categories__listADD").style.display = "none";
//         } catch (err) {
//             //pass
//         }
//     };
//     if (e.target.className == "cls_request_for_add") {
//         document.querySelector(".categories__listADD").style.display = "block";
//     };
// };
