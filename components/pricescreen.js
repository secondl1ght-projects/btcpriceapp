import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { getBTCPrice } from "../api/api";
import { Picker } from "react-native";
import { satoshi } from "../satoshi";
import "intl";
import "intl/locale-data/jsonp/en";

export function priceScreen() {
  const [btcprice, setBTCPrice] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [loading, setLoading] = useState(false);

  const priceCallback = useCallback(
    async function () {
      setLoading(true);
      let price = await getBTCPrice(currency);
      const options = { style: "currency", currency: currency };
      const numberFormat = new Intl.NumberFormat("en-US", options);
      setLoading(false);
      setBTCPrice(numberFormat.format(price) + " " + currency);
    },
    [btcprice, currency]
  );

  useEffect(() => {
    priceCallback();
  }, [currency]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1.5, justifyContent: "center" }}>
        <Text style={styles.price}>{btcprice}</Text>
        <View style={{ flex: 0.25, justifyContent: "center", paddingTop: 100 }}>
          <View style={{ opacity: 0.5 }}>
            <Picker
              selectedValue={currency}
              onValueChange={(itemValue, itemIndex) => setCurrency(itemValue)}
            >
              <Picker.Item label="USD" value="USD" />
              <Picker.Item label="GDP" value="GBP" />
              <Picker.Item label="EUR" value="EUR" />
            </Picker>
          </View>
        </View>
        <Button
          title="Get Price"
          onPress={priceCallback}
          color="#F7931A"
          disabled={loading ? true : false}
        />
      </View>
      <View style={{ paddingBottom: 75 }}>
        <Text style={styles.sat}>{satoshi() + " - Satoshi Nakamoto"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3363A8",
    alignItems: "center",
    justifyContent: "center",
  },
  price: {
    fontSize: 35,
    backgroundColor: "lightgreen",
    borderRadius: 5,
  },
  sat: {
    textAlign: "center",
    fontStyle: "italic",
    color: "black",
    backgroundColor: "lightblue",
    borderRadius: 5,
    padding: 5,
  },
});
