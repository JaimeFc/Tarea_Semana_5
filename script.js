const inputUrl = document.getElementById('image-url');
const addButton = document.getElementById('add-image');
const deleteButton = document.getElementById('delete-selected');
const gallery = document.getElementById('gallery');
const message = document.getElementById('message');

let selectedImage = null;

// Agregar imagen
addButton.addEventListener('click', () => {
  const url = inputUrl.value.trim();
  if (!url) {
    showMessage("Debes ingresar una URL válida.");
    return;
  }

  const img = document.createElement('img');
  img.src = url;
  img.alt = "Imagen del usuario";

  img.onload = () => {
    img.addEventListener('click', () => selectImage(img));
    gallery.appendChild(img);
    inputUrl.value = '';
    clearMessage();
  };

  img.onerror = () => {
    showMessage("No se pudo cargar la imagen. Asegúrate de que la URL sea correcta.");
    img.remove();
  };
});

// Seleccionar imagen
function selectImage(img) {
  if (selectedImage) {
    selectedImage.classList.remove('selected');
  }
  selectedImage = img;
  selectedImage.classList.add('selected');
}

// Eliminar imagen
deleteButton.addEventListener('click', () => {
  if (selectedImage) {
    selectedImage.remove();
    selectedImage = null;
    clearMessage();
  } else {
    showMessage("Selecciona una imagen para eliminar.");
  }
});

// Enter para agregar imagen
inputUrl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addButton.click();
  }
});

// Mostrar y limpiar mensajes
function showMessage(text) {
  message.textContent = text;
}

function clearMessage() {
  message.textContent = '';
}
