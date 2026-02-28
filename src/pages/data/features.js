import { FileText, Calendar, Users } from "lucide-react";

export const features = [
  {
    id: 1,
    title: "Online Billing, Invoicing, & Contracts",
    description:
      "Simple and secure control of your organization’s financial and legal transactions.",
    icon: <FileText className="w-8 h-8 text-white" />,
    iconBg: "bg-purple-500",
  },
  {
    id: 2,
    title: "Easy Scheduling & Attendance Tracking",
    description:
      "Schedule and track attendance automatically and simplify classroom management.",
    icon: <Calendar className="w-8 h-8 text-white" />,
    iconBg: "bg-blue-500",
  },
  {
    id: 3,
    title: "Customer Tracking",
    description:
      "Automate and track emails to individuals or groups with Skilline’s built-in system.",
    icon: <Users className="w-8 h-8 text-white" />,
    iconBg: "bg-orange-500",
  },
];
