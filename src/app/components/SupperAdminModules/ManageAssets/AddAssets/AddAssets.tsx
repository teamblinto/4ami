"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { getAuthHeaders } from '@/lib/config';

interface EquipmentPayload {
  industryId?: number;
  assetClassId?: number;
  makeId?: number;
  modelId?: number;
  industryName?: string;
  assetClassName?: string;
  makeName?: string;
  modelName?: string;
  yearOfManufacture?: number;
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
  specialTransportationConsideration?: string;
  value?: number;
  residualValue?: number;
  status?: string;
  metadata?: {
    notes?: string;
  };
  projectId?: string | null;
}

export default function AddAssets() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    type: 'equipment',
    description: '',
    value: '',
    residualValue: '',
    status: '',
    industry: '',
    industryTag: '',
    assetType: '',
    assetTypeTag: '',
    make: '',
    makeTag: '',
    model: '',
    modelTag: '',
    length: '',
    width: '',
    height: '',
    weight: '',
    yearOfManufacture: '',
    specialTransportationConsideration: '',
    projectId: ''
  });

  const [loading, setLoading] = useState(false);
  const [isAddingIndustry, setIsAddingIndustry] = useState(false);
  const [isAddingAssetType, setIsAddingAssetType] = useState(false);
  const [isAddingMake, setIsAddingMake] = useState(false);
  const [isAddingModel, setIsAddingModel] = useState(false);
  const [industries, setIndustries] = useState<Array<{ id: number; name: string; description: string }>>([]);
  const [assetClasses, setAssetClasses] = useState<Array<{
    id: number;
    name: string;
    description: string;
    industryId?: number;
    industry?: { id: number; name: string; description: string };
  }>>([]);
  const [makes, setMakes] = useState<Array<{
    id: number;
    name: string;
    description: string;
    industryId?: number;
    assetClassId?: number;
    industry?: { id: number; name: string; description: string };
    assetClass?: { id: number; name: string; description: string };
  }>>([]);
  const [models, setModels] = useState<Array<{
    id: number;
    name: string;
    description: string;
    industryId?: number;
    assetClassId?: number;
    makeId?: number;
    industry?: { id: number; name: string; description: string };
    assetClass?: { id: number; name: string; description: string };
    make?: { id: number; name: string; description: string };
  }>>([]);
  const [showIndustrySuggestions, setShowIndustrySuggestions] = useState(false);
  const [showAssetTypeSuggestions, setShowAssetTypeSuggestions] = useState(false);
  const [showMakeSuggestions, setShowMakeSuggestions] = useState(false);
  const [showModelSuggestions, setShowModelSuggestions] = useState(false);
  const [filteredIndustries, setFilteredIndustries] = useState<Array<{ id: number; name: string; description: string }>>([]);
  const [filteredAssetClasses, setFilteredAssetClasses] = useState<Array<{ id: number; name: string; description: string }>>([]);
  const [filteredMakes, setFilteredMakes] = useState<Array<{
    id: number;
    name: string;
    description: string;
    industryId?: number;
    assetClassId?: number;
  }>>([]);
  const [filteredModels, setFilteredModels] = useState<Array<{
    id: number;
    name: string;
    description: string;
    industryId?: number;
    assetClassId?: number;
    makeId?: number;
  }>>([]);
  const industryInputRef = useRef<HTMLInputElement>(null);
  const assetTypeInputRef = useRef<HTMLInputElement>(null);
  const makeInputRef = useRef<HTMLInputElement>(null);
  const modelInputRef = useRef<HTMLInputElement>(null);
  const industrySuggestionsRef = useRef<HTMLDivElement>(null);
  const assetTypeSuggestionsRef = useRef<HTMLDivElement>(null);
  const makeSuggestionsRef = useRef<HTMLDivElement>(null);
  const modelSuggestionsRef = useRef<HTMLDivElement>(null);

  // Fetch industries on component mount
  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) return;

        const response = await fetch('/api/industries', {
          method: 'GET',
          headers: getAuthHeaders(authToken)
        });

        if (response.ok) {
          const data = await response.json();
          const industriesList = Array.isArray(data) ? data : (data.data || []);
          setIndustries(industriesList);
          setFilteredIndustries(industriesList);
        }
      } catch (error) {
        console.error('Error fetching industries:', error);
      }
    };

    fetchIndustries();
  }, []);

  // Fetch asset classes on component mount
  useEffect(() => {
    const fetchAssetClasses = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) return;

        const response = await fetch('/api/asset-classes', {
          method: 'GET',
          headers: getAuthHeaders(authToken)
        });

        if (response.ok) {
          const data = await response.json();
          const assetClassesList = Array.isArray(data) ? data : (data.data || []);
          setAssetClasses(assetClassesList);
          setFilteredAssetClasses(assetClassesList);
        }
      } catch (error) {
        console.error('Error fetching asset classes:', error);
      }
    };

    fetchAssetClasses();
  }, []);

  // Fetch makes on component mount
  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) return;

        const response = await fetch('/api/makes', {
          method: 'GET',
          headers: getAuthHeaders(authToken)
        });

        if (response.ok) {
          const data = await response.json();
          const makesList = Array.isArray(data) ? data : (data.data || []);
          setMakes(makesList);
          setFilteredMakes(makesList);
        }
      } catch (error) {
        console.error('Error fetching makes:', error);
      }
    };

    fetchMakes();
  }, []);

  // Fetch models on component mount
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) return;

        const response = await fetch('/api/models', {
          method: 'GET',
          headers: getAuthHeaders(authToken)
        });

        if (response.ok) {
          const data = await response.json();
          const modelsList = Array.isArray(data) ? data : (data.data || []);
          setModels(modelsList);
          setFilteredModels(modelsList);
        }
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };

    fetchModels();
  }, []);

  // Filter industries based on input
  useEffect(() => {
    if (formData.industry.trim()) {
      const filtered = industries.filter(industry =>
        industry.name.toLowerCase().includes(formData.industry.toLowerCase())
      );
      setFilteredIndustries(filtered);
      setShowIndustrySuggestions(true);
    } else {
      setFilteredIndustries(industries);
      setShowIndustrySuggestions(false);
    }
  }, [formData.industry, industries]);

  // Filter asset classes based on selected industry and input
  useEffect(() => {
    let filtered = assetClasses;

    // First, filter by selected industry if one is selected
    if (formData.industryTag) {
      const selectedIndustry = industries.find(ind => ind.name === formData.industryTag);
      if (selectedIndustry) {
        // Filter asset classes that belong to the selected industry
        filtered = assetClasses.filter(assetClass => {
          // Check if asset class has industry object with matching name
          if (assetClass.industry) {
            return assetClass.industry.name.toLowerCase() === formData.industryTag.toLowerCase();
          }
          // Fallback: check by industryId
          if (assetClass.industryId) {
            return assetClass.industryId === selectedIndustry.id;
          }
          return false;
        });
      }
    }

    // Then, filter by input text if there's any
    if (formData.assetType.trim()) {
      filtered = filtered.filter(assetClass =>
        assetClass.name.toLowerCase().includes(formData.assetType.toLowerCase())
      );
      setFilteredAssetClasses(filtered);
      setShowAssetTypeSuggestions(true);
    } else {
      setFilteredAssetClasses(filtered);
      // Don't auto-open suggestions when industry changes - only when user types or focuses
      setShowAssetTypeSuggestions(false);
    }
  }, [formData.assetType, formData.industryTag, assetClasses, industries]);

  // Filter makes based on selected asset class and input
  useEffect(() => {
    let filtered = makes;

    // First, filter by selected asset class if one is selected
    if (formData.assetTypeTag) {
      const selectedAssetClass = assetClasses.find(ac => ac.name === formData.assetTypeTag);
      if (selectedAssetClass) {
        // Filter makes that belong to the selected asset class
        filtered = makes.filter(make => {
          // Check if make has assetClass object with matching name
          if (make.assetClass) {
            return make.assetClass.name.toLowerCase() === formData.assetTypeTag.toLowerCase();
          }
          // Fallback: check by assetClassId
          if (make.assetClassId && selectedAssetClass.id) {
            return make.assetClassId === selectedAssetClass.id;
          }
          return false;
        });
      }
    }

    // Then, filter by input text if there's any
    if (formData.make.trim()) {
      filtered = filtered.filter(make =>
        make.name.toLowerCase().includes(formData.make.toLowerCase())
      );
      setFilteredMakes(filtered);
      setShowMakeSuggestions(true);
    } else {
      setFilteredMakes(filtered);
      // Don't auto-open suggestions when asset class changes - only when user types or focuses
      setShowMakeSuggestions(false);
    }
  }, [formData.make, formData.assetTypeTag, makes, assetClasses]);

  // Filter models based on selected make and input
  useEffect(() => {
    let filtered = models;

    // First, filter by selected make if one is selected
    if (formData.makeTag) {
      const selectedMake = makes.find(m => m.name === formData.makeTag);
      if (selectedMake) {
        // Filter models that belong to the selected make
        filtered = models.filter(model => {
          // Check if model has make object with matching name
          if (model.make) {
            return model.make.name.toLowerCase() === formData.makeTag.toLowerCase();
          }
          // Fallback: check by makeId
          if (model.makeId && selectedMake.id) {
            return model.makeId === selectedMake.id;
          }
          return false;
        });
      }
    }

    // Then, filter by input text if there's any
    if (formData.model.trim()) {
      filtered = filtered.filter(model =>
        model.name.toLowerCase().includes(formData.model.toLowerCase())
      );
      setFilteredModels(filtered);
      setShowModelSuggestions(true);
    } else {
      setFilteredModels(filtered);
      // Don't auto-open suggestions when make changes - only when user types or focuses
      setShowModelSuggestions(false);
    }
  }, [formData.model, formData.makeTag, models, makes]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close industry suggestions
      if (
        industrySuggestionsRef.current &&
        !industrySuggestionsRef.current.contains(event.target as Node) &&
        industryInputRef.current &&
        !industryInputRef.current.contains(event.target as Node)
      ) {
        setShowIndustrySuggestions(false);
      }

      // Close asset type suggestions
      if (
        assetTypeSuggestionsRef.current &&
        !assetTypeSuggestionsRef.current.contains(event.target as Node) &&
        assetTypeInputRef.current &&
        !assetTypeInputRef.current.contains(event.target as Node)
      ) {
        setShowAssetTypeSuggestions(false);
      }

      // Close make suggestions
      if (
        makeSuggestionsRef.current &&
        !makeSuggestionsRef.current.contains(event.target as Node) &&
        makeInputRef.current &&
        !makeInputRef.current.contains(event.target as Node)
      ) {
        setShowMakeSuggestions(false);
      }

      // Close model suggestions
      if (
        modelSuggestionsRef.current &&
        !modelSuggestionsRef.current.contains(event.target as Node) &&
        modelInputRef.current &&
        !modelInputRef.current.contains(event.target as Node)
      ) {
        setShowModelSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectIndustry = (industryName: string) => {
    setFormData(prev => ({
      ...prev,
      industry: industryName,
      industryTag: industryName
    }));
    setShowIndustrySuggestions(false);
  };

  const handleSelectAssetType = (assetTypeName: string) => {
    setFormData(prev => ({
      ...prev,
      assetType: assetTypeName,
      assetTypeTag: assetTypeName
    }));
    setShowAssetTypeSuggestions(false);
  };

  const handleSelectMake = (makeName: string) => {
    setFormData(prev => ({
      ...prev,
      make: makeName,
      makeTag: makeName
    }));
    setShowMakeSuggestions(false);
  };

  const handleSelectModel = (modelName: string) => {
    setFormData(prev => ({
      ...prev,
      model: modelName,
      modelTag: modelName
    }));
    setShowModelSuggestions(false);
  };

  // Clear asset type when industry changes
  useEffect(() => {
    if (formData.industryTag) {
      // When industry is selected, clear asset type tag if it doesn't match the new industry
      if (formData.assetTypeTag) {
        const selectedIndustry = industries.find(ind => ind.name === formData.industryTag);
        if (selectedIndustry) {
          const currentAssetClass = assetClasses.find(ac => ac.name === formData.assetTypeTag);
          if (currentAssetClass) {
            const matchesIndustry =
              (currentAssetClass.industry && currentAssetClass.industry.name.toLowerCase() === formData.industryTag.toLowerCase()) ||
              (currentAssetClass.industryId === selectedIndustry.id);

            if (!matchesIndustry) {
              setFormData(prev => ({
                ...prev,
                assetTypeTag: '',
                assetType: '',
                makeTag: '',
                make: ''
              }));
            }
          }
        }
      }
    } else {
      // If no industry is selected, clear asset type tag and make
      if (formData.assetTypeTag || formData.makeTag) {
        setFormData(prev => ({
          ...prev,
          assetTypeTag: '',
          assetType: '',
          makeTag: '',
          make: ''
        }));
      }
    }
  }, [formData.industryTag, industries, assetClasses, formData.assetTypeTag, formData.makeTag]);

  // Clear make when asset class changes
  useEffect(() => {
    if (formData.assetTypeTag) {
      // When asset class is selected, clear make tag if it doesn't match the new asset class
      if (formData.makeTag) {
        const selectedAssetClass = assetClasses.find(ac => ac.name === formData.assetTypeTag);
        if (selectedAssetClass) {
          const currentMake = makes.find(m => m.name === formData.makeTag);
          if (currentMake) {
            const matchesAssetClass =
              (currentMake.assetClass && currentMake.assetClass.name.toLowerCase() === formData.assetTypeTag.toLowerCase()) ||
              (currentMake.assetClassId === selectedAssetClass.id);

            if (!matchesAssetClass) {
              setFormData(prev => ({
                ...prev,
                makeTag: '',
                make: ''
              }));
            }
          }
        }
      }
    } else {
      // If no asset class is selected, clear make tag
      if (formData.makeTag) {
        setFormData(prev => ({
          ...prev,
          makeTag: '',
          make: ''
        }));
      }
    }
  }, [formData.assetTypeTag, assetClasses, makes, formData.makeTag]);

  // Clear model when make changes
  useEffect(() => {
    if (formData.makeTag) {
      // When make is selected, clear model tag if it doesn't match the new make
      if (formData.modelTag) {
        const selectedMake = makes.find(m => m.name === formData.makeTag);
        if (selectedMake) {
          const currentModel = models.find(mod => mod.name === formData.modelTag);
          if (currentModel) {
            const matchesMake =
              (currentModel.make && currentModel.make.name.toLowerCase() === formData.makeTag.toLowerCase()) ||
              (currentModel.makeId === selectedMake.id);

            if (!matchesMake) {
              setFormData(prev => ({
                ...prev,
                modelTag: '',
                model: ''
              }));
            }
          }
        }
      }
    } else {
      // If no make is selected, clear model tag
      if (formData.modelTag) {
        setFormData(prev => ({
          ...prev,
          modelTag: '',
          model: ''
        }));
      }
    }
  }, [formData.makeTag, makes, models, formData.modelTag]);

  const handleAddAsIndustry = async () => {
    const industryName = formData.industry.trim();
    if (!industryName) {
      toast.error('Please enter an industry name');
      return;
    }

    setIsAddingIndustry(true);
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('Authentication token not found. Please log in again.');
      }

      // Prepare the industry data
      const industryData = {
        name: industryName,
        description: `${industryName} industry assets`
      };

      const response = await fetch('/api/industries', {
        method: 'POST',
        headers: getAuthHeaders(authToken),
        body: JSON.stringify(industryData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create industry');
      }

      const result = await response.json();
      console.log('Industry created successfully:', result);

      // Add the new industry to the list
      setIndustries(prev => [...prev, result]);

      // Update form data with the created industry
      setFormData(prev => ({
        ...prev,
        industryTag: result.name || industryName,
        industry: ''
      }));

      toast.success('Industry added successfully!');
    } catch (error) {
      console.error('Error creating industry:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create industry');
    } finally {
      setIsAddingIndustry(false);
    }
  };

  const handleAddAsAssetType = async () => {
    const assetTypeName = formData.assetType.trim();
    if (!assetTypeName) {
      toast.error('Please enter an asset type name');
      return;
    }

    setIsAddingAssetType(true);
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('Authentication token not found. Please log in again.');
      }

      // Prepare the asset class data
      // Note: Asset classes typically require industryId, but we'll send what we can
      const assetClassData: {
        name: string;
        description: string;
        industryId?: number;
      } = {
        name: assetTypeName,
        description: `${assetTypeName} asset class`
      };

      // If we have an industry selected, include it
      if (formData.industryTag) {
        const selectedIndustry = industries.find(ind => ind.name === formData.industryTag);
        if (selectedIndustry) {
          assetClassData.industryId = selectedIndustry.id;
        }
      }

      const response = await fetch('/api/asset-classes', {
        method: 'POST',
        headers: getAuthHeaders(authToken),
        body: JSON.stringify(assetClassData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create asset class');
      }

      const result = await response.json();
      console.log('Asset class created successfully:', result);

      // Add the new asset class to the list
      setAssetClasses(prev => [...prev, result]);

      // Update form data with the created asset type
      setFormData(prev => ({
        ...prev,
        assetTypeTag: result.name || assetTypeName,
        assetType: ''
      }));

      toast.success('Asset type added successfully!');
    } catch (error) {
      console.error('Error creating asset class:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create asset type');
    } finally {
      setIsAddingAssetType(false);
    }
  };

  const handleAddAsMake = async () => {
    const makeName = formData.make.trim();
    if (!makeName) {
      toast.error('Please enter a make name');
      return;
    }

    // Check if industry and asset class are selected
    if (!formData.industryTag || !formData.assetTypeTag) {
      toast.error('Please select an industry and asset type first');
      return;
    }

    setIsAddingMake(true);
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('Authentication token not found. Please log in again.');
      }

      // Find selected industry and asset class
      const selectedIndustry = industries.find(ind => ind.name === formData.industryTag);
      const selectedAssetClass = assetClasses.find(ac => ac.name === formData.assetTypeTag);

      if (!selectedIndustry || !selectedAssetClass) {
        throw new Error('Selected industry or asset class not found');
      }

      // Prepare the make data
      const makeData: {
        name: string;
        description: string;
        industryId: number;
        assetClassId: number;
      } = {
        name: makeName,
        description: `${makeName} make`,
        industryId: selectedIndustry.id,
        assetClassId: selectedAssetClass.id
      };

      const response = await fetch('/api/makes', {
        method: 'POST',
        headers: getAuthHeaders(authToken),
        body: JSON.stringify(makeData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create make');
      }

      const result = await response.json();
      console.log('Make created successfully:', result);

      // Add the new make to the list
      setMakes(prev => [...prev, result]);

      // Update form data with the created make
      setFormData(prev => ({
        ...prev,
        makeTag: result.name || makeName,
        make: ''
      }));

      toast.success('Make added successfully!');
    } catch (error) {
      console.error('Error creating make:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create make');
    } finally {
      setIsAddingMake(false);
    }
  };

  const handleAddAsModel = async () => {
    const modelName = formData.model.trim();
    if (!modelName) {
      toast.error('Please enter a model name');
      return;
    }

    // Check if industry, asset class, and make are selected
    if (!formData.industryTag || !formData.assetTypeTag || !formData.makeTag) {
      toast.error('Please select an industry, asset type, and make first');
      return;
    }

    setIsAddingModel(true);
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('Authentication token not found. Please log in again.');
      }

      // Find selected industry, asset class, and make
      const selectedIndustry = industries.find(ind => ind.name === formData.industryTag);
      const selectedAssetClass = assetClasses.find(ac => ac.name === formData.assetTypeTag);
      const selectedMake = makes.find(m => m.name === formData.makeTag);

      if (!selectedIndustry || !selectedAssetClass || !selectedMake) {
        throw new Error('Selected industry, asset class, or make not found');
      }

      // Prepare the model data
      const modelData: {
        name: string;
        description: string;
        industryId: number;
        assetClassId: number;
        makeId: number;
      } = {
        name: modelName,
        description: `${modelName} model`,
        industryId: selectedIndustry.id,
        assetClassId: selectedAssetClass.id,
        makeId: selectedMake.id
      };

      const response = await fetch('/api/models', {
        method: 'POST',
        headers: getAuthHeaders(authToken),
        body: JSON.stringify(modelData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create model');
      }

      const result = await response.json();
      console.log('Model created successfully:', result);

      // Add the new model to the list
      setModels(prev => [...prev, result]);

      // Update form data with the created model
      setFormData(prev => ({
        ...prev,
        modelTag: result.name || modelName,
        model: ''
      }));

      toast.success('Model added successfully!');
    } catch (error) {
      console.error('Error creating model:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create model');
    } finally {
      setIsAddingModel(false);
    }
  };

  const handleRemoveIndustryTag = () => {
    setFormData(prev => ({
      ...prev,
      industryTag: '',
      industry: '',
      assetTypeTag: '',
      assetType: ''
    }));
  };

  const handleRemoveAssetTypeTag = () => {
    setFormData(prev => ({
      ...prev,
      assetTypeTag: '',
      assetType: ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const authToken = localStorage.getItem('authToken');
      console.log('Auth token found:', authToken ? 'Yes' : 'No');
      console.log('Auth token value:', authToken);

      if (!authToken) {
        throw new Error('Authentication token not found. Please log in again.');
      }

      // Get selected industry, asset class, make, and model with their IDs
      const selectedIndustry = formData.industryTag
        ? industries.find(ind => ind.name === formData.industryTag)
        : null;

      const selectedAssetClass = formData.assetTypeTag
        ? assetClasses.find(ac => ac.name === formData.assetTypeTag)
        : null;

      const selectedMake = formData.makeTag
        ? makes.find(m => m.name === formData.makeTag)
        : null;

      const selectedModel = formData.modelTag
        ? models.find(mod => mod.name === formData.modelTag)
        : null;

      // Prepare the data according to the API structure
      const equipmentData: EquipmentPayload = {};

      // Add IDs if available
      if (selectedIndustry) {
        equipmentData.industryId = selectedIndustry.id;
        equipmentData.industryName = selectedIndustry.name;
      }
      if (selectedAssetClass) {
        equipmentData.assetClassId = selectedAssetClass.id;
        equipmentData.assetClassName = selectedAssetClass.name;
      }
      if (selectedMake) {
        equipmentData.makeId = selectedMake.id;
        equipmentData.makeName = selectedMake.name;
      }
      if (selectedModel) {
        equipmentData.modelId = selectedModel.id;
        equipmentData.modelName = selectedModel.name;
      }

      // Add numeric fields
      if (formData.yearOfManufacture) {
        equipmentData.yearOfManufacture = parseInt(formData.yearOfManufacture) || undefined;
      }
      if (formData.length) {
        equipmentData.length = parseFloat(formData.length) || undefined;
      }
      if (formData.width) {
        equipmentData.width = parseFloat(formData.width) || undefined;
      }
      if (formData.height) {
        equipmentData.height = parseFloat(formData.height) || undefined;
      }
      if (formData.weight) {
        equipmentData.weight = parseFloat(formData.weight) || undefined;
      }
      if (formData.value) {
        equipmentData.value = parseFloat(formData.value) || undefined;
      }
      if (formData.residualValue) {
        equipmentData.residualValue = parseFloat(formData.residualValue) || undefined;
      }

      // Add text fields
      if (formData.specialTransportationConsideration) {
        equipmentData.specialTransportationConsideration = formData.specialTransportationConsideration;
      }
      if (formData.status) {
        equipmentData.status = formData.status;
      }

      // Add metadata if description exists
      if (formData.description) {
        equipmentData.metadata = {
          notes: formData.description
        };
      }

      // Add projectId
      if (formData.projectId) {
        equipmentData.projectId = formData.projectId;
      } else {
        equipmentData.projectId = null;
      }

      console.log('Submitting equipment data:', equipmentData);

      const headers = getAuthHeaders(authToken);
      console.log('Request headers:', headers);

      const response = await fetch('/api/equipments', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(equipmentData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create equipment');
      }

      const result = await response.json();
      console.log('Equipment created successfully:', result);

      toast.success('Equipment created successfully!');

      // Redirect to manage-assets page after successful creation
      router.push('/dashboard/manage-assets');
    } catch (error) {
      console.error('Error creating equipment:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create equipment');
    } finally {
      setLoading(false);
    }
  };

  const handleDiscardChanges = () => {
    setFormData({
      name: '',
      type: 'equipment',
      description: '',
      value: '',
      residualValue: '',
      status: '',
      industry: '',
      industryTag: '',
      assetType: '',
      assetTypeTag: '',
      make: '',
      makeTag: '',
      model: '',
      modelTag: '',
      length: '',
      width: '',
      height: '',
      weight: '',
      yearOfManufacture: '',
      specialTransportationConsideration: '',
      projectId: ''
    });
  };

  return (
    <div className="max-w-6xl ">


      {/* Form Container */}
      <div className="bg-white  rounded-[8px] p-8">
        {/* Top Right Button */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => router.push('/dashboard/manage-assets/import')}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded-[8px] text-sm font-medium flex items-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Bulk Import
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Industry */}
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-[#343A40] mb-2">
                  Industry
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <div className="w-full min-h-[42px] px-3 py-2 border border-[#CED4DA] text-[#343A40]  rounded-md flex items-center gap-2 flex-wrap">
                      {formData.industryTag && (
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-gray-200 rounded-md text-sm">
                          <span>{formData.industryTag}</span>
                          <button
                            type="button"
                            onClick={handleRemoveIndustryTag}
                            className="text-gray-500 hover:text-gray-700 ml-1"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )}
                      {!formData.industryTag && (
                        <input
                          autoComplete="off"
                          ref={industryInputRef}
                          type="text"
                          id="industry"
                          name="industry"
                          value={formData.industry}
                          onChange={handleInputChange}
                          onFocus={() => {
                            if (formData.industry.trim() && filteredIndustries.length > 0) {
                              setShowIndustrySuggestions(true);
                            }
                          }}
                          className="flex-1 min-w-[120px] bg-transparent focus:outline-none placeholder:text-[#6C757D]"
                          placeholder="Type to search or add new industry"
                        />
                      )}
                    </div>
                    {showIndustrySuggestions && filteredIndustries.length > 0 && !formData.industryTag && (
                      <div
                        ref={industrySuggestionsRef}
                        className="absolute z-50 w-full mt-1 bg-white border border-[#CED4DA] rounded-md shadow-lg max-h-60 overflow-auto"
                      >
                        {filteredIndustries.map((industry) => (
                          <button
                            key={industry.id}
                            type="button"
                            onClick={() => handleSelectIndustry(industry.name)}
                            className="w-full text-left px-3 py-2 hover:bg-red-50 text-[#343A40] text-sm transition-colors"
                          >
                            {industry.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={handleAddAsIndustry}
                    disabled={isAddingIndustry || !formData.industry.trim() || !!formData.industryTag}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    {isAddingIndustry ? 'Adding...' : '+ Add as Industry'}
                  </button>
                </div>
              </div>

              {/* Make */}
              <div>
                <label htmlFor="make" className="block text-sm font-medium text-[#343A40] mb-2">
                  Make
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <div className={`w-full min-h-[42px] px-3 py-2 border border-[#CED4DA] text-[#343A40] bg-[#FBFBFB] rounded-md flex items-center gap-2 flex-wrap ${!formData.assetTypeTag ? 'opacity-50' : ''}`}>
                      {formData.makeTag && (
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-gray-200 rounded-md text-sm">
                          <span>{formData.makeTag}</span>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                makeTag: '',
                                make: ''
                              }));
                            }}
                            className="text-gray-500 hover:text-gray-700 ml-1"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )}
                      {!formData.makeTag && (
                        <input
                          autoComplete="off"
                          ref={makeInputRef}
                          type="text"
                          id="make"
                          name="make"
                          value={formData.make}
                          onChange={handleInputChange}
                          onFocus={() => {
                            if (filteredMakes.length > 0) {
                              setShowMakeSuggestions(true);
                            }
                          }}
                          className="flex-1 min-w-[120px] bg-transparent focus:outline-none placeholder:text-[#6C757D]"
                          placeholder={formData.assetTypeTag ? "Type to search or add new make" : "Select an asset type first"}
                          disabled={!formData.assetTypeTag}
                        />
                      )}
                    </div>
                    {showMakeSuggestions && filteredMakes.length > 0 && !formData.makeTag && (
                      <div
                        ref={makeSuggestionsRef}
                        className="absolute z-50 w-full mt-1 bg-white border border-[#CED4DA] rounded-md shadow-lg max-h-60 overflow-auto"
                      >
                        {filteredMakes.map((make) => (
                          <button
                            key={make.id}
                            type="button"
                            onClick={() => handleSelectMake(make.name)}
                            className="w-full text-left px-3 py-2 hover:bg-red-50 text-[#343A40] text-sm transition-colors"
                          >
                            {make.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={handleAddAsMake}
                    disabled={isAddingMake || !formData.make.trim() || !formData.assetTypeTag || !!formData.makeTag}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    {isAddingMake ? 'Adding...' : '+ Add as Make'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Length */}
                <div>
                  <label htmlFor="length" className="block text-sm font-medium text-[#343A40] mb-2">
                    Length (meter unit)
                  </label>
                  <input
                    type="text"
                    id="length"
                    name="length"
                    value={formData.length}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#CED4DA] text-[#343A40] bg-[#FBFBFB] rounded-md focus:outline-none placeholder:text-[#6C757D]"
                  />
                </div>
                {/* Width */}
                <div>
                  <label htmlFor="width" className="block text-sm font-medium text-[#343A40] mb-2">
                    Width (meter unit)
                  </label>
                  <input
                    type="text"
                    id="width"
                    name="width"
                    value={formData.width}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#CED4DA] text-[#343A40] bg-[#FBFBFB] rounded-md focus:outline-none placeholder:text-[#6C757D]"
                  />
                </div>
              </div>

              {/* Special Transportation Consideration */}
              <div>
                <label htmlFor="specialTransportationConsideration" className="block text-sm font-medium text-[#343A40] mb-2">
                  Special Transportation Consideration <span className="text-gray-400">(Optional)</span>
                </label>
                <textarea
                  id="specialTransportationConsideration"
                  name="specialTransportationConsideration"
                  value={formData.specialTransportationConsideration}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-[#CED4DA] text-[#343A40] bg-[#FBFBFB] rounded-md focus:outline-none placeholder:text-[#6C757D]"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Subject Asset Type */}
              <div>
                <label htmlFor="assetType" className="block text-sm font-medium text-[#343A40] mb-2">
                  Subject Asset Type
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <div className={`w-full min-h-[42px] px-3 py-2 border border-[#CED4DA] text-[#343A40] bg-[#FBFBFB] rounded-md flex items-center gap-2 flex-wrap ${!formData.industryTag ? 'opacity-50' : ''}`}>
                      {formData.assetTypeTag && (
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-gray-200 rounded-md text-sm">
                          <span>{formData.assetTypeTag}</span>
                          <button
                            type="button"
                            onClick={handleRemoveAssetTypeTag}
                            className="text-gray-500 hover:text-gray-700 ml-1"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )}
                      {!formData.assetTypeTag && (
                        <input
                          autoComplete="off"
                          ref={assetTypeInputRef}
                          type="text"
                          id="assetType"
                          name="assetType"
                          value={formData.assetType}
                          onChange={handleInputChange}
                          onFocus={() => {
                            if (filteredAssetClasses.length > 0) {
                              setShowAssetTypeSuggestions(true);
                            }
                          }}
                          className="flex-1 min-w-[120px] bg-transparent focus:outline-none placeholder:text-[#6C757D]"
                          placeholder={formData.industryTag ? "Type to search or add new asset type" : "Select an industry first"}
                          disabled={!formData.industryTag}
                        />
                      )}
                    </div>
                    {showAssetTypeSuggestions && filteredAssetClasses.length > 0 && !formData.assetTypeTag && (
                      <div
                        ref={assetTypeSuggestionsRef}
                        className="absolute z-50 w-full mt-1 bg-white border border-[#CED4DA] rounded-md shadow-lg max-h-60 overflow-auto"
                      >
                        {filteredAssetClasses.map((assetClass) => (
                          <button
                            key={assetClass.id}
                            type="button"
                            onClick={() => handleSelectAssetType(assetClass.name)}
                            className="w-full text-left px-3 py-2 hover:bg-red-50 text-[#343A40] text-sm transition-colors"
                          >
                            {assetClass.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={handleAddAsAssetType}
                    disabled={isAddingAssetType || !formData.assetType.trim() || !!formData.assetTypeTag}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    {isAddingAssetType ? 'Adding...' : '+ Add as Asset Type'}
                  </button>
                </div>
              </div>

              {/* Model */}
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-[#343A40] mb-2">
                  Model
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <div className={`w-full min-h-[42px] px-3 py-2 border border-[#CED4DA] text-[#343A40] bg-[#FBFBFB] rounded-md flex items-center gap-2 flex-wrap ${!formData.makeTag ? 'opacity-50' : ''}`}>
                      {formData.modelTag && (
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-gray-200 rounded-md text-sm">
                          <span>{formData.modelTag}</span>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                modelTag: '',
                                model: ''
                              }));
                            }}
                            className="text-gray-500 hover:text-gray-700 ml-1"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )}
                      {!formData.modelTag && (
                        <input
                          autoComplete="off"
                          ref={modelInputRef}
                          type="text"
                          id="model"
                          name="model"
                          value={formData.model}
                          onChange={handleInputChange}
                          onFocus={() => {
                            if (filteredModels.length > 0) {
                              setShowModelSuggestions(true);
                            }
                          }}
                          className="flex-1 min-w-[120px] bg-transparent focus:outline-none placeholder:text-[#6C757D]"
                          placeholder={formData.makeTag ? "Type to search or add new model" : "Select a make first"}
                          disabled={!formData.makeTag}
                        />
                      )}
                    </div>
                    {showModelSuggestions && filteredModels.length > 0 && !formData.modelTag && (
                      <div
                        ref={modelSuggestionsRef}
                        className="absolute z-50 w-full mt-1 bg-white border border-[#CED4DA] rounded-md shadow-lg max-h-60 overflow-auto"
                      >
                        {filteredModels.map((model) => (
                          <button
                            key={model.id}
                            type="button"
                            onClick={() => handleSelectModel(model.name)}
                            className="w-full text-left px-3 py-2 hover:bg-red-50 text-[#343A40] text-sm transition-colors"
                          >
                            {model.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={handleAddAsModel}
                    disabled={isAddingModel || !formData.model.trim() || !formData.makeTag || !!formData.modelTag}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    {isAddingModel ? 'Adding...' : '+ Add as Model'}
                  </button>
                </div>
              </div>



              <div className="grid grid-cols-2 gap-4">
                {/* Height */}
                <div>
                  <label htmlFor="height" className="block text-sm font-medium text-[#343A40] mb-2">
                    Height (meter unit)
                  </label>
                  <input
                    type="text"
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#CED4DA] text-[#343A40] bg-[#FBFBFB] rounded-md focus:outline-none placeholder:text-[#6C757D]"
                  />
                </div>

                {/* Weight */}
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-[#343A40] mb-2">
                    Weight (pound unit)
                  </label>
                  <input
                    type="text"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#CED4DA] text-[#343A40] bg-[#FBFBFB] rounded-md focus:outline-none placeholder:text-[#6C757D]"
                  />
                </div>

              </div>
              {/* Year of Manufacture */}
              <div>
                <label htmlFor="yearOfManufacture" className="block text-sm font-medium text-[#343A40] mb-2">
                  Year of Manufacture
                </label>
                <input
                  type="text"
                  id="yearOfManufacture"
                  name="yearOfManufacture"
                  value={formData.yearOfManufacture}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#CED4DA] text-[#343A40] bg-[#FBFBFB] rounded-md focus:outline-none placeholder:text-[#6C757D]"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-8">
            <button
              type="submit"
              disabled={loading}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded-md font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
            <button
              type="button"
              onClick={handleDiscardChanges}
              className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-2 rounded-md font-medium border border-[#6C757D] cursor-pointer"
            >
              Discard Changes
            </button>
            <button
              type="button"
              onClick={router.back}
              className="bg-white hover:bg-gray-50 text-[#080607] px-4 py-2 rounded-md font-medium border border-[#6C757D] cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
