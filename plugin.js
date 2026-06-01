// plugin.js – Wireframes IHM S6
// Se ejecuta en el contexto del plugin de Penpot (tiene acceso a la API `penpot`)

penpot.ui.open("Wireframes IHM S6", "", { width: 340, height: 420 });

// ── Utilidades ────────────────────────────────────────────────────────────────
function hex(r, g, b) {
  return "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("");
}

async function makeRect(page, name, x, y, w, h, color = "#CCCCCC") {
  const r = page.createRectangle();
  r.name = name;
  r.x = x; r.y = y; r.width = w; r.height = h;
  r.fills = [{ fillColor: color, fillOpacity: 1 }];
  r.strokes = [{ strokeColor: "#999999", strokeOpacity: 1, strokeWidth: 1, strokeType: "solid" }];
  return r;
}

async function makeText(page, content, x, y, w, h, size = 13, weight = "400", color = "#000000", align = "left") {
  const t = page.createText(content);
  t.x = x; t.y = y; t.width = w; t.height = h;
  t.growType = "fixed";
  t.fontFamily = "Arial";
  t.fontSize = String(size);
  t.fontWeight = weight;
  t.fills = [{ fillColor: color, fillOpacity: 1 }];
  t.textAlignHorizontal = align;
  return t;
}

function addNote(frame, text, x, y) {
  const bg = frame.createRectangle();
  bg.name = "Anotacion"; bg.x = x; bg.y = y; bg.width = 240; bg.height = 36;
  bg.fills = [{ fillColor: "#FFFACD", fillOpacity: 0.95 }];
  bg.strokes = [{ strokeColor: "#CCAA00", strokeOpacity: 1, strokeWidth: 1, strokeType: "solid" }];

  const t = frame.createText(">> " + text);
  t.x = x + 4; t.y = y + 8; t.width = 232; t.height = 22;
  t.growType = "fixed"; t.fontFamily = "Arial";
  t.fontSize = "10"; t.fontWeight = "400";
  t.fills = [{ fillColor: "#665500", fillOpacity: 1 }];
  t.textAlignHorizontal = "left";
}

function addHeader(frame, activeLabel) {
  const h = frame.createRectangle();
  h.name = "Header"; h.x = 0; h.y = 0; h.width = 1280; h.height = 64;
  h.fills = [{ fillColor: "#CCCCCC", fillOpacity: 1 }];
  h.strokes = [{ strokeColor: "#999999", strokeOpacity: 1, strokeWidth: 1, strokeType: "solid" }];

  const t = frame.createText("Header: Logo + Navegacion  |  " + activeLabel);
  t.x = 0; t.y = 20; t.width = 1280; t.height = 24;
  t.growType = "fixed"; t.fontFamily = "Arial"; t.fontSize = "14"; t.fontWeight = "700";
  t.fills = [{ fillColor: "#000000", fillOpacity: 1 }];
  t.textAlignHorizontal = "center";
}

function addFooter(frame) {
  const f = frame.createRectangle();
  f.name = "Footer"; f.x = 0; f.y = 760; f.width = 1280; f.height = 40;
  f.fills = [{ fillColor: "#B4B4B4", fillOpacity: 1 }];
  f.strokes = [{ strokeColor: "#999999", strokeOpacity: 1, strokeWidth: 1, strokeType: "solid" }];

  const t = frame.createText("Footer: Contacto · Universidad Agraria del Ecuador · 2026");
  t.x = 0; t.y = 770; t.width = 1280; t.height = 20;
  t.growType = "fixed"; t.fontFamily = "Arial"; t.fontSize = "12"; t.fontWeight = "400";
  t.fills = [{ fillColor: "#000000", fillOpacity: 1 }];
  t.textAlignHorizontal = "center";
}

function makeFrame(page, name, x) {
  const f = page.createFrame();
  f.name = name; f.x = x; f.y = 0; f.width = 1280; f.height = 800;
  f.fills = [{ fillColor: "#FFFFFF", fillOpacity: 1 }];
  return f;
}

function rect(frame, name, x, y, w, h, color = "#CCCCCC") {
  const r = frame.createRectangle();
  r.name = name; r.x = x; r.y = y; r.width = w; r.height = h;
  r.fills = [{ fillColor: color, fillOpacity: 1 }];
  r.strokes = [{ strokeColor: "#999999", strokeOpacity: 1, strokeWidth: 1, strokeType: "solid" }];
  return r;
}

function text(frame, content, x, y, w, h, size = 13, weight = "400", color = "#000000", align = "left") {
  const t = frame.createText(content);
  t.x = x; t.y = y; t.width = w; t.height = h;
  t.growType = "fixed"; t.fontFamily = "Arial";
  t.fontSize = String(size); t.fontWeight = weight;
  t.fills = [{ fillColor: color, fillOpacity: 1 }];
  t.textAlignHorizontal = align;
  return t;
}

// ── Generador de pantallas ────────────────────────────────────────────────────

function buildP1(page) {
  const f = makeFrame(page, "P1 - Inicio", 0);
  addHeader(f, "[Inicio]  Chat  Historial  Configuracion");

  rect(f, "Hero-BG", 0, 64, 1280, 300, "#E6E6E6");
  text(f, "Asistente de Escritura Academica", 240, 118, 800, 44, 30, "700", "#000000", "center");
  text(f, "Potenciado por Claude AI - Redacta, mejora y revisa textos academicos.", 240, 172, 800, 26, 14, "400", "#555555", "center");
  rect(f, "CTA - Comenzar ahora", 490, 224, 300, 50, "#999999");
  text(f, "Comenzar ahora >", 490, 236, 300, 26, 15, "700", "#FFFFFF", "center");

  text(f, "Que puedes hacer?", 0, 398, 1280, 28, 18, "700", "#000000", "center");
  [[100, "Redactar\nEnsayos e informes"], [490, "Revisar\nGramatica y estilo"], [880, "Citar\nReferencias APA 7"]].forEach(([x, lbl]) => {
    rect(f, "Card-" + lbl.split("\n")[0], x, 440, 300, 150, "#CCCCCC");
    text(f, lbl, x + 10, 470, 280, 100, 13, "400", "#000000", "left");
  });

  rect(f, "Input-Prueba rapida", 100, 622, 900, 46, "#EEEEEE");
  text(f, "Escribe algo para mejorar con IA...", 112, 634, 760, 22, 13, "400", "#AAAAAA", "left");
  rect(f, "Btn-Probar", 1010, 622, 170, 46, "#999999");
  text(f, "Probar >", 1010, 634, 170, 22, 14, "700", "#FFFFFF", "center");

  addNote(f, "Navegacion principal del sitio", 0, 66);
  addNote(f, "CTA principal: ingreso al chat", 490, 276);
  addNote(f, "Cards de funcionalidades clave", 100, 594);
  addNote(f, "Campo de prueba rapida de IA", 100, 670);
  addFooter(f);
}

function buildP2(page) {
  const f = makeFrame(page, "P2 - Chat Activo", 1360);
  addHeader(f, "Inicio  [Chat]  Historial  Configuracion");

  rect(f, "Sidebar", 0, 64, 260, 736, "#EBEBEB");
  text(f, "Conversaciones recientes", 10, 76, 240, 20, 13, "700", "#000000", "left");
  ["Ensayo cambio climatico", "Resumen tesis Cap.3", "Correccion APA", "Borrador carta", "+ Nueva conversacion"].forEach((s, i) => {
    rect(f, "Session-" + (i + 1), 4, 106 + i * 50, 252, 42, i === 0 ? "#BBBBBB" : "#CCCCCC");
    text(f, s, 12, 116 + i * 50, 236, 22, 12, i === 4 ? "700" : "400", "#000000", "left");
  });

  rect(f, "Chat-Area", 260, 64, 1020, 656, "#F9F9F9");
  text(f, "Sesion activa: Ensayo sobre cambio climatico", 270, 72, 1000, 20, 12, "400", "#555555", "left");

  rect(f, "Burbuja-Usuario-1", 800, 106, 460, 66, "#CCCCCC");
  text(f, "Usuario: Mejora la introduccion de mi ensayo.", 810, 114, 442, 50, 12, "400", "#000000", "left");

  rect(f, "Burbuja-Bot-1", 270, 190, 560, 120, "#E0E0E0");
  text(f, "Claude AI: Aqui tienes una introduccion mejorada:\nEl cambio climatico representa uno de los desafios\nmas urgentes del siglo XXI... [continua]", 280, 198, 540, 104, 12, "400", "#000000", "left");

  rect(f, "Burbuja-Usuario-2", 800, 328, 460, 48, "#CCCCCC");
  text(f, "Usuario: Puedes agregar una cita APA?", 810, 338, 440, 28, 12, "400", "#000000", "left");

  rect(f, "Indicador-Procesando", 270, 390, 200, 36, "#DDDDDD");
  text(f, "* * *  Procesando...", 282, 400, 180, 16, 13, "400", "#555555", "left");

  rect(f, "Toolbar-Acciones", 260, 676, 1020, 36, "#DDDDDD");
  text(f, "[Copiar]  [Insertar en doc]  [Regenerar]  [Guardar en historial]", 270, 684, 1000, 20, 11, "400", "#333333", "center");

  rect(f, "Input-Consulta", 260, 718, 900, 46, "#EEEEEE");
  text(f, "Escribe tu consulta al asistente...", 272, 730, 860, 22, 13, "400", "#AAAAAA", "left");
  rect(f, "Btn-Enviar", 1168, 718, 112, 46, "#999999");
  text(f, "Enviar >", 1168, 730, 112, 22, 13, "700", "#FFFFFF", "center");

  addNote(f, "Sidebar: historial de sesiones", 0, 66);
  addNote(f, "Burbujas usuario alineadas derecha", 800, 176);
  addNote(f, "Burbujas bot alineadas izquierda", 270, 316);
  addNote(f, "Indicador animado: puntos procesando", 270, 430);
  addNote(f, "Toolbar: acciones post-respuesta IA", 260, 656);
  addFooter(f);
}

function buildP3(page) {
  const f = makeFrame(page, "P3 - Historial", 2720);
  addHeader(f, "Inicio  Chat  [Historial]  Configuracion");
  text(f, "Historial de conversaciones", 64, 82, 600, 28, 20, "700", "#000000", "left");

  rect(f, "Input-Buscar", 64, 122, 680, 44, "#EEEEEE");
  text(f, "Buscar por titulo, fecha o palabras clave...", 76, 134, 656, 20, 13, "400", "#AAAAAA", "left");
  ["Todos", "Esta semana", "Este mes", "Favoritos"].forEach((fl, i) => {
    rect(f, "Filter-" + fl, 760 + i * 120, 122, 110, 44, i === 0 ? "#999999" : "#DDDDDD");
    text(f, fl, 760 + i * 120, 134, 110, 20, 12, i === 0 ? "700" : "400", i === 0 ? "#FFFFFF" : "#333333", "center");
  });

  rect(f, "Table-Header", 64, 186, 1152, 38, "#DDDDDD");
  [{l:"Titulo de la conversacion",x:76,w:460},{l:"Fecha",x:550,w:150},{l:"Mensajes",x:714,w:100},{l:"Estado",x:828,w:140},{l:"Acciones",x:982,w:180}]
    .forEach(c => text(f, c.l, c.x, 196, c.w, 20, 12, "700", "#000000", "left"));

  [
    ["Ensayo sobre cambio climatico","28 may 2026","12","Completado"],
    ["Resumen de tesis Cap. 3","27 may 2026","8","Completado"],
    ["Correccion APA: bibliografia","26 may 2026","5","Completado"],
    ["Borrador carta formal","25 may 2026","15","Favorito"],
    ["Analisis articulo cientifico","24 may 2026","9","Completado"],
    ["Plantilla informe tecnico","23 may 2026","6","Favorito"],
  ].forEach((row, i) => {
    rect(f, "Row-" + (i + 1), 64, 224 + i * 52, 1152, 44, i % 2 === 0 ? "#F7F7F7" : "#EFEFEF");
    text(f, row[0], 76, 236 + i * 52, 456, 20, 12, "400", "#000000", "left");
    text(f, row[1], 550, 236 + i * 52, 150, 20, 12, "400", "#333333", "left");
    text(f, row[2], 714, 236 + i * 52, 100, 20, 12, "400", "#333333", "center");
    text(f, row[3], 828, 236 + i * 52, 140, 20, 12, "400", "#333333", "left");
    rect(f, "Btn-Abrir-" + i, 986, 232 + i * 52, 56, 28, "#CCCCCC");
    text(f, "Abrir", 986, 240 + i * 52, 56, 14, 11, "700", "#000000", "center");
    rect(f, "Btn-Eliminar-" + i, 1050, 232 + i * 52, 68, 28, "#E0E0E0");
    text(f, "Eliminar", 1050, 240 + i * 52, 68, 14, 11, "400", "#CC0000", "center");
  });

  rect(f, "Paginacion", 64, 552, 400, 40, "#EEEEEE");
  text(f, "< Anterior  |  1  2  3...  |  Siguiente >", 74, 562, 380, 20, 13, "400", "#333333", "center");
  rect(f, "Btn-Nueva-conversacion", 1044, 552, 220, 44, "#999999");
  text(f, "+ Nueva conversacion", 1044, 564, 220, 20, 13, "700", "#FFFFFF", "center");

  addNote(f, "Barra busqueda + filtros rapidos", 64, 168);
  addNote(f, "Tabla historial con acciones por fila", 64, 224);
  addNote(f, "Paginacion + acceso nueva sesion", 64, 598);
  addFooter(f);
}

function buildP4(page) {
  const f = makeFrame(page, "P4 - Configuracion", 4080);
  addHeader(f, "Inicio  Chat  Historial  [Configuracion]");

  rect(f, "Config-Sidebar", 0, 64, 260, 696, "#EBEBEB");
  text(f, "Configuracion", 12, 76, 236, 20, 14, "700", "#000000", "left");
  [
    ["Perfil de usuario", true],
    ["Preferencias de IA", false],
    ["Apariencia", false],
    ["Notificaciones", false],
    ["Privacidad y seguridad", false],
    ["Eliminar cuenta", false],
  ].forEach(([lbl, active], i) => {
    rect(f, "Menu-" + lbl, 0, 106 + i * 52, 260, 44, active ? "#BBBBBB" : "#DDDDDD");
    text(f, lbl, 12, 116 + i * 52, 240, 24, 13, active ? "700" : "400", "#000000", "left");
  });

  rect(f, "Content-Area", 260, 64, 1020, 696, "#F9F9F9");
  text(f, "Perfil de usuario", 280, 78, 500, 26, 17, "700", "#000000", "left");
  text(f, "Gestiona tu informacion personal y foto de perfil.", 280, 108, 700, 20, 12, "400", "#666666", "left");
  rect(f, "Separador", 280, 132, 980, 1, "#CCCCCC");

  rect(f, "Avatar-Placeholder", 280, 148, 80, 80, "#CCCCCC");
  text(f, "Foto", 280, 178, 80, 20, 11, "400", "#555555", "center");
  rect(f, "Btn-Cambiar-foto", 372, 182, 130, 32, "#DDDDDD");
  text(f, "Cambiar foto", 372, 190, 130, 16, 12, "400", "#333333", "center");

  [
    ["Nombre completo", "Ej: Maria Garcia Lopez", 254],
    ["Correo electronico", "maria.garcia@uagro.edu.ec", 316],
    ["Institucion", "Universidad Agraria del Ecuador", 378],
    ["Rol academico", "Estudiante / Docente / Investigador", 440],
  ].forEach(([lbl, ph, y]) => {
    text(f, lbl, 280, y, 300, 18, 12, "700", "#000000", "left");
    rect(f, "Input-" + lbl, 280, y + 20, 680, 42, "#EEEEEE");
    text(f, ph, 292, y + 30, 660, 22, 13, "400", "#AAAAAA", "left");
  });

  text(f, "Idioma de la interfaz", 280, 516, 300, 18, 12, "700", "#000000", "left");
  rect(f, "Select-Idioma", 280, 536, 260, 42, "#EEEEEE");
  text(f, "Espanol (Ecuador)  v", 292, 548, 240, 18, 13, "400", "#333333", "left");

  text(f, "Modo oscuro", 280, 602, 200, 20, 13, "700", "#000000", "left");
  rect(f, "Toggle-BG", 488, 602, 60, 24, "#CCCCCC");
  rect(f, "Toggle-Circulo", 490, 604, 20, 20, "#999999");
  text(f, "Desactivado", 556, 604, 120, 18, 12, "400", "#666666", "left");

  rect(f, "Btn-Guardar", 280, 648, 200, 46, "#999999");
  text(f, "Guardar cambios", 280, 660, 200, 22, 14, "700", "#FFFFFF", "center");
  rect(f, "Btn-Cancelar", 492, 648, 130, 46, "#DDDDDD");
  text(f, "Cancelar", 492, 660, 130, 22, 14, "400", "#333333", "center");

  addNote(f, "Sidebar: secciones de configuracion", 0, 66);
  addNote(f, "Avatar + opcion cambio de foto", 280, 232);
  addNote(f, "Formulario campos editables de perfil", 280, 498);
  addNote(f, "Toggle activar/desactivar modo oscuro", 280, 628);
  addNote(f, "H9 Nielsen: boton Cancelar siempre visible", 280, 696);
  addFooter(f);
}

// ── Escucha mensajes desde el panel UI ───────────────────────────────────────
penpot.on("message", (msg) => {
  if (msg.type === "generate") {
    const page = penpot.currentPage;

    try {
      if (msg.screen === "all" || msg.screen === "p1") buildP1(page);
      if (msg.screen === "all" || msg.screen === "p2") buildP2(page);
      if (msg.screen === "all" || msg.screen === "p3") buildP3(page);
      if (msg.screen === "all" || msg.screen === "p4") buildP4(page);
      penpot.ui.sendMessage({ type: "done", screen: msg.screen });
    } catch (e) {
      penpot.ui.sendMessage({ type: "error", message: e.message });
    }
  }
});
