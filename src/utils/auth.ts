// check for admin data in local storage
export const getAdminData = () => {
  const admin = localStorage.getItem("major_project_admin");
  if (admin) {
    return JSON.parse(admin);
  }
  return null;
}

// clear admin data from local storage
export const clearAdminData = () => {
  localStorage.removeItem("major_project_admin");
}

export const verifyAdmin = (email: string, password: string) => {
  const admin = ADMIN_USERS.find(
    (user) => user.email === email && user.password === password
  );
  if (admin) {
    return true;
  }
  return false;
}

// login admin
export const loginAdmin = (email: string, password: string) => {
  // save admin data in local storage
  localStorage.setItem("major_project_admin", JSON.stringify({
    email,
    password
  }));

  // redirect to dashboard
  window.location.href = "/";
}

// check if admin is logged in
export const isLoggedIn = () => {
  const admin = getAdminData();
  return admin !== null;
}

// logout admin
export const logoutAdmin = () => {
  clearAdminData();
  // update in localstorage
  localStorage.setItem("is_major_project_admin_logged_in", "no");
  window.location.href = "/login";
}

const ADMIN_USERS = [
  {
    email: "admin@hs.com",
    password: "admin"
  }
];
