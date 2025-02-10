import { Providers } from "./providers";
import NavBar from "./components/NavBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
      <main className="relative flex flex-col h-screen w-screen">
        <NavBar />
        {children}
      </main>
    </Providers>
  );
};

export default Layout;
