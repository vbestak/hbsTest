/**
 * Display Bootstrap toasts with custom messages and options.
 * @param {Object[]} toasts - An array of toast objects.
 * @param {string} toasts[].message - The message to be displayed in the toast.
 * @param {string} toasts[].type - The type of toast, either 'success' or 'error'.
 * @param {boolean} [toasts[].autoHide=true] - Whether the toast should automatically hide after a delay.
 * @param {number} [toasts[].delay=5000] - The delay in milliseconds before the toast automatically hides.
 */
function showToast(toasts) {
  const toastContainer = document.querySelector('.toast-container');

  toasts.forEach(toast => {
    const toastClass = toast.type === 'success' ? 'bg-success' : 'bg-danger';
    const autoHide = toast.autoHide !== undefined ? toast.autoHide : true;
    const delay = toast.delay !== undefined ? toast.delay : 5000;

    const tempToastContainer = document.createElement('div');

    const toastHTML = `
      <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="${autoHide}" data-delay="${delay}">
        <div class="toast-header justify-content-between ${toastClass}">
          <strong class="mr-auto text-white">Notification</strong>
          <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="toast-body">
          ${toast.message}
        </div>
      </div>
    `;

    tempToastContainer.innerHTML = toastHTML;
    toastContainer.appendChild(tempToastContainer);

    const toastElement = tempToastContainer.querySelector('.toast');
    const bootstrapToast = new bootstrap.Toast(toastElement);

    toastElement.querySelector('.close').addEventListener('click', () => {
      bootstrapToast.hide();
    });

    toastElement.addEventListener('hidden.bs.toast', () => {
      tempToastContainer.remove();
    });

    bootstrapToast.show();
  });
}