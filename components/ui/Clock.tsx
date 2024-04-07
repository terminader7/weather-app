"use client";

import { useEffect, useState } from "react";

interface ClockProps {
  initial: Date;
  timezone: number;
}

export default function Clock({ initial, timezone }: ClockProps) {
  const [time, setTime] = useState(
    initial ? calculateLocalTime(initial, timezone) : new Date()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateLocalTime(new Date(), timezone));
    }, 1000);

    return () => clearInterval(timer);
  }, [timezone]);

  function calculateLocalTime(initialTime: Date, offsetSeconds: number): Date {
    const localTime = new Date(initialTime.getTime() + offsetSeconds * 1000);
    return localTime;
  }

  if (!initial) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tabular-nums">
      {time.toLocaleTimeString("en-US", {
        timeZone: "UTC",
        hour12: true,
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      })}
    </div>
  );
}
