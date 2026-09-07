"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { HASH_TO_PATH } from "@/content/nav";

export function HashRedirect() {
  const router = useRouter();

  useEffect(() => {
    const redirectHash = () => {
      const raw = window.location.hash.replace("#", "").trim();
      if (!raw) return;
      const dest = HASH_TO_PATH[raw];
      if (!dest) return;
      const next = `${dest}${window.location.search}`;
      if (next !== `${window.location.pathname}${window.location.search}`) {
        router.replace(next);
      } else {
        window.history.replaceState(null, "", next);
      }
    };

    redirectHash();
    window.addEventListener("hashchange", redirectHash);
    return () => window.removeEventListener("hashchange", redirectHash);
  }, [router]);

  return null;
}
