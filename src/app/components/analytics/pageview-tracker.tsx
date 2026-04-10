"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    posthog.capture("page_viewed", {
      path: pathname,
    });
  }, [pathname]);

  return null;
}