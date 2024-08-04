"use client";

import { Clock } from "lucide-react";
import React, { useState, useEffect } from "react";

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const now = new Date();
      const day = days[now.getDay()];
      const date = now.getDate();
      const month = months[now.getMonth()];
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");

      setCurrentTime(`${day} ${date} ${month} ${hours}:${minutes}`);
    };

    // Update the time every minute
    const intervalId = setInterval(updateTime, 6000);

    // Initial call to set the current time immediately
    updateTime();

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (currentTime) {
    return <span className="text-neutral-100 text-sm">{currentTime}</span>;
  } else {
    return <Clock className="text-neutral-100 size-4" />;
  }
};

export default CurrentTime;
