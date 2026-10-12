import React, { ComponentType, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  pending: boolean;
  count: number;
  Component: ComponentType;  
}

const Suspense: React.FC<Props> = ({ children, pending, Component, count }) => {
  const Content = [...Array(count)].map((_, index) => (
    <Component key={index} />
  ));

  return (
    pending ? Content : children
  );
};

export default Suspense;
