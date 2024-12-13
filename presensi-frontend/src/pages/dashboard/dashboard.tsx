import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboarLayout } from "../../components/layouts/DashboardLayout";
import { TabListLayout } from "@/components/layouts/TabList";
import { TabContentOverview } from "@/components/layouts/TabContentOverview";
import { TabContentRekap } from "@/components/layouts/TabContentRekap";
import { getStudent } from "@/service/api-service/authService";

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [student, setStudent] = useState([]);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await getStudent();
        if (response && response.name) {
          setStudent(response.id);
        } else {
          console.log("Failed to fetch user data.");
        }
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };

    fetchStudent();
  }, []);

  return (
    <DashboarLayout title="Dashboard | E-Presensi SMA Putra Indonesia">
      <div className="min-h-screen mx-8">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          </div>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList>
              <TabsTrigger value="overview">Ikhtisar</TabsTrigger>
              <TabsTrigger value="rekap">Rekap</TabsTrigger>
              <TabsTrigger value="reports">Laporan</TabsTrigger>
            </TabsList>
            <TabListLayout value={activeTab}>
              {activeTab === "overview" && <TabContentOverview />}
              {activeTab === "rekap" && <TabContentRekap studentId={student} />}
              {/* Konten tab lainnya jika ada */}
            </TabListLayout>
          </Tabs>
        </div>
      </div>
    </DashboarLayout>
  );
};
