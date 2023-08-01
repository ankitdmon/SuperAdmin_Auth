import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ component }) {
	const user = useSelector((state) => state.user);

	//check user logged in or not logged in
	if (!(user.id && user.email)) {
		return <Navigate to="/login" />;
	}else{
		return component;
	}

}

export default ProtectedRoutes;
