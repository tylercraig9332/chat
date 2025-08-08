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

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
  });

  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();
  const onSubmit = async (formData: z.infer<typeof signupSchema>) => {
    setSubmitError("");
    console.log(formData);
    const { data, error } = await authClient.signUp.email({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
    if (error) setSubmitError(error.message || "An unknown error occurred.");
    if (data) {
      toast.success("Account created successfully. Thanks for signing up!");
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Create an account</h1>
      <Label htmlFor="name">Name or Username</Label>
      <Input type="text" placeholder="Name" {...register("name")} />
      {errors.name && (
        <p className="text-destructive text-sm">{errors.name.message}</p>
      )}
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
        {isSubmitting ? "Signing up..." : "Signup"}
      </Button>
      {submitError && <p className="text-destructive text-sm">{submitError}</p>}
      <Link
        href={`${routes.login}`}
        className="text-sm text-secondary-foreground hover:underline"
      >
        Already have an account? Log in
      </Link>
    </form>
  );
}