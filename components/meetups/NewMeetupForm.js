import { useRef } from "react";

import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";
import * as Yup from "yup";
import { useFormik } from "formik";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().label("Title"),
  image: Yup.string().required().label("Image"),
  address: Yup.string().required().label("Address"),
  description: Yup.string().required().label("Description"),
});

function NewMeetupForm(props) {
  const formik = useFormik({
    initialValues: {
      title: "",
      image: "",
      address: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      props.onAddMeetup(values);
    },
  });

  return (
    <Card>
      <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input
            type="text"
            required
            id="title"
            value={formik.values.title}
            onChange={formik.handleChange("title")}
          />
          {formik.touched.title && (
            <span className="error">{formik.errors.title}</span>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input
            type="url"
            required
            id="image"
            value={formik.values.image}
            onChange={formik.handleChange("image")}
          />
          {formik.touched.image && (
            <span className="error">{formik.errors.image}</span>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            required
            id="address"
            value={formik.values.address}
            onChange={formik.handleChange("address")}
          />
          {formik.touched.address && (
            <span className="error">{formik.errors.address}</span>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            rows="5"
            value={formik.values.description}
            onChange={formik.handleChange("description")}
          ></textarea>
          {formik.touched.description && (
            <span className="error">{formik.errors.description}</span>
          )}
        </div>
        <div className={classes.actions}>
          <button type="button" onClick={formik.handleSubmit}>
            Add Meetup
          </button>
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;
