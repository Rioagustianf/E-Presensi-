import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const recentActivities = [
  {
    name: "Budi Santoso",
    activity: "Absen masuk",
    time: "08:00",
    avatar: "https://placehold.co/400",
  },
  {
    name: "Siti Nurhaliza",
    activity: "Mengajukan izin",
    time: "08:15",
    avatar: "https://placehold.co/400",
  },
  {
    name: "Joko Widodo",
    activity: "Absen masuk",
    time: "08:30",
    avatar: "https://placehold.co/400",
  },
  {
    name: "Dewi Lestari",
    activity: "Absen masuk",
    time: "08:45",
    avatar: "https://placehold.co/400",
  },
];

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {recentActivities.map((item, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={item.avatar} alt={item.name} />
            <AvatarFallback>
              {item.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{item.name}</p>
            <p className="text-sm text-muted-foreground">{item.activity}</p>
          </div>
          <div className="ml-auto font-medium">{item.time}</div>
        </div>
      ))}
    </div>
  );
}
