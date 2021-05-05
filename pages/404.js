import Link from "next/link";
import Layout from "@/components/Layout";
import { FaExclamationTriangle } from "react-icons/fa";
import styles from "@/styles/404.module.css";

const NotFound = () => {
  return (
    <Layout title="Page Not Found">
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle /> Page Not Found
        </h1>
        <Link href="/">Go Back Home</Link>
      </div>
    </Layout>
  );
};

export default NotFound;
