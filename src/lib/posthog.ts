import posthog from "posthog-js";

export const initPostHog = () => {
  if (typeof window !== "undefined") {
    posthog.init(
      process.env.NEXT_PUBLIC_POSTHOG_KEY!,
      {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        capture_pageview: false
      }
    );
  }
};

type EventProperties = Record<string, string | number | boolean | string[] | null | undefined>;

export function trackEvent(event: string, properties?: EventProperties) {
  posthog.capture(event, properties);
}

export default posthog;