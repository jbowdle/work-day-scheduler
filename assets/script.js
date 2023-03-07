// Wrapped all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // If save buttons are clicked, saves the text in the text area as a value and the
  // id as a key in local storage
  $(".saveBtn").on("click", function() {
    let target = $(this).parent().attr("id");
    let task = $(`#${target}`).children().eq(1).val();
    
    localStorage.setItem(`#${target}`, task);
  });
  
  let currentHour = dayjs().format("H");

  // Uses the current hour to set the gray, red, and green colors on the time-block divs,
  // denoting whether it is a past, present, or future hour.
  // This for loop also sets the textarea if a relevant key-value pair is found in local storage.
  for (let i = 8; i < 18; i++) {
    let hourID = `#hour-${i}`;

    if (i < currentHour) {
      $(hourID).addClass("past");
    } else if (i == currentHour) {
      $(hourID).addClass("present");
    } else {
      $(hourID).addClass("future");
    }

    let storedTask = localStorage.getItem(hourID);
    let textareaElem = $(hourID).children().eq(1);

    if (storedTask != null) {
      textareaElem.val(storedTask);
    }
  }
  
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));
});
