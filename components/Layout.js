import Head from "next/head";
import { useRouter } from "next/router";
import styles from "@/styles/Layout.module.css";
import Footer from "./Footer";
import Header from "./Header";
import Showcase from "./Showcase";

const Layout = ({ title, description, keywords, children }) => {
  const { pathname } = useRouter();
  return (
    <div>
      <Head>
        <title> {title} </title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />

      {pathname === "/" && <Showcase />}

      <div className={styles.container}>{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;

Layout.defaultProps = {
  title: "DJ Events",
  description: "Find the latest DJ Events",
  keywords: "dj, music, edm, events",
};
