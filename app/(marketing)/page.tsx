
import { Hero } from "@/components/sections/landing/Hero";
import { SocialProof } from "@/components/sections/landing/SocialProof";
import { HowItWorks } from "@/components/sections/landing/HowItWorks";
import { FeaturesGrid } from "@/components/sections/landing/FeaturesGrid";
import { AIInsightShowcase } from "@/components/sections/landing/AIInsightShowcase";
import { GoalSimulator } from "@/components/sections/landing/GoalSimulator";
import { Testimonials } from "@/components/sections/landing/Testimonials";
import { PricingPreview } from "@/components/sections/landing/PricingPreview";
import { FAQ } from "@/components/sections/landing/FAQ";
import { FinalCTA } from "@/components/sections/landing/FinalCTA";

export const metadata = {
    title: "Æquitas | AI-Powered Financial Intelligence",
    description: "Reach your financial goals faster with neural auditing and goal-warping technology. Stop tracking, start optimizing.",
    openGraph: {
        title: "Æquitas | Financial Intelligence OS",
        description: "The definitive intelligence OS for high-performance sovereigns.",
        type: "website",
    }
};

export default function LandingPage() {
    return (
        <div className="bg-[#02040a]">
            <Hero />
            <SocialProof />
            <HowItWorks />
            <FeaturesGrid />
            <AIInsightShowcase />
            <GoalSimulator />
            <Testimonials />
            <PricingPreview />
            <FAQ />
            <FinalCTA />
        </div>
    );
}
