import { Button, ThemeProvider } from "@/app/mui";

export default function Home() {
  const customTheme = {};

  return (
    <ThemeProvider value={customTheme}>
      <main>
        <Button placeholder="">Button</Button>
      </main>
    </ThemeProvider>
  );
}
