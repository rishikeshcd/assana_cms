import React, { useState, useEffect } from 'react';
import { getSection, updateSection } from '../services/api';
import EditableSection from '../components/common/EditableSection';
import EditableNewMomProgramHero from '../components/gut_wellness/new_mom_program/EditableNewMomProgramHero';
import EditableNewMomProgramMain from '../components/gut_wellness/new_mom_program/EditableNewMomProgramMain';

/**
 * NewMomProgramCMS - CMS version for New Mom Program page sections
 */
const NewMomProgramCMS = () => {
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
        getSection('gut-wellness', 'new-mom-program/hero'),
        getSection('gut-wellness', 'new-mom-program/main'),
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
            title: 'New Mom Program',
            description: '',
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
        hero: 'new-mom-program/hero',
        main: 'new-mom-program/main',
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
      {/* New Mom Program Hero Section */}
      <EditableSection
        onSave={() => handleSave('hero')}
        saving={saving.hero}
        sectionName="New Mom Program Hero"
      >
        <EditableNewMomProgramHero
          data={localData.hero || { backgroundImage: '', title: 'New Mom Program', description: '', buttonText: 'Book a Consultation' }}
          onDataChange={(newData) => updateLocalData('hero', newData)}
        />
      </EditableSection>

      {/* New Mom Program Main Section */}
      <EditableSection
        onSave={() => handleSave('main')}
        saving={saving.main}
        sectionName="New Mom Program Main Content"
      >
        <EditableNewMomProgramMain
          data={localData.main || { mainTitle: 'All you need to know..', leftCards: [], centerImage: '', centerImageAlt: '', rightCards: [] }}
          onDataChange={(newData) => updateLocalData('main', newData)}
        />
      </EditableSection>
    </div>
  );
};

export default NewMomProgramCMS;

