import React from 'react';
import DashboardCard from "../../../component/admin/dashBoard/DashBoardCard";
import IconTotalUser from "../../../assets/IconTotalUser.png";
import IconTotalOrder from "../../../assets/IconTotalOrder.png";
import IconTotalSales from "../../../assets/IconTotalSales.png";
import IconTotalPending from "../../../assets/IconTotalPending.png";
import SaleChart from '../../../component/admin/dashBoard/chart/SaleChart';
import InventoryChart from '../../../component/admin/dashBoard/chart/InventoryChart';
import MemberOrderChart from '../../../component/admin/dashBoard/chart/MemberOrderChart';
import PaymentMethodChart from '../../../component/admin/dashBoard/chart/PaymentMethodChart';  

const DashBoard = () => {
  return (
    <main className="flex-1">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Dashboard Cards */}
        <DashboardCard title="Total Users" total="150" rate="5%" levelUp={true}>
          <img src={IconTotalUser} alt="Total Users" />
        </DashboardCard>
        <DashboardCard title="Total Orders" total="150" rate="5%" levelDown={true}>
          <img src={IconTotalOrder} alt="Total Orders" />
        </DashboardCard>
        <DashboardCard title="Total Sales" total="150" rate="5%" levelDown={true}>
          <img src={IconTotalSales} alt="Total Sales" />
        </DashboardCard>
        <DashboardCard title="Total Pending" total="150" rate="5%" levelUp={true}>
          <img src={IconTotalPending} alt="Total Pending" />
        </DashboardCard>
      </section>

      {/* Chart Section */}
      <section className="mt-12">
        <SaleChart />
      </section>

      <section className="mt-12">
        <InventoryChart />
      </section>

      <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Member vs Non-Member Order Distribution */}
        <MemberOrderChart data={{ series: [65, 35] }} />

        {/* Payment Method Distribution */}
        <PaymentMethodChart data={{ series: [50, 30, 20] }} />
      </section>
    </main>
  );
};

export default DashBoard;
