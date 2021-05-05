import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";
import { toast } from "react-toastify";
import { parseCookie } from "@/helpers/index";

const AddEventPage = ({ token }) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    performers: "",
    venue: "",
    address: "",
    date: "",
    time: "",
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emptyFields = Object.values(values).some((element) => element === "");

    if (emptyFields) {
      return toast.error("Please fill all fields");
    }

    const res = await fetch(`${API_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        return toast.error("No token included");
      }
      toast.error("Something went wrong");
    } else {
      const event = await res.json();
      router.push(`/events/${event.slug}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <Layout title="Add New Event">
      <Link href="/events">Go Back</Link>
      <h1>Add Event</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="performers"> Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={values.performers}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="venue"> Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="address"> Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="date"> Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={values.date}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="time"> Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={values.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <input type="submit" value="Add Event" className="btn" />
      </form>
    </Layout>
  );
};

export default AddEventPage;

export async function getServerSideProps({ req }) {
  const { token } = parseCookie(req);

  return {
    props: { token },
  };
}
