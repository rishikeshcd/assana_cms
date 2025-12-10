import React, { useState, useEffect } from 'react';
import { getSection, updateSection } from '../../services/api';
import EditableSection from '../../components/common/EditableSection';
import EditableSeniorCitizensProgrammeHero from '../../components/gut_wellness/senior_citizens_programme/EditableSeniorCitizensProgrammeHero';
import EditableSeniorCitizensProgrammeMain from '../../components/gut_wellness/senior_citizens_programme/EditableSeniorCitizensProgrammeMain';

/**
 * SeniorCitizensProgrammeCMS - CMS version for Senior Citizens Programme page sections
 */
const SeniorCitizensProgrammeCMS = () => {
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
        getSection('gut-wellness', 'senior-citizens-programme/hero'),
        getSection('gut-wellness', 'senior-citizens-programme/main'),
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
            title: 'Senior Citizens Programme',
            description: '',
            buttonText: 'Book a Consultation',
          },
        main:
          main || {
            sections: [],
            conclusion: {
              text: '',
              buttonText: 'Book a Consultation',
            },
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
        hero: 'senior-citizens-programme/hero',
        main: 'senior-citizens-programme/main',
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
      {/* Senior Citizens Programme Hero Section */}
      <EditableSection
        onSave={() => handleSave('hero')}
        saving={saving.hero}
        sectionName="Senior Citizens Programme Hero"
      >
        <EditableSeniorCitizensProgrammeHero
          data={localData.hero || { backgroundImage: '', title: 'Senior Citizens Programme', description: '', buttonText: 'Book a Consultation' }}
          onDataChange={(newData) => updateLocalData('hero', newData)}
        />
      </EditableSection>

      {/* Senior Citizens Programme Main Section */}
      <EditableSection
        onSave={() => handleSave('main')}
        saving={saving.main}
        sectionName="Senior Citizens Programme Main Content"
      >
        <EditableSeniorCitizensProgrammeMain
          data={localData.main || { sections: [], conclusion: { text: '', buttonText: 'Book a Consultation' } }}
          onDataChange={(newData) => updateLocalData('main', newData)}
          onSave={(newData) => handleSave('main', false)}
        />
      </EditableSection>
    </div>
  );
};

export default SeniorCitizensProgrammeCMS;

