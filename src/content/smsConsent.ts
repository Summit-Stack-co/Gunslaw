/** Stored with each opt-in submission; bump version if this language changes. */
export const SMS_CONSENT_TEXT_VERSION = "v1.1" as const;

export const SMS_CONSENT_AGREEMENT_TEXT =
  "I agree to receive text messages from J. Gunnell Law, LLC related to scheduling, case updates, document reminders, and communication about my matter. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. Consent to receive text messages is optional and is not required to hire or receive services from J. Gunnell Law, LLC." as const;

/** Recorded when user selects opt-out (consent_text is NOT NULL). */
export const SMS_CONSENT_OPT_OUT_SUMMARY =
  "User declined to consent to receive SMS messages via the SMS Communication Consent form." as const;
