export default function useToast() {
  const toastContainer = document.getElementById('snackbar');

  const showToast = (message) => {
    if (toastContainer) {
      toastContainer.innerText = message;
      toastContainer.className = 'show';
    }

    setTimeout(() => { toastContainer.className = toastContainer.className.replace('show', ''); }, 3000);
  };

  return [showToast];
}
