import PageLayout from '@/layouts/PageLayout';
import '@/styles/global.scss';

export const metadata = {
  title: 'My Weather',
  description: 'Weather prediction frontend app by Yury Borets',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="https://cdn-icons-png.flaticon.com/512/1779/1779940.png" />
      </head>
      <body>
        <PageLayout>
          {children}
        </PageLayout>
      </body>
    </html>
  )
}
