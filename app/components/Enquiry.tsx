"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";

const attributionFieldNames = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "msclkid",
  "ttclid",
  "first_utm_source",
  "first_utm_medium",
  "first_utm_campaign",
  "first_utm_term",
  "first_utm_content",
  "first_gclid",
  "first_fbclid",
  "first_msclkid",
  "first_ttclid",
  "landing_page",
  "initial_landing_page",
  "referrer",
  "first_touch_at",
  "last_touch_at",
] as const;

type LeadFormType = "request_details" | "schedule_showing";

type LeadFormConfig = {
  eyebrow: string;
  title: string;
  body: string;
  subject: string;
  submitLabel: string;
  theme: "request" | "showing";
  endpoint: string;
  successTitle: string;
  successBody: string;
};

type LeadFormStatus = "idle" | "submitting" | "success" | "error";

const leadFormConfig: Record<LeadFormType, LeadFormConfig> = {
  request_details: {
    eyebrow: "Request Details",
    title: "Receive the full listing package",
    body: "Request pricing support material, ownership details, and a direct response from the Ocean Breeze sales team.",
    subject: "Ocean Breeze | Request Details",
    submitLabel: "Request Details",
    theme: "request",
    endpoint: "/api/request-details",
    successTitle: "Thank you for your interest",
    successBody:
      "Your request has been received. The Ocean Breeze sales team will share the brochure, pricing context, and ownership details shortly.",
  },
  schedule_showing: {
    eyebrow: "Schedule a Showing",
    title: "Arrange a private tour",
    body: "Book a confidential showing and share your preferred timing so the team can coordinate a tailored walkthrough.",
    subject: "Ocean Breeze | Schedule a Showing",
    submitLabel: "Schedule a Showing",
    theme: "showing",
    endpoint: "/api/schedule-showing",
    successTitle: "Your showing request is in",
    successBody:
      "Thank you. The team has your preferred timing and will follow up to confirm the best showing window for Ocean Breeze.",
  },
};

function AttributionFields() {
  return attributionFieldNames.map((name) => (
    <input key={name} type="hidden" name={name} />
  ));
}

function LeadForm({
  type,
  onClose,
}: {
  type: LeadFormType;
  onClose: () => void;
}) {
  const config = leadFormConfig[type];
  const [submitStatus, setSubmitStatus] = useState<LeadFormStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    try {
      setSubmitStatus("submitting");
      setSubmitMessage("");
      (
        window as Window & {
          populateOceanBreezeAttribution?: (form: HTMLFormElement) => unknown;
        }
      ).populateOceanBreezeAttribution?.(form);

      const payload = Object.fromEntries(new FormData(form).entries());
      const response = await fetch(config.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setSubmitStatus("success");
      setSubmitMessage(config.successBody);
      form.reset();
    } catch {
      setSubmitStatus("error");
      setSubmitMessage(
        "We could not send your request right now. Please try again in a moment.",
      );
    }
  };

  return (
    <div
      className={`enquiry-modal__dialog enquiry-modal__dialog--${config.theme}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${type}-title`}
    >
      <div className="enquiry-modal__header">
        <div>
          <p className="enquiry-card__eyebrow">{config.eyebrow}</p>
          <h3 className="enquiry-card__title" id={`${type}-title`}>
            {config.title}
          </h3>
        </div>

        <button
          type="button"
          className="enquiry-modal__close"
          onClick={onClose}
          aria-label="Close lead form"
        >
          <span />
          <span />
        </button>
      </div>

      <p className="enquiry-card__body">{config.body}</p>

      <form
        className="enquiry-form"
        action={config.endpoint}
        method="POST"
        data-lead-form={type}
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="subject" value={config.subject} />
        <AttributionFields />

        <div className="enquiry-form__grid enquiry-form__grid--two">
          <input type="text" name="fullName" placeholder="Full Name" />
          <input type="email" name="email" placeholder="Email Address" />
        </div>

        {type === "request_details" ? (
          <div className="enquiry-form__grid enquiry-form__grid--two enquiry-form__grid--stacked">
            <input type="text" name="phone" placeholder="Phone Number" />
            <input type="text" name="timeline" placeholder="Purchase Timeline" />
          </div>
        ) : (
          <div className="enquiry-form__grid enquiry-form__grid--three">
            <input type="text" name="phone" placeholder="Phone Number" />
            <input type="text" name="preferredDate" placeholder="Preferred Date" />
            <input type="text" name="preferredTime" placeholder="Preferred Time" />
          </div>
        )}

        <textarea
          name="message"
          rows={4}
          placeholder={
            type === "request_details"
              ? "Tell us what details you would like to receive"
              : "Share any travel plans or showing preferences"
          }
        />

        {submitStatus === "success" ? (
          <div className="enquiry-form__thankyou" aria-live="polite">
            <p className="enquiry-form__thankyou-kicker">{config.eyebrow}</p>
            <h4 className="enquiry-form__thankyou-title">{config.successTitle}</h4>
            <p className="enquiry-form__thankyou-body">{submitMessage}</p>
            <button
              type="button"
              className="enquiry-form__submit"
              onClick={onClose}
            >
              Continue Browsing
            </button>
          </div>
        ) : null}

        {submitStatus !== "success" && submitMessage ? (
          <p
            className={`enquiry-form__status enquiry-form__status--${submitStatus}`}
            aria-live="polite"
          >
            {submitMessage}
          </p>
        ) : null}

        {submitStatus !== "success" ? (
          <button
            type="submit"
            className="enquiry-form__submit"
            disabled={submitStatus === "submitting"}
          >
            {submitStatus === "submitting" ? "Sending..." : config.submitLabel}
          </button>
        ) : null}
      </form>
    </div>
  );
}

export default function Enquiry() {
  const [activeForm, setActiveForm] = useState<LeadFormType | null>(null);

  useEffect(() => {
    const openForm = (type: LeadFormType) => {
      setActiveForm(type);
    };

    const handleClick = (event: MouseEvent) => {
      const origin = event.target;

      if (!(origin instanceof Element)) {
        return;
      }

      const trigger = origin.closest<HTMLElement>("[data-open-lead-form]");
      const type = trigger?.getAttribute("data-open-lead-form");

      if (type !== "request_details" && type !== "schedule_showing") {
        return;
      }

      event.preventDefault();
      openForm(type);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveForm(null);
      }
    };

    const handleHash = () => {
      if (window.location.hash === "#request-details-form") {
        openForm("request_details");
      }

      if (window.location.hash === "#schedule-showing-form") {
        openForm("schedule_showing");
      }
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("hashchange", handleHash);
    handleHash();

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("hashchange", handleHash);
    };
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (activeForm) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [activeForm]);

  return (
    <>
      <section className="enquiry" id="enquire">
        <div className="enquiry__inner">
          <p className="enquiry__heading">Take the next step</p>
          <p className="enquiry__subtext">
            Choose the path that fits your buying process, whether you want the
            full investment package or a private tour of Ocean Breeze.
          </p>

          <div className="enquiry__actions">
            <button
              type="button"
              className="enquiry__action enquiry__action--request"
              data-track-click="Request Details"
              data-track-location="enquiry-section"
              onClick={() => setActiveForm("request_details")}
            >
              <span className="enquiry__action-title">Request Details</span>
              <span className="enquiry__action-caption">
                Pricing, ownership, brochure
              </span>
            </button>

            <button
              type="button"
              className="enquiry__action enquiry__action--showing"
              data-track-click="Schedule a Showing"
              data-track-location="enquiry-section"
              onClick={() => setActiveForm("schedule_showing")}
            >
              <span className="enquiry__action-title">Schedule a Showing</span>
              <span className="enquiry__action-caption">
                Private tour, tailored timing
              </span>
            </button>
          </div>

          <div className="enquiry__prompt">
            Open the form that matches the conversation you want to start.
          </div>
        </div>
      </section>

      {activeForm ? (
        <div className="enquiry-modal">
          <button
            type="button"
            className="enquiry-modal__backdrop"
            aria-label="Close lead form"
            onClick={() => setActiveForm(null)}
          />
          <div className="enquiry-modal__shell">
            <LeadForm type={activeForm} onClose={() => setActiveForm(null)} />
          </div>
        </div>
      ) : null}
    </>
  );
}
