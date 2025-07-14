import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
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
import LoadingScreen from '../loading';

const { width } = Dimensions.get('window');

interface FortuneCard {
  id: string;
  title: string;
  image: any;
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
  const [isNavigating, setIsNavigating] = useState(false);
  
  const featuredCards: FortuneCard[] = [
    {
      id: '1',
      title: 'Kahve Falı',
      image: require('../../assets/images/coffe.png'),
      rating: 4.9,
      reviews: 143,
      tag: 'Popüler',
      tagColor: '#FF4500',
      route: 'kahve-fali',
    },
    {
      id: '2',
      title: 'Rüya Yorumu',
      image: require('../../assets/images/dream.png'),
      rating: 4.7,
      reviews: 98,
      tag: 'Yeni',
      tagColor: '#1E6BC8',
      route: 'ruya-yorumu',
    },
    {
      id: '3',
      title: 'Tarot Falı',
      image: require('../../assets/images/tarot.png'),
      rating: 4.8,
      reviews: 112,
      tag: 'Özel',
      tagColor: '#9C27B0',
      route: 'tarot-fali',
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

  const handleNavigation = (route: any) => {
    if (route.endsWith('kahve-fali')) {
      setIsNavigating(true);
      setTimeout(() => {
        router.push(route);
        // Reset state after a delay, in case user navigates back
        setTimeout(() => setIsNavigating(false), 500);
      }, 2000);
    } else {
      router.push(route);
    }
  };

  const renderFeatureCard = ({ item }: { item: FortuneCard }) => (
    <TouchableOpacity 
      style={styles.featureCard}
      onPress={() => handleNavigation(`/fortune/${item.route}`)}
    >
      <View style={styles.cardImageContainer}>
        <Image source={item.image} style={styles.cardImage} />
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
      onPress={() => handleNavigation(`/fortune/${item.route}`)}
    >
      <View style={[styles.serviceIcon, { backgroundColor: `${item.color}10` }]}>
        <Ionicons name={item.icon} size={20} color={item.color} />
      </View>
      <Text style={styles.serviceTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#E6F7FF', '#FFFFFF']}
        style={StyleSheet.absoluteFill}
      />
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
      {isNavigating && <LoadingScreen />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Arka plan rengini LinearGradient yönetecek.
    // backgroundColor: '#F5F5F0',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
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
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
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
