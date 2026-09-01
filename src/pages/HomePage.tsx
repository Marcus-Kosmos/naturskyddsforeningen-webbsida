import { Hero } from '../components/Hero';
import { ImpactSection } from '../components/ImpactSection';
import { ContentGrid } from '../components/ContentGrid';
import { BiodiversitySection } from '../components/BiodiversitySection';
import { ClimateSection } from '../components/ClimateSection';
import { SustainabilitySection } from '../components/SustainabilitySection';
import { BraMiljovalSection } from '../components/BraMiljovalSection';
import { LabelingGuideSection } from '../components/LabelingGuideSection';
import { EngagementSection } from '../components/EngagementSection';
import { LocalActivitiesSection } from '../components/LocalActivitiesSection';
import { MagazineSection } from '../components/MagazineSection';
import { PartnersSection } from '../components/PartnersSection';
import { NewsSection } from '../components/NewsSection';
import { MembershipCTA } from '../components/MembershipCTA';

export function HomePage() {
  return (
    <>
      <Hero />
      <ContentGrid />
      <BiodiversitySection />
      <ClimateSection />
      <SustainabilitySection />
      <BraMiljovalSection />
      <LabelingGuideSection />
      <EngagementSection />
      <LocalActivitiesSection />
      <ImpactSection />
      <MagazineSection />
      <PartnersSection />
      <NewsSection />
      <MembershipCTA />
    </>
  );
}
