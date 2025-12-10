import React, { useState, useEffect } from 'react';
import { getSection, updateSection } from '../../services/api';
import EditableSection from '../../components/common/EditableSection';
import EditablePelvicFloorHero from '../../components/colorectal_clinic/pelvic_floor/EditablePelvicFloorHero';
import EditablePelvicFloorMain from '../../components/colorectal_clinic/pelvic_floor/EditablePelvicFloorMain';

/**
 * PelvicFloorCMS - CMS version for Pelvic Floor page sections
 */
const PelvicFloorCMS = () => {
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
        getSection('pelvic-floor', 'hero'),
        getSection('pelvic-floor', 'main'),
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
            title: 'Pelvic Floor Problems',
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
      const updated = await updateSection('pelvic-floor', routeMap[sectionKey], dataToSave);

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
      {/* Pelvic Floor Hero Section */}
      <EditableSection
        onSave={() => handleSave('hero')}
        saving={saving.hero}
        sectionName="Pelvic Floor Hero"
      >
        <EditablePelvicFloorHero
          data={localData.hero || { backgroundImage: '', title: 'Pelvic Floor Problems', description: '', buttonText: 'Book Consultation' }}
          onDataChange={(newData) => updateLocalData('hero', newData)}
        />
      </EditableSection>

      {/* Pelvic Floor Main Section */}
      <EditableSection
        onSave={() => handleSave('main')}
        saving={saving.main}
        sectionName="Pelvic Floor Main Content"
      >
        <EditablePelvicFloorMain
          data={localData.main || { sections: [] }}
          onDataChange={(newData) => updateLocalData('main', newData)}
        />
      </EditableSection>
    </div>
  );
};

export default PelvicFloorCMS;


