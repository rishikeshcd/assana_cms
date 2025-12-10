import React, { useState, useEffect } from 'react';
import { getSection, updateSection } from '../../services/api';
import EditableSection from '../../components/common/EditableSection';
import EditableColonRectalCancerHero from '../../components/colorectal_clinic/colon_rectal_cancer/EditableColonRectalCancerHero';
import EditableColonRectalCancerMain from '../../components/colorectal_clinic/colon_rectal_cancer/EditableColonRectalCancerMain';

/**
 * ColonRectalCancerCMS - CMS version for Colon Rectal Cancer page sections
 */
const ColonRectalCancerCMS = () => {
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
        getSection('colon-rectal-cancer', 'hero'),
        getSection('colon-rectal-cancer', 'main'),
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
            title: 'Colon & Rectal Cancer',
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
      const updated = await updateSection('colon-rectal-cancer', routeMap[sectionKey], dataToSave);

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
      {/* Colon Rectal Cancer Hero Section */}
      <EditableSection
        onSave={() => handleSave('hero')}
        saving={saving.hero}
        sectionName="Colon Rectal Cancer Hero"
      >
        <EditableColonRectalCancerHero
          data={localData.hero || { backgroundImage: '', title: 'Colon & Rectal Cancer', description: '', buttonText: 'Book Consultation' }}
          onDataChange={(newData) => updateLocalData('hero', newData)}
        />
      </EditableSection>

      {/* Colon Rectal Cancer Main Section */}
      <EditableSection
        onSave={() => handleSave('main')}
        saving={saving.main}
        sectionName="Colon Rectal Cancer Main Content"
      >
        <EditableColonRectalCancerMain
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

export default ColonRectalCancerCMS;


