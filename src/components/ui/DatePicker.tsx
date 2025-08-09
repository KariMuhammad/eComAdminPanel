import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export type DatePickerType = {
    value: Date,
    onChange: (value?: string) => void,
    onMonthChange?: (month: Date) => void // Optional callback for month changes
};

// You can Use Imperative handle to expose information from child component to parent component
export function DatePicker({ value, onChange, onMonthChange }: DatePickerType) {
    const [currentMonth, setCurrentMonth] = useState<Date>(value || new Date());

    // Auto-navigate to selected date when value changes
    useEffect(() => {
        if (value) {
            setCurrentMonth(value);
        }
    }, [value]);

    const handleMonthChange = (month: Date) => {
        setCurrentMonth(month);
        onMonthChange?.(month); // Call parent callback if provided
    };

    return (
        <DayPicker
            animate
            mode="single"
            selected={value}
            month={currentMonth}
            onMonthChange={handleMonthChange}
            onSelect={(date) => onChange(date?.toLocaleDateString() || "")}
            footer={
                value ? `Selected: ${value.toLocaleDateString()}` : "Pick a day."
            }
        />
    );
};