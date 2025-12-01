import React from 'react';
import EditableText from '../common/EditableText';
import EditableImage from '../common/EditableImage';

/**
 * EditableProductMain - CMS wrapper for ProductMain component
 */
const EditableProductMain = ({ data, onDataChange }) => {
  const safeData = data || {
    title: 'Discover Your Nutrition Essentials',
    products: [],
  };

  const title = safeData.title || 'Discover Your Nutrition Essentials';
  const products = safeData.products || [];

  const updateTitle = (value) => {
    onDataChange({ ...safeData, title: value });
  };

  const updateProduct = (index, field, value) => {
    const updated = [...products];
    updated[index] = { ...updated[index], [field]: value };
    onDataChange({ ...safeData, products: updated });
  };

  const addNewProduct = () => {
    const newProduct = {
      label: `Product ${products.length + 1}`,
      title: 'New Product',
      description: '',
      price: '$29.99',
      image: '',
      imageAlt: '',
    };
    onDataChange({ ...safeData, products: [...products, newProduct] });
  };

  const removeProduct = (index) => {
    const updated = products.filter((_, i) => i !== index);
    onDataChange({ ...safeData, products: updated });
  };

  return (
    <div className="bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16">
        {/* Main Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-[Raleway] font-semibold text-center mb-12 md:mb-16 text-gray-800 border-2 border-blue-200 p-4 rounded-lg">
          <EditableText
            value={title}
            onChange={updateTitle}
            tag="span"
            placeholder="Discover Your Nutrition Essentials"
          />
        </h2>

        {/* Products List */}
        <div className="space-y-8 md:space-y-12">
          {products.map((product, index) => {
            const isImageLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className="bg-[#FEF6F6] rounded-2xl shadow-lg overflow-hidden p-6 md:p-8 lg:p-10 border-2 border-blue-200"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center ${
                    isImageLeft ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Image */}
                  <div className={`${isImageLeft ? 'lg:order-1' : 'lg:order-2'} relative`}>
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.imageAlt || product.title}
                        className="w-full h-auto rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-full h-[300px] md:h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                    <EditableImage
                      imageUrl={product.image}
                      onChange={(url) => updateProduct(index, 'image', url)}
                      className="absolute inset-0 w-full h-full"
                      isBackground={true}
                    />
                  </div>

                  {/* Content */}
                  <div className={`${isImageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                    {/* Product Label */}
                    <div className="mb-2">
                      <EditableText
                        value={product.label || ''}
                        onChange={(value) => updateProduct(index, 'label', value)}
                        tag="span"
                        className="text-sm md:text-base font-[Raleway] text-gray-600"
                        placeholder="Product 1"
                      />
                    </div>

                    {/* Product Title */}
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-[Raleway] font-semibold mb-4 text-[#EC7979]">
                      <EditableText
                        value={product.title || ''}
                        onChange={(value) => updateProduct(index, 'title', value)}
                        tag="span"
                        placeholder="Product Title"
                      />
                    </h3>

                    {/* Description */}
                    <p className="text-base md:text-lg font-[Raleway] text-gray-700 leading-relaxed mb-6">
                      <EditableText
                        value={product.description || ''}
                        onChange={(value) => updateProduct(index, 'description', value)}
                        tag="span"
                        multiline={true}
                        placeholder="Enter product description..."
                      />
                    </p>

                    {/* Price */}
                    <div className="mb-6">
                      <span className="text-base md:text-lg font-[Raleway] text-gray-700">
                        Price:{' '}
                      </span>
                      <span className="text-lg md:text-xl font-[Raleway] font-semibold text-green-600">
                        <EditableText
                          value={product.price || ''}
                          onChange={(value) => updateProduct(index, 'price', value)}
                          tag="span"
                          placeholder="$29.99"
                        />
                      </span>
                    </div>

                    {/* View Details Button */}
                    <button className="bg-[#EC7979] text-white py-3 px-8 rounded-lg cursor-pointer hover:bg-[#d86565] transition-colors font-medium text-base md:text-lg font-[Raleway]">
                      View Details
                    </button>
                  </div>
                </div>

                {/* Remove Product Button */}
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <button
                    onClick={() => removeProduct(index)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Remove Product
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add New Product Button */}
        <div className="text-center mt-8">
          <button
            onClick={addNewProduct}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            + Add New Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditableProductMain;

