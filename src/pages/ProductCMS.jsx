import React, { useState, useEffect } from 'react';
import { getSection, updateSection } from '../services/api';
import EditableSection from '../components/common/EditableSection';
import EditableProductHero from '../components/product/EditableProductHero';
import EditableProductMain from '../components/product/EditableProductMain';

/**
 * ProductCMS - CMS version for Product page sections
 */
const ProductCMS = () => {
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
        getSection('product', 'hero'),
        getSection('product', 'main'),
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
            title: 'Find the Right Supplements for Your Lifestyle',
            description: 'Explore a curated range of wellness products designed to boost energy, immunity, and overall health.',
            buttonText: 'Book a Consultation',
          },
        main:
          main || {
            title: 'Discover Your Nutrition Essentials',
            products: [
              {
                label: 'Product 1',
                title: 'Probiotic Daily Capsules',
                description: 'A powerful blend of beneficial bacteria strains that help restore gut flora balance. Promotes healthy digestion, supports immune function, and reduces occasional bloating. Perfect for daily use to maintain overall gut wellness.',
                price: '$29.99',
                image: '',
                imageAlt: 'Probiotic Daily Capsules',
              },
              {
                label: 'Product 2',
                title: 'Digestive Enzyme Complex',
                description: 'Contains a carefully formulated mix of enzymes to break down proteins, fats, and carbohydrates efficiently. Helps reduce indigestion, gas, and bloating while improving nutrient absorption for better energy levels.',
                price: '$29.99',
                image: '',
                imageAlt: 'Digestive Enzyme Complex',
              },
              {
                label: 'Product 3',
                title: 'Prebiotic Fiber Powder',
                description: 'A high-quality prebiotic fiber that nourishes beneficial gut bacteria, supporting a healthy digestive system. Helps regulate bowel movements, reduce bloating, and promote long-term gut health. Can be mixed easily into smoothies or water.',
                price: '$29.99',
                image: '',
                imageAlt: 'Prebiotic Fiber Powder',
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
        hero: 'hero',
        main: 'main',
      };

      const dataToSave = localData[sectionKey];
      const updated = await updateSection('product', routeMap[sectionKey], dataToSave);

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
      {/* Product Hero Section */}
      <EditableSection
        onSave={() => handleSave('hero')}
        saving={saving.hero}
        sectionName="Product Hero"
      >
        <EditableProductHero
          data={localData.hero || { 
            backgroundImage: '', 
            title: 'Find the Right Supplements for Your Lifestyle', 
            description: 'Explore a curated range of wellness products designed to boost energy, immunity, and overall health.',
            buttonText: 'Book a Consultation' 
          }}
          onDataChange={(newData) => updateLocalData('hero', newData)}
        />
      </EditableSection>

      {/* Product Main Section */}
      <EditableSection
        onSave={() => handleSave('main')}
        saving={saving.main}
        sectionName="Product Main Content"
      >
        <EditableProductMain
          data={localData.main || {
            title: 'Discover Your Nutrition Essentials',
            products: [],
          }}
          onDataChange={(newData) => updateLocalData('main', newData)}
        />
      </EditableSection>
    </div>
  );
};

export default ProductCMS;

