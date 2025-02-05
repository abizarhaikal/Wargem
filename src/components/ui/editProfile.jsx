"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, X, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAdminData } from "@/hooks/use-editProfile";

const ADMIN_ID = localStorage.getItem("adminUserId");

// Schema validasi form
const formSchema = z
  .object({
    username: z.string().min(3, "Username minimal 3 karakter"),
    email: z.string().email("Email tidak valid"),
    oldPassword: z.string().optional(),
    password: z.string().optional(),
    passwordConfirm: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.password && data.password.length > 0) {
        if (!data.oldPassword || data.oldPassword.length === 0) {
          return false;
        }
        return data.password === data.passwordConfirm;
      }
      return (
        (!data.oldPassword || data.oldPassword.length === 0) &&
        (!data.passwordConfirm || data.passwordConfirm.length === 0)
      );
    },
    {
      message: "Password lama harus diisi untuk mengubah password",
      path: ["oldPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.password && data.password.length > 0) {
        return data.password === data.passwordConfirm;
      }
      return true;
    },
    {
      message: "Password baru tidak cocok dengan konfirmasi",
      path: ["passwordConfirm"],
    }
  );

export default function ProfileEdit() {
  const [isEditing, setIsEditing] = useState(false);
  const { adminData, loading, error, updateAdmin } = useAdminData(ADMIN_ID);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      oldPassword: "",
      password: "",
      passwordConfirm: "",
    },
  });

  useEffect(() => {
    if (adminData) {
      form.reset({
        username: adminData.username || "",
        email: adminData.email || "",
        oldPassword: "",
        password: "",
        passwordConfirm: "",
      });
    }
  }, [adminData, form]);

  const onSubmit = async (data) => {
    try {
      // Hanya kirim password jika ada perubahan
      const updateData = {
        username: data.username,
        email: data.email,
        ...(data.password
          ? {
              oldPassword: data.oldPassword,
              password: data.password,
              passwordConfirm: data.passwordConfirm,
            }
          : {}),
      };

      await updateAdmin(updateData);
      toast.success("Profile berhasil diupdate");
      setIsEditing(false);
    } catch (err) {
      toast.error("Gagal mengupdate profile: " + err.message);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (adminData) {
      form.reset({
        username: adminData.username || "",
        email: adminData.email || "",
        oldPassword: "",
        password: "",
        passwordConfirm: "",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-5xl">
        <Card className="border bg-white shadow">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-semibold">
                Account Details
              </CardTitle>
              {!isEditing && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                  className="h-10 w-10"
                >
                  <Pencil className="h-5 w-5" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-8">
            {isEditing ? (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {/* Account Info Section */}
                  <div className="grid grid-cols-2 gap-8">
                    {/* Username */}
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">
                            Username
                          </FormLabel>
                          <FormControl>
                            <Input {...field} className="border-gray-200" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              {...field}
                              className="border-gray-200"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Password Section */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-medium">Ubah Password</h3>

                    <div className="grid grid-cols-2 gap-8">
                      {/* Password Lama */}
                      <FormField
                        control={form.control}
                        name="oldPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Password Lama
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                {...field}
                                className="border-gray-200"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Password Baru */}
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Password Baru
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                {...field}
                                className="border-gray-200"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Konfirmasi Password */}
                      <FormField
                        control={form.control}
                        name="passwordConfirm"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Konfirmasi Password Baru
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                {...field}
                                className="border-gray-200"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end space-x-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      className="w-32"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="w-32 bg-blue-600 hover:bg-blue-700"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                  </div>
                </form>
              </Form>
            ) : (
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <p className="text-base font-medium text-gray-500">
                    Username
                  </p>
                  <p className="text-lg">{form.getValues().username}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-base font-medium text-gray-500">Email</p>
                  <p className="text-lg">{form.getValues().email}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-base font-medium text-gray-500">
                    Password
                  </p>
                  <p className="text-lg">••••••••</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
