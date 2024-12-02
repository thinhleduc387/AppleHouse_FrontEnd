import { memo } from "react";
import Header from "../../component/theme/header";
import Footer from "../../component/theme/footer";

const MasterLayout = ({ children, ...props }) => {
  return (
    <>
      <div
        className="flex flex-col min-h-screen mx-6 md:mx-12 lg:mx-28"
        {...props}
      >
        <Header />
        <main className="flex-grow overflow-y-auto">
          {" "}
          {/* Để children chiếm không gian còn lại */}
          {children}
        </main>
      </div>
      <div className="mt-8">
        <Footer />
      </div>
    </>
  );
};

export default memo(MasterLayout);
