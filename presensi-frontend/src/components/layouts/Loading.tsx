import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  text?: string;
  progress?: number;
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  text = "Loading...",

  className,
}) => {
  React.useEffect(() => {
    const timer = setInterval(() => {
      text = text === "Loading..." ? "Loading." : "Loading..";
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center space-y-4",
        className
      )}
    >
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
};
