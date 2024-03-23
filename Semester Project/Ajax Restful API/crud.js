

$(function () {
  loadItems();
});

function loadItems() {
  $.ajax({
    url: "https://usmanlive.com/wp-json/api/stories",
    method: "GET",
    success: function (response) {
      var cardContainer = $("#cardContainer");
      cardContainer.empty();

      for (var i = 0; i < response.length; i++) {
        var rec = response[i];
        var cardHTML = `
                        <div class="card border-success mb-3" style="max-width: 18rem">
                            <div class="card-header bg-transparent border-success header">${rec.id}</div>
                            <div class="card-body text-success">
                                <h5 class="card-title title">${rec.title}</h5>
                                <p class="card-text content">${rec.content}</p>
                            </div>
                            <div class="card-footer bg-transparent border-success footer">
                            <Button class="btn btn-secondary">Edit</Button>
                            <Button class="btn btn-danger">Delete</Button>
                            </div>
                        </div>
                    `;
        cardContainer.append(cardHTML);
      }
    },
  });
}
