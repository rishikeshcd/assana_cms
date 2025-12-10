import React, { useState, useEffect } from 'react';
import { getSection, updateSection } from '../../services/api';
import EditableSection from '../../components/common/EditableSection';
import EditableAssanaButtCheckHero from '../../components/gut_wellness/assana_butt_check/EditableAssanaButtCheckHero';
import EditableAssanaButtCheckMain from '../../components/gut_wellness/assana_butt_check/EditableAssanaButtCheckMain';

/**
 * AssanaButtCheckCMS - CMS version for Assana Butt Check page sections
 */
const AssanaButtCheckCMS = () => {
  const [sections, setSections] = useState({
    hero: null,
    main: null,
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
        getSection('gut-wellness', 'assana-butt-check/hero'),
        getSection('gut-wellness', 'assana-butt-check/main'),
      ]);

      const [hero, main] = results.map((result) => {
        if (result.status === 'fulfilled') {
          return result.value;
        } else {
          console.error('Error fetching section:', result.reason);
          return null;
        }
      });

      setSections({
        hero: hero || null,
        main: main || null,
      });

      // Initialize local editing data with defaults
      setLocalData({
        hero:
          hero || {
            backgroundImage: '',
            title: 'Assana Butt Check',
            description: 'At Assana Colorectal & Gut Wellness Centre, we believe that prevention and early detection are key to maintaining optimal gut and colorectal health. That\'s why we\'ve designed the Assana Butt Check, a comprehensive master health check-up that evaluates the overall health of your gut and butt, helping you stay ahead of potential issues while improving your overall wellness.',
            buttonText: 'Book a Consultation',
          },
        main:
          main || {
            mainTitle: 'All you need to know..',
            leftCards: [],
            centerImage: '',
            centerImageAlt: '',
            rightCards: [],
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
        hero: 'assana-butt-check/hero',
        main: 'assana-butt-check/main',
      };

      const dataToSave = localData[sectionKey];
      const updated = await updateSection('gut-wellness', routeMap[sectionKey], dataToSave);

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
      {/* Assana Butt Check Hero Section */}
      <EditableSection
        onSave={() => handleSave('hero')}
        saving={saving.hero}
        sectionName="Assana Butt Check Hero"
      >
        <EditableAssanaButtCheckHero
          data={localData.hero || { backgroundImage: '', title: 'Assana Butt Check', description: '', buttonText: 'Book a Consultation' }}
          onDataChange={(newData) => updateLocalData('hero', newData)}
        />
      </EditableSection>

      {/* Assana Butt Check Main Section */}
      <EditableSection
        onSave={() => handleSave('main')}
        saving={saving.main}
        sectionName="Assana Butt Check Main Content"
      >
        <EditableAssanaButtCheckMain
          data={localData.main || { mainTitle: 'All you need to know..', leftCards: [], centerImage: '', centerImageAlt: '', rightCards: [] }}
          onDataChange={(newData) => updateLocalData('main', newData)}
        />
      </EditableSection>
    </div>
  );
};

export default AssanaButtCheckCMS;

