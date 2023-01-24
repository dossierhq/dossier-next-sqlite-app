interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <html lang="en-US">
      <head>
        <meta name="viewport" content="width=device-width" />
        <title>{process.env.NEXT_PUBLIC_SITE_NAME}</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
