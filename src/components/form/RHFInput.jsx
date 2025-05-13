import { useFormContext, Controller } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function RHFInput({
  name,
  label,
  icon: Icon,
  type = "text",
  placeholder,
  disabled = false,
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative">
              {Icon && (
                <Icon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              )}
              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                className={`${Icon ? "pl-10" : ""} ${
                  disabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              />
            </div>
          </FormControl>
          {errors[name] && <FormMessage>{errors[name]?.message}</FormMessage>}
        </FormItem>
      )}
    />
  );
}
