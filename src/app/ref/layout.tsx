import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { RefBreadcrumb } from "@/components/ref-breadcrumb";

export default function RefLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
