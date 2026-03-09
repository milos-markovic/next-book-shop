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
import { register } from "@/action/User"
import { formActionState } from "@/lib/validate"
import { useRouter } from "next/navigation"

type SignupFormProps = {
  className?: string,
  props?: object
}

export function SignupForm({
  className,
  props
}: SignupFormProps) {
  
  const router = useRouter();

  const initialState: formActionState = {
    success: false,
    errors: {},
  };

  const [state, formAction, pending] = useActionState(register, initialState);

  useEffect(() => {
    if(state.success){
      router.push('/login')
    }
  },[state, router])

  return (
    <div className={cn("flex flex-col gap-6 max-w-xl mx-auto", className)} {...props}>
      <Card className="rounded">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input id="name" name="name" type="text" placeholder="John Doe" className="bg-input" />

                {state?.errors?.name &&
                  state.errors.name.map((errorMsg, index) => (
                    <FieldDescription key={index} className="text-red-600">
                      {errorMsg}
                    </FieldDescription>
                ))}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
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
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input name="password" id="password" type="password"  className="bg-input" />

                    {state?.errors?.password &&
                      state.errors.password.map((errorMsg, index) => (
                        <FieldDescription key={index} className="text-red-600">
                          {errorMsg}
                        </FieldDescription>
                    ))}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FieldLabel>
                    <Input name="confirmPassword" id="confirmPassword" type="password"  className="bg-input" />

                    {state?.errors?.confirmPassword &&
                      state.errors.confirmPassword.map((errorMsg, index) => (
                        <FieldDescription key={index} className="text-red-600">
                          {errorMsg}
                        </FieldDescription>
                    ))}
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit" disabled={pending}>
                  {pending ? 'Creating ...' : 'Create Account'}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="login" className="text-primary">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      {/* <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription> */}
    </div>
  )
}
