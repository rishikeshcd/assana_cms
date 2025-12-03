import React, { useState, useEffect } from 'react';
import { getSection, updateSection } from '../services/api';
import EditableSection from '../components/common/EditableSection';
import EditableColorectalSymptomsHero from '../components/colorectal_symptoms/EditableColorectalSymptomsHero';
import EditableColorectalSymptomsMain from '../components/colorectal_symptoms/EditableColorectalSymptomsMain';

/**
 * ColorectalSymptomsCMS - CMS version for Colorectal Symptoms page sections
 */
const ColorectalSymptomsCMS = () => {
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
        getSection('colorectal-symptoms', 'hero'),
        getSection('colorectal-symptoms', 'main'),
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
            title: 'Colorectal Symptoms',
            description: '',
            buttonText: 'Book Consultation',
          },
        main:
          main || {
            sections: [],
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
      const updated = await updateSection('colorectal-symptoms', routeMap[sectionKey], dataToSave);

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
      {/* Colorectal Symptoms Hero Section */}
      <EditableSection
        onSave={() => handleSave('hero')}
        saving={saving.hero}
        sectionName="Colorectal Symptoms Hero"
      >
        <EditableColorectalSymptomsHero
          data={localData.hero || { backgroundImage: '', title: 'Colorectal Symptoms', description: '', buttonText: 'Book Consultation' }}
          onDataChange={(newData) => updateLocalData('hero', newData)}
        />
      </EditableSection>

      {/* Colorectal Symptoms Main Section */}
      <EditableSection
        onSave={() => handleSave('main')}
        saving={saving.main}
        sectionName="Colorectal Symptoms Main Content"
      >
        <EditableColorectalSymptomsMain
          data={localData.main || { sections: [] }}
          onDataChange={(newData) => updateLocalData('main', newData)}
          onSave={async (newData) => {
            // Update local data first
            updateLocalData('main', newData);
            // Then save to database
            await handleSave('main', true);
          }}
        />
      </EditableSection>
    </div>
  );
};

export default ColorectalSymptomsCMS;

