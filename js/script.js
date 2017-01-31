// State object
var state = {
  items: [],
  checked: []
};

// Modify state with the following functions
function addItem(state, item) {
  state.items.push(item);
}

function addCheck(state, item) {
  var test = state.checked.indexOf(item);
  if (test < 0) {
    state.checked.push(item);
  } else {
    state.checked.splice(test, 1);
  }
}

function removeItem(state, itemHtml) {
  var i = state.items.indexOf(itemHtml);
  var j = state.checked.indexOf(itemHtml);
  state.items.splice(i, 1);
  if (j !== -1) {
    state.checked.splice(j, 1);
  }
}

// Render state
function renderHtml(state, element) {
  var unChecked = "<li><span class='shopping-item'>"
  var checkedTag = "<li><span class='shopping-item shopping-item__checked'>";
  var htmlStr = "</span><div class='shopping-item-controls'><button class='shopping-item-toggle'><span class='button-label'>check</span></button> <button class='shopping-item-delete'><span class='button-label'>delete</span></button></div></li>";
  var makeHtml = state.items.map(function(item) {
    if (state.checked.indexOf(item) > -1) {
      return checkedTag+item+htmlStr;
    } else {
      return unChecked+item+htmlStr;
    }
  });
  element.html(makeHtml);
}

// Event handlers
function makelist() {
  $("#js-shopping-list-form").submit(function(event) {
    addItem(state, $("#shopping-list-entry").val());
    renderHtml(state, $(".shopping-list"));
    $("#shopping-list-entry").val("")
    event.preventDefault();
  });
  $(".shopping-list").on("click", "button", function(event) {
    var type = $(this).attr("class").split(/\-/g).filter(function(item) {
      return item === "delete" || item === "toggle";
    }).join("");
    var target = $(this).parent().siblings();
    var targetText = $(this).parent().siblings().text(); //[0].innerText
    if (type === "delete") {
      removeItem(state, targetText);
      renderHtml(state, $(".shopping-list"));
    } else { // it is toggle
      $(target).toggleClass("shopping-item__checked");
      addCheck(state, targetText);
    }
  });
}

$(function mainFn() {
  makelist();
});
