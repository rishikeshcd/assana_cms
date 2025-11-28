import React, { useState, useEffect } from 'react';
import { getSection, updateSection } from '../services/api';
import EditableSection from '../components/EditableSection';
import EditableAnalFistulaHero from '../components/EditableAnalFistulaHero';
import EditableAnalFistulaMain from '../components/EditableAnalFistulaMain';

/**
 * AnalFistulaCMS - CMS version for Anal Fistula page sections
 */
const AnalFistulaCMS = () => {
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
        getSection('anal-fistula', 'hero'),
        getSection('anal-fistula', 'main'),
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
            title: 'Anal Fistula',
            description: '',
            buttonText: 'Book a Consultation',
          },
        main:
          main || {
            sections: [],
            conclusion: {
              title: 'Conclusion',
              description: '',
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
        hero: 'hero',
        main: 'main',
      };

      const dataToSave = localData[sectionKey];
      const updated = await updateSection('anal-fistula', routeMap[sectionKey], dataToSave);

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
      {/* Anal Fistula Hero Section */}
      <EditableSection
        onSave={() => handleSave('hero')}
        saving={saving.hero}
        sectionName="Anal Fistula Hero"
      >
        <EditableAnalFistulaHero
          data={localData.hero || { backgroundImage: '', title: 'Anal Fistula', description: '', buttonText: 'Book a Consultation' }}
          onDataChange={(newData) => updateLocalData('hero', newData)}
        />
      </EditableSection>

      {/* Anal Fistula Main Section */}
      <EditableSection
        onSave={() => handleSave('main')}
        saving={saving.main}
        sectionName="Anal Fistula Main Content"
      >
        <EditableAnalFistulaMain
          data={localData.main || { sections: [], conclusion: { title: 'Conclusion', description: '', buttonText: 'Book a Consultation' } }}
          onDataChange={(newData) => updateLocalData('main', newData)}
        />
      </EditableSection>
    </div>
  );
};

export default AnalFistulaCMS;

