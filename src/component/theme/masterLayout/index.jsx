import { memo } from "react";
import Header from "../header";
import Footer from "../footer";

const MasterLayout = ({ children, ...props }) => {
  return (
    <div className="flex flex-col min-h-screen md:mx-28" {...props}>
      <Header />
      <main className="flex-grow"> {/* Để children chiếm không gian còn lại */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default memo(MasterLayout);
