import AdminLoadingSkeleton from "../pages/components/AdminLoadingSkeleton";
AdminDashboard.auth = {
    role: "admin",
    loading: <AdminLoadingSkeleton />,
    unauthorized: "/login-with-different-user", // redirect to this url
};
