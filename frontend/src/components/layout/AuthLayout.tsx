
import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  subtitle?: string;
};

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold ember-gradient bg-clip-text text-transparent">M-SHIGANA</h1>
          <p className="text-muted-foreground">Quick, secure money transfers</p>
        </div>
        
        <Card className="w-full">
          <div className="p-6 sm:p-8">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-semibold">{title}</h2>
              {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
            </div>
            {children}
          </div>
        </Card>
      </div>
    </div>
  );
}
