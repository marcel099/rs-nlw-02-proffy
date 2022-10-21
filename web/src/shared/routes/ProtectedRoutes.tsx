import React, { ReactNode } from "react";
import { Redirect } from "react-router-dom";

interface ProtectedRoutesProps {
  isAllowed: boolean;
  redirectPath?: string;
  children: ReactNode;
}

export function ProtectedRoutes({
  isAllowed,
  redirectPath = '/',
  children
}: ProtectedRoutesProps) {
  if (!isAllowed) {
    return <Redirect to={redirectPath} />
  }

  return (
    <>
      { children }
    </>
  );
}