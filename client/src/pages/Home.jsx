import React, { Suspense, lazy } from 'react';
import HeroSection from '../sections/HeroSection';
const GrowthPlanSection = lazy(() => import('../sections/GrowthPlanSection'));
const OurFeaturesSection = lazy(() => import('../sections/OurFeaturesSection'));
const BannerSection = lazy(() => import('../sections/BannerSection'));
const StatsSection = lazy(() => import('../sections/StatsSection'));
const EcosystemSection = lazy(() => import('../sections/EcosystemSection'));
const InsightBannerSection = lazy(() => import('../sections/InsightBannerSection'));
const FullImageSection = lazy(() => import('../sections/FullImageSection'));
const SuccessStoriesSection = lazy(() => import('../sections/SuccessStoriesSection'));

const SectionLoader = () => (
    <div className="min-h-[200px] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
);

const Home = () => {
    return (
        <>
            <HeroSection />
            <Suspense fallback={<SectionLoader />}>
                <OurFeaturesSection />
                <GrowthPlanSection />
                <BannerSection />
                <StatsSection />
                <InsightBannerSection />
                <EcosystemSection />

                <SuccessStoriesSection />
            </Suspense>
        </>
    );
};

export default Home;
