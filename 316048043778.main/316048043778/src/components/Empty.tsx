import { cn } from "@/lib/utils";

// Empty component
export function Empty() {
  return (
    <div className={cn("flex h-full items-center justify-center text-gray-500")}>内容加载中...</div>
  );
}