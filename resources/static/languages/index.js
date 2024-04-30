document.addEventListener("DOMContentLoaded", function() {
  const deleteButtons = document.querySelectorAll(".delete-btn");

  deleteButtons.forEach(button => {
    button.addEventListener("click", function() {
      const id = this.getAttribute("data-id");
      const row = this.closest("tr");

      if (confirm("Are you sure you want to delete this item?")) {
        fetch(`/admin/languages/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(response => {
            if (!response.ok) {
              throw response;
            }

            showToast([{ message: "Language deleted successfully", type: "success", autoHide: true, delay: 1500 }]);
            row.remove();
            deleteEmptyTable()
          })
          .catch(error => {
            showToast([{ message: "Failed to delete language", type: "error", autoHide: true, delay: 1500 }]);
            console.error("Error deleting item:", error);
          });
      }
    });
  });


  function deleteEmptyTable() {
    const table = document.querySelector('.table');

    if (table && table.querySelector('tbody').childElementCount === 0) {
      table.remove();
    }
  }
});