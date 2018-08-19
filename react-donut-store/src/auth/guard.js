import { LOCAL_STORAGE } from "../share/constant/local-storage.constant";
import { getTopRole } from './util';
import { ROLES } from '../share/constant/role.constant';
import { ROUTING_URL } from "../share/constant/routing.constant";

const role = getTopRole();

export const authGuard = () => {
  const token = JSON.parse(localStorage.getItem(LOCAL_STORAGE.TOKEN));
  return token ? true : ROUTING_URL.LOGIN;
}

export const staffGuard = () => {
  if (role === ROLES.STAFF || role === ROLES.STORE || role === ROLES.ADMIN)
    return true;
  return redirectToUnauthorized();
}

export const storeGuard = () => {
  if (role === ROLES.STORE || role === ROLES.ADMIN)
    return true;
  return redirectToUnauthorized();
}

export const adminGuard = () => {
  if (role === ROLES.ADMIN)
    return true;
  return redirectToUnauthorized();
}

const redirectToUnauthorized = () => {
  return ROUTING_URL.UNAUTHORIZED;
}
