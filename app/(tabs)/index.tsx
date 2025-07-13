import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

interface FortuneCard {
  id: string;
  title: string;
  image: string;
  rating: number;
  reviews: number;
  tag: string;
  tagColor: string;
  route: string;
}

interface ServiceOption {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  color: string;
  route: string;
}

export default function HomeScreen() {
  const router = useRouter();
  
  const featuredCards: FortuneCard[] = [
    {
      id: '1',
      title: 'Kahve Falı',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop',
      rating: 4.9,
      reviews: 143,
      tag: 'Popüler',
      tagColor: '#FF4500',
      route: 'kahve-fali',
    },
    {
      id: '2',
      title: 'Rüya Yorumu',
      image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop',
      rating: 4.7,
      reviews: 98,
      tag: 'Yeni',
      tagColor: '#1E6BC8',
      route: 'ruya-yorumu',
    },
    {
      id: '3',
      title: 'El Falı',
      image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&h=400&fit=crop',
      rating: 4.5,
      reviews: 76,
      tag: 'Özel',
      tagColor: '#E74C3C',
      route: 'el-fali',
    },
  ];

  const serviceOptions: ServiceOption[] = [
    { icon: 'cafe', title: 'Kahve Falı', color: '#FF4500', route: 'kahve-fali' },
    { icon: 'library', title: 'Tarot Falı', color: '#1E6BC8', route: 'tarot-fali' },
    { icon: 'hand-left', title: 'El Falı', color: '#E74C3C', route: 'el-fali' },
    { icon: 'moon', title: 'Rüya Yorumu', color: '#9C27B0', route: 'ruya-yorumu' },
    { icon: 'compass', title: 'Burç Yorumları', color: '#FFD700', route: 'burc' },
    { icon: 'person', title: 'Yüz Falı', color: '#4CAF50', route: 'yuz-fali' },
  ];

  const renderFeatureCard = ({ item }: { item: FortuneCard }) => (
    <TouchableOpacity 
      style={styles.featureCard}
      onPress={() => router.push(`/fortune/${item.route}`)}
    >
      <View style={styles.cardImageContainer}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.cardGradient}
        />
        <View style={styles.cardContent}>
          <View style={[styles.tag, { backgroundColor: `${item.tagColor}20` }]}>
            <Text style={[styles.tagText, { color: item.tagColor }]}>{item.tag}</Text>
          </View>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <View style={styles.cardRating}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
            <Text style={styles.reviewsText}>{item.reviews} yorum</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderServiceOption = (item: ServiceOption, index: number) => (
    <TouchableOpacity 
      key={index} 
      style={styles.serviceOption}
      onPress={() => router.push(`/fortune/${item.route}`)}
    >
      <View style={[styles.serviceIcon, { backgroundColor: `${item.color}10` }]}>
        <Ionicons name={item.icon} size={20} color={item.color} />
      </View>
      <Text style={styles.serviceTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
            {/* Blurred Background Elements - Simulating CSS blur() with layered gradients */}
      
      {/* Blue Circle Group */}
      <View style={[styles.backgroundElement, styles.backgroundElement1, styles.blurLayer]}>
        <LinearGradient
          colors={['rgba(30, 107, 200, 0.15)', 'rgba(30, 107, 200, 0.05)', 'transparent']}
          style={styles.gradientFill}
        />
      </View>
      <View style={[styles.backgroundElement, styles.backgroundElement1, styles.blurLayer2]}>
        <LinearGradient
          colors={['rgba(30, 107, 200, 0.08)', 'transparent']}
          style={styles.gradientFill}
        />
      </View>
      
      {/* Orange Circle Group */}
      <View style={[styles.backgroundElement, styles.backgroundElement2, styles.blurLayer]}>
        <LinearGradient
          colors={['rgba(255, 69, 0, 0.15)', 'rgba(255, 69, 0, 0.05)', 'transparent']}
          style={styles.gradientFill}
        />
      </View>
      <View style={[styles.backgroundElement, styles.backgroundElement2, styles.blurLayer2]}>
        <LinearGradient
          colors={['rgba(255, 69, 0, 0.08)', 'transparent']}
          style={styles.gradientFill}
        />
      </View>
      
      {/* Gold Circle Group */}
      <View style={[styles.backgroundElement, styles.backgroundElement3, styles.blurLayer]}>
        <LinearGradient
          colors={['rgba(255, 215, 0, 0.15)', 'rgba(255, 215, 0, 0.05)', 'transparent']}
          style={styles.gradientFill}
        />
      </View>
      <View style={[styles.backgroundElement, styles.backgroundElement3, styles.blurLayer2]}>
        <LinearGradient
          colors={['rgba(255, 215, 0, 0.08)', 'transparent']}
          style={styles.gradientFill}
        />
      </View>
      
      {/* Red Circle Group */}
      <View style={[styles.backgroundElement, styles.backgroundElement4, styles.blurLayer]}>
        <LinearGradient
          colors={['rgba(231, 76, 60, 0.12)', 'rgba(231, 76, 60, 0.04)', 'transparent']}
          style={styles.gradientFill}
        />
      </View>
      <View style={[styles.backgroundElement, styles.backgroundElement4, styles.blurLayer2]}>
        <LinearGradient
          colors={['rgba(231, 76, 60, 0.06)', 'transparent']}
          style={styles.gradientFill}
        />
      </View>

      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.greeting}>
              <Text style={styles.greetingTitle}>Merhaba, Kullanıcı</Text>
              <Text style={styles.greetingSubtitle}>FalVibe'a Hoş Geldiniz</Text>
            </View>
            <Image
              source={{
                uri: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ads%C4%B1z%20tasar%C4%B1m%20%2859%29-swaB7Subbj26feEzGrYsOvD8YGbNXs.png'
              }}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Today's Message */}
          <View style={styles.todayMessage}>
            <View style={styles.messageHeader}>
              <Text style={styles.messageTitle}>Günün Mesajı</Text>
              <LinearGradient
                colors={['#1E6BC8', '#FFD700', '#FF4500']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.messageLine}
              />
            </View>
            <Text style={styles.messageText}>
              "Bugün, geçmişin gölgelerinden sıyrılıp geleceğin parlak ışığına doğru adım atma zamanı. 
              Yıldızlar senin için sıralanıyor."
            </Text>
          </View>

          {/* Featured Fortune Cards */}
          <View style={styles.featuredSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Öne Çıkanlar</Text>
            </View>
            <FlatList
              data={featuredCards}
              renderItem={renderFeatureCard}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredList}
              snapToInterval={width * 0.75 + 16}
              decelerationRate="fast"
            />
          </View>

          {/* Service Options Grid */}
          <View style={styles.servicesSection}>
            <View style={styles.servicesGrid}>
              {serviceOptions.map((item, index) => renderServiceOption(item, index))}
            </View>
          </View>

          {/* Banner Advertisement */}
          <View style={styles.bannerSection}>
            <BlurView intensity={80} style={styles.banner}>
              <LinearGradient
                colors={['#1E6BC8', '#FFD700', '#FF4500']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.bannerTop}
              />
              <View style={styles.bannerContent}>
                <View style={styles.adLabel}>
                  <Ionicons name="sparkles" size={16} color="#1E6BC8" />
                  <Text style={styles.adText}>REKLAM</Text>
                  <Ionicons name="sparkles" size={16} color="#1E6BC8" />
                </View>
              </View>
            </BlurView>
          </View>

          <View style={styles.bottomPadding} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F0',
  },
  backgroundElement: {
    position: 'absolute',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  gradientFill: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundElement1: {
    top: '-20%',
    left: '-10%',
    width: '50%',
    height: '40%',
  },
  backgroundElement2: {
    bottom: '-10%',
    right: '-5%',
    width: '40%',
    height: '30%',
  },
  backgroundElement3: {
    top: '40%',
    right: '10%',
    width: '30%',
    height: '25%',
  },
  backgroundElement4: {
    bottom: '30%',
    left: '5%',
    width: '35%',
    height: '25%',
  },
  floatingElement1: {
    top: '15%',
    left: '60%',
    width: '25%',
    height: '20%',
  },
  floatingElement2: {
    bottom: '50%',
    right: '70%',
    width: '20%',
    height: '15%',
  },
  // Blur layer styles for creating depth effect
  blurLayer: {
    // Base layer for blur effect
  },
  blurLayer2: {
    // Outer layer for extended blur
    transform: [{ scale: 1.5 }],
    opacity: 0.6,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  greeting: {
    flex: 1,
  },
  greetingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  greetingSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  logo: {
    width: 120,
    height: 48,
  },
  todayMessage: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E6BC8',
    marginRight: 8,
  },
  messageLine: {
    height: 2,
    width: 64,
    borderRadius: 1,
  },
  messageText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  featuredSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  featuredList: {
    paddingLeft: 20,
  },
  featureCard: {
    width: width * 0.75,
    marginRight: 16,
  },
  cardImageContainer: {
    width: '100%',
    height: 220,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  tag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  cardRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  servicesSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceOption: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    flex: 1,
  },
  bannerSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  banner: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  bannerTop: {
    height: 4,
  },
  bannerContent: {
    padding: 16,
    alignItems: 'center',
  },
  adLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(156, 163, 175, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  adText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    marginHorizontal: 8,
  },
  bottomPadding: {
    height: 100,
  },
});
