"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Form, FormItem } from "@/components/ui/Form";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      <Form onSubmit={handleSubmit}>
        <FormItem label="Username">
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </FormItem>
        <FormItem label="Email">
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormItem>
        <FormItem label="Password">
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </FormItem>
        <Button type="submit">Save Changes</Button>
      </Form>
    </div>
  );
};

export default EditProfile;
