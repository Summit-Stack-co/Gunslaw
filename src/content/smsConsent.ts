/** Stored with each opt-in submission; bump version if this language changes. */
export const SMS_CONSENT_TEXT_VERSION = "v1.2" as const;

/** Program description — what messages the SMS program sends. */
export const SMS_PROGRAM_DESCRIPTION =
  "J. Gunnell Law, LLC sends SMS messages regarding scheduling, case updates, document reminders, and communications related to your legal matter." as const;

/** Exact non-sharing language required by the carrier registry; do not edit wording. */
export const SMS_NON_SHARING_NOTICE =
  "Text messaging originator opt-in data and consent will not be shared with any third parties, excluding aggregators and providers of the Text Message services." as const;

/** Required disclosures shown beside the opt-in checkbox and echoed in the legal pages. */
export const SMS_CONSENT_DISCLOSURES = [
  SMS_PROGRAM_DESCRIPTION,
  "Message frequency varies.",
  "Message and data rates may apply.",
  "Reply STOP to opt out at any time.",
  "Reply HELP for assistance.",
  "Carriers are not liable for delayed or undelivered messages.",
  "Consent to receive SMS messages is not a condition of legal services.",
  SMS_NON_SHARING_NOTICE,
] as const;

/** Short statement shown directly beside the checkbox the client ticks to opt in. */
export const SMS_CONSENT_CHECKBOX_LABEL =
  "I consent to receive SMS text messages from J. Gunnell Law, LLC at the mobile number I provided above." as const;

/** Full canonical consent text recorded with each opt-in submission. */
export const SMS_CONSENT_AGREEMENT_TEXT =
  `${SMS_CONSENT_CHECKBOX_LABEL} ${SMS_CONSENT_DISCLOSURES.join(" ")}` as const;

/** Recorded when a submission is sent without the opt-in checkbox ticked (consent_text is NOT NULL). */
export const SMS_CONSENT_OPT_OUT_SUMMARY =
  "User did not opt in to receive SMS messages via the SMS Communication Consent form." as const;
