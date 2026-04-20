import AdminLayout from "@/Layouts/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Home, CalendarCheck, Wallet } from "lucide-react";

export default function Dashboard({ stats = {} }) {
  const cards = [
    {
      title: "Нийт хэрэглэгч",
      value: stats.users ?? 0,
      icon: Users,
    },
    {
      title: "Нийт байр",
      value: stats.listings ?? 0,
      icon: Home,
    },
    {
      title: "Нийт захиалга",
      value: stats.bookings ?? 0,
      icon: CalendarCheck,
    },
    {
      title: "Нийт орлого",
      value: stats.revenue ?? 0,
      icon: Wallet,
    },
  ];

  return (
    <AdminLayout
      header={<h2 className="text-base font-medium ">Үндсэн мэдээлэл</h2>}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((item) => {
            const Icon = item.icon;

            return (
              <Card key={item.title} className="rounded-2xl border-0 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-slate-500">{item.title}</p>
                      <h3 className="mt-2 text-2xl font-bold text-slate-800">
                        {item.value}
                      </h3>
                    </div>

                    <div className="rounded-2xl bg-slate-100 p-3">
                      <Icon className="h-5 w-5 text-slate-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}