'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useActionState, useEffect } from "react"
import { initialState } from "@/lib/validate"
import { login } from "@/action/User"
import { useRouter } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const router = useRouter();

  const [state, formAction, pending] = useActionState(login, initialState);
  

  useEffect(() => {
    if(state.success){
      router.push('/admin/dashboard')
    }
  },[state, router])

  return (
    <div className={cn("flex flex-col gap-6 max-w-xl mx-auto", className)} {...props}>
      <Card className="rounded">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="bg-input"
                />

                {state?.errors?.email &&
                  state.errors.email.map((errorMsg, index) => (
                    <FieldDescription key={index} className="text-red-600">
                      {errorMsg}
                    </FieldDescription>
                ))}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input name="password" id="password" type="password" className="bg-input" />

                {state?.errors?.password &&
                  state.errors.password.map((errorMsg, index) => (
                    <FieldDescription key={index} className="text-red-600">
                      {errorMsg}
                    </FieldDescription>
                ))}
              </Field>
              <Field>
                <Button type="submit" disabled={pending}>
                  {pending ? 'login ...' : 'Login'}
                </Button>
       
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/register" className="text-primary">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
