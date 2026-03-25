// hooks/useDashboardSse.ts
"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL, getAuthToken } from "@/lib/api";

type Delivery = {
  cycle1: number;
  cycle2: number;
  cycle3: number;
  cycle4: number;
};

type TimePoint = { date: string; count: number };
type MethodDist = { method: string; count: number };
type TopMaterial = { name: string; order_count: number };

export type DashboardSseData = {
  shopping: number;
  pickup: number;
  delivery: Delivery;
  timeSeries: TimePoint[];
  deliveryMethodDistribution: MethodDist[];
  topMaterials: TopMaterial[];
};

export function useDashboardSse() {
  const [data, setData] = useState<DashboardSseData | null>(null);
  const [connecting, setConnecting] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = getAuthToken();
    if (!token) {
      setError("Token not found");
      setConnecting(false);
      return;
    }

    const url = `${API_BASE_URL}/transaction/dashboard-events?token=${token}`;
    const es = new EventSource(url);

    es.onopen = () => {
      setConnecting(false);
      setError(null);
    };

    es.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        setData(parsed);
      } catch (e) {
        console.error("Failed to parse SSE payload", e);
      }
    };

    es.onerror = (e) => {
      console.error("SSE error:", e);
      setError("Connection lost");
      es.close();
    };

    return () => {
      es.close();
    };
  }, []);

  return { data, connecting, error };
}
