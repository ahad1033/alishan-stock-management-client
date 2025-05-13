import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { RHFInput, RHFTextArea } from "@/components/form";
import CustomHeader from "@/components/page-heading/CustomHeader";

import { cleanPayload } from "@/utils/clean-payload";
import { useCreateProductMutation } from "@/redux/features/product/productApi";

const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Product name is required")
    .min(3, "Product name must be at least 3 characters"),

  description: Yup.string().trim(),

  sku: Yup.string()
    .trim()
    .required("SKU is required")
    .matches(
      /^[A-Za-z0-9_-]+$/,
      "SKU can only contain letters, numbers, dashes, and underscores"
    ),

  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be a positive number"),

  stock: Yup.number()
    .typeError("Stock must be a number")
    .required("Current stock is required")
    .min(0, "Stock cannot be negative"),
});

export default function ProductForm() {
  const navigate = useNavigate();

  const { id } = useParams();

  const isEdit = Boolean(id);

  const [createProduct, { isLoading }] = useCreateProductMutation();

  console.log(isLoading);

  const defaultValues = {
    name: "",
    description: "",
    sku: "",
    price: "",
    stock: "",
  };

  const methods = useForm({
    resolver: yupResolver(ProductSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const cleanData = cleanPayload(data);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (!isEdit) {
        const result = await createProduct(cleanData).unwrap();

        console.log("CREATING PRODUCT RESULT: ", result);

        if (result.success) {
          toast.success(result?.message || "Product added successfully");

          reset();

          navigate("/products");
        }
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <>
      <CustomHeader
        title="Product"
        subtitle={
          isEdit ? "Edit your existing product" : "Create a new product"
        }
      />

      <Form {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <RHFInput
            name="name"
            label="Product name *"
            type="text"
            placeholder="Enter product name"
          />

          <RHFTextArea
            name="description"
            label="Description (optional)"
            placeholder="Enter product description"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RHFInput
              name="sku"
              label="SKU *"
              type="text"
              placeholder="Enter product code"
            />

            <RHFInput
              name="price"
              label="Price *"
              type="number"
              placeholder="Enter product price"
            />
          </div>

          <RHFInput
            name="stock"
            label="Current stock *"
            type="number"
            placeholder="Enter current stock"
          />

          <div className="flex justify-end gap-4">
            <Button type="submit" className="custom-button">
              {isSubmitting
                ? "Submitting..."
                : isEdit
                ? "Update"
                : "Create Product"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
