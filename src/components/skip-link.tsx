"use client";

import { useSiteSettings } from "@/lib/site-settings";

export function SkipLink() {
  const { t } = useSiteSettings();

  return <a className="skip-link" href="#home">{t("skipToContent")}</a>;
}
