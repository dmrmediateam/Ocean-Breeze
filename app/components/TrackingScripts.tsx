import Script from "next/script";

const trackingScript = String.raw`(() => {
  const STORAGE_KEY = "ocean-breeze-attribution";
  const TRACKED_PARAMS = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "fbclid",
    "msclkid",
    "ttclid",
  ];
  const FORM_SELECTOR = "form[data-lead-form]";
  const CLICK_SELECTOR = "[data-track-click]";

  function safeParse(value) {
    if (!value) {
      return {};
    }

    try {
      const parsed = JSON.parse(value);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  }

  function readAttribution() {
    try {
      return safeParse(window.localStorage.getItem(STORAGE_KEY));
    } catch {
      return {};
    }
  }

  function writeAttribution(value) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {
      return value;
    }

    return value;
  }

  function getTouchFromParams(params) {
    return TRACKED_PARAMS.reduce((touch, name) => {
      const value = params.get(name);

      if (value) {
        touch[name] = value;
      }

      return touch;
    }, {});
  }

  function hasTouchData(touch) {
    return Object.keys(touch).length > 0;
  }

  function updateAttribution() {
    const now = new Date().toISOString();
    const currentUrl = window.location.href;
    const referrer = document.referrer || "";
    const existing = readAttribution();
    const params = new URLSearchParams(window.location.search);
    const currentTouch = getTouchFromParams(params);
    const next = {
      ...existing,
      latestPage: currentUrl,
      latestPath: window.location.pathname + window.location.search,
    };

    if (!next.firstVisitAt) {
      next.firstVisitAt = now;
    }

    if (!next.initialLandingPage) {
      next.initialLandingPage = currentUrl;
    }

    if (!next.initialReferrer) {
      next.initialReferrer = referrer;
    }

    if (hasTouchData(currentTouch)) {
      if (!next.firstTouch) {
        next.firstTouch = currentTouch;
        next.firstTouchAt = now;
        next.firstTouchLandingPage = currentUrl;
        next.firstTouchReferrer = referrer;
      }

      next.lastTouch = currentTouch;
      next.lastTouchAt = now;
      next.lastTouchLandingPage = currentUrl;
      next.lastTouchReferrer = referrer;
    }

    window.oceanBreezeAttribution = writeAttribution(next);

    return next;
  }

  function setField(form, name, value) {
    const element = form.elements.namedItem(name);

    if (!element || !("value" in element)) {
      return;
    }

    element.value = value || "";
  }

  function populateForm(form, attribution) {
    TRACKED_PARAMS.forEach((name) => {
      setField(form, name, attribution.lastTouch?.[name] || "");
      setField(form, "first_" + name, attribution.firstTouch?.[name] || "");
    });

    setField(form, "landing_page", attribution.latestPage || window.location.href);
    setField(
      form,
      "initial_landing_page",
      attribution.firstTouchLandingPage || attribution.initialLandingPage || "",
    );
    setField(
      form,
      "referrer",
      attribution.lastTouchReferrer || attribution.initialReferrer || document.referrer || "",
    );
    setField(form, "first_touch_at", attribution.firstTouchAt || attribution.firstVisitAt || "");
    setField(form, "last_touch_at", attribution.lastTouchAt || "");
  }

  function populateForms(attribution) {
    document.querySelectorAll(FORM_SELECTOR).forEach((form) => {
      if (form instanceof HTMLFormElement) {
        populateForm(form, attribution);
      }
    });
  }

  function toText(value) {
    return value == null ? "" : String(value).trim();
  }

  function appendLine(lines, label, value) {
    const text = toText(value);

    if (text) {
      lines.push(label + ": " + text);
    }
  }

  function buildMailBody(form, formType) {
    const data = new FormData(form);
    const lines = [];

    lines.push("Ocean Breeze lead");
    lines.push("");
    appendLine(lines, "Lead Type", formType);
    appendLine(lines, "Full Name", data.get("fullName"));
    appendLine(lines, "Email Address", data.get("email"));
    appendLine(lines, "Phone Number", data.get("phone"));
    appendLine(lines, "Budget", data.get("budget"));
    appendLine(lines, "Purchase Timeline", data.get("timeline"));
    appendLine(lines, "Preferred Date", data.get("preferredDate"));
    appendLine(lines, "Preferred Time", data.get("preferredTime"));

    const message = toText(data.get("message"));

    if (message) {
      lines.push("");
      lines.push("Message:");
      lines.push(message);
    }

    lines.push("");
    lines.push("Attribution");
    appendLine(lines, "UTM Source", data.get("utm_source"));
    appendLine(lines, "UTM Medium", data.get("utm_medium"));
    appendLine(lines, "UTM Campaign", data.get("utm_campaign"));
    appendLine(lines, "UTM Term", data.get("utm_term"));
    appendLine(lines, "UTM Content", data.get("utm_content"));
    appendLine(lines, "Google Click ID", data.get("gclid"));
    appendLine(lines, "Facebook Click ID", data.get("fbclid"));
    appendLine(lines, "Microsoft Click ID", data.get("msclkid"));
    appendLine(lines, "TikTok Click ID", data.get("ttclid"));
    appendLine(lines, "Landing Page", data.get("landing_page"));
    appendLine(lines, "Initial Landing Page", data.get("initial_landing_page"));
    appendLine(lines, "Referrer", data.get("referrer"));
    appendLine(lines, "First Touch At", data.get("first_touch_at"));
    appendLine(lines, "Last Touch At", data.get("last_touch_at"));
    appendLine(lines, "First UTM Source", data.get("first_utm_source"));
    appendLine(lines, "First UTM Medium", data.get("first_utm_medium"));
    appendLine(lines, "First UTM Campaign", data.get("first_utm_campaign"));
    appendLine(lines, "First UTM Term", data.get("first_utm_term"));
    appendLine(lines, "First UTM Content", data.get("first_utm_content"));
    appendLine(lines, "First Google Click ID", data.get("first_gclid"));
    appendLine(lines, "First Facebook Click ID", data.get("first_fbclid"));
    appendLine(lines, "First Microsoft Click ID", data.get("first_msclkid"));
    appendLine(lines, "First TikTok Click ID", data.get("first_ttclid"));

    return lines.join("\n");
  }

  function pushDataLayerEvent(payload) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
  }

  function handleSubmit(event) {
    const target = event.target;

    if (!(target instanceof HTMLFormElement) || !target.matches(FORM_SELECTOR)) {
      return;
    }

    const attribution = updateAttribution();
    populateForm(target, attribution);

    const formType = target.getAttribute("data-lead-form") || "lead";
    const data = new FormData(target);

    pushDataLayerEvent({
      event: "lead_form_submit",
      lead_form: formType,
      utm_source: toText(data.get("utm_source")),
      utm_medium: toText(data.get("utm_medium")),
      utm_campaign: toText(data.get("utm_campaign")),
      landing_page: toText(data.get("landing_page")),
    });

    const action = target.getAttribute("action") || "";

    if (!action.startsWith("mailto:")) {
      return;
    }

    event.preventDefault();

    const subject = toText(data.get("subject")) || "Ocean Breeze lead";
    const body = buildMailBody(target, formType);
    const params = new URLSearchParams({
      subject,
      body,
    });

    window.location.href = action + "?" + params.toString();
  }

  function handleClick(event) {
    const origin = event.target;

    if (!(origin instanceof Element)) {
      return;
    }

    const target = origin.closest(CLICK_SELECTOR);

    if (!target) {
      return;
    }

    pushDataLayerEvent({
      event: "cta_click",
      cta_name: target.getAttribute("data-track-click") || "",
      cta_location: target.getAttribute("data-track-location") || "",
      cta_target: target.getAttribute("href") || "",
    });
  }

  window.populateOceanBreezeAttribution = (form) => {
    const attribution = updateAttribution();

    if (form instanceof HTMLFormElement) {
      populateForm(form, attribution);
    }

    return attribution;
  };

  const attribution = updateAttribution();
  populateForms(attribution);
  document.addEventListener("submit", handleSubmit);
  document.addEventListener("click", handleClick);
})();`;

export default function TrackingScripts() {
  return (
    <Script id="ocean-breeze-tracking" strategy="afterInteractive">
      {trackingScript}
    </Script>
  );
}
