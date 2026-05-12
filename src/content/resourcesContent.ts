/** Official East Fork Justice Court (Douglas County, NV) remote-appearance materials. */
export const eastForkRemoteAppearance = {
  courtName: "East Fork Justice Court",
  intro:
    "These PDFs are published by the East Fork Justice Court. Download each form from the court’s site, complete it carefully, and file or deliver it as the court’s instructions direct. If you are represented by counsel, coordinate with your attorney before submitting anything to the court.",
  downloads: [
    {
      id: "zoom-guide",
      title: "How to appear in East Fork Justice Court using Zoom",
      description:
        "Court-published steps for joining a hearing by Zoom, including technical and appearance expectations.",
      href: "https://eastforkjusticecourt.com/download/how-to-appear-in-the-east-fork-justice-court-using-zoom/?wpdmdl=1817&refresh=6a0395df0dcb91778619871",
      instructionsId: "east-fork-zoom-instructions",
    },
    {
      id: "phone-video-request",
      title: "Request to appear by phone or video",
      description:
        "Form to ask the court for permission to participate in a hearing by telephone or video instead of in person.",
      href: "https://eastforkjusticecourt.com/download/request-to-appear-by-phone-or-video/?wpdmdl=1816&refresh=6a0395df1e80a1778619871",
      instructionsId: "east-fork-phone-video-instructions",
    },
  ] as const,
  zoomGuideSteps: [
    "Open the PDF from the court’s download page and read it in full before your hearing date.",
    "Note your case number, hearing date, and time; keep them next to you when you connect.",
    "Install or update Zoom on the device you will use; test your camera, microphone, and speaker or headset.",
    "Use a wired connection or strong Wi‑Fi; join from a quiet, well‑lit location with a neutral background if possible.",
    "Follow the court’s dress and behavior rules (treat it like an in-person courtroom). Mute when not speaking unless the judge directs otherwise.",
    "Join the meeting a few minutes early using the access information the court or your notice provides.",
  ],
  phoneVideoRequestSteps: [
    "Download the current version of the request form from the court’s link (forms can change).",
    "Print the form or use a PDF editor that allows saving a clean copy—typed entries are usually easier to read than handwriting.",
    "Fill in your name, contact information, and case caption exactly as they appear on your court papers.",
    "Identify the specific hearing (date and time) and whether you are asking to appear by phone or by video.",
    "State briefly why remote appearance is appropriate, following any prompts or checkboxes on the form.",
    "Sign and date where indicated; if the form requires a certificate of service, complete that section and serve other parties as required by court rules.",
    "File or submit the form by the deadline and method stated on the form or in your hearing notice (e‑file, email, mail, or in person as directed).",
  ],
} as const;
