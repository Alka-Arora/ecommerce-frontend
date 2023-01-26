import React from "react";
import { useRouter } from "next/router";

const adminRoutes = ["/admin"];
const userRoutes = ["/cart"];
const commonRoutes = ["/"];
export const admin = (WrappedComponent) => {
    return (props) => {
        if (typeof window !== "undefined") {
            const router = useRouter();
            const login = JSON.parse(localStorage.getItem("login"));
            if (adminRoutes.indexOf(router.pathname) > -1) {
                if (login?.role === "user") {
                    router.replace("/");
                    return null;
                }
            }
            return <WrappedComponent {...props} />;
        }
        return null;
    };

};

export const user = (WrappedComponent) => {
    return (props) => {
        if (typeof window !== "undefined") {
            const router = useRouter();
            const login = JSON.parse(localStorage.getItem("login"));
            if (userRoutes.indexOf(router.pathname) > -1) {
                if (login?.role === "admin") {
                    router.replace("/");
                    return null;
                }
            }
            return <WrappedComponent {...props} />;
        }
        return null;
    };
};

export const common = (WrappedComponent) => {

    return (props) => {
        if (typeof window !== "undefined") {
            const router = useRouter();
            const login = JSON.parse(localStorage.getItem("login"));
            if (commonRoutes.indexOf(router.pathname) > -1) {
                if (!login) {
                    router.replace("/login");
                    return null;
                }
            }
            return <WrappedComponent {...props} />;
        }
        return null;

    };

};
