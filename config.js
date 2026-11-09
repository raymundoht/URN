/* =========================================================
   CONFIGURACIÓN DE LA LANDING URN
   Edita solo este archivo para conectar medición, WhatsApp
   y el destino de los registros.
   ========================================================= */
window.URN_CONFIG = {
  // WhatsApp de admisiones: código de país + número, sin espacios ni "+"
  whatsappNumber: "520000000000",
  whatsappMessage: "Hola, quiero información sobre la carrera de {carrera} en la URN.",

  // Destino de los registros (CRM, Zapier/Make webhook, Google Apps Script, HubSpot, etc.)
  // Se envía un POST JSON con: nombre, telefono, carrera, origen, utm_*, gclid, fbclid, pagina, fecha.
  // Si se deja vacío, los registros solo se muestran en consola (modo prueba).
  leadEndpoint: "",

  // Google Analytics 4 (ej. "G-XXXXXXXXXX")
  ga4Id: "",
  // Google Ads (ej. "AW-123456789") y etiqueta de la conversión "Lead" (ej. "AbCdEfGh123")
  googleAdsId: "",
  googleAdsLeadLabel: "",
  googleAdsWhatsappLabel: "",
  // Google Tag Manager (opcional, ej. "GTM-XXXXXXX"). Recibe eventos vía dataLayer.
  gtmId: "",

  // Meta Pixel (ej. "123456789012345")
  metaPixelId: "",

  // Link del examen vocacional (Google Forms). Pega aquí la URL completa del formulario,
  // ej. "https://docs.google.com/forms/d/e/XXXXXXXX/viewform" o "https://forms.gle/XXXXXX"
  vocationalTestUrl: "",

  // Link al aviso de privacidad integral oficial
  privacyUrl: ""
};
