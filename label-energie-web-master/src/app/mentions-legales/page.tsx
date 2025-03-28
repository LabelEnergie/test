import CGV from "@/components/CGV";
import ContactSection from "@/components/shared/Contact/ContactSection";
import HeaderWithPerksSection from "@/components/shared/Sections/HeaderWithPerksSection";

export default function LegalMentions() {
  return (
    <main>
      <HeaderWithPerksSection
        image="/images/mentions-legales.jpg"
        h1="Mentions légales"
      />
      <CGV />
      <ContactSection />
    </main>
  );
}
