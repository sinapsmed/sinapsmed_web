import React, { useEffect, useRef } from "react";

interface Props {
    length?: number,
    value: string
    onChange: (value: string) => void
    autoFocus?: boolean
}

const OtpInput = ({ length = 6, value, onChange, autoFocus = false }: Props) => {
    const inputsRef = useRef<HTMLInputElement[]>([]);

    useEffect(() => {
        if (autoFocus && inputsRef.current[0]) {
            inputsRef.current[0].focus();
        }
    }, [autoFocus]);

    const handleChange = (inputValue: string, index: number) => {
        const digit = inputValue.replace(/\D/g, "");
        if (!digit) return;

        const newOtpArray = value.split("").slice(0, length);
        while (newOtpArray.length < length) newOtpArray.push("");

        newOtpArray[index] = digit;
        const newOtp = newOtpArray.join("");
        onChange(newOtp);

        if (index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            e.preventDefault();
            const newOtpArray = value.split("").slice(0, length);
            while (newOtpArray.length < length) newOtpArray.push("");

            if (value[index]) {
                newOtpArray[index] = "";
                onChange(newOtpArray.join(""));
            } else if (index > 0) {
                newOtpArray[index - 1] = "";
                onChange(newOtpArray.join(""));
                inputsRef.current[index - 1]?.focus();
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
        onChange(pasted);
        setTimeout(() => {
            inputsRef.current[Math.min(pasted.length, length - 1)]?.focus();
        }, 0);
    };

    const otpArray = [...Array(length)].map((_, i) => value[i] || "");


    const inputStyle = {
        flex: `1 1 ${100 / length}%`,
    };

    return (
        <div className="flex gap-2 w-full max-w-md mx-auto" onPaste={handlePaste}>

            {otpArray.map((digit, i) => (
                <input
                    key={i}
                    ref={(el) => {
                        if (el) inputsRef.current[i] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}

                    className="h-12 min-w-0 border rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    style={{ ...inputStyle, boxSizing: "border-box" }}

                />
            ))}
        </div>
    );
};

export default OtpInput;
