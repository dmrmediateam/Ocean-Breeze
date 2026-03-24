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
];

function AttributionFields() {
  return attributionFieldNames.map((name) => (
    <input key={name} type="hidden" name={name} />
  ));
}

export default function Enquiry() {
  return (
    <section className="enquiry" id="enquire">
      <div className="enquiry__inner">
        <p className="enquiry__heading">Take the next step</p>
        <p className="enquiry__subtext">
          Choose the path that fits your buying process, whether you want the
          full investment package or a private tour of Ocean Breeze.
        </p>

        <div className="enquiry__actions">
          <a
            href="#request-details-form"
            className="enquiry__action"
            data-track-click="Request Details"
            data-track-location="enquiry-selector"
          >
            Request Details
          </a>
          <a
            href="#schedule-showing-form"
            className="enquiry__action"
            data-track-click="Schedule a Showing"
            data-track-location="enquiry-selector"
          >
            Schedule a Showing
          </a>
        </div>

        <div className="enquiry__prompt">
          Select one option to open the matching form.
        </div>

        <div className="enquiry__forms">
          <div className="enquiry-card enquiry-card--panel" id="request-details-form">
            <p className="enquiry-card__eyebrow">Request Details</p>
            <h3 className="enquiry-card__title">Receive the full listing package</h3>
            <p className="enquiry-card__body">
              Request pricing support material, ownership details, and a direct
              response from the Ocean Breeze sales team.
            </p>

            <form
              className="enquiry-form"
              action="mailto:info@oceanbreezetci.com"
              method="GET"
              data-lead-form="request_details"
            >
              <input type="hidden" name="subject" value="Ocean Breeze | Request Details" />
              <AttributionFields />

              <div className="enquiry-form__grid enquiry-form__grid--two">
                <input type="text" name="fullName" placeholder="Full Name" />
                <input type="email" name="email" placeholder="Email Address" />
              </div>

              <div className="enquiry-form__grid enquiry-form__grid--three">
                <input type="text" name="phone" placeholder="Phone Number" />
                <input type="text" name="budget" placeholder="Budget" />
                <input
                  type="text"
                  name="timeline"
                  placeholder="Purchase Timeline"
                />
              </div>

              <textarea
                name="message"
                rows={4}
                placeholder="Tell us what details you would like to receive"
              />

              <button type="submit" className="enquiry-form__submit">
                Request Details
              </button>
            </form>
          </div>

          <div className="enquiry-card enquiry-card--panel" id="schedule-showing-form">
            <p className="enquiry-card__eyebrow">Schedule a Showing</p>
            <h3 className="enquiry-card__title">Arrange a private tour</h3>
            <p className="enquiry-card__body">
              Book a confidential showing and share your preferred timing so the
              team can coordinate a tailored walkthrough.
            </p>

            <form
              className="enquiry-form"
              action="mailto:info@oceanbreezetci.com"
              method="GET"
              data-lead-form="schedule_showing"
            >
              <input type="hidden" name="subject" value="Ocean Breeze | Schedule a Showing" />
              <AttributionFields />

              <div className="enquiry-form__grid enquiry-form__grid--two">
                <input type="text" name="fullName" placeholder="Full Name" />
                <input type="email" name="email" placeholder="Email Address" />
              </div>

              <div className="enquiry-form__grid enquiry-form__grid--three">
                <input type="text" name="phone" placeholder="Phone Number" />
                <input
                  type="text"
                  name="preferredDate"
                  placeholder="Preferred Date"
                />
                <input
                  type="text"
                  name="preferredTime"
                  placeholder="Preferred Time"
                />
              </div>

              <textarea
                name="message"
                rows={4}
                placeholder="Share any travel plans or showing preferences"
              />

              <button type="submit" className="enquiry-form__submit">
                Schedule a Showing
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
