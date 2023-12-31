'use client'
import type { Metadata } from 'next'
import { ThemeProvider } from "@mui/material";
import theme from "@/src/app/styles/theme";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Layout from '@/src/app/containers/dashboard/layout';
import { usePathname } from 'next/navigation';




// export const metadata: Metadata = {
//   title: 'Box Office',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const showLayout = pathname.includes('/signup') || pathname.includes('/signin');
  console.log(showLayout);
  return (
    <html lang="en">
      <head>
      <title>Box Office</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="icon" href="https://drive.google.com/uc?export=view&id=1gF49xuN0t0yjIv7WoybLhTScP6b15-fJ" />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          {!showLayout ? <Layout>
            {children}
          </Layout> : <>{children} </>}
        </ThemeProvider>
      </body>
    </html>
  )
}