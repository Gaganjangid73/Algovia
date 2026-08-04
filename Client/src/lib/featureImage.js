/**
 * Temporary CDN placeholders until the API provides `previewImageUrl`.
 * Swap `remoteUrl` when wiring backend — no component changes required.
 */
const TEMP_FEATURE_IMAGES = {
  default:
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
  hld:
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  lld:
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80",
  scenarios:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
  dsaPatterns:
    "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1200&q=80",
  dsaSheet:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  cpSheet:
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa93?auto=format&fit=crop&w=1200&q=80",
  sdPatterns:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
  newsletter:
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80",
  behavioural:
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
  csFundamentals:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
};

export function resolveFeatureImage(imageKey, remoteUrl) {
  if (remoteUrl) return remoteUrl;
  return TEMP_FEATURE_IMAGES[imageKey] ?? TEMP_FEATURE_IMAGES.default;
}
