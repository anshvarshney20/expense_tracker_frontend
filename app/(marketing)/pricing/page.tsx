"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap, Shield, Globe, Crown, ArrowRight } from "lucide-react";

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for students and individuals tracking core expenses.",
    priceMonthly: 0,
    priceYearly: 0,
    features: [
      "Up to 50 expenses/month",
      "3 Savings Pots",
      "Basic categorization",
      "Monthly PDF reports",
      "Mobile access",
    ],
    cta: "Start for Free",
    icon: Shield,
    isPopular: false,
    color: "primary",
  },
  {
    name: "Pro",
    description: "For enthusiasts and small businesses needing deep AI insights.",
    priceMonthly: 12,
    priceYearly: 9,
    features: [
      "Unlimited expenses",
      "Unlimited Savings Pots",
      "Smart AI Spending Analysis",
      "Emotion tracking & insights",
      "Priority target date alerts",
      "Priority Email Support",
    ],
    cta: "Start 14-day Trial",
    icon: Crown,
    isPopular: true,
    color: "accent",
  },
  {
    name: "Enterprise",
    description: "Custom solutions for teams and financial organizations.",
    priceMonthly: 49,
    priceYearly: 39,
    features: [
      "Everything in Pro",
      "Multi-user collaboration",
      "Direct Bank Integration (API)",
      "Custom AI model training",
      "Dedicated Account Manager",
      "SLA Support",
    ],
    cta: "Contact Sales",
    icon: Globe,
    isPopular: false,
    color: "secondary",
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="relative min-h-screen bg-background pt-32 pb-20 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase glass border-white/5 text-primary mb-6 inline-block">
              Scale with your needs
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              Simple, transparent <br />
              <span className="text-accent italic font-heading">pricing.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              No hidden fees. Choose a plan that fits your financial goals and start tracking with AI intelligence today.
            </p>
          </motion.div>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center justify-center mt-12 space-x-4"
          >
            <span className={`text-sm font-medium ${!isYearly ? "text-white" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-7 glass rounded-full p-1 transition-all duration-300 focus:outline-none ring-offset-background ring-primary/20 focus:ring-2"
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-all duration-300 transform ${
                  isYearly ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isYearly ? "text-white" : "text-muted-foreground"}`}>
              Yearly
            </span>
            <span className="ml-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-tight">
              Save 25%
            </span>
          </motion.div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-start">
          {pricingPlans.map((plan, index) => {
            const Icon = plan.icon;
            const price = isYearly ? plan.priceYearly : plan.priceMonthly;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                whileHover={{ y: -8 }}
                className={`relative p-8 rounded-3xl glass-dark group ${
                  plan.isPopular ? "border-accent/40 bg-accent/[0.03]" : "border-white/5"
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-white text-[10px] font-bold uppercase tracking-widest text-shadow shadow-xl shadow-accent/20">
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-${plan.color}/10`}>
                    <Icon className={`w-6 h-6 text-${plan.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground min-h-[40px]">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-bold">$</span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={price}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="text-6xl font-black tracking-tighter"
                      >
                        {price}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-muted-foreground font-medium">/month</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start space-x-3 text-sm text-white/80 group-hover:text-white transition-colors">
                      <div className={`mt-0.5 rounded-full p-0.5 bg-${plan.color}/10`}>
                        <Check className={`w-3.5 h-3.5 text-${plan.color}`} />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 border group/btn ${
                    plan.isPopular
                      ? "bg-accent text-white border-transparent hover:scale-[1.02] active:scale-95 shadow-lg shadow-accent/20"
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Preview or Trust Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <p className="text-muted-foreground mb-8 uppercase tracking-[0.2em] text-[10px] font-bold">Trusted by financial freedom seekers</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale invert">
            {/* Logos Placeholder */}
            {["VISA", "STRIPE", "MASTERCARD", "APPLE PAY", "REVOLUT"].map((brand) => (
              <span key={brand} className="text-2xl font-black tracking-tighter">{brand}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
