"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { routes } from "@/app/_config";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();
  const onSubmit = async (formData: z.infer<typeof loginSchema>) => {
    setSubmitError("");
    const { data, error } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
    });
    if (error) setSubmitError(error.message || "An unknown error occurred.");
    if (data) {
      toast.success("Logged in successfully!");
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Login to your account</h1>
      <Label htmlFor="email">Email</Label>
      <Input type="email" placeholder="Email" {...register("email")} />
      {errors.email && (
        <p className="text-destructive text-sm">{errors.email.message}</p>
      )}
      <Label htmlFor="password">Password</Label>
      <Input type="password" placeholder="Password" {...register("password")} />
      {errors.password && (
        <p className="text-destructive text-sm">{errors.password.message}</p>
      )}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
      {submitError && <p className="text-destructive text-sm">{submitError}</p>}
      <Link
        href={`${routes.signup}`}
        className="text-sm text-secondary-foreground hover:underline"
      >
        Don&apos;t have an account? Sign up
      </Link>
    </form>
  );
}