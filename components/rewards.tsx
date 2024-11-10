import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  Button,
  Linking,
} from "react-native";
import QRCode from "react-native-qrcode-svg"; // Import QRCode component
import { primaryColour } from "@/constants/Colors";

type Coupon = {
  storeName: string;
  expiryDate: string;
  discount: string;
  link?: string; // Optional link property for the store
};

type RewardsProps = {
  coupons: Coupon[];
};

const Rewards: React.FC<RewardsProps> = ({ coupons }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  // Function to open modal with selected coupon
  const openCouponModal = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setModalVisible(true);
  };

  // Function to open the store link
  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Coupons</Text>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {coupons.map((coupon, index) => (
          <Pressable
            key={`${coupon.storeName}-${index}`}
            style={styles.couponItem}
            onPress={() => openCouponModal(coupon)}
          >
            <View style={styles.couponDetails}>
              <Text style={styles.storeName}>{coupon.storeName}</Text>
              <Text style={styles.expiryDate}>
                Expires on: {coupon.expiryDate}
              </Text>
            </View>
            <View style={styles.discountBox}>
              <Text style={styles.discountText}>{coupon.discount}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

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
                    color="black" // Set QR code color to black
                  />
                </Pressable>

                {/* Show "View Store Website" link for Domino's coupon */}
                {selectedCoupon.storeName === "Domino's" && (
                  <Pressable
                    onPress={() => openLink("https://www.dominos.com")}
                  >
                    <Text style={[styles.linkText, { color: primaryColour }]}>
                      View Store Website
                    </Text>
                  </Pressable>
                )}

                {/* Custom Close Button */}
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
  scrollContainer: {
    height: 200, // Fixed height for scrollable content
  },
  scrollContent: {
    paddingVertical: 10,
  },
  couponItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 12,
    backgroundColor: "#e0e0e0",
  },
  couponDetails: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontWeight: "bold",
    color: primaryColour,
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
  },
  discountText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
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
