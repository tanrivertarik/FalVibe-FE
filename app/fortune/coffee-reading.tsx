import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LoadingScreen from '../loading';

const { width } = Dimensions.get('window');

// Fortune teller data
const fortuneTellers = [
  {
    id: 1,
    name: "Ayşe Hoca",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    specialty: "Aşk & İlişkiler",
    experience: "15 yıl",
    rating: 4.9,
    reviews: 1243,
    price: 25,
    description: "Kahve telvesindeki sembolleri romantik ve duygusal bir bakış açısıyla yorumlar, kalbinizin sesini duymanıza yardımcı olur.",
  },
  {
    id: 2,
    name: "Mehmet Hoca",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    specialty: "Kariyer & İş",
    experience: "20 yıl",
    rating: 4.8,
    reviews: 987,
    price: 30,
    description: "Fincandaki desenleri stratejik bir vizyonla analiz eder, kariyer basamaklarını tırmanmanız için somut adımlar sunar.",
  },
  {
    id: 3,
    name: "Zeynep Hanım",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    specialty: "Genel Yaşam",
    experience: "12 yıl",
    rating: 4.7,
    reviews: 756,
    price: 25,
    description: "Kahve telvesinin bütünsel bir haritasını çıkarır, geçmiş, şimdi ve gelecek arasında köprüler kurarak hayat yolculuğunuzda size ışık tutar.",
  },
  {
    id: 4,
    name: "Ali Bey",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    specialty: "Sağlık & Huzur",
    experience: "18 yıl",
    rating: 4.9,
    reviews: 1102,
    price: 35,
    description: "Fincandaki şekilleri enerji akışınız ve çakralarınızla ilişkilendirir. Sadece geleceği değil, ruhsal ve bedensel dengeyi bulmanız için de rehberlik eder.",
  },
  {
    id: 5,
    name: "Fatma Hoca",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
    specialty: "Aile & Çocuklar",
    experience: "25 yıl",
    rating: 4.9,
    reviews: 1532,
    price: 40,
    description: "Kahve telvesini bir aile ağacı gibi okur, nesiller arası bağları ve aile içi dinamikleri şefkatli bir yaklaşımla yorumlar.",
  },
];

const filterCategories = [
  { id: 'all', label: 'Tümü', color: '#FF4500' },
  { id: 'aşk', label: 'Aşk & İlişkiler', color: '#E74C3C' },
  { id: 'kariyer', label: 'Kariyer & İş', color: '#1E6BC8' },
  { id: 'sağlık', label: 'Sağlık & Huzur', color: '#4CAF50' },
];

export default function CoffeeReadingScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Select Fortune Teller, 2: Upload Photos, 3: Interpret
  const [selectedFortuneTeller, setSelectedFortuneTeller] = useState<number | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isInterpreting, setIsInterpreting] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showVisualizeModal, setShowVisualizeModal] = useState(false);

  // Filter fortune tellers
  const filteredFortuneTellers = fortuneTellers.filter((teller) => {
    const matchesSearch = 
      teller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teller.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teller.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = activeFilter === 'all' || 
      teller.specialty.toLowerCase().includes(activeFilter.toLowerCase());

    return matchesSearch && matchesFilter;
  });

  const handleSelectFortuneTeller = (id: number) => {
    setSelectedFortuneTeller(id);
    setStep(2);
  };

  const handleBackToFortuneTellers = () => {
    setStep(1);
  };

  const pickImage = async () => {
    if (images.length >= 3) {
      Alert.alert('Limit', 'En fazla 3 fotoğraf yükleyebilirsiniz.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setImages(prev => [...prev, result.assets[0].uri]);
    }
  };

  const takePhoto = async () => {
    if (images.length >= 3) {
      Alert.alert('Limit', 'En fazla 3 fotoğraf yükleyebilirsiniz.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setImages(prev => [...prev, result.assets[0].uri]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    if (activeImageIndex >= index && activeImageIndex > 0) {
      setActiveImageIndex(prev => prev - 1);
    }
  };

  const removeAllImages = () => {
    setImages([]);
    setActiveImageIndex(0);
  };

  const handleInterpretation = () => {
    setIsInterpreting(true);
    setTimeout(() => {
      setIsInterpreting(false);
      setShowVisualizeModal(true);
    }, 3000);
  };

  const handleVisualizeResponse = (response: boolean) => {
    setShowVisualizeModal(false);
    // Navigate to results page
    router.push('/(tabs)/fallarim');
  };

  const renderHeader = () => (
    <View style={styles.header}>
      {step > 1 && (
        <TouchableOpacity onPress={handleBackToFortuneTellers} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
      )}
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>Kahve Falı</Text>
        <Text style={styles.headerSubtitle}>
          {step === 1 ? 'Falcınızı seçin' : 'Fincanınızı yükleyin, geleceğinizi öğrenin'}
        </Text>
      </View>
      <Image
        source={require('../../assets/images/falvibe-logo-new.png')}
        style={styles.logo}
      />
    </View>
  );

  const renderFortuneTellerSelection = () => (
    <View style={styles.stepContainer}>
      {/* Instructions */}
      <View style={styles.instructionCard}>
        <View style={styles.instructionIcon}>
          <Ionicons name="information-circle" size={20} color="#FF4500" />
        </View>
        <View style={styles.instructionContent}>
          <Text style={styles.instructionTitle}>Falcınızı Seçin</Text>
          <Text style={styles.instructionText}>
            Uzmanlarımız arasından size en uygun falcıyı seçin. Her falcının farklı uzmanlık alanları vardır.
          </Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={16} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Falcı ara..."
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <Ionicons name="options" size={16} color="#6B7280" />
        </View>
      </View>

      {/* Filter Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        {filterCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => setActiveFilter(category.id)}
            style={[
              styles.filterButton,
              activeFilter === category.id && { backgroundColor: category.color }
            ]}
          >
            <Text style={[
              styles.filterText,
              activeFilter === category.id && styles.filterTextActive
            ]}>
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Fortune Tellers List */}
      <ScrollView style={styles.fortuneTellersList} showsVerticalScrollIndicator={false}>
        {filteredFortuneTellers.map((teller) => (
          <TouchableOpacity
            key={teller.id}
            onPress={() => handleSelectFortuneTeller(teller.id)}
            style={styles.fortuneTellerCard}
          >
            <LinearGradient
              colors={['transparent', 'rgba(255, 69, 0, 0.1)']}
              style={styles.cardGradient}
            />
            
            <View style={styles.tellerContent}>
              <Image source={{ uri: teller.image }} style={styles.tellerImage} />
              
              <View style={styles.tellerInfo}>
                <View style={styles.tellerHeader}>
                  <Text style={styles.tellerName}>{teller.name}</Text>
                  <View style={styles.priceTag}>
                    <Ionicons name="sparkles" size={12} color="#FFD700" />
                    <Text style={styles.priceText}>{teller.price} Yıldız Tozu</Text>
                  </View>
                </View>
                
                <View style={styles.tellerMeta}>
                  <View style={styles.specialtyTag}>
                    <Text style={styles.specialtyText}>{teller.specialty}</Text>
                  </View>
                  <View style={styles.rating}>
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text style={styles.ratingText}>
                      {teller.rating} ({teller.reviews})
                    </Text>
                  </View>
                </View>
                
                <Text style={styles.experience}>{teller.experience} tecrübe</Text>
                <Text style={styles.description} numberOfLines={2}>
                  {teller.description}
                </Text>
              </View>
            </View>
            
            <View style={styles.selectButton}>
              <Text style={styles.selectButtonText}>Seç</Text>
              <Ionicons name="chevron-forward" size={16} color="#FF4500" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderImageUpload = () => {
    const selectedTeller = fortuneTellers.find(t => t.id === selectedFortuneTeller);
    
    return (
      <View style={styles.stepContainer}>
        {/* Instructions */}
        <View style={styles.instructionCard}>
          <View style={styles.instructionIcon}>
            <Ionicons name="information-circle" size={20} color="#FF4500" />
          </View>
          <View style={styles.instructionContent}>
            <Text style={styles.instructionTitle}>Nasıl Çalışır?</Text>
            <Text style={styles.instructionText}>
              Fincanı ters çevirip bekletin, düz çevirip farklı açılardan fotoğraflarını çekin ve yükleyin (en az 1, en fazla 3 fotoğraf).
            </Text>
          </View>
        </View>

        {/* Selected Fortune Teller */}
        {selectedTeller && (
          <View style={styles.selectedTellerCard}>
            <View style={styles.selectedTellerHeader}>
              <Image source={{ uri: selectedTeller.image }} style={styles.selectedTellerImage} />
              <View style={styles.selectedTellerInfo}>
                <Text style={styles.selectedTellerName}>{selectedTeller.name}</Text>
                <View style={styles.selectedTellerMeta}>
                  <View style={styles.specialtyTag}>
                    <Text style={styles.specialtyText}>{selectedTeller.specialty}</Text>
                  </View>
                  <View style={styles.rating}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.ratingText}>
                      {selectedTeller.rating} ({selectedTeller.reviews} yorum)
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <Text style={styles.selectedTellerDescription}>
              "{selectedTeller.description}"
            </Text>
            <View style={styles.selectedTellerFooter}>
              <Text style={styles.experience}>{selectedTeller.experience} tecrübe</Text>
              <View style={styles.priceTag}>
                <Ionicons name="sparkles" size={12} color="#FFD700" />
                <Text style={styles.priceText}>{selectedTeller.price} Yıldız Tozu</Text>
              </View>
            </View>
          </View>
        )}

        {/* Upload Section */}
        <View style={styles.uploadContainer}>
          <View style={styles.uploadHeader}>
            <View style={styles.uploadIcon}>
              <Ionicons name="cafe" size={20} color="#FF4500" />
            </View>
            <View>
              <Text style={styles.uploadTitle}>Fincanınızı Yükleyin</Text>
              <Text style={styles.uploadSubtitle}>{images.length}/3 fotoğraf yüklendi</Text>
            </View>
          </View>

          {images.length === 0 ? (
            <View style={styles.emptyUpload}>
              <View style={styles.emptyUploadIcon}>
                <Ionicons name="camera" size={24} color="#FF4500" />
              </View>
              <Text style={styles.emptyUploadTitle}>Fotoğraf Yükleyin</Text>
              <Text style={styles.emptyUploadText}>
                Fincanınızın fotoğrafını çekip buraya yükleyin
              </Text>
              <View style={styles.uploadButtons}>
                <TouchableOpacity onPress={takePhoto} style={styles.uploadButton}>
                  <Ionicons name="camera" size={16} color="white" />
                  <Text style={styles.uploadButtonText}>Fotoğraf Çek</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={pickImage} style={[styles.uploadButton, styles.uploadButtonSecondary]}>
                  <Ionicons name="images" size={16} color="#FF4500" />
                  <Text style={[styles.uploadButtonText, styles.uploadButtonTextSecondary]}>Galeriden Seç</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View>
              {/* Main Image Display */}
              <View style={styles.mainImageContainer}>
                <Image source={{ uri: images[activeImageIndex] }} style={styles.mainImage} />
                <TouchableOpacity
                  onPress={() => removeImage(activeImageIndex)}
                  style={styles.removeButton}
                >
                  <Ionicons name="close" size={16} color="white" />
                </TouchableOpacity>
              </View>

              {/* Thumbnails */}
              <View style={styles.thumbnailsContainer}>
                {images.map((img, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setActiveImageIndex(index)}
                    style={[
                      styles.thumbnail,
                      activeImageIndex === index && styles.thumbnailActive
                    ]}
                  >
                    <Image source={{ uri: img }} style={styles.thumbnailImage} />
                  </TouchableOpacity>
                ))}

                {images.length < 3 && (
                  <TouchableOpacity onPress={pickImage} style={styles.addThumbnail}>
                    <Ionicons name="add" size={20} color="#6B7280" />
                  </TouchableOpacity>
                )}
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity onPress={removeAllImages} style={styles.actionButton}>
                  <Ionicons name="trash" size={16} color="#6B7280" />
                  <Text style={styles.actionButtonText}>Temizle</Text>
                </TouchableOpacity>

                {images.length < 3 && (
                  <TouchableOpacity onPress={pickImage} style={styles.actionButton}>
                    <Ionicons name="add" size={16} color="#6B7280" />
                    <Text style={styles.actionButtonText}>Fotoğraf Ekle</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Interpret Button */}
              <TouchableOpacity
                onPress={handleInterpretation}
                disabled={isInterpreting}
                style={[styles.interpretButton, isInterpreting && styles.interpretButtonDisabled]}
              >
                {isInterpreting ? (
                  <View style={styles.interpretingContainer}>
                    <Ionicons name="hourglass" size={16} color="white" />
                    <Text style={styles.interpretButtonText}>Falınız Yorumlanıyor...</Text>
                  </View>
                ) : (
                  <View style={styles.interpretingContainer}>
                    <Ionicons name="cafe" size={16} color="white" />
                    <Text style={styles.interpretButtonText}>Falımı Yorumla</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderVisualizeModal = () => (
    <Modal
      visible={showVisualizeModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowVisualizeModal(false)}
    >
      <View style={styles.modalOverlay}>
        <LinearGradient
          colors={['#F9FAFB', '#FFFFFF']}
          style={styles.modalContent}
        >
          <View style={styles.modalHeader}>
            <View style={styles.modalHeaderIcon}>
              <Ionicons name="eye-outline" size={24} color="white" />
            </View>
            <Text style={styles.modalTitle}>Falınızı Görselleştir</Text>
          </View>

          <Text style={styles.modalDescription}>
            Falınızı görselleştirmek ister misiniz? Yapay zeka ile oluşturulan görsel yorumlar falınızı daha iyi anlamanızı sağlar.
          </Text>

          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/phoenix-dream.png')} // Placeholder
              style={styles.modalImage}
            />
            <View style={styles.exampleTag}>
              <Text style={styles.exampleTagText}>Örnek Görsel</Text>
            </View>
          </View>
          
          <View style={styles.costContainer}>
            <Ionicons name="sparkles-outline" size={24} color="#D97706" />
            <Text style={styles.costText}>Sadece 25 yıldız tozu</Text>
            <View style={styles.costBox}>
              <Text style={styles.costBoxText}>25</Text>
              <Ionicons name="sparkles" size={16} color="#F59E0B" />
            </View>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              onPress={() => handleVisualizeResponse(true)}
              style={{ flex: 1 }}
            >
              <LinearGradient
                colors={['#8B5CF6', '#3B82F6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.primaryButton}
              >
                <Text style={styles.primaryButtonText}>Evet</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleVisualizeResponse(false)}
              style={styles.secondaryButton}
            >
              <Text style={styles.secondaryButtonText}>Şimdilik hayır</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#E6F7FF', '#FFFFFF']}
        style={StyleSheet.absoluteFill}
      />
      <StatusBar barStyle="dark-content" backgroundColor="#E6F7FF" />
      {renderHeader()}
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {step === 1 && renderFortuneTellerSelection()}
        {step === 2 && renderImageUpload()}
      </ScrollView>

      {renderVisualizeModal()}
      {isInterpreting && <LoadingScreen />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerContent: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  logo: {
    width: 138,
    height: 48,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
  },
  stepContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  instructionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  instructionIcon: {
    backgroundColor: 'rgba(255, 69, 0, 0.2)',
    borderRadius: 20,
    padding: 8,
    marginRight: 12,
  },
  instructionContent: {
    flex: 1,
  },
  instructionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  instructionText: {
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  filterTextActive: {
    color: 'white',
  },
  fortuneTellersList: {
    flex: 1,
  },
  fortuneTellerCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
    overflow: 'hidden',
  },
  cardGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  tellerContent: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 12,
  },
  tellerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  tellerInfo: {
    flex: 1,
    alignItems: 'center',
  },
  tellerHeader: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 8,
  },
  tellerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  priceTag: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 4,
  },
  tellerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  specialtyTag: {
    backgroundColor: 'rgba(255, 69, 0, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 8,
  },
  specialtyText: {
    fontSize: 12,
    color: '#FF4500',
    fontWeight: '500',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#4B5563',
    marginLeft: 4,
  },
  experience: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    textAlign: 'center',
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 69, 0, 0.1)',
    borderRadius: 12,
    paddingVertical: 10,
    marginTop: 12,
  },
  selectButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF4500',
    marginRight: 4,
  },
  selectedTellerCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  selectedTellerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  selectedTellerImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  selectedTellerInfo: {
    flex: 1,
  },
  selectedTellerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  selectedTellerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectedTellerDescription: {
    fontSize: 14,
    color: '#4B5563',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  selectedTellerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
  },
  uploadContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  uploadHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadIcon: {
    backgroundColor: 'rgba(255, 69, 0, 0.2)',
    borderRadius: 20,
    padding: 10,
    marginRight: 12,
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  uploadSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  emptyUpload: {
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
  },
  emptyUploadIcon: {
    backgroundColor: 'rgba(255, 69, 0, 0.1)',
    borderRadius: 24,
    padding: 12,
    marginBottom: 12,
  },
  emptyUploadTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  emptyUploadText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  uploadButtons: {
    flexDirection: 'column',
    gap: 8,
    alignItems: 'stretch',
  },
  uploadButton: {
    backgroundColor: '#FF4500',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  uploadButtonSecondary: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#FF4500',
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    marginLeft: 8,
  },
  uploadButtonTextSecondary: {
    color: '#FF4500',
  },
  mainImageContainer: {
    position: 'relative',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    padding: 6,
  },
  thumbnailsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 8,
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: 8,
    overflow: 'hidden',
    opacity: 0.7,
  },
  thumbnailActive: {
    opacity: 1,
    borderWidth: 2,
    borderColor: '#FF4500',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  addThumbnail: {
    width: 64,
    height: 64,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 12,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginLeft: 8,
  },
  interpretButton: {
    backgroundColor: '#FF4500',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  interpretButtonDisabled: {
    backgroundColor: 'rgba(255, 69, 0, 0.8)',
  },
  interpretingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interpretButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalHeaderIcon: {
    backgroundColor: '#6D28D9',
    padding: 12,
    borderRadius: 999,
    marginRight: 12,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  modalDescription: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 20,
    lineHeight: 24,
  },
  imageContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  modalImage: {
    width: '100%',
    height: 180,
    borderRadius: 16,
  },
  exampleTag: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FBBF24',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  exampleTagText: {
    color: '#1F2937',
    fontWeight: 'bold',
    fontSize: 12,
  },
  costContainer: {
    backgroundColor: '#FEF3C7',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  costText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
    color: '#92400E',
  },
  costBox: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  costBoxText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginRight: 4,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  noResultsText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 20,
  },
}); 