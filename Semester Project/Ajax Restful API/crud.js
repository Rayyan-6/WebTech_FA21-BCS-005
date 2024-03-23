$(function () {
  loadItems();
  $(".items").on("click", ".delbtn", handleDelete);
  // $(".items").on("click", ".addbtn", addItem);
  $(".addbtn").click(addItem);
});

function handleDelete() {
  console.log("inside delete");
  var btn = $(this);
  var parentDiv = btn.closest(".card");
  let id = parentDiv.attr("data-id");
  console.log(`id is ${id}`);

  $.ajax({
    url: "https://usmanlive.com/wp-json/api/stories" + `/${id}`,
    method: "DELETE",
    success: function () {
      loadItems();
    },
  });
}

function addItem() {
  var title = $("#title").val();
  var content = $("#content").val();
  $.ajax({
    url: "https://usmanlive.com/wp-json/api/stories",
    method: "POST",
    data: { title, content },
    success: function (response) {
      console.log("inside success of ad function ");
      $("#title").val("");
      $("#content").val("");

      loadItems();
    },
  });
}

function loadItems() {
  $.ajax({
    url: "https://usmanlive.com/wp-json/api/stories",
    method: "GET",
    success: function (response) {
      var cardContainer = $("#cardContainer");
      cardContainer.empty();

      for (var i = 0; i < response.length; i++) {
        var rec = response[i];
        cardContainer.append(`
        <div class="card border-success mb-3" style="max-width: 18rem" data-id="${rec.id}">
            <div class="card-header bg-transparent border-success header">${rec.id}</div>
            <div class="card-body text-success">
                <h5 class="card-title title">${rec.title}</h5>
                <p class="card-text content">${rec.content}</p>
            </div>
            <div class="card-footer bg-transparent border-success footer">
            <Button class="btn btn-secondary editbtn">Edit</Button>
            <Button class="btn btn-danger delbtn">Delete</Button>
            </div>
        </div>
    `);
      }
    },
  });
}
