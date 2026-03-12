import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import colors from "../../config/colors";

let { width } = Dimensions.get("window");
width = width * 0.814;

function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const [loadingImage, setLoadingImage] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 5000); // Adjusted to 5 seconds for better UX

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  const handleScroll = (event) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
    setCurrentIndex(newIndex);
  };

  const handleManualScroll = (newIndex) => {
    flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
    setCurrentIndex(newIndex);
  };

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      {loadingImage && (
        <ActivityIndicator
          size="large"
          color={colors.blue}
          style={styles.loadingIndicator}
        />
      )}

      <Image
        source={{ uri: item }}
        style={styles.image}
        resizeMode="cover"
        onLoad={() => setLoadingImage(false)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        onMomentumScrollEnd={handleScroll}
      />

      {/* Indicator Dots */}
      <View style={styles.indicatorContainer}>
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.indicatorDot,
              currentIndex === index && styles.activeIndicatorDot,
            ]}
            onPress={() => handleManualScroll(index)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "95%",
    height: 220, // Matches container height for images
  },
  imageContainer: {
    width, // Use dynamic width for responsiveness
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "95%",
    height: "100%",
    borderRadius: 10,
  },
  indicatorContainer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  indicatorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 5,
  },
  activeIndicatorDot: {
    backgroundColor: "black",
  },
  loadingIndicator: {
    position: "absolute",
    alignSelf: "center",
  },
});

export default ImageSlider;
