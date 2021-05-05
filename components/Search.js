import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Search.module.css";

const Search = () => {
  const [term, setTerm] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!term) {
      return;
    }
    router.push(`/events/search?term=${term}`);
    setTerm("");
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search Events"
          required
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </form>
      <button onClick={handleSubmit} className={styles.searchBtn}>
        Search
      </button>
    </div>
  );
};

export default Search;
