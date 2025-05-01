
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const verifySchema = z.object({
  code: z.string().min(6, { message: "Please enter the 6-digit code" }),
});

type VerifyFormValues = z.infer<typeof verifySchema>;

export function VerifyEmailForm() {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<VerifyFormValues>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: VerifyFormValues) => {
    setIsLoading(true);
    try {
      // In a real implementation, we would verify the code with our API
      console.log("Verification code:", data.code);
      // For demonstration, we'll simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to dashboard after successful verification
      window.location.href = '/dashboard';
    } catch (error) {
      console.error("Verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    // In a real implementation, we would call our API to resend the code
    console.log("Resending verification code");
    
    // Show feedback to user
    alert("A new verification code has been sent to your email.");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">
                  We've sent a 6-digit verification code to your email.
                </p>
              </div>
              <FormControl>
                <Input
                  placeholder="000000"
                  className="ember-input text-center text-lg tracking-widest"
                  maxLength={6}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full ember-gradient" 
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Verify Email"}
        </Button>
        
        <div className="text-center text-sm">
          <span className="text-muted-foreground">Didn't receive code?</span>{" "}
          <button
            type="button"
            onClick={handleResendCode}
            className="font-medium text-ember-secondary hover:underline"
          >
            Resend
          </button>
        </div>
      </form>
    </Form>
  );
}
