import * as React from "react";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format, isAfter, isBefore, isSameDay } from "date-fns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import { useBoolean } from "@/hooks";

export default function CustomDateRangePicker({
  fromDate,
  toDate,
  onChange,
  className,
}) {
  const parseDate = (date) =>
    typeof date === "string" ? new Date(date) : date;

  const [dateRange, setDateRange] = React.useState({
    from: parseDate(fromDate) || undefined,
    to: parseDate(toDate) || undefined,
  });

  const open = useBoolean();

  const formatDate = (date) => (date ? format(date, "dd-MM-yyyy") : undefined);

  const handleSelect = (range) => {
    if (!range) return;
    const { from, to } = range;

    const today = new Date();
    const validTo =
      to && (isBefore(to, today) || isSameDay(to, today)) ? to : undefined;
    const validFrom =
      from && (isBefore(from, today) || isSameDay(from, today))
        ? from
        : undefined;

    if (validFrom && validTo && isAfter(validFrom, validTo)) {
      setDateRange({ from: validFrom, to: undefined });
      onChange?.({ from: formatDate(validFrom), to: undefined });
    } else {
      setDateRange({ from: validFrom, to: validTo });
      onChange?.({
        from: formatDate(validFrom),
        to: formatDate(validTo),
      });
    }

    if (validFrom && validTo) {
      open.onFalse();
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open.value} onOpenChange={open.onToggle}>
        <PopoverTrigger asChild>
          <Button
            id="date-range"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !dateRange.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange.from ? (
              dateRange.to ? (
                <>
                  {formatDate(dateRange.from)} - {formatDate(dateRange.to)}
                </>
              ) : (
                formatDate(dateRange.from)
              )
            ) : (
              <span>Select a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            selected={dateRange}
            onSelect={handleSelect}
            numberOfMonths={2}
            disabled={(date) => isAfter(date, new Date())}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
