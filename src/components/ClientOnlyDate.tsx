'use client';

import { useState, useEffect } from 'react';

export function ClientOnlyDate({ date, format = 'fr-FR' }: { date: Date | string, format?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className="opacity-0">...</span>;
  }

  return <span>{new Date(date).toLocaleDateString(format)}</span>;
}

