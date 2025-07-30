import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export type DatePickerType = { value: Date, onChange: (value?: string) => void };

// You can Use Imerative handle to expose information from child component to parent component
export function DatePicker({ value, onChange }: DatePickerType) {

    // useImperativeHandle(ref, () => ({
    //     value: selected?.toLocaleDateString()
    // }), [selected]);

    return (
        <DayPicker
            animate
            mode="single"
            selected={value}
            onSelect={(date) => onChange(date?.toLocaleDateString() || "")}
            footer={
                value ? `Selected: ${value.toLocaleDateString()}` : "Pick a day."
            }
        />
    );
};