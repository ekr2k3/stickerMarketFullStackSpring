import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

function ProtectedRoute() {

    const token = localStorage.getItem("token");

    if (!token) {
         // Hiện thông báo toast bạn cần đăng nhập để truy cập vào router này
        toast.error("Đây là private route, Vui long dang nhap");
        return <Navigate to="/login" />;
    }
   

    return <Outlet />;
}

export default ProtectedRoute;