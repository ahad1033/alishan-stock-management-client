import * as Yup from "yup";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { RHFInput, RHFSelect } from "@/components/form";
import { GENDER_OPTIONS, USER_ROLE_OPTIONS } from "@/constants";

import CardWrapper from "@/components/shared/CardWrapper";
import CustomHeader from "@/components/page-heading/CustomHeader";

import {
  useCreateUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "@/redux/features/user/userApi";

import { useEffect, useMemo } from "react";
import CircularLoading from "@/components/shared/CircularLoading";

export default function UserForm() {
  const navigate = useNavigate();

  const { id } = useParams();

  const isEdit = Boolean(id);

  // CREATE USER
  const [createUser] = useCreateUserMutation();

  // UPDATE USER
  const [updateUser] = useUpdateUserMutation();

  // CURRENT USER
  const { data: currentUser, isLoading } = useGetUserByIdQuery(id, {
    skip: !id,
    forceRefetch: true,
  });

  const UserSchema = useMemo(() => {
    return Yup.object().shape({
      name: Yup.string().trim().required("Name is required"),
      address: Yup.string().trim(),
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
        .required("Please select the user's role")
        .notOneOf([""], "Please select the user's role"),
      gender: Yup.string()
        .required("Please select gender")
        .notOneOf([""], "Please select gender"),
      ...(isEdit
        ? {}
        : {
            password: Yup.string()
              .trim()
              .required("Initial password is required"),
          }),
    });
  }, [isEdit]);

  const defaultValues = {
    name: "",
    address: "",
    email: "",
    phone: "",
    role: "",
    gender: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentUser?.data) {
      reset({
        name: currentUser?.data?.name,
        address: currentUser?.data?.address,
        email: currentUser?.data?.email,
        phone: currentUser?.data?.phone,
        role: currentUser?.data?.role,
        gender: currentUser?.data?.gender,
      });
    }
  }, [currentUser?.data, isEdit, reset]);

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      let result;

      if (isEdit) {
        delete data.password;
        console.log("UPDATE DATA", data);

        result = await updateUser({ data, userId: id }).unwrap();
      } else {
        result = await createUser(data).unwrap();
      }

      console.log("result: ", result);

      if (result.success) {
        toast.success(result?.message || "User added successfully");
        reset();
        navigate("/users");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <CustomHeader
        title="User"
        subtitle={isEdit ? "Edit existing user" : "Create a new user"}
      />

      <CardWrapper>
        {isEdit && isLoading ? (
          <CircularLoading />
        ) : (
          <Form {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <RHFInput
                name="name"
                label="Users full name *"
                type="text"
                placeholder="Enter users full name"
              />

              <RHFInput
                name="address"
                label="Address (optional)"
                type="text"
                placeholder="Enter full address"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RHFInput
                  name="email"
                  label="Email *"
                  placeholder="Enter users email address"
                  disabled={isEdit}
                />

                <RHFInput
                  name="phone"
                  label="Phone *"
                  type="tel"
                  placeholder="Enter users phone"
                />

                <RHFSelect
                  name="role"
                  label="Role *"
                  placeholder="Select role"
                  options={USER_ROLE_OPTIONS}
                />

                <RHFSelect
                  name="gender"
                  label="Gender *"
                  placeholder="Select gender"
                  options={GENDER_OPTIONS}
                />
              </div>

              {!isEdit && (
                <RHFInput
                  name="password"
                  label="Password *"
                  type="password"
                  placeholder="Enter initial password"
                />
              )}

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/users")}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="custom-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Submitting..."
                    : isEdit
                    ? "Update"
                    : "Create User"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </CardWrapper>
    </>
  );
}
