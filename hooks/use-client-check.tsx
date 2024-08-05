import React, { useEffect, useState } from "react";

export default function useClientCheck() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return { isClient };
}
