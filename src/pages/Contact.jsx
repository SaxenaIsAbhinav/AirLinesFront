import React, { useState } from "react";
import { TextField, Button, Typography, Snackbar, Alert } from "@mui/material";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) newErrors.email = "Invalid email";
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      console.log("contact data ",form);
      
      // const res = await fetch("https://localhost:9555/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });

      // if (res.ok) {
      if (true) {
        setSnackbar({ open: true, message: "Message sent successfully!", severity: "success" });
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setSnackbar({ open: true, message: "Something went wrong. Try again later.", severity: "error" });
      }
    } catch (err) {
      setSnackbar({ open: true, message: "Server error. Please try again later.", severity: "error" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-xl bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md">
        <Typography variant="h4" className="mb-4 text-gray-800 dark:text-gray-100">
          Contact Us
        </Typography>
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Your Name"
            name="name"
            variant="outlined"
            value={form.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            InputLabelProps={{ className: "dark:text-gray-300" }}
            InputProps={{ className: "dark:text-white" }}
          />
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            variant="outlined"
            value={form.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            InputLabelProps={{ className: "dark:text-gray-300" }}
            InputProps={{ className: "dark:text-white" }}
          />
          <TextField
            fullWidth
            label="Subject"
            name="subject"
            variant="outlined"
            value={form.subject}
            onChange={handleChange}
            error={!!errors.subject}
            helperText={errors.subject}
            InputLabelProps={{ className: "dark:text-gray-300" }}
            InputProps={{ className: "dark:text-white" }}
          />
          <TextField
            fullWidth
            label="Message"
            name="message"
            multiline
            rows={5}
            variant="outlined"
            value={form.message}
            onChange={handleChange}
            error={!!errors.message}
            helperText={errors.message}
            InputLabelProps={{ className: "dark:text-gray-300" }}
            InputProps={{ className: "dark:text-white" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ textTransform: "none", paddingY: 1.2 }}
            fullWidth
          >
            Send Message
          </Button>
        </form>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
