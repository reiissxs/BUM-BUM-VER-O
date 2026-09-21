import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BUM BUM VERÃO",
    short_name: "BUM BUM VERÃO",
    description: "Seu programa de 90 dias de treino organizado.",
    start_url: "/inicio",
    display: "standalone",
    background_color: "#0c0c0f",
    theme_color: "#ff2f7d",
    orientation: "portrait",
  };
}
