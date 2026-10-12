'use client'
import { Result } from '@/types/result';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import React, { ReactNode, useEffect, useState } from 'react';

interface Props {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  pending: boolean;
  state?: Result<any> | null
}

const SubmitButton = ({ children, className, disabled = false, pending, state = null }: Props) => {
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (state?.success) setSaved(true)
  }, [state])
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={saved}
        onClose={() => setSaved(false)}
        autoHideDuration={3000}
      >
        <Alert
          onClose={() => setSaved(false)}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {state?.message}
        </Alert>
      </Snackbar>
      {
        pending ? <button
          disabled={pending || disabled}
          className={`${className} bg-blue-500 text-white px-5 py-1.5 rounded-md font-semibold hover:bg-[#6b3e93] w-fit`}
        >
          <CircularProgress size={30} color='inherit' />
        </button > : <button
          disabled={pending || disabled}
          className={`${className} bg-blue-500 text-white px-5 py-3 rounded-md font-semibold hover:bg-[#6b3e93] w-fit`}
        >
          {children}
        </button>
      }
    </>
  );
};

export default SubmitButton;
