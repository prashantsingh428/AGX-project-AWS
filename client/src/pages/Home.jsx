import React from 'react';
import HeroSection from '../sections/HeroSection';
import OurFeaturesSection from '../sections/OurFeaturesSection';
import GrowthPlanSection from '../sections/GrowthPlanSection';
import BannerSection from '../sections/BannerSection';
import StatsSection from '../sections/StatsSection';
import InsightBannerSection from '../sections/InsightBannerSection';
import EcosystemSection from '../sections/EcosystemSection';
import SuccessStoriesSection from '../sections/SuccessStoriesSection';
import LimitlessSection from '../sections/LimitlessSection';

const Home = () => {
    return (
        <>
            <HeroSection />
            <OurFeaturesSection />
            <GrowthPlanSection />
            <BannerSection />
            <StatsSection />
            <InsightBannerSection />
            <EcosystemSection />
            <SuccessStoriesSection />
            <LimitlessSection />
        </>
    );
};

export default Home;
