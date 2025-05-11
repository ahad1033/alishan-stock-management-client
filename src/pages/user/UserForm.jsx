import * as Yup from "yup";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";

import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { RHFInput, RHFSelect } from "@/components/form";

import CustomHeader from "@/components/page-heading/CustomHeader";

const UserSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),

  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),

  phone: Yup.string()
    .trim()
    .matches(
      /^01[0-9]{9}$/,
      "Phone number must be a valid 11-digit Bangladeshi number"
    )
    .required("Phone number is required"),

  role: Yup.string()
    .trim()
    .required("Please select the user's role")
    .notOneOf([""], "Please select the user's role"),

  password: Yup.string().trim().required("Initial password is required"),
});

const USER_ROLE_OPTIONS = [
  { value: "admin", label: "Admin" },
  { value: "accountant", label: "Accountant" },
  { value: "stock_manager", label: "Stock Manager" },
];

export default function UserForm() {
  const navigate = useNavigate();

  const { id } = useParams();

  const isEdit = Boolean(id);

  const [isLoading, setIsLoading] = useState(false);

  console.log(isLoading);

  const defaultValues = {
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    console.log("USER FORM DATA: ", data);
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("User added successfully");

      reset();

      navigate("/users");
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CustomHeader
        title="User"
        subtitle={isEdit ? "Edit existing user" : "Create a new user"}
      />

      <Form {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <RHFInput
            name="name"
            label="Users full name"
            type="text"
            placeholder="Enter users full name"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RHFInput
              name="email"
              label="Email"
              placeholder="Enter users email address"
            />

            <RHFInput
              name="phone"
              label="Phone"
              type="tel"
              placeholder="Enter users phone"
            />

            <RHFSelect
              name="role"
              label="Role"
              placeholder="Select role"
              options={USER_ROLE_OPTIONS}
            />

            <RHFInput
              name="password"
              label="Password"
              placeholder="Enter initial password"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button type="submit" className="custom-button">
              {isLoading ? "Submitting..." : isEdit ? "Update" : "Create User"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
