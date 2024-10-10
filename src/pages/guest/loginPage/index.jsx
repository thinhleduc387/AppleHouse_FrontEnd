import { memo } from "react";
import "./style.scss"; // Import style nếu có

const LoginPage = () => {
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
};

export default memo(LoginPage);
