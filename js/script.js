const btn = document.getElementById("btnGenerar");
const contenedor = document.getElementById("paleta");
const select = document.getElementById("cantidad");
const toast = document.getElementById("toast");
let cantidadSeleccionada = 6;
let formatoActual = "hex";

let colores = [];
let bloqueados = [];

// Generar color HEX
function generarColor() {
  if (formatoActual === "hex") {
    const chars = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
      color += chars[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  // HSL
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 100);
  const l = Math.floor(Math.random() * 100);

  return `hsl(${h}, ${s}%, ${l}%)`;
}

// Mostrar toast
function mostrarToast(mensaje) {
  toast.textContent = mensaje;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 1500);
}

// Crear bloque de color
function crearColor(color, index) {
  const div = document.createElement("div");
  div.classList.add("color");
  div.style.backgroundColor = color;

  const span = document.createElement("span");
  span.textContent = color;

  if (bloqueados[index]) {
    div.classList.add("locked");
  }

  // CONTROLES
  const controls = document.createElement("div");
  controls.classList.add("controls", "tooltip");

  const lockBtn = document.createElement("button");
  lockBtn.textContent = bloqueados[index] 
    ? "Desbloquear" 
    : "Bloquear color";

  controls.append(lockBtn);

  div.appendChild(controls);
  div.appendChild(span);

  // Mostrar con delay
  let timeout;
  div.addEventListener("mouseenter", () => {
    timeout = setTimeout(() => {
      controls.classList.add("show");
    }, 400);
  });

  div.addEventListener("mouseleave", () => {
    clearTimeout(timeout);
    controls.classList.remove("show");
  });

  // BLOQUEAR
  lockBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    bloqueados[index] = !bloqueados[index];

    if (bloqueados[index]) {
      div.classList.add("locked");
      lockBtn.textContent = "Desbloquear";
    } else {
      div.classList.remove("locked");
      lockBtn.textContent = "Bloquear color";
    }
  });

  // COPIAR
  div.addEventListener("click", () => {
    navigator.clipboard.writeText(color);
    mostrarToast("Copiado: " + color);
  });

  return div;
}

// Generar paleta
function generarPaleta() {
  contenedor.innerHTML = "";

  const cantidad = cantidadSeleccionada;

  for (let i = 0; i < cantidad; i++) {
    if (!bloqueados[i]) {
      colores[i] = generarColor();
    }

    const bloque = crearColor(colores[i], i);
    contenedor.appendChild(bloque);
  }
}

// Evento botón
btn.addEventListener("click", generarPaleta);
const botonesCantidad = document.querySelectorAll(".btn-cantidad");

botonesCantidad.forEach(btn => {
  btn.addEventListener("click", () => {
    botonesCantidad.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    cantidadSeleccionada = parseInt(btn.dataset.value);
    generarPaleta();
  });
});
const botonesFormato = document.querySelectorAll(".btn-formato");

botonesFormato.forEach(btn => {
  btn.addEventListener("click", () => {
    botonesFormato.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    formatoActual = btn.dataset.format;
    generarPaleta();
  });
});

// Inicial
generarPaleta();