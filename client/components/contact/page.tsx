"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function Contact() {
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  function redirectToWhatsApp() {
    const name = form.getValues("name");
    const email = form.getValues("email");
    const message = form.getValues("message");

    if (!name || !email || !message) {
      setStatusMessage("Please fill in all fields before sending a WhatsApp message.");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(""); 

    const formattedMessage = `New message from ${name}\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Message: ${message}\n\n` +
      `=============================\n` +
      `Form Submitted from: ${window.location.href}\n` +
      `=============================`;

    const whatsappUrl = `https://wa.me/+917810982910?text=${encodeURIComponent(formattedMessage)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Simulate a delay and reset form
    setTimeout(() => {
      form.reset();
      setStatusMessage("✅ Message sent successfully!");
      setIsSubmitting(false);
    }, 1500);
  }

  return (
    <section className="relative py-20">
      {/* Minimal Contact Title */}
      <div className="relative flex flex-col items-center justify-center mb-16">
        <h1 className="text-[50px] sm:text-[100px] md:text-[120px] xl:text-[140px] font-extrabold tracking-tight text-gray-800 dark:text-gray-200">
          CONTACT
        </h1>
        <h2 className="sr-only">Contact</h2>
      </div>

      <div className="container relative z-10 mx-auto px-4 max-w-lg">
        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.1 }} 
          viewport={{ once: true }} 
          className="p-6 rounded-xl shadow-lg bg-zinc-800 text-white"
        >
          <Form {...form}>
            <form onSubmit={(e) => { e.preventDefault(); redirectToWhatsApp(); }} className="space-y-6">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} className="bg-zinc-700 text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} className="bg-zinc-700 text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your message..." className="min-h-[120px] bg-zinc-700 text-white" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="flex flex-col gap-4">
                <Button 
                  type="submit" 
                  className="w-full bg-green-500 hover:bg-green-600" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send via WhatsApp"}
                </Button>
              </div>
            </form>
          </Form>
          {statusMessage && <p className="mt-4 text-center text-sm font-medium">{statusMessage}</p>}
        </motion.div>
      </div>
    </section>
  );
} 