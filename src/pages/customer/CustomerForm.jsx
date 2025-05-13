import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { RHFInput } from "@/components/form";

import CustomHeader from "@/components/page-heading/CustomHeader";
import { useCreateCustomerMutation } from "@/redux/features/customer/customerAPI";
import { cleanPayload } from "@/utils/clean-payload";

const UserSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),

  shopName: Yup.string().trim().required("Shop name is required"),

  address: Yup.string().trim(),

  email: Yup.string().trim().email("Invalid email address"),

  phone: Yup.string()
    .trim()
    .notRequired()
    .matches(
      /^$|^01[0-9]{9}$/,
      "Phone number must be a valid 11-digit Bangladeshi number"
    ),
});

export default function CustomerForm() {
  const navigate = useNavigate();

  const { id } = useParams();

  const isEdit = Boolean(id);

  const [createCustomer, { isLoading, isError, error }] =
    useCreateCustomerMutation();

  console.log(isLoading);
  console.log(isError);
  console.log(error);

  const defaultValues = {
    name: "",
    shopName: "",
    address: "",
    email: "",
    phone: "",
  };

  const methods = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const cleanData = cleanPayload(data);

    console.log("formData", data);
    console.log("cleanData", cleanData);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (!isEdit) {
        const result = await createCustomer(cleanData).unwrap();

        console.log("CREATING CUSTOMER RESULT: ", result);

        if (result.success) {
          toast.success(result?.message || "Customer added successfully");

          reset();

          navigate("/customers");
        }
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <CustomHeader
        title="Customers"
        subtitle={isEdit ? "Edit existing customer" : "Create new customer"}
      />

      <Form {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <RHFInput
            name="name"
            label="Customers full name *"
            type="text"
            placeholder="Enter customers full name"
          />

          <RHFInput
            name="shopName"
            label="Shop name *"
            type="text"
            placeholder="Enter shop name"
          />

          <RHFInput
            name="address"
            label="Address (optional)"
            type="text"
            placeholder="Enter full address"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RHFInput
              name="phone"
              label="Phone (optional)"
              type="tel"
              placeholder="Enter customers phone"
            />

            <RHFInput
              name="email"
              label="Email (optional)"
              placeholder="Enter customers email address"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button type="submit" className="custom-button">
              {isSubmitting
                ? "Submitting..."
                : isEdit
                ? "Update"
                : "Create Customer"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
