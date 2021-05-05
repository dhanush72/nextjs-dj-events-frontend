import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import styles from "@/styles/DashboardEvent.module.css";

const DashboardEvent = ({ event, handleDelete }) => {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${event.slug}`}>{event.name}</Link>
      </h4>

      <Link href={`/events/edit/${event.id}`}>
        <a className={styles.edit}>
          <FaPencilAlt /> <span>Edit</span>
        </a>
      </Link>

      <a className={styles.delete} onClick={() => handleDelete(event.id)}>
        <FaTimes /> <span>Delete</span>
      </a>
    </div>
  );
};

export default DashboardEvent;
