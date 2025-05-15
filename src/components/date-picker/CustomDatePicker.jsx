import { useMemo, useState } from "react";
import { format, isAfter } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function CustomCaption({ displayMonth, goToMonth }) {
  const months = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) =>
        new Date(2000, i).toLocaleString("default", { month: "long" })
      ),
    []
  );

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 100 }, (_, i) => currentYear - 50 + i);
  }, []);

  const [selectedYear, setSelectedYear] = useState(displayMonth.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(displayMonth.getMonth());

  const handleYearChange = (e) => {
    const year = Number(e.target.value);
    setSelectedYear(year);
    goToMonth(new Date(year, selectedMonth));
  };

  const handleMonthChange = (e) => {
    const month = Number(e.target.value);
    setSelectedMonth(month);
    goToMonth(new Date(selectedYear, month));
  };

  return (
    <div className="flex items-center justify-between px-3 py-2 border-b bg-muted">
      <div className="flex items-center gap-2">
        <select
          className="text-sm rounded-md border px-2 py-1 bg-background text-foreground"
          value={selectedYear}
          onChange={handleYearChange}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          className="text-sm rounded-md border px-2 py-1 bg-background text-foreground"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {months.map((month, i) => (
            <option key={month} value={i}>
              {month}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default function CustomDatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  disabled = false,
  restrictFuture = false,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const parsedDate = value
    ? new Date(value.split("-").reverse().join("-"))
    : undefined;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ?? <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={parsedDate}
          onSelect={(date) => {
            if (date) {
              if (restrictFuture && isAfter(date, new Date())) return;

              const formatted = format(date, "dd-MM-yyyy");
              onChange(formatted);
              setIsOpen(false);
            }
          }}
          initialFocus
          components={{ Caption: CustomCaption }}
          disabled={(date) =>
            disabled || (restrictFuture && isAfter(date, new Date()))
          }
        />
      </PopoverContent>
    </Popover>
  );
}
