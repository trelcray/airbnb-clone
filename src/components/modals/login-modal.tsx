"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useLoginModal } from "@/hooks/use-login-modal";
import { useRegisterModal } from "@/hooks/use-register-modal";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(3).nonempty(),
});

export const LoginModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    signIn("credentials", {
      ...values,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast({ title: "Logged In" });
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast({ title: callback.error, isError: true });
      }
    });
  };

  const footerContent = (
    <div className="mt-3 flex w-full flex-col gap-4">
      <hr />
      <Button
        variant="outline"
        onClick={() => signIn("google")}
        className="w-full justify-start border-2"
      >
        <FcGoogle /> <span className="flex-1">Continue with Google</span>
      </Button>
      <Button
        variant="outline"
        onClick={() => signIn("github")}
        className="w-full justify-start border-2"
      >
        <AiFillGithub /> <span className="flex-1">Continue with Github</span>
      </Button>
      <div className="text-neural-500 mt-4 text-center font-light">
        <div
          className="flex flex-row items-center justify-center gap-2 
          text-center"
        >
          <p>First time using airbnb?</p>
          <p
            onClick={toggle}
            className="cursor-pointer text-neutral-800 hover:underline"
          >
            Create an account
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      title="Login"
      actionLabel="Continue"
      onSubmit={form.handleSubmit(onSubmit)}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      footer={footerContent}
    >
      <div>
        <div className="py-2">
          <Heading title="Welcome back" subtitle="Login to your account" />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="my-2 flex flex-col gap-y-2"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <fieldset className="relative">
                        <Input
                          id="email"
                          type="email"
                          placeholder=" "
                          {...field}
                          isError={form.formState.errors}
                          required
                        />
                        <FormLabel htmlFor="email">Email</FormLabel>
                      </fieldset>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <fieldset className="relative">
                        <Input
                          id="password"
                          type="password"
                          placeholder=" "
                          {...field}
                          isError={form.formState.errors}
                          required
                        />
                        <FormLabel htmlFor="password">Password</FormLabel>
                      </fieldset>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
