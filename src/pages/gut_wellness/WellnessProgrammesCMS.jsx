import React, { useState, useEffect } from 'react';
import { getSection, updateSection } from '../../services/api';
import EditableSection from '../../components/common/EditableSection';
import EditableWellnessProgrameHero from '../../components/gut_wellness/wellness_programmes/EditableWellnessProgrameHero';
import EditableWellnessProgrammesMain from '../../components/gut_wellness/wellness_programmes/EditableWellnessProgramMain';


/**
 * WellnessProgrammesCMS - CMS page for Wellness Programmes
 */
const WellnessProgrammesCMS = () => {
  const [sections, setSections] = useState({
    hero: null,
    main: null,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({});
  const [localData, setLocalData] = useState({});

  useEffect(() => {
    loadAllSections();
  }, []);

  const loadAllSections = async () => {
    try {
      const results = await Promise.allSettled([
        getSection('gut-wellness', 'wellness-programmes/hero'),
        getSection('gut-wellness', 'wellness-programmes/main'),
      ]);

      const [hero, main] = results.map((r) =>
        r.status === 'fulfilled' ? r.value : null
      );

      setSections({
        hero,
        main,
      });

      setLocalData({
        hero: hero || {
          backgroundImage: '',
          title: 'Wellness Programmes',
          description: '',
          buttonText: 'Book a Consultation',
        },
        main: main || {
          mainTitle: 'All you need to know..',
          services: [],
        },
      });

      setLoading(false);
    } catch (error) {
      console.error('Error loading sections:', error);
      setLoading(false);
    }
  };

  const handleSave = async (sectionKey, showAlert = true) => {
    setSaving((prev) => ({ ...prev, [sectionKey]: true }));

    try {
      const routeMap = {
        hero: 'wellness-programmes/hero',
        main: 'wellness-programmes/main',
      };

      const dataToSave = localData[sectionKey];
      const updated = await updateSection(
        'gut-wellness',
        routeMap[sectionKey],
        dataToSave
      );

      setSections((prev) => ({ ...prev, [sectionKey]: updated }));
      setLocalData((prev) => ({ ...prev, [sectionKey]: { ...updated } }));

      if (showAlert) alert('✅ Saved successfully!');
      return true;
    } catch (error) {
      console.error('Error saving:', error);
      if (showAlert) alert('❌ Failed to save. Please try again.');
      return false;
    } finally {
      setSaving((prev) => ({ ...prev, [sectionKey]: false }));
    }
  };

  const updateLocalData = (sectionKey, newData) => {
    setLocalData(prev => ({
      ...prev,
      [sectionKey]:
        typeof newData === 'function'
          ? newData(prev[sectionKey])
          : newData,
    }));
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
      {/* HERO */}
      <EditableSection
        onSave={() => handleSave('hero')}
        saving={saving.hero}
        sectionName="Wellness Programmes Hero"
      >
        <EditableWellnessProgrameHero
          data={localData.hero}
          onDataChange={(data) => updateLocalData('hero', data)}
        />
      </EditableSection>

      {/* MAIN */}
      <EditableSection
        onSave={() => handleSave('main')}
        saving={saving.main}
        sectionName="Wellness Programmes Main Content"
      >
        <EditableWellnessProgrammesMain
          data={localData.main}
          onDataChange={(data) => updateLocalData('main', data)}
          onSave={(data) => handleSave('main', false)}
        />
      </EditableSection>
    </div>
  );
};

export default WellnessProgrammesCMS;
