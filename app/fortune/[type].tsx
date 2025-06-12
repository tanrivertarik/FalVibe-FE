import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';

const fortuneTypes = {
  'kahve-fali': {
    title: 'Kahve Falı',
    icon: 'cafe',
    color: '#FF4500',
    description: 'Kahve fincanınızdaki şekillerin gizli anlamlarını keşfedin',
    instructions: 'Kahvenizi için ve fincanınızı tabağa ters çevirin',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop',
  },
  'tarot-fali': {
    title: 'Tarot Falı',
    icon: 'library',
    color: '#1E6BC8',
    description: 'Tarot kartlarının size verecekleri mesajları dinleyin',
    instructions: 'Sorunuzu zihnizde netleştirin ve kartlarınızı seçin',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
  },
  'el-fali': {
    title: 'El Falı',
    icon: 'hand-left',
    color: '#E74C3C',
    description: 'Avuç içinizdeki çizgiler geleceğinizi gösteriyor',
    instructions: 'Ellerinizin fotoğrafını net bir şekilde çekin',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&h=400&fit=crop',
  },
  'ruya-yorumu': {
    title: 'Rüya Yorumu',
    icon: 'moon',
    color: '#9C27B0',
    description: 'Rüyalarınızın gizli anlamlarını öğrenin',
    instructions: 'Rüyanızı detaylı bir şekilde anlatın',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop',
  },
  'yuz-fali': {
    title: 'Yüz Falı',
    icon: 'person',
    color: '#4CAF50',
    description: 'Yüz hatlarınız karakterinizi ve geleceğinizi yansıtıyor',
    instructions: 'Net bir yüz fotoğrafı çekin',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
  },
};

export default function FortuneScreen() {
  const { type } = useLocalSearchParams();
  const router = useRouter();
  const [isReading, setIsReading] = useState(false);
  
  const fortuneData = fortuneTypes[type as keyof typeof fortuneTypes];
  
  if (!fortuneData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Bu fal türü bulunamadı</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backText}>Geri Dön</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleStartReading = () => {
    setIsReading(true);
    // Simulate fortune reading process
    setTimeout(() => {
      setIsReading(false);
      // Here you would navigate to results or show results
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{fortuneData.title}</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: fortuneData.image }} style={styles.heroImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.6)']}
            style={styles.heroGradient}
          />
          <View style={styles.heroContent}>
            <View style={[styles.heroIcon, { backgroundColor: `${fortuneData.color}20` }]}>
              <Ionicons name={fortuneData.icon as any} size={32} color={fortuneData.color} />
            </View>
            <Text style={styles.heroTitle}>{fortuneData.title}</Text>
            <Text style={styles.heroDescription}>{fortuneData.description}</Text>
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>Nasıl Çalışır?</Text>
          <View style={styles.instructionCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.instructionText}>{fortuneData.instructions}</Text>
          </View>
          <View style={styles.instructionCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.instructionText}>Falınızın okunmasını bekleyin</Text>
          </View>
          <View style={styles.instructionCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.instructionText}>Detaylı yorumunuzu alın</Text>
          </View>
        </View>

        {/* Start Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.startButton, { backgroundColor: fortuneData.color }]}
            onPress={handleStartReading}
            disabled={isReading}
          >
            {isReading ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.buttonText}>Falınız Okunuyor...</Text>
              </View>
            ) : (
              <>
                <Ionicons name="sparkles" size={20} color="#FFFFFF" />
                <Text style={styles.buttonText}>Falımı Okut</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F0',
  },
  scrollView: {
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  placeholder: {
    width: 40,
  },
  heroContainer: {
    height: 300,
    marginHorizontal: 20,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 24,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    alignItems: 'center',
  },
  heroIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  heroDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
  },
  instructionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  instructionsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  instructionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1E6BC8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  instructionText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
    lineHeight: 24,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  bottomPadding: {
    height: 40,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 16,
    textAlign: 'center',
  },
  backText: {
    fontSize: 16,
    color: '#1E6BC8',
    fontWeight: '500',
  },
}); 