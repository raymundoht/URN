/* Carga condicional de GA4, Google Ads, GTM y Meta Pixel según config.js */
(function () {
  var c = window.URN_CONFIG || {};
  window.dataLayer = window.dataLayer || [];

  // Google Tag Manager
  if (c.gtmId) {
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    var g = document.createElement("script");
    g.async = true;
    g.src = "https://www.googletagmanager.com/gtm.js?id=" + c.gtmId;
    document.head.appendChild(g);
  }

  // gtag (GA4 + Google Ads)
  var gtagId = c.ga4Id || c.googleAdsId;
  if (gtagId) {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + gtagId;
    document.head.appendChild(s);
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    if (c.ga4Id) window.gtag("config", c.ga4Id);
    if (c.googleAdsId) window.gtag("config", c.googleAdsId);
  }

  // Meta Pixel
  if (c.metaPixelId) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq("init", c.metaPixelId);
    window.fbq("track", "PageView");
  }

  /* API única de medición usada por app.js */
  window.urnTrack = function (name, params) {
    params = params || {};
    window.dataLayer.push(Object.assign({ event: name }, params));

    if (name === "lead_submit") {
      if (window.gtag) {
        window.gtag("event", "generate_lead", { career: params.carrera, form_source: params.origen });
        if (c.googleAdsId && c.googleAdsLeadLabel)
          window.gtag("event", "conversion", { send_to: c.googleAdsId + "/" + c.googleAdsLeadLabel });
      }
      if (window.fbq) window.fbq("track", "Lead", { content_name: params.carrera, content_category: params.origen });
    }

    if (name === "whatsapp_click") {
      if (window.gtag) {
        window.gtag("event", "whatsapp_click", { career: params.carrera, click_source: params.origen });
        if (c.googleAdsId && c.googleAdsWhatsappLabel)
          window.gtag("event", "conversion", { send_to: c.googleAdsId + "/" + c.googleAdsWhatsappLabel });
      }
      if (window.fbq) window.fbq("track", "Contact", { content_name: params.carrera, content_category: params.origen });
    }

    if (name === "vocational_click") {
      if (window.gtag) window.gtag("event", "vocational_test_click", { click_source: params.origen });
      if (window.fbq) window.fbq("trackCustom", "ExamenVocacional", { content_category: params.origen });
    }

    if (name === "career_view") {
      if (window.gtag) window.gtag("event", "view_item", { career: params.carrera });
      if (window.fbq) window.fbq("track", "ViewContent", { content_name: params.carrera });
    }

    if (!c.ga4Id && !c.googleAdsId && !c.metaPixelId && !c.gtmId) {
      console.info("[URN tracking – modo prueba]", name, params);
    }
  };
})();
