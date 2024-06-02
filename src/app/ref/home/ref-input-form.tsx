"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useCookies } from 'next-client-cookies';
const FormSchema = z.object({
  ref: z.string().min(10, {
    message: "Bio must be at least 10 characters.",
  }),
});

export function RefInputForm() {
  const router = useRouter();
  const cookies = useCookies();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const formData = new URLSearchParams();
    formData.append("input_string", data.ref);
    axios
      .post("https://2024db.minz.li/process/", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        cookies.set('response', response.data.result)
        router.push("/ref/display");
      })
      .catch((error) => {
        console.error(error);
        toast({
          variant: "destructive",
          title: "error",
          description: "something went wrong. Please try again.",
        });
      })
    toast({
      variant: "success",
      title: "Submit Success",
      description: "Please wait for the result.",
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-2/3 space-y-6 justify-center"
      >
        <FormField
          control={form.control}
          name="ref"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl">Ref Input</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Input your reference here..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {/* You can <span>@mention</span> other users and organizations. */}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
