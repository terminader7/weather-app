"use client";

import { useEffect, useState } from "react";

interface ClockProps {
  initialTime: Date;
  timezone: number;
}

export default function Clock({ initialTime, timezone }: ClockProps) {
  const [time, setTime] = useState(calculateLocalTime(initialTime, timezone));

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
