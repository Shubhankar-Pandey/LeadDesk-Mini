
const BASEURL = import.meta.env.VITE_BASE_URL;

export const adminSignUp = BASEURL + "/api/v1/signup";
export const adminLogin = BASEURL + "/api/v1/signin";
export const createLead = BASEURL + "/api/v1/lead";
export const getLead = BASEURL + "/api/v1/lead";
export const changeStatus = BASEURL + "/api/v1/lead";
export const callme = BASEURL + "/api/v1/meCall";
export const adminSignout = BASEURL + "/api/v1/signout";

