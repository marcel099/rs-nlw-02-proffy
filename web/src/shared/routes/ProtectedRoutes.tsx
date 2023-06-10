import { ReactNode } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

interface ProtectedRoutesProps {
  isAllowed: boolean;
  redirectPath?: string;
  children: ReactNode;
}

const protectedRoutes = [
  '/landing',
  '/study',
  '/give-classes',
  '/my-profile',
];

export function ProtectedRoutes({
  isAllowed,
  redirectPath = '/',
  children,
}: ProtectedRoutesProps) {
  const location = useLocation();

  if (isAllowed === false && protectedRoutes.includes(location.pathname)) {
    return <Redirect to={redirectPath} />;
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      { children }
    </>
  );
}
