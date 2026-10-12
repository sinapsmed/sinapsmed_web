import React, { useState, useEffect } from "react";

interface Props {
    endDate: string;
}

const calculateTimeLeft = (endDate: string): { minutes: number; seconds: number } => {
    const difference = +new Date(endDate) - +new Date();
    if (difference > 0) {
        return {
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }
    return { minutes: 0, seconds: 0 };
};

const CountdownTimer = ({ endDate }: Props) => {

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endDate));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(endDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [endDate]);

    return (
        <span>(
            {String(timeLeft.minutes).padStart(2, "0")}:
            {String(timeLeft.seconds).padStart(2, "0")}
            )
        </span>
    );
};

export default CountdownTimer;
