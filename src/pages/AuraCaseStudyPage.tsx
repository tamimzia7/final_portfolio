import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { PageTransition } from "@/components/animations/PageTransition";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/shared/Button";
import ap1 from "@/assets/images/projects/ap1.png";
import ap2 from "@/assets/images/projects/ap2.png";
import ap3 from "@/assets/images/projects/ap3.png";

gsap.registerPlugin(ScrollTrigger);

const PRIMARY = "#A855F7";
const PRIMARY_LIGHT = "#C084FC";
const GOLD = "#F59E0B";
const P_RGB = "168,85,247";
const G_RGB = "245,158,11";
const ACCENT_GRADIENT = `linear-gradient(135deg, ${PRIMARY} 0%, ${GOLD} 100%)`;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } },
};

const ICONS: Record<string, ReactNode> = {
  star: (
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3z" />
      <path d="M19 14l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </>
  ),
  alert: (
    <>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </>
  ),
  chat: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  "map-pin": (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  clipboard: (
    <>
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4M12 16h4M8 11h.01M8 16h.01" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  user: (
    <>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  "user-check": (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="m16 11 2 2 4-4" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3" />
      <path d="M1 14h6M9 8h6M17 16h6" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </>
  ),
  "credit-card": (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </>
  ),
  "bar-chart": (
    <>
      <path d="M12 20V10M18 20V4M6 20v-4" />
    </>
  ),
  "layout-dashboard": (
    <>
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14a9 3 0 0 0 18 0V5" />
      <path d="M3 12a9 3 0 0 0 18 0" />
    </>
  ),
  server: (
    <>
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <path d="M6 6h.01M6 18h.01" />
    </>
  ),
  monitor: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  tool: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  ),
  layers: (
    <>
      <path d="M12 2 2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
    </>
  ),
  code: (
    <>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.4 1 2.3h6c0-.9.4-1.8 1-2.3A7 7 0 0 0 12 2z" />
      <path d="M9 18h6M10 22h4" />
    </>
  ),
  robot: (
    <>
      <path d="M12 8V4H8" />
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M2 14h2M20 14h2" />
      <path d="M15 13v2M9 13v2" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0M12 19v3" />
    </>
  ),
  "message-circle": (
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  ),
  wallet: (
    <>
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
    </>
  ),
  smartphone: (
    <>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M12 18h.01" />
    </>
  ),
  "trending-up": (
    <>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </>
  ),
  rocket: (
    <>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </>
  ),
  flask: (
    <>
      <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
      <path d="M8.5 2h7M7 16h10" />
    </>
  ),
  pencil: (
    <>
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </>
  ),
  "list-checks": (
    <>
      <path d="m3 17 2 2 4-4" />
      <path d="m3 7 2 2 4-4" />
      <path d="M13 6h8M13 12h8M13 18h8" />
    </>
  ),
  "arrow-down": (
    <>
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </>
  ),
  "arrow-right": (
    <>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </>
  ),
};

function Icon({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {ICONS[name]}
    </svg>
  );
}

function AccentIcon({ name, size = 56 }: { name: string; size?: number }) {
  return (
    <div
      className="inline-flex items-center justify-center rounded-2xl mb-5"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, rgba(${P_RGB},0.14), rgba(${G_RGB},0.06))`,
        border: `1px solid rgba(${P_RGB},0.25)`,
        color: PRIMARY,
        boxShadow: `0 0 30px rgba(${P_RGB},0.12)`,
      }}
    >
      <Icon name={name} className="w-6 h-6" />
    </div>
  );
}

function SectionShell({ id, children, tint = false }: { id?: string; children: ReactNode; tint?: boolean }) {
  return (
    <section id={id} className="section-padding border-t border-white/5 relative overflow-hidden">
      {tint && (
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] pointer-events-none -z-10"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, rgba(${P_RGB},0.05) 0%, rgba(${G_RGB},0.02) 30%, transparent 70%)`,
          }}
        />
      )}
      <div className="max-width-container relative">{children}</div>
    </section>
  );
}

const VISION = [
  {
    icon: "sparkles",
    title: "Luxury Reimagined",
    text: "Premium digital experiences for heritage fashion — a storefront that feels as elegant as the product it sells.",
  },
  {
    icon: "layout-dashboard",
    title: "Digital Showroom",
    text: "An online boutique where customers can browse, explore and fall in love with sarees from anywhere.",
  },
  {
    icon: "shield",
    title: "Effortless Shopping",
    text: "From discovery to checkout, every step of the journey is designed to feel effortless and secure.",
  },
];

const PROBLEMS = [
  { icon: "search", title: "Fragmented Catalog", text: "No single, elegant place to discover luxury sarees online." },
  { icon: "monitor", title: "Generic Templates", text: "Off-the-shelf storefronts that dilute a premium brand identity." },
  { icon: "credit-card", title: "Complicated Checkout", text: "Long, clunky checkout flows that make shoppers abandon carts." },
  { icon: "star", title: "No Wishlist", text: "Shoppers have no way to save favourite pieces and return later." },
  { icon: "clipboard", title: "Manual Inventory", text: "Stock managed in spreadsheets — slow, error-prone and invisible." },
  { icon: "alert", title: "Weak Branding", text: "Storefronts that fail to reflect the value of luxury craftsmanship." },
];

const SOLUTIONS = [
  { icon: "layout-dashboard", title: "Rich Catalog", text: "Elegant browsing with categories, filtering and rich product detail." },
  { icon: "sparkles", title: "Premium UI", text: "A luxury-first interface crafted with TailwindCSS and fine attention to detail." },
  { icon: "shield", title: "Secure Checkout", text: "A fast, validated path from cart to confirmation — safe at every step." },
  { icon: "star", title: "Wishlist", text: "Saved favourites follow shoppers wherever they browse." },
  { icon: "sliders", title: "Admin Control", text: "Products, orders and customers managed from one powerful panel." },
  { icon: "database", title: "Inventory Tracking", text: "Accurate stock levels that are always visible and up to date." },
];

const ROLES = [
  {
    icon: "user",
    title: "Customer",
    text: "Explore the luxury catalog, curate a wishlist and check out securely in minutes.",
    points: ["Browse luxury catalog", "Wishlist & saved items", "Secure checkout"],
  },
  {
    icon: "sliders",
    title: "Admin",
    text: "Manage products, inventory, orders and customers from a full control panel.",
    points: ["Product & inventory", "Order pipeline", "Customer management"],
  },
];

const JOURNEY = [
  { title: "Discover", text: "Land on a luxurious storefront that sets the tone." },
  { title: "Browse Catalog", text: "Explore categories and rich saree collections." },
  { title: "View Details", text: "Inspect every piece with elegant product pages." },
  { title: "Save to Wishlist", text: "Keep favourites close and decide at your pace." },
  { title: "Add to Cart", text: "Move the pieces you love into the bag." },
  { title: "Checkout", text: "Enter details and complete the purchase securely." },
  { title: "Order Confirmed", text: "Get instant confirmation with order history." },
  { title: "Review", text: "Share feedback and enjoy the experience." },
];

const FEATURES = [
  { icon: "user-check", title: "Auth & Roles", text: "Clean admin/user authentication with role-based access control." },
  { icon: "layout-dashboard", title: "Product Catalog", text: "A rich catalog with categories, filtering and detailed product pages." },
  { icon: "star", title: "Wishlist", text: "Save favourite sarees and return to them whenever you're ready." },
  { icon: "shield", title: "Secure Checkout", text: "A streamlined, secure checkout flow for every order." },
  { icon: "sliders", title: "Admin Dashboard", text: "Full control over products, orders and customers." },
  { icon: "user", title: "Customer Management", text: "Customer accounts with complete order histories." },
  { icon: "database", title: "Inventory Tracking", text: "Accurate stock levels, always visible and up to date." },
  { icon: "monitor", title: "Responsive UI", text: "A premium shopping experience on every device." },
  { icon: "layers", title: "Categories", text: "An organized catalog that makes discovery effortless." },
  { icon: "eye", title: "Product Showcase", text: "Rich product pages with elegant imagery and detail." },
  { icon: "trending-up", title: "Order History", text: "Every purchase tracked in one clear place." },
  { icon: "tool", title: "Premium Design", text: "Luxury-first UI crafted with TailwindCSS." },
];

const ARCHITECTURE = [
  { icon: "user", label: "Customer", caption: "Online shoppers" },
  { icon: "monitor", label: "Frontend", caption: "TailwindCSS + JavaScript" },
  { icon: "server", label: "Laravel Backend", caption: "Laravel + PHP" },
  { icon: "code", label: "Service Layer", caption: "Service-Repository pattern" },
  { icon: "database", label: "MySQL", caption: "Eloquent ORM, normalized schema" },
  { icon: "layout-dashboard", label: "Admin Dashboard", caption: "Products, orders & inventory" },
];

const STACK = [
  { icon: "monitor", title: "Frontend", items: ["TailwindCSS", "JavaScript", "Responsive UI"] },
  { icon: "server", title: "Backend", items: ["Laravel", "PHP", "MVC Routing"] },
  { icon: "database", title: "Database", items: ["MySQL", "Eloquent ORM", "Normalized Schema"] },
  { icon: "tool", title: "Tools", items: ["Git & GitHub", "Composer", "Artisan CLI"] },
  { icon: "layers", title: "Architecture", items: ["Service-Repository", "Middleware Auth", "Modular Layout"] },
];

const GALLERY = [
  {
    src: ap1,
    label: "Luxury Storefront",
    alt: "AURA Luxury Storefront",
    description: "Premium homepage with elegant hero, featured collections and a luxurious shopping experience.",
    badges: ["Hero UI", "Featured Collections", "Premium Design"],
  },
  {
    src: ap2,
    label: "Product Gallery",
    alt: "AURA Product Gallery",
    description: "Beautiful product gallery with rich saree details, pricing and effortless browsing.",
    badges: ["Catalog", "Saree Details", "Filtering"],
  },
  {
    src: ap3,
    label: "Admin Panel",
    alt: "AURA Admin Panel",
    description: "Complete admin dashboard for products, orders, customers and inventory.",
    badges: ["Dashboard", "Orders", "Inventory"],
  },
];

const HERO_SLIDES = [
  { src: ap1, alt: "AURA Luxury Storefront" },
  { src: ap2, alt: "AURA Product Gallery" },
  { src: ap3, alt: "AURA Admin Panel" },
];

const CHALLENGES = [
  {
    topic: "Luxury Design",
    challenge: "Delivering a premium look that matches a luxury fashion brand.",
    solution: "A TailwindCSS-driven design system with refined typography, spacing and light.",
  },
  {
    topic: "Product Attributes",
    challenge: "Capturing saree-specific details in the catalog data model.",
    solution: "A flexible product schema with rich metadata for every item.",
  },
  {
    topic: "Wishlist Persistence",
    challenge: "Keeping wishlists intact across sessions and devices.",
    solution: "Server-persisted wishlist tied to authenticated user accounts.",
  },
  {
    topic: "Checkout Flow",
    challenge: "Making checkout both fast and genuinely secure.",
    solution: "Validated forms, clear steps and Laravel's built-in security defaults.",
  },
  {
    topic: "Role Authorization",
    challenge: "Separating admin capabilities from customer flows cleanly.",
    solution: "Middleware-based role gates with organized route grouping.",
  },
  {
    topic: "Data Integrity",
    challenge: "Keeping inventory and order data consistent at all times.",
    solution: "Database transactions and Eloquent relationships protect every write.",
  },
];

const JOURNEY_DEV = [
  { icon: "search", title: "Research", text: "Studied luxury retail patterns and shopper expectations." },
  { icon: "list-checks", title: "Planning", text: "Defined catalog, wishlist, checkout and admin scope." },
  { icon: "pencil", title: "UI Design", text: "Designed a premium, dark, elegant interface." },
  { icon: "code", title: "Development", text: "Built the Laravel backend and TailwindCSS frontend." },
  { icon: "flask", title: "Testing", text: "Validated checkout, auth and admin workflows." },
  { icon: "rocket", title: "Deployment", text: "Prepared the store for production launch." },
];

const ROADMAP = [
  { icon: "credit-card", title: "Payment Gateway", text: "Integrate bKash, Nagad and SSLCommerz payments." },
  { icon: "chat", title: "Bengali Support", text: "A fully bilingual shopping experience." },
  { icon: "smartphone", title: "Mobile App", text: "A native app for on-the-go shopping." },
  { icon: "trending-up", title: "Advanced Analytics", text: "Deep sales and customer insights for admins." },
  { icon: "sparkles", title: "AI Styling Assistant", text: "Personalized saree recommendations." },
  { icon: "wallet", title: "Loyalty Program", text: "Rewards and offers for returning customers." },
];

const LEARNINGS = [
  { icon: "tool", title: "TailwindCSS", text: "Rapid premium UI development without design debt." },
  { icon: "layers", title: "Service Pattern", text: "Service-repository keeps e-commerce logic organized." },
  { icon: "shield", title: "Role-based Auth", text: "Middleware gates make admin separation clean." },
  { icon: "database", title: "Schema Design", text: "Thoughtful schemas power a rich luxury catalog." },
  { icon: "code", title: "E-commerce Flows", text: "Checkout and wishlist demand careful data modeling." },
  { icon: "monitor", title: "Responsive Design", text: "A luxury feel must translate to every screen." },
];

export default function AuraCaseStudyPage() {
  const [activeShot, setActiveShot] = useState<number | null>(null);
  const [heroShot, setHeroShot] = useState(0);
  const [heroHovered, setHeroHovered] = useState(false);

  // Hero screenshot slider — auto-plays every 4s, pauses while hovered
  useEffect(() => {
    if (heroHovered) return;
    const id = setInterval(() => setHeroShot((a) => (a + 1) % HERO_SLIDES.length), 4000);
    return () => clearInterval(id);
  }, [heroHovered]);

  useEffect(() => {
    if (activeShot === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setActiveShot(null); return; }
      if (e.key === "ArrowRight") setActiveShot((a) => (a === null ? a : (a + 1) % GALLERY.length));
      if (e.key === "ArrowLeft") setActiveShot((a) => (a === null ? a : (a - 1 + GALLERY.length) % GALLERY.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeShot]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".journey-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: ".journey-track",
            start: "top 75%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        }
      );
      gsap.to(".hero-glow", {
        yPercent: 35,
        ease: "none",
        scrollTrigger: {
          trigger: ".aura-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <PageTransition direction="up">
      {/* ============ SECTION 1 — HERO ============ */}
      <section className="aura-hero relative min-h-[92vh] flex items-center overflow-hidden pt-32 pb-24">
        <div className="hero-glow absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[700px] pointer-events-none -z-10" style={{
          background: `radial-gradient(ellipse at 50% 0%, rgba(${P_RGB},0.12) 0%, rgba(${G_RGB},0.05) 30%, transparent 70%)`,
        }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505] pointer-events-none -z-10" />

        <div className="max-width-container w-full">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8" style={{
                background: `rgba(${P_RGB},0.08)`,
                border: `1px solid rgba(${P_RGB},0.25)`,
                boxShadow: `0 0 30px rgba(${P_RGB},0.15)`,
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill={PRIMARY}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-[11px] font-semibold tracking-wider" style={{ color: PRIMARY_LIGHT }}>
                  Featured Project
                </span>
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.02] tracking-tight mb-4">
                AURA <br />
                <span className="text-gradient">Collection</span>
              </h1>

              <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: PRIMARY_LIGHT }}>
                Luxury Saree E-commerce Platform
              </p>

              <p className="text-white/40 text-base md:text-lg max-w-xl leading-relaxed mb-10">
                AURA is a luxury saree e-commerce platform built on Laravel — a premium storefront,
                wishlist, secure checkout and a complete admin panel in one elegant experience.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <Button as="a" href="#">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  Live Demo
                </Button>
                <Button variant="secondary" as="a" href="https://github.com/tamimzia7/aura-collection">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  GitHub
                </Button>
                <Link to="/projects" className="self-center">
                  <span className="inline-flex items-center gap-2 px-3 py-2 text-sm text-white/40 hover:text-white transition-colors duration-300">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5" />
                      <path d="m12 19-7-7 7-7" />
                    </svg>
                    Back to Projects
                  </span>
                </Link>
              </div>

              <div className="flex flex-wrap gap-2">
                {["Wishlist", "Secure Checkout", "Admin Dashboard", "Inventory Tracking"].map((chip) => (
                  <span
                    key={chip}
                    className="px-3 py-1.5 text-[11px] font-medium rounded-full glass"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15} direction="left">
              <div className="relative">
                <div
                  className="absolute -inset-8 rounded-[40px] pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 40%, rgba(${P_RGB},0.14) 0%, transparent 65%)` }}
                />
                <div
                  className="relative rounded-4xl overflow-hidden"
                  style={{
                    background: `linear-gradient(180deg, rgba(${P_RGB},0.06) 0%, rgba(5,5,5,0.6) 100%)`,
                    border: `1px solid rgba(${P_RGB},0.18)`,
                    boxShadow: `0 40px 120px -30px rgba(${P_RGB},0.3)`,
                  }}
                  onMouseEnter={() => setHeroHovered(true)}
                  onMouseLeave={() => setHeroHovered(false)}
                >
                  <div className="relative" style={{ aspectRatio: "16/10" }}>
                    {HERO_SLIDES.map((slide, idx) => (
                      <img
                        key={slide.src}
                        src={slide.src}
                        alt={slide.alt}
                        loading={idx === 0 ? "eager" : "lazy"}
                        draggable={false}
                        className="absolute inset-0 w-full h-full object-cover object-top select-none"
                        style={{ opacity: idx === heroShot ? 1 : 0, transition: "opacity 0.8s ease" }}
                      />
                    ))}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: "linear-gradient(180deg, transparent 60%, rgba(5,5,5,0.35) 100%)" }}
                    />
                  </div>

                  {/* Previous */}
                  <button
                    type="button"
                    aria-label="Previous screenshot"
                    onClick={() => setHeroShot((a) => (a - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-xl border transition-all duration-300 hover:scale-110"
                    style={{ background: "rgba(5,5,5,0.55)", borderColor: `rgba(${P_RGB},0.3)`, color: "rgba(255,255,255,0.85)", boxShadow: `0 0 20px rgba(${P_RGB},0.2)` }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>

                  {/* Next */}
                  <button
                    type="button"
                    aria-label="Next screenshot"
                    onClick={() => setHeroShot((a) => (a + 1) % HERO_SLIDES.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-xl border transition-all duration-300 hover:scale-110"
                    style={{ background: "rgba(5,5,5,0.55)", borderColor: `rgba(${P_RGB},0.3)`, color: "rgba(255,255,255,0.85)", boxShadow: `0 0 20px rgba(${P_RGB},0.2)` }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>

                  {/* Dots */}
                  <div
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full backdrop-blur-xl"
                    style={{ background: "rgba(5,5,5,0.55)", border: `1px solid rgba(${P_RGB},0.2)` }}
                  >
                    {HERO_SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        aria-label={`Go to screenshot ${idx + 1}`}
                        onClick={() => setHeroShot(idx)}
                        className="rounded-full transition-all duration-300"
                        style={{
                          width: idx === heroShot ? 18 : 6,
                          height: 6,
                          background: idx === heroShot ? PRIMARY : "rgba(255,255,255,0.25)",
                          boxShadow: idx === heroShot ? `0 0 10px rgba(${P_RGB},0.5)` : "none",
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="absolute -top-5 -right-4 md:-right-8 animate-float">
                  <div className="flex items-center gap-3 px-4 py-3 rounded-2xl glass" style={{ borderColor: `rgba(${P_RGB},0.25)`, boxShadow: `0 20px 60px -15px rgba(${P_RGB},0.25)` }}>
                    <span className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `rgba(${P_RGB},0.15)`, color: PRIMARY }}>
                      <Icon name="sparkles" className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-white/80">Handcrafted Sarees</p>
                      <p className="text-[10px] text-white/35">Premium quality</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-5 -left-4 md:-left-8 animate-float" style={{ animationDelay: "1.5s" }}>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-2xl glass" style={{ borderColor: `rgba(${G_RGB},0.25)`, boxShadow: `0 20px 60px -15px rgba(${G_RGB},0.2)` }}>
                    <span className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `rgba(${G_RGB},0.12)`, color: GOLD }}>
                      <Icon name="shield" className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-white/80">Secure Checkout</p>
                      <p className="text-[10px] text-white/35">Fast &amp; safe</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============ SECTION 2 — PROJECT VISION ============ */}
      <SectionShell id="vision" tint>
        <SectionHeading
          title="The"
          highlight="Vision"
          subtitle="Why AURA exists — and what it's building toward."
        />
        <ScrollReveal delay={0.1}>
          <p className="text-white/45 text-lg md:text-xl leading-relaxed max-w-3xl mb-14">
            AURA was built on a simple belief — <span className="text-white/80 font-semibold">luxury fashion deserves a luxury digital experience.</span>{" "}
            The platform exists to bring heritage saree craftsmanship to modern shoppers, with a storefront
            that is as elegant, fast and secure as the product itself.
          </p>
        </ScrollReveal>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-3 gap-6 md:gap-8"
        >
          {VISION.map((v) => (
            <motion.div key={v.title} variants={item}>
              <motion.div
                className="group h-full rounded-4xl p-8 glass glass-hover transition-all duration-500"
                whileHover={{ y: -8 }}
              >
                <AccentIcon name={v.icon} />
                <h3 className="text-xl font-bold mb-3 text-white/90">{v.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{v.text}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </SectionShell>

      {/* ============ SECTION 3 — PROBLEM STATEMENT ============ */}
      <SectionShell id="problem">
        <SectionHeading
          title="Problems"
          highlight="We Solve"
          subtitle="The real pain points behind every broken luxury shopping experience."
        />
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {PROBLEMS.map((p) => (
            <motion.div key={p.title} variants={item}>
              <motion.div
                className="group h-full rounded-4xl p-7 glass glass-hover transition-all duration-500"
                whileHover={{ y: -6 }}
              >
                <div className="flex items-start gap-4">
                  <span
                    className="shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}
                  >
                    <Icon name={p.icon} className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-white/85 mb-1.5 text-base">{p.title}</h3>
                    <p className="text-sm text-white/35 leading-relaxed">{p.text}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </SectionShell>

      {/* ============ SECTION 4 — SOLUTION ============ */}
      <SectionShell id="solution" tint>
        <SectionHeading
          title="Our"
          highlight="Solution"
          subtitle="How AURA turns every problem into a seamless experience."
        />
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {SOLUTIONS.map((s) => (
            <motion.div key={s.title} variants={item}>
              <motion.div
                className="group h-full rounded-4xl p-7 transition-all duration-500"
                style={{
                  background: `linear-gradient(180deg, rgba(${P_RGB},0.05) 0%, rgba(5,5,5,0.5) 100%)`,
                  border: `1px solid rgba(${P_RGB},0.14)`,
                }}
                whileHover={{ y: -6 }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `rgba(${P_RGB},0.4)`; e.currentTarget.style.boxShadow = `0 25px 60px -20px rgba(${P_RGB},0.25)`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = `rgba(${P_RGB},0.14)`; e.currentTarget.style.boxShadow = "none"; }}
              >
                <AccentIcon name={s.icon} />
                <h3 className="text-lg font-bold text-white/90 mb-2">{s.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{s.text}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </SectionShell>

      {/* ============ SECTION 5 — USER ROLES ============ */}
      <SectionShell id="roles">
        <SectionHeading
          title="User"
          highlight="Roles"
          subtitle="Two personas, one premium storefront."
        />
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 gap-5 md:gap-6 max-w-3xl mx-auto"
        >
          {ROLES.map((r) => (
            <motion.div key={r.title} variants={item}>
              <motion.div
                className="group h-full rounded-4xl p-7 glass glass-hover transition-all duration-500"
                whileHover={{ y: -8 }}
              >
                <AccentIcon name={r.icon} />
                <h3 className="text-lg font-bold text-white/90 mb-2">{r.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed mb-5">{r.text}</p>
                <ul className="space-y-2">
                  {r.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-xs text-white/50">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </SectionShell>

      {/* ============ SECTION 6 — SHOPPING JOURNEY ============ */}
      <SectionShell id="journey" tint>
        <SectionHeading
          title="Shopping"
          highlight="Journey"
          subtitle="From discovery to review — every step designed for delight."
        />
        <div className="journey-track relative max-w-3xl mx-auto">
          <div
            className="journey-line absolute left-[22px] md:left-[26px] top-2 bottom-2 w-[2px] rounded-full"
            style={{ background: ACCENT_GRADIENT, boxShadow: `0 0 20px rgba(${P_RGB},0.35)` }}
          />
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-8"
          >
            {JOURNEY.map((step, i) => (
              <motion.div key={step.title} variants={item} className="relative flex items-start gap-5 md:gap-8">
                <div
                  className="relative z-10 shrink-0 w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #0a0a0f 0%, #101018 100%)",
                    border: `2px solid ${i % 2 === 0 ? PRIMARY : GOLD}`,
                    boxShadow: `0 0 25px ${i % 2 === 0 ? `rgba(${P_RGB},0.35)` : `rgba(${G_RGB},0.3)`}`,
                    color: i % 2 === 0 ? PRIMARY : GOLD,
                  }}
                >
                  <span className="text-sm md:text-base font-bold">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="flex-1 rounded-3xl px-6 py-5 glass glass-hover" style={{ borderColor: `rgba(${P_RGB},0.12)` }}>
                  <h3 className="font-bold text-white/90 mb-1">{step.title}</h3>
                  <p className="text-sm text-white/40">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionShell>

      {/* ============ SECTION 7 — KEY FEATURES ============ */}
      <SectionShell id="features">
        <SectionHeading
          title="Key"
          highlight="Features"
          subtitle="A complete toolkit for a premium shopping experience."
        />
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {FEATURES.map((f) => (
            <motion.div key={f.title} variants={item}>
              <motion.div
                className="group h-full rounded-4xl p-7 glass glass-hover transition-all duration-500"
                whileHover={{ y: -6 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className="shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-500"
                    style={{ background: `rgba(${P_RGB},0.1)`, border: `1px solid rgba(${P_RGB},0.2)`, color: PRIMARY }}
                  >
                    <Icon name={f.icon} className="w-5 h-5" />
                  </span>
                  <h3 className="font-bold text-white/90">{f.title}</h3>
                </div>
                <p className="text-sm text-white/40 leading-relaxed">{f.text}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </SectionShell>

      {/* ============ SECTION 8 — SYSTEM ARCHITECTURE ============ */}
      <SectionShell id="architecture" tint>
        <SectionHeading
          title="System"
          highlight="Architecture"
          subtitle="A clean, layered architecture built to scale."
        />
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-2xl mx-auto"
        >
          {ARCHITECTURE.map((node, i) => (
            <motion.div key={node.label} variants={item} className="flex flex-col items-center">
              <motion.div
                className="w-full max-w-md rounded-3xl px-8 py-6 flex items-center gap-5 text-left transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, rgba(${P_RGB},0.06) 0%, rgba(5,5,5,0.5) 100%)`,
                  border: `1px solid rgba(${P_RGB},0.16)`,
                  boxShadow: `0 20px 50px -20px rgba(${P_RGB},0.2)`,
                }}
                whileHover={{ y: -4, borderColor: `rgba(${P_RGB},0.4)` }}
              >
                <span
                  className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: `rgba(${P_RGB},0.12)`, color: PRIMARY_LIGHT, border: `1px solid rgba(${P_RGB},0.25)` }}
                >
                  <Icon name={node.icon} className="w-5 h-5" />
                </span>
                <div>
                  <p className="font-bold text-white/90">{node.label}</p>
                  <p className="text-xs text-white/35 mt-0.5">{node.caption}</p>
                </div>
              </motion.div>
              {i < ARCHITECTURE.length - 1 && (
                <div className="flex flex-col items-center py-3">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: `rgba(${G_RGB},0.08)`, border: `1px solid rgba(${G_RGB},0.25)`, color: GOLD }}
                  >
                    <Icon name="arrow-down" className="w-4 h-4" />
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </SectionShell>

      {/* ============ SECTION 9 — TECHNOLOGY STACK ============ */}
      <SectionShell id="stack">
        <SectionHeading
          title="Technology"
          highlight="Stack"
          subtitle="Modern tools chosen for performance, security and elegance."
        />
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 lg:grid-cols-5 gap-5 md:gap-6"
        >
          {STACK.map((s) => (
            <motion.div key={s.title} variants={item}>
              <motion.div
                className="group h-full rounded-4xl p-7 glass glass-hover transition-all duration-500"
                whileHover={{ y: -8 }}
              >
                <AccentIcon name={s.icon} />
                <h3 className="text-base font-bold text-white/90 mb-4">{s.title}</h3>
                <ul className="space-y-2.5">
                  {s.items.map((it) => (
                    <li
                      key={it}
                      className="inline-flex items-center px-3 py-1.5 text-[11px] font-medium rounded-full mr-1.5"
                      style={{
                        background: `rgba(${P_RGB},0.08)`,
                        border: `1px solid rgba(${P_RGB},0.15)`,
                        color: "rgba(255,255,255,0.55)",
                      }}
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </SectionShell>

      {/* ============ SECTION 10 — PROJECT GALLERY ============ */}
      <SectionShell id="gallery" tint>
        <SectionHeading
          title="Project"
          highlight="Gallery"
          subtitle="Real screenshots of the AURA experience — click any screenshot to view it fullscreen."
        />
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {GALLERY.map((g, i) => (
            <motion.div key={g.label} variants={item}>
              <motion.div
                role="button"
                tabIndex={0}
                aria-label={`Open ${g.label} fullscreen`}
                className="group h-full rounded-4xl overflow-hidden cursor-zoom-in transition-all duration-500 glass glass-hover focus:outline-none"
                whileHover={{ y: -8 }}
                onClick={() => setActiveShot(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActiveShot(i); }
                }}
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "brightness(0.92)" }}
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
                    style={{
                      opacity: 1,
                      background: "linear-gradient(180deg, transparent 55%, rgba(5,5,5,0.85) 100%)",
                    }}
                  />
                  <span
                    className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 opacity-0 group-hover:opacity-100"
                    style={{ background: "rgba(5,5,5,0.6)", border: `1px solid rgba(${P_RGB},0.4)`, color: PRIMARY_LIGHT, boxShadow: `0 0 25px rgba(${P_RGB},0.3)` }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                  </span>
                </div>
                <div className="p-6 md:p-7">
                  <h3 className="text-lg font-bold text-white/90 mb-2">{g.label}</h3>
                  <p className="text-sm text-white/40 leading-relaxed mb-5">{g.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {g.badges.map((badge) => (
                      <span
                        key={badge}
                        className="px-3 py-1.5 text-[11px] font-medium rounded-full"
                        style={{
                          background: `rgba(${P_RGB},0.08)`,
                          border: `1px solid rgba(${P_RGB},0.18)`,
                          color: "rgba(255,255,255,0.55)",
                        }}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {activeShot !== null && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ background: "rgba(5,5,5,0.92)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
              onClick={() => setActiveShot(null)}
            >
              <motion.div
                className="relative w-full max-w-5xl"
                initial={{ scale: 0.94, y: 24, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  key={GALLERY[activeShot].src}
                  src={GALLERY[activeShot].src}
                  alt={GALLERY[activeShot].alt}
                  className="w-full max-h-[76vh] object-contain rounded-3xl"
                  style={{ boxShadow: `0 40px 120px -30px rgba(${P_RGB},0.35)` }}
                />
                <div className="flex items-center justify-between gap-4 mt-5">
                  <div>
                    <p className="text-sm font-bold text-white/90 mb-1">{GALLERY[activeShot].label}</p>
                    <p className="text-xs text-white/40 max-w-md">{GALLERY[activeShot].description}</p>
                  </div>
                  <span className="text-xs font-medium text-white/35 shrink-0">
                    {activeShot + 1} / {GALLERY.length}
                  </span>
                </div>

                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setActiveShot(null)}
                  className="absolute -top-4 -right-4 md:top-0 md:-right-14 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ background: `rgba(${P_RGB},0.15)`, border: `1px solid rgba(${P_RGB},0.35)`, color: "#fff" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>

                <button
                  type="button"
                  aria-label="Previous screenshot"
                  onClick={() => setActiveShot((a) => (a === null ? a : (a - 1 + GALLERY.length) % GALLERY.length))}
                  className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-14 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ background: `rgba(${P_RGB},0.15)`, border: `1px solid rgba(${P_RGB},0.35)`, color: "#fff" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>

                <button
                  type="button"
                  aria-label="Next screenshot"
                  onClick={() => setActiveShot((a) => (a === null ? a : (a + 1) % GALLERY.length))}
                  className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-14 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ background: `rgba(${P_RGB},0.15)`, border: `1px solid rgba(${P_RGB},0.35)`, color: "#fff" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </SectionShell>

      {/* ============ SECTION 11 — CHALLENGES & SOLUTIONS ============ */}
      <SectionShell id="challenges">
        <SectionHeading
          title="Challenges"
          highlight="& Solutions"
          subtitle="The engineering battles behind the storefront — and how they were won."
        />
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-6"
        >
          {CHALLENGES.map((c) => (
            <motion.div key={c.topic} variants={item}>
              <motion.div
                className="rounded-4xl p-7 md:p-9 transition-all duration-500"
                style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(5,5,5,0.4) 100%)", border: "1px solid rgba(255,255,255,0.06)" }}
                whileHover={{ borderColor: `rgba(${P_RGB},0.25)` }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-6" style={{ color: PRIMARY_LIGHT }}>
                  {String(CHALLENGES.indexOf(c) + 1).padStart(2, "0")} — {c.topic}
                </p>
                <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-8 items-start">
                  <div className="flex items-start gap-4">
                    <span
                      className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.45)" }}
                    >
                      <Icon name="alert" className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-white/30 mb-1.5">Challenge</p>
                      <p className="text-sm text-white/50 leading-relaxed">{c.challenge}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center justify-center pt-1">
                    <span className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `rgba(${P_RGB},0.1)`, border: `1px solid rgba(${P_RGB},0.3)`, color: PRIMARY }}>
                      <Icon name="arrow-right" className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="flex items-start gap-4">
                    <span
                      className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `rgba(${P_RGB},0.1)`, border: `1px solid rgba(${P_RGB},0.25)`, color: PRIMARY }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-white/30 mb-1.5">Solution</p>
                      <p className="text-sm text-white/55 leading-relaxed">{c.solution}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </SectionShell>

      {/* ============ SECTION 12 — DEVELOPMENT JOURNEY ============ */}
      <SectionShell id="dev-journey" tint>
        <SectionHeading
          title="Development"
          highlight="Journey"
          subtitle="From first sketch to launch-ready storefront."
        />
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 md:gap-6"
        >
          {JOURNEY_DEV.map((step, i) => (
            <motion.div key={step.title} variants={item}>
              <motion.div
                className="group h-full rounded-4xl p-6 glass glass-hover transition-all duration-500"
                whileHover={{ y: -6 }}
              >
                <span className="text-[11px] font-bold" style={{ color: `rgba(${P_RGB},0.7)` }}>
                  STEP {String(i + 1).padStart(2, "0")}
                </span>
                <span className="block w-10 h-[2px] rounded-full my-4" style={{ background: ACCENT_GRADIENT }} />
                <div className="mb-3" style={{ color: PRIMARY }}>
                  <Icon name={step.icon} className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white/90 mb-1.5 text-base">{step.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{step.text}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </SectionShell>

      {/* ============ SECTION 13 — FUTURE ROADMAP ============ */}
      <SectionShell id="roadmap">
        <SectionHeading
          title="Future"
          highlight="Roadmap"
          subtitle="Where AURA is heading next."
        />
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {ROADMAP.map((r) => (
            <motion.div key={r.title} variants={item}>
              <motion.div
                className="group h-full rounded-4xl p-7 glass glass-hover transition-all duration-500"
                whileHover={{ y: -6 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span
                    className="w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{ background: `rgba(${G_RGB},0.08)`, border: `1px solid rgba(${G_RGB},0.2)`, color: GOLD }}
                  >
                    <Icon name={r.icon} className="w-5 h-5" />
                  </span>
                  <span
                    className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full"
                    style={{ background: `rgba(${P_RGB},0.1)`, border: `1px solid rgba(${P_RGB},0.2)`, color: PRIMARY_LIGHT }}
                  >
                    Planned
                  </span>
                </div>
                <h3 className="font-bold text-white/90 mb-2">{r.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{r.text}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </SectionShell>

      {/* ============ SECTION 14 — KEY LEARNINGS ============ */}
      <SectionShell id="learnings" tint>
        <SectionHeading
          title="Key"
          highlight="Learnings"
          subtitle="What building a premium e-commerce platform taught me."
        />
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {LEARNINGS.map((l) => (
            <motion.div key={l.title} variants={item}>
              <motion.div
                className="group h-full rounded-4xl p-7 glass glass-hover transition-all duration-500"
                whileHover={{ y: -6 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className="shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{ background: `rgba(${P_RGB},0.1)`, border: `1px solid rgba(${P_RGB},0.2)`, color: PRIMARY }}
                  >
                    <Icon name={l.icon} className="w-5 h-5" />
                  </span>
                  <h3 className="font-bold text-white/90">{l.title}</h3>
                </div>
                <p className="text-sm text-white/40 leading-relaxed">{l.text}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </SectionShell>

      {/* ============ SECTION 15 — FINAL CTA ============ */}
      <section className="section-padding border-t border-white/5 relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] pointer-events-none -z-10"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, rgba(${P_RGB},0.1) 0%, rgba(${G_RGB},0.04) 35%, transparent 70%)`,
          }}
        />
        <div className="max-width-container">
          <ScrollReveal>
            <div
              className="relative rounded-4xl px-8 py-16 md:p-20 text-center overflow-hidden"
              style={{
                background: `linear-gradient(180deg, rgba(${P_RGB},0.07) 0%, rgba(5,5,5,0.5) 100%)`,
                border: `1px solid rgba(${P_RGB},0.18)`,
                boxShadow: `0 40px 120px -40px rgba(${P_RGB},0.3)`,
              }}
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% 0%, rgba(${P_RGB},0.25) 0%, transparent 70%)` }}
              />
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5">
                Interested in building <br />
                <span className="text-gradient">premium e-commerce experiences?</span>
              </h2>
              <p className="text-white/40 text-lg mb-10">
                Let's work together.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact">
                  <Button>Contact Me</Button>
                </Link>
                <Link to="/projects">
                  <Button variant="secondary">View More Projects</Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
}
