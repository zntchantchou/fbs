import Navbar from "@/app/(components)/Navbar";
import Sidebar from "@/app/(components)/Navbar/Sidebar";

function DashboardWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className={`light flex bg-gray-50 text-gray-900 w-full min-h-screen`}>
      <Sidebar></Sidebar>
      <main className="flex flex-col w-full py-7 px-9 bg-gray-100 md:pl-72">
        <Navbar></Navbar>
        {children}
      </main>
    </div>
  );
}

export default DashboardWrapper;
