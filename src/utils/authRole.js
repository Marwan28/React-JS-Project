export const isAdminUser = (user) => {
  const userType = String(user?.type || user?.role || "").toLowerCase();

  return userType === "admin";
};
