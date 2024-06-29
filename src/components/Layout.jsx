import NavBar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";

const Layout = ({ children }) => {
  return (
    <main className="App">
      <NavBar />
      {children}
      {/* <Outlet /> */}
      <Footer />
    </main>
  );
};

export default Layout;
