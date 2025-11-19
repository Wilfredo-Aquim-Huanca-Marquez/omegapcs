"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/reportes");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-500">
      Redirigiendo al panel de reportes...
    </div>
  );
}
