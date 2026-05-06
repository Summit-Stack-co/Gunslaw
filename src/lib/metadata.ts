import type { Metadata } from "next";

import { siteConfig } from "@/lib/siteConfig";

type MetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
};

export function createMetadata({
  title,
  description = siteConfig.tagline,
  path = "/",
}: MetadataOptions = {}): Metadata {
  const pageTitle = title
    ? `${title} | ${siteConfig.firmName}`
    : `${siteConfig.firmName} | ${siteConfig.tagline}`;
  const canonical = new URL(path, siteConfig.siteUrl).toString();

  return {
    title: pageTitle,
    description,
    metadataBase: new URL(siteConfig.siteUrl),
    alternates: {
      canonical,
    },
    openGraph: {
      title: pageTitle,
      description,
      url: canonical,
      siteName: siteConfig.firmName,
      type: "website",
    },
  };
}

