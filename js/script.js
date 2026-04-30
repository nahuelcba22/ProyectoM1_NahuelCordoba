// -------------------- SELECTORES --------------------
const btn = document.getElementById("btnGenerar");
const contenedor = document.getElementById("paleta");
const toast = document.getElementById("toast");
const botonesCantidad = document.querySelectorAll(".btn-cantidad");
const botonesFormato = document.querySelectorAll(".btn-formato");

// -------------------- ESTADO --------------------
let cantidadSeleccionada = 6;
let formatoActual = "hex";
let paleta = [];

// -------------------- GENERACIÓN DE COLOR --------------------
function generarColor() {
  if (formatoActual === "hex") {
    const chars = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
      color += chars[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 100);
  const l = Math.floor(Math.random() * 100);

  return `hsl(${h}, ${s}%, ${l}%)`;
}

/* -------------------- CONVERSIÓN HSL → HEX -------------------- */
function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;

  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);

  const f = n => {
    const color = l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };

  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

// -------------------- INICIALIZACIÓN --------------------
function inicializarPaleta(cantidad) {
  paleta = [];

  for (let i = 0; i < cantidad; i++) {
    paleta.push({
      color: generarColor(),
      locked: false
    });
  }
}

// -------------------- AJUSTE DE CANTIDAD --------------------
function ajustarPaleta(nuevaCantidad) {
  const bloqueados = paleta.filter(item => item.locked);

  paleta = paleta.slice(0, nuevaCantidad);

  bloqueados.forEach(item => {
    if (!paleta.includes(item)) {
      if (paleta.length < nuevaCantidad) {
        paleta.push(item);
      } else {
        paleta[nuevaCantidad - 1] = item;
      }
    }
  });

  while (paleta.length < nuevaCantidad) {
    paleta.push({
      color: generarColor(),
      locked: false
    });
  }
}

// -------------------- TOAST --------------------
function mostrarToast(mensaje) {
  toast.textContent = mensaje;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 1500);
}

// -------------------- CREAR BLOQUE --------------------
function crearColor(item) {
  const div = document.createElement("div");
  div.classList.add("color");
  div.style.backgroundColor = item.color;

  const span = document.createElement("span");
 let textoMostrado = item.color;

if (item.color.startsWith("hsl")) {
  const valores = item.color.match(/\d+/g);
  const h = parseInt(valores[0]);
  const s = parseInt(valores[1]);
  const l = parseInt(valores[2]);

  textoMostrado = hslToHex(h, s, l);
}

span.textContent = textoMostrado.toUpperCase();

  if (item.locked) div.classList.add("locked");

  const tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");

  const lockBtn = document.createElement("button");
  lockBtn.textContent = item.locked ? "Desbloquear" : "Bloquear color";

  tooltip.append(lockBtn);
  div.appendChild(tooltip);
  div.appendChild(span);

  // Tooltip hover
  let timeout;
  div.addEventListener("mouseenter", () => {
    timeout = setTimeout(() => tooltip.classList.add("show"), 400);
  });

  div.addEventListener("mouseleave", () => {
    clearTimeout(timeout);
    tooltip.classList.remove("show");
  });

  // Bloquear
  lockBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    item.locked = !item.locked;

    div.classList.toggle("locked");
    lockBtn.textContent = item.locked ? "Desbloquear" : "Bloquear color";
  });

  // Copiar
  div.addEventListener("click", () => {
    navigator.clipboard.writeText(textoMostrado.toUpperCase());
    mostrarToast("Copiado: " + textoMostrado);
  });

  return div;
}

/* -------------------- GENERAR PALETA -------------------- */
function generarPaleta() {
  // Solo cambia colores (lógica)
  paleta.forEach(item => {
    if (!item.locked) {
      item.color = generarColor();
    }
  });
  renderPaleta();
}
/* -------------------- RENDER PALETA -------------------- */
function renderPaleta() {
  contenedor.innerHTML = "";

  paleta.forEach(item => {
    const bloque = crearColor(item);
    contenedor.appendChild(bloque);
  });
}


// -------------------- EVENTOS --------------------
btn.addEventListener("click", generarPaleta);

botonesCantidad.forEach(btn => {
  btn.addEventListener("click", () => {
    botonesCantidad.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const nuevaCantidad = parseInt(btn.dataset.value);

    ajustarPaleta(nuevaCantidad);
    cantidadSeleccionada = nuevaCantidad;

    generarPaleta();
  });
});

botonesFormato.forEach(btn => {
  btn.addEventListener("click", () => {
    botonesFormato.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    formatoActual = btn.dataset.format;
    renderPaleta();
  });
});


// -------------------- INICIO --------------------
inicializarPaleta(cantidadSeleccionada);
generarPaleta();