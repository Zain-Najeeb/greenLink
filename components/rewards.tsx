import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  Pressable,
  Image,
  Linking,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { primaryColour } from "@/constants/Colors";

type Coupon = {
  storeName: string;
  expiryDate: string;
  discount: string;
};

type RewardsProps = {
  coupons: Coupon[];
};

const Rewards: React.FC<RewardsProps> = ({ coupons }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const openCouponModal = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setModalVisible(true);
  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const getLogo = (storeName: string) => {
    switch (storeName) {
      case "Domino's":
        return require("../assets/images/dominosLogo.png");
      case "Trish Juice":
        return require("../assets/images/trish.png");
      case "Street Bitez":
        return require("../assets/images/streetBitez.png");
      case "Indian Curry Express & Bar":
        return require("../assets/images/restaurant.png");
      default:
        return require("../assets/images/rewardPic.png");
    }
  };

  const getLink = (storeName: string) => {
    switch (storeName) {
      case "Domino's":
        return "https://www.dominos.com";
      case "Trish Juice":
        return "https://www.trishjuice.com";
      case "Street Bitez":
        return "https://www.streetbitez.com";
      case "Indian Curry Express & Bar":
        return "https://www.indiancurryexpress.com";
      default:
        return "#";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Coupons</Text>
      <FlatList
        data={coupons}
        keyExtractor={(item, index) => `${item.storeName}-${index}`}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        renderItem={({ item }) => (
          <Pressable
            style={styles.couponItem}
            onPress={() => openCouponModal(item)}
          >
            <View style={styles.couponDetails}>
              <Text style={styles.storeName}>{item.storeName}</Text>
              <Text style={styles.expiryDate}>
                Expires on: {item.expiryDate}
              </Text>
            </View>
            <View style={styles.discountBox}>
              <Text style={styles.discountText}>{item.discount}</Text>
            </View>
            <View style={styles.logoContainer}>
              <Image source={getLogo(item.storeName)} style={styles.logo} />
            </View>
          </Pressable>
        )}
      />

      {/* QR Code Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            {selectedCoupon && (
              <>
                <Text style={[styles.modalTitle, { color: primaryColour }]}>
                  {selectedCoupon.storeName} Coupon
                </Text>
                <Pressable onPress={() => console.log("QR Code Pressed")}>
                  <QRCode
                    value={`Store: ${selectedCoupon.storeName}\nDiscount: ${selectedCoupon.discount}\nExpires: ${selectedCoupon.expiryDate}`}
                    size={200}
                    color="black"
                  />
                </Pressable>

                <Pressable
                  onPress={() => openLink(getLink(selectedCoupon.storeName))}
                >
                  <Text style={[styles.linkText, { color: primaryColour }]}>
                    View Store Website
                  </Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.closeButton,
                    { backgroundColor: primaryColour },
                  ]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollContent: {
    paddingVertical: 10,
  },
  couponItem: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: 250,
    marginRight: 15,
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 12,
    backgroundColor: "#e0e0e0",
  },
  couponDetails: {
    alignItems: "center",
    marginBottom: 10,
  },
  storeName: {
    fontSize: 16,
    fontWeight: "bold",
    color: primaryColour,
    marginBottom: 4,
  },
  expiryDate: {
    fontSize: 14,
    color: "#666",
  },
  discountBox: {
    backgroundColor: primaryColour,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  discountText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  logoContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  logo: {
    resizeMode: "contain",
    maxWidth: 150,
    maxHeight: 80,
    marginLeft: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  linkText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  closeButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Rewards;
