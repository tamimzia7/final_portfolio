import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/animations/PageTransition";
import { Button } from "@/components/shared/Button";

const NotFoundScene = React.lazy(() => import("@/components/three/NotFoundScene").then(m => ({ default: m.NotFoundScene })));

export default function NotFoundPage() {
  return (
    <PageTransition>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Suspense fallback={<div className="absolute inset-0 bg-[#050505]" />}><NotFoundScene /></Suspense>
        <div className="max-width-container text-center relative z-10">
          <h1 className="text-[12rem] md:text-[20rem] font-bold leading-none text-gradient opacity-20 select-none">
            404
          </h1>
          <div className="-mt-16 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white/90">
              Lost in Space
            </h2>
            <p className="text-white/40 max-w-md mx-auto">
              The page you're looking for has drifted into deep space. Let's get you back to civilization.
            </p>
            <Link to="/">
              <Button>Return Home &rarr;</Button>
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
