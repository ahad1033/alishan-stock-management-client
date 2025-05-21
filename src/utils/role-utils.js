export const canManageProduct = (role) => {
  return role === "super_admin" || role === "admin" || role === "super_admin";
};

