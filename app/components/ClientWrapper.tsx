'use client';

import { ReactNode } from 'react';
import ClientLayout from '../ClientLayout';

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>;
}
