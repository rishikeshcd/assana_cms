import React, { useState, useEffect } from 'react';
import { getSection, updateSection } from '../services/api';
import EditableSection from '../components/common/EditableSection';
import EditableContact from '../components/common/EditableContact';
import EditableHowAssanaTreats from '../components/common/EditableHowAssanaTreats';
import EditableWhyChooseAssana from '../components/common/EditableWhyChooseAssana';

/**
 * CommonCMS - CMS version for Common sections (used across all pages)
 */
const CommonCMS = () => {
  const [sections, setSections] = useState({
    contact: null,
    howAssanaTreats: null,
    whyChooseAssana: null,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({});
  const [localData, setLocalData] = useState({});

  // Fetch all sections data ONCE
  useEffect(() => {
    loadAllSections();
  }, []);

  const loadAllSections = async () => {
    try {
      const results = await Promise.allSettled([
        getSection('common', 'contact'),
        getSection('common', 'how-assana-treats'),
        getSection('common', 'why-choose-assana'),
      ]);

      const [contact, howAssanaTreats, whyChooseAssana] = results.map((result) => {
        if (result.status === 'fulfilled') {
          return result.value;
        } else {
          console.error('Error fetching section:', result.reason);
          return null;
        }
      });

      setSections({
        contact: contact || null,
        howAssanaTreats: howAssanaTreats || null,
        whyChooseAssana: whyChooseAssana || null,
      });

      // Initialize local editing data with defaults
      setLocalData({
        contact:
          contact || {
            heading: 'Ready to Feel Better Naturally?',
            description: 'Take the first step toward a healthier gut and a balanced life. Our certified wellness team is here to guide you with personalized care, natural therapies, and modern diagnostics.',
            phoneText: 'Call +91 8035735721 to book an appointment instantly through our AI voice system.',
            phoneNumber: '+91 8035735721',
            buttonText: 'Book a Consultation',
            backgroundImage: '',
          },
        howAssanaTreats:
          howAssanaTreats || {
            title: 'How Assana Treats It',
            treatments: [
              {
                title: 'Ayurvedic Therapies',
                image: '',
                imageAlt: 'Ayurvedic Therapies',
              },
              {
                title: 'Lifestyle & Diet Coaching',
                image: '',
                imageAlt: 'Lifestyle & Diet Coaching',
              },
              {
                title: 'Colon Hydrotherapy',
                image: '',
                imageAlt: 'Colon Hydrotherapy',
              },
              {
                title: 'Pelvic Floor Strengthening',
                image: '',
                imageAlt: 'Pelvic Floor Strengthening',
              },
            ],
          },
        whyChooseAssana:
          whyChooseAssana || {
            title: 'Why Choose Assana for Piles Treatment?',
            cards: [
              {
                title: 'Expertise in Colorectal Care',
                description: 'Our multidisciplinary team includes colorectal specialists, physiotherapists, nutritionists, and lifestyle coaches',
                icon: '',
                iconAlt: 'Expertise in Colorectal Care',
              },
              {
                title: 'Advanced Technology',
                description: 'State-of-the-art equipment ensures precision and comfort during the procedure.',
                icon: '',
                iconAlt: 'Advanced Technology',
              },
              {
                title: 'Comprehensive Care',
                description: 'Alongside the procedure, we provide personalized diet and lifestyle recommendations to prevent recurrence.',
                icon: '',
                iconAlt: 'Comprehensive Care',
              },
              {
                title: 'Patient-Centric Approach',
                description: 'We prioritize your comfort, privacy, and recovery every step of the way.',
                icon: '',
                iconAlt: 'Patient-Centric Approach',
              },
            ],
          },
      });

      setLoading(false);
    } catch (error) {
      console.error('Error loading sections:', error);
      setLoading(false);
    }
  };

  // Save a specific section
  const handleSave = async (sectionKey, showAlert = true) => {
    setSaving({ ...saving, [sectionKey]: true });
    try {
      const routeMap = {
        contact: 'contact',
        howAssanaTreats: 'how-assana-treats',
        whyChooseAssana: 'why-choose-assana',
      };

      const dataToSave = localData[sectionKey];
      const updated = await updateSection('common', routeMap[sectionKey], dataToSave);

      setSections({ ...sections, [sectionKey]: updated });
      setLocalData({ ...localData, [sectionKey]: { ...updated } });

      if (showAlert) {
        alert('✅ Saved successfully!');
      }
      return true;
    } catch (error) {
      console.error('Error saving:', error);
      if (showAlert) {
        alert('❌ Failed to save. Please try again.');
      }
      return false;
    } finally {
      setSaving({ ...saving, [sectionKey]: false });
    }
  };

  // Update local editing data
  const updateLocalData = (sectionKey, newData) => {
    setLocalData({
      ...localData,
      [sectionKey]: newData,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Contact Section (Common) */}
      <EditableSection
        onSave={() => handleSave('contact')}
        saving={saving.contact}
        sectionName="Contact Form (Common Section)"
      >
        <EditableContact
          data={localData.contact || {
            heading: 'Ready to Feel Better Naturally?',
            description: 'Take the first step toward a healthier gut and a balanced life. Our certified wellness team is here to guide you with personalized care, natural therapies, and modern diagnostics.',
            phoneText: 'Call +91 8035735721 to book an appointment instantly through our AI voice system.',
            phoneNumber: '+91 8035735721',
            buttonText: 'Book a Consultation',
            backgroundImage: '',
          }}
          onDataChange={(newData) => updateLocalData('contact', newData)}
        />
      </EditableSection>

      {/* How Assana Treats Section (Common) */}
      <EditableSection
        onSave={() => handleSave('howAssanaTreats')}
        saving={saving.howAssanaTreats}
        sectionName="How Assana Treats It (Common Section)"
      >
        <EditableHowAssanaTreats
          data={localData.howAssanaTreats || {
            title: 'How Assana Treats It',
            treatments: [
              {
                title: 'Ayurvedic Therapies',
                image: '',
                imageAlt: 'Ayurvedic Therapies',
              },
              {
                title: 'Lifestyle & Diet Coaching',
                image: '',
                imageAlt: 'Lifestyle & Diet Coaching',
              },
              {
                title: 'Colon Hydrotherapy',
                image: '',
                imageAlt: 'Colon Hydrotherapy',
              },
              {
                title: 'Pelvic Floor Strengthening',
                image: '',
                imageAlt: 'Pelvic Floor Strengthening',
              },
            ],
          }}
          onDataChange={(newData) => updateLocalData('howAssanaTreats', newData)}
        />
      </EditableSection>

      {/* Why Choose Assana Section (Common) */}
      <EditableSection
        onSave={() => handleSave('whyChooseAssana')}
        saving={saving.whyChooseAssana}
        sectionName="Why Choose Assana (Common Section)"
      >
        <EditableWhyChooseAssana
          data={localData.whyChooseAssana || {
            title: 'Why Choose Assana for Piles Treatment?',
            cards: [
              {
                title: 'Expertise in Colorectal Care',
                description: 'Our multidisciplinary team includes colorectal specialists, physiotherapists, nutritionists, and lifestyle coaches',
                icon: '',
                iconAlt: 'Expertise in Colorectal Care',
              },
              {
                title: 'Advanced Technology',
                description: 'State-of-the-art equipment ensures precision and comfort during the procedure.',
                icon: '',
                iconAlt: 'Advanced Technology',
              },
              {
                title: 'Comprehensive Care',
                description: 'Alongside the procedure, we provide personalized diet and lifestyle recommendations to prevent recurrence.',
                icon: '',
                iconAlt: 'Comprehensive Care',
              },
              {
                title: 'Patient-Centric Approach',
                description: 'We prioritize your comfort, privacy, and recovery every step of the way.',
                icon: '',
                iconAlt: 'Patient-Centric Approach',
              },
            ],
          }}
          onDataChange={(newData) => updateLocalData('whyChooseAssana', newData)}
        />
      </EditableSection>
    </div>
  );
};

export default CommonCMS;

