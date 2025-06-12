import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// Fortune teller data for Dream Interpretation
const fortuneTellers = [
  {
    id: 1,
    name: "Nalan Hanım",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=200&h=200&fit=crop&crop=face",
    specialty: "Sembolik Rüyalar",
    experience: "20 yıl",
    rating: 4.9,
    reviews: 1243,
    price: 25,
    description: "Rüyalardaki semboller ve arketipler konusunda uzman, bilinçaltınızı aydınlatır.",
  },
  {
    id: 2,
    name: "Cem Bey",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    specialty: "Psikolojik Yorumlar",
    experience: "15 yıl",
    rating: 4.8,
    reviews: 987,
    price: 30,
    description: "Psikoloji eğitimli, rüyalarınızı bilimsel temelli yaklaşımla yorumlar.",
  },
  {
    id: 3,
    name: "Derya Hanım",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    specialty: "Aşk & İlişkiler",
    experience: "12 yıl",
    rating: 4.7,
    reviews: 756,
    price: 20,
    description: "İlişki ve duygusal rüyalar konusunda uzman, aşk hayatınıza dair içgörüler sunar.",
  },
  {
    id: 4,
    name: "Tarık Hoca",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    specialty: "Spiritüel Rüyalar",
    experience: "25 yıl",
    rating: 4.9,
    reviews: 1102,
    price: 35,
    description: "Ruhsal mesajlar ve spiritüel rüyalar konusunda uzman, manevi yolculuğunuza rehberlik eder.",
  },
  {
    id: 5,
    name: "Gülşen Hanım",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
    specialty: "Çocuk Rüyaları",
    experience: "18 yıl",
    rating: 4.9,
    reviews: 832,
    price: 25,
    description: "Çocuk rüyaları ve aile dinamikleri konusunda uzman, ebeveynlere rehberlik eder.",
  },
  {
    id: 6,
    name: "Kaan Bey",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    specialty: "Kariyer & Başarı",
    experience: "14 yıl",
    rating: 4.6,
    reviews: 689,
    price: 30,
    description: "İş ve kariyer odaklı rüyalar konusunda uzman, profesyonel hayatınıza dair içgörüler sunar.",
  },
  {
    id: 7,
    name: "Meltem Hanım",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face",
    specialty: "Tekrarlayan Rüyalar",
    experience: "16 yıl",
    rating: 4.8,
    reviews: 543,
    price: 25,
    description: "Tekrarlayan rüyalar ve rüya kalıpları konusunda uzman, bilinçaltı mesajlarınızı çözümler.",
  },
  {
    id: 8,
    name: "İsmail Hoca",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
    specialty: "Geleneksel Yorumlar",
    experience: "30 yıl",
    rating: 4.9,
    reviews: 1876,
    price: 40,
    description: "Geleneksel rüya tabirleri konusunda uzman, en deneyimli rüya yorumcularımızdan biri.",
  },
  {
    id: 9,
    name: "Ceren Hanım",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
    specialty: "Yeni Başlayanlar",
    experience: "8 yıl",
    rating: 4.7,
    reviews: 412,
    price: 20,
    description: "İlk kez rüya yorumu yaptıranlar için ideal, sabırlı ve detaylı anlatımı ile tanınır.",
  },
  {
    id: 10,
    name: "Burak Bey",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=200&h=200&fit=crop&crop=face",
    specialty: "Kabus & Korkular",
    experience: "22 yıl",
    rating: 4.8,
    reviews: 823,
    price: 35,
    description: "Kabuslar ve korku rüyaları konusunda uzman, korkularınızla yüzleşmenize yardımcı olur.",
  },
];

const filterCategories = [
  { id: 'all', label: 'Tümü', color: '#9C27B0' },
  { id: 'sembolik', label: 'Sembolik Rüyalar', color: '#FF4500' },
  { id: 'psikolojik', label: 'Psikolojik Yorumlar', color: '#1E6BC8' },
  { id: 'aşk', label: 'Aşk & İlişkiler', color: '#E74C3C' },
  { id: 'spiritüel', label: 'Spiritüel Rüyalar', color: '#4CAF50' },
];

export default function DreamInterpretationScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Select Fortune Teller, 2: Enter Dream
  const [selectedFortuneTeller, setSelectedFortuneTeller] = useState<number | null>(null);
  const [dreamText, setDreamText] = useState('');
  const [isInterpreting, setIsInterpreting] = useState(false);
  const [interpretation, setInterpretation] = useState<string | null>(null);
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

  const handleTextChange = (text: string) => {
    setDreamText(text);
    setInterpretation(null);
  };

  const handleClearText = () => {
    setDreamText('');
    setInterpretation(null);
  };

  const handleInterpretation = () => {
    if (dreamText.trim().length < 10) return;

    setIsInterpreting(true);
    setTimeout(() => {
      setIsInterpreting(false);
      setInterpretation(
        "Rüyanızda uçmak, özgürlük arzunuzu ve mevcut durumunuzdan kurtulma isteğinizi temsil ediyor. Yüksekten uçmanız, hayatınızda yeni bir bakış açısı kazanmak üzere olduğunuzu gösteriyor. Rüyanızda gördüğünüz mavi gökyüzü, umut ve iyimserliği temsil ederken, bulutların arasından geçmeniz, önünüzdeki engelleri aşacağınızı işaret ediyor. Yakın zamanda kariyerinizde bir yükseliş yaşayabilirsiniz. Ayrıca, rüyanızda kendinizi güvende ve mutlu hissetmeniz, iç huzurunuzun arttığını ve doğru yolda olduğunuzu gösteriyor. Önümüzdeki haftalarda, uzun zamandır beklediğiniz bir fırsatla karşılaşabilirsiniz. Bu fırsatı değerlendirmeniz, hayatınızda olumlu değişikliklere yol açacak."
      );
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
        <Text style={styles.headerTitle}>Rüya Yorumu</Text>
        <Text style={styles.headerSubtitle}>
          {step === 1 ? 'Rüya yorumcunuzu seçin' : 'Rüyanızı anlatın, anlamını öğrenin'}
        </Text>
      </View>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=120&h=48&fit=crop' }}
        style={styles.logo}
      />
    </View>
  );

  const renderFortuneTellerSelection = () => (
    <View style={styles.stepContainer}>
      {/* Instructions */}
      <View style={styles.instructionCard}>
        <View style={styles.instructionIcon}>
          <Ionicons name="information-circle" size={20} color="#9C27B0" />
        </View>
        <View style={styles.instructionContent}>
          <Text style={styles.instructionTitle}>Rüya Yorumcunuzu Seçin</Text>
          <Text style={styles.instructionText}>
            Uzmanlarımız arasından size en uygun rüya yorumcusunu seçin. Her uzmanın farklı uzmanlık alanları vardır.
          </Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={16} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rüya yorumcusu ara..."
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
              colors={['transparent', 'rgba(156, 39, 176, 0.1)']}
              style={styles.cardGradient}
            />
            
            <View style={styles.tellerContent}>
              <Image source={{ uri: teller.image }} style={styles.tellerImage} />
              
              <View style={styles.tellerInfo}>
                <View style={styles.tellerHeader}>
                  <Text style={styles.tellerName}>{teller.name}</Text>
                  <View style={styles.priceTag}>
                    <Ionicons name="sparkles" size={12} color="#FFD700" />
                    <Text style={styles.priceText}>{teller.price}₺</Text>
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
              <Ionicons name="chevron-forward" size={16} color="#9C27B0" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderDreamInput = () => {
    const selectedTeller = fortuneTellers.find(t => t.id === selectedFortuneTeller);
    
    return (
      <View style={styles.stepContainer}>
        {/* Selected Fortune Teller */}
        {selectedTeller && (
          <View style={styles.selectedTellerCard}>
            <Image source={{ uri: selectedTeller.image }} style={styles.selectedTellerImage} />
            <View style={styles.selectedTellerInfo}>
              <Text style={styles.selectedTellerName}>{selectedTeller.name}</Text>
              <View style={styles.selectedTellerMeta}>
                <Text style={styles.selectedTellerSpecialty}>{selectedTeller.specialty}</Text>
                <View style={styles.selectedTellerRating}>
                  <Ionicons name="star" size={12} color="#FFD700" />
                  <Text style={styles.selectedTellerRatingText}>{selectedTeller.rating}</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Instructions */}
        <View style={styles.instructionCard}>
          <View style={styles.instructionIcon}>
            <Ionicons name="information-circle" size={20} color="#9C27B0" />
          </View>
          <View style={styles.instructionContent}>
            <Text style={styles.instructionTitle}>Nasıl Çalışır?</Text>
            <Text style={styles.instructionText}>
              Gördüğünüz rüyayı detaylı bir şekilde yazın ve yorumlamamız için gönderin.
            </Text>
          </View>
        </View>

        {/* Dream Input Section */}
        <View style={styles.dreamInputContainer}>
          <View style={styles.dreamInputHeader}>
            <View style={styles.dreamInputIcon}>
              <Ionicons name="moon" size={20} color="#9C27B0" />
            </View>
            <Text style={styles.dreamInputTitle}>Rüyanızı Anlatın</Text>
          </View>

          {!interpretation && (
            <View>
              <TextInput
                style={styles.dreamTextInput}
                value={dreamText}
                onChangeText={handleTextChange}
                placeholder="Rüyanızı detaylı bir şekilde anlatın... Nerede olduğunuzu, kimleri gördüğünüzü, neler hissettiğinizi belirtmeniz daha doğru bir yorum almamızı sağlar."
                multiline
                numberOfLines={8}
                textAlignVertical="top"
                maxLength={500}
              />

              <View style={styles.dreamInputActions}>
                <TouchableOpacity onPress={handleClearText}>
                  <Text style={styles.clearText}>Temizle</Text>
                </TouchableOpacity>
                <Text style={[
                  styles.characterCount,
                  dreamText.length < 10 && styles.characterCountError
                ]}>
                  {dreamText.length} / 500 karakter
                </Text>
              </View>

              {!isInterpreting ? (
                <TouchableOpacity
                  onPress={handleInterpretation}
                  disabled={dreamText.trim().length < 10}
                  style={[
                    styles.interpretButton,
                    dreamText.trim().length < 10 && styles.interpretButtonDisabled
                  ]}
                >
                  <Ionicons name="send" size={16} color="white" />
                  <Text style={styles.interpretButtonText}>Rüyamı Yorumla</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.interpretingButton}>
                  <Ionicons name="hourglass" size={16} color="white" />
                  <Text style={styles.interpretButtonText}>Rüyanız Yorumlanıyor...</Text>
                </View>
              )}
            </View>
          )}

          {/* Interpretation Results */}
          {interpretation && (
            <View style={styles.interpretationSection}>
              <View style={styles.interpretationHeader}>
                <View style={styles.interpretationIcon}>
                  <Ionicons name="checkmark-circle" size={20} color="#9C27B0" />
                </View>
                <Text style={styles.interpretationTitle}>Rüya Yorumunuz</Text>
              </View>

              <View style={styles.interpretationContent}>
                <Text style={styles.interpretationText}>{interpretation}</Text>
              </View>

              <View style={styles.interpretationActions}>
                <TouchableOpacity
                  onPress={() => setShowVisualizeModal(true)}
                  style={styles.visualizeButton}
                >
                  <Ionicons name="eye" size={16} color="white" />
                  <Text style={styles.visualizeButtonText}>Rüyamı Görselleştir</Text>
                </TouchableOpacity>

                <View style={styles.actionButtonsRow}>
                  <TouchableOpacity onPress={handleClearText} style={styles.actionButton}>
                    <Ionicons name="moon" size={16} color="#6B7280" />
                    <Text style={styles.actionButtonText}>Yeni Yorum</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Kaydet</Text>
                    <Ionicons name="chevron-forward" size={16} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Cost Information */}
        <View style={styles.costCard}>
          <View style={styles.costInfo}>
            <View style={styles.costIcon}>
              <Ionicons name="sparkles" size={16} color="#FFD700" />
            </View>
            <View>
              <Text style={styles.costTitle}>Yorum Ücreti</Text>
              <Text style={styles.costSubtitle}>Her yorum için</Text>
            </View>
          </View>
          <View style={styles.costPrice}>
            <Text style={styles.costAmount}>
              {selectedTeller ? selectedTeller.price : 20}₺
            </Text>
            <Ionicons name="sparkles" size={16} color="#FFD700" />
          </View>
        </View>
      </View>
    );
  };

  const renderVisualizeModal = () => (
    <Modal
      visible={showVisualizeModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowVisualizeModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalIcon}>
            <Ionicons name="eye" size={32} color="#9C27B0" />
          </View>
          <Text style={styles.modalTitle}>Rüyanızı Görselleştir</Text>
          <Text style={styles.modalText}>
            Rüya yorumunuzu görselleştirmek ister misiniz? Yapay zeka ile oluşturulan görsel yorumlar rüyanızı daha iyi anlamanızı sağlar.
          </Text>
          
          {/* Example Image */}
          <View style={styles.modalImageContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=200&fit=crop' }}
              style={styles.modalImage}
            />
            <View style={styles.modalImageLabel}>
              <Text style={styles.modalImageLabelText}>Örnek Görsel</Text>
            </View>
          </View>

          <View style={styles.modalCostInfo}>
            <View style={styles.modalCostLeft}>
              <Ionicons name="sparkles" size={16} color="#FFD700" />
              <Text style={styles.modalCostText}>Sadece 25 yıldız tozu</Text>
            </View>
            <View style={styles.modalCostRight}>
              <Text style={styles.modalCostAmount}>25</Text>
              <Ionicons name="sparkles" size={16} color="#FFD700" />
            </View>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              onPress={() => handleVisualizeResponse(true)}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>Evet</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleVisualizeResponse(false)}
              style={[styles.modalButton, styles.modalButtonSecondary]}
            >
              <Text style={styles.modalButtonTextSecondary}>Şimdilik hayır</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F5F5F0', '#FAFAFA']}
        style={styles.gradient}
      >
        {renderHeader()}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {step === 1 && renderFortuneTellerSelection()}
          {step === 2 && renderDreamInput()}
        </ScrollView>
        {renderVisualizeModal()}
      </LinearGradient>
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
    width: 120,
    height: 44,
    borderRadius: 8,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  instructionIcon: {
    backgroundColor: 'rgba(156, 39, 176, 0.2)',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
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
    flexDirection: 'row',
    marginBottom: 12,
  },
  tellerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  tellerInfo: {
    flex: 1,
  },
  tellerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  tellerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
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
    backgroundColor: 'rgba(156, 39, 176, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 8,
  },
  specialtyText: {
    fontSize: 12,
    color: '#9C27B0',
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
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  selectButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9C27B0',
    marginRight: 4,
  },
  selectedTellerCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedTellerImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  selectedTellerInfo: {
    flex: 1,
  },
  selectedTellerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  selectedTellerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedTellerSpecialty: {
    fontSize: 12,
    color: '#9C27B0',
    marginRight: 8,
  },
  selectedTellerRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedTellerRatingText: {
    fontSize: 12,
    color: '#4B5563',
    marginLeft: 4,
  },
  dreamInputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  dreamInputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dreamInputIcon: {
    backgroundColor: 'rgba(156, 39, 176, 0.2)',
    borderRadius: 20,
    padding: 10,
    marginRight: 12,
  },
  dreamInputTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  dreamTextInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: '#374151',
    minHeight: 160,
    marginBottom: 12,
  },
  dreamInputActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  clearText: {
    fontSize: 12,
    color: '#6B7280',
  },
  characterCount: {
    fontSize: 12,
    color: '#6B7280',
  },
  characterCountError: {
    color: '#EF4444',
  },
  interpretButton: {
    backgroundColor: '#9C27B0',
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
    backgroundColor: '#D1D5DB',
  },
  interpretingButton: {
    backgroundColor: 'rgba(156, 39, 176, 0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  interpretButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  interpretationSection: {
    marginTop: 20,
  },
  interpretationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  interpretationIcon: {
    backgroundColor: 'rgba(156, 39, 176, 0.2)',
    borderRadius: 20,
    padding: 8,
    marginRight: 12,
  },
  interpretationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  interpretationContent: {
    backgroundColor: 'rgba(156, 39, 176, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(156, 39, 176, 0.2)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  interpretationText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  interpretationActions: {
    gap: 12,
  },
  visualizeButton: {
    backgroundColor: '#9C27B0',
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
  visualizeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    borderRadius: 20,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginLeft: 8,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#1E6BC8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    marginRight: 8,
  },
  costCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  costInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  costIcon: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderRadius: 16,
    padding: 8,
    marginRight: 12,
  },
  costTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  costSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  costPrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  costAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginRight: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
  },
  modalIcon: {
    backgroundColor: 'rgba(156, 39, 176, 0.1)',
    borderRadius: 32,
    padding: 16,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  modalImageContainer: {
    position: 'relative',
    width: '100%',
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  modalImageLabel: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  modalImageLabelText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  modalCostInfo: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  modalCostLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalCostText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
  modalCostRight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  modalCostAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginRight: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
    gap: 8,
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#9C27B0',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalButtonSecondary: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  modalButtonTextSecondary: {
    color: '#374151',
  },
}); 