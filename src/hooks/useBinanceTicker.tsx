import { useEffect, useRef, useState } from "react";


export interface Tick {
  price: number;
  time: Date;   
}

const STREAM_URL = "wss://stream.binance.com:9443/ws/btcusdt@trade";


export default function useBinanceTicker(
  limit = 30
): { ticks: Tick[]; trendUp: boolean; latest: number } {

  const [ticks, setTicks] = useState<Tick[]>([]);


  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(STREAM_URL);

    ws.current.onmessage = (event) => {
      const d = JSON.parse(event.data);

      setTicks((prev) => {
        const price = Number(d.p);        
        const time  = new Date(d.E);     

        const next = [{ price, time }, ...prev];
        return next.slice(0, limit);       
      });
    };


    return () => {
      ws.current?.close();
    };
  }, [limit]);

  const latest  = ticks[0]?.price ?? 0;
  const prev    = ticks[1]?.price ?? latest;
  const trendUp = latest >= prev;

  return { ticks, trendUp, latest };
}
