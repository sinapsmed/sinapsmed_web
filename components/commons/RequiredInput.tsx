'use client'
import { useTranslations } from 'next-intl';
import React, { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name?: string;
    type?: React.HTMLInputTypeAttribute | undefined;
    className?: string;
    placeholder?: string;
    title: string;
    value?: string | number | readonly string[] | undefined;
    pattern?: string;
}

const RequiredInput = ({ title, pattern, ...rest }: Props) => {
    const t = useTranslations('form.validation');
    const missingMessage = t(rest.type, { name: title });
    const misMatchMessage = t('misMatch', { name: title });

    const handleInvalid = (event: React.InvalidEvent<HTMLInputElement>) => {
        if (event.target.validity.typeMismatch) {
            event.target.setCustomValidity(misMatchMessage);
            event.target.title = misMatchMessage;
        } else if (event.target.validity.valueMissing) {
            event.target.setCustomValidity(missingMessage);
            event.target.title = missingMessage;
        } else if (event.target.validity.patternMismatch) {
            event.target.setCustomValidity(`Invalid format for ${title}`);
            event.target.title = `Invalid format for ${title}`;
        }
    };

    const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
        event.currentTarget.setCustomValidity('');
        event.currentTarget.title = missingMessage;
    };

    return (
        <input
            title={missingMessage}
            onInput={handleInput}
            onInvalid={handleInvalid}
            required
            pattern={pattern}
            {...rest}
        />
    );
};

export default RequiredInput;
