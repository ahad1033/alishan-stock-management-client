import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  RHFInput,
  RHFSelect,
  RHFTextArea,
  RHFDatePicker,
} from "@/components/form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import CardWrapper from "@/components/shared/CardWrapper";
import CustomHeader from "@/components/page-heading/CustomHeader";

import { EXPENSE_OPTIONS } from "@/constants";

const ExpenseSchema = Yup.object().shape({
  date: Yup.string().trim().required("Date is required"),

  description: Yup.string().trim().required("Description is required"),

  category: Yup.string()
    .trim()
    .required("Please select a category")
    .notOneOf([""], "Please select a category"),

  amount: Yup.number()
    .typeError("Price must be a number")
    .required("Expense amount is required")
    .positive("Expense amount must be a positive number"),
});

const mockEmployee = [
  { value: 1, label: "employee 1" },
  { value: 2, label: "employee 2" },
  { value: 3, label: "employee 3" },
];

export default function ExpenseForm() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [searchParams] = useSearchParams();

  const isEdit = Boolean(id);

  const selectedCategory = searchParams.get("category") ?? "";

  const defaultValues = {
    date: new Date().toISOString().split("T")[0],
    category: selectedCategory,
    description: "",
    amount: "",
    employeeId: "",
  };

  const methods = useForm({
    resolver: yupResolver(ExpenseSchema),
    defaultValues,
  });

  const {
    // reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const watchCategory = watch("category");
  console.log("watchCategory: ", watchCategory);

  const onSubmit = (data) => {
    console.log("Outlay data:", data);
    toast.success("Outlay added successfully");
  };

  return (
    <>
      <CustomHeader title="Expense" subtitle="Add your expenses" />

      <CardWrapper>
        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <RHFDatePicker
              name="date"
              label="Pick a date (DD-MM-YYYY) *"
              lockToToday={true}
            />
            <RHFSelect
              name="category"
              label="Category *"
              placeholder="Select expense category"
              options={EXPENSE_OPTIONS}
            />

            {watchCategory === "salary" && (
              <RHFSelect
                name="employeeId"
                label="Select Employee *"
                placeholder="Choose employee"
                options={mockEmployee}
              />
            )}
            <RHFTextArea
              name="description"
              label="Description *"
              placeholder="Enter description"
            />
            <RHFInput
              name="amount"
              label="Amount *"
              type="number"
              placeholder="Enter expense amount"
            />
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/expense")}
              >
                Cancel
              </Button>

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
      </CardWrapper>
    </>
  );
}
