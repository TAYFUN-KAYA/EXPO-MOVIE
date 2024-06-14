import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const TestPage = () => {
  const data = [
    {
      id: 1,
      background:
        "https://m.media-amazon.com/images/S/pv-target-images/9fa12c574ee4067adc660031fcef647fda388c96c9b312b1ea047f6236493449.jpg",
      title: "Reacher",
      date: "07.10.2025",
      time: "2 hr",
      price: "$ 15",
      description:
        "The series “Reacher” follows the adventures of Jack Reacher, a former military policeman. While living a peripatetic life, Reacher often encounters crime and injustice, and in the face of these situations, he takes action to bring justice.",
      image:
        "https://static1.colliderimages.com/wordpress/wp-content/uploads/2024/01/alan-ritchson-jack-reacher.jpg",
    },
    {
      id: 2,
      background:
        "https://images.thedirect.com/media/article_full/spider-man-watch-order.jpg",
      title: "Spider-man",
      date: "20.10.2024",
      time: "3 hr",
      price: "$ 10",
      description: `Andrew Garfield stars as Peter Parker/Spider-Man in this reboot directed by Marc Webb. The movie tells the story of Peter's relationship with Gwen Stacy (Emma Stone) and his fight against the Lizard (Rhys Ifans).`,
      image:
        "https://static1.srcdn.com/wordpress/wp-content/uploads/2022/12/andrew-garfield-amazing-spiderman-tobey-maguire-spiderman-tom-holland-far-from-home.jpeg",
    },
    {
      id: 3,
      background:
        "https://alternativemovieposters.com/wp-content/uploads/2021/02/ClaireCurtis_Dune.jpg",
      title: "Dune",
      date: "17.05.2024",
      time: "3 hr",
      price: "$ 20",
      description: `Paul Atreides takes control of Arrakis after the death of his father, Duke Leto Atreides, where he struggles to survive while facing mystical and political forces to fulfill his destiny.`,
      image:
        "https://www.legendary.com/wp-content/uploads/2021/10/dune-trailer.jpg",
    },
    {
      id: 4,
      background:
        "https://m.economictimes.com/thumb/msid-106103086,width-1600,height-900,resizemode-4,imgsize-187382/the-lord-of-the-rings-the-rings-of-power-season-2-see-what-we-know-about-release-date-number-of-episodes-cast-plot-filming-and-more.jpg",
      title: "The lord of the rings",
      date: "12.01.2024",
      time: "3 hr",
      price: "$ 30",
      description: `“The Rings of Power” is set in the Second Age of Middle-earth created by J.R.R. Tolkien. It takes place thousands of years before the events of “The Lord of the Rings” and “The Hobbit”.`,
      image:
        "https://fictionhorizon.com/wp-content/uploads/2023/02/Is-The-Rings-of-Power-Canon-to-the-Movies-The-Lord-of-the-Rings-Timeline-Explained.jpg",
    },
    {
      id: 5,
      background:
        "https://m.economictimes.com/thumb/msid-107371517,width-1600,height-900,resizemode-4,imgsize-81914/the-last-of-us-season-2-see-all-about-release-date-cast-plot-and-more.jpg",
      title: "The lord of the rings",
      date: "28.08.2024",
      time: "2 hr",
      price: "$ 20",
      description: `The Last of Us tells the story of characters struggling to survive in the aftermath of a fungal infection that affects humanity across the globe and leads to the collapse of society.`,
      image:
        "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/08/the-last-of-us-season-2-game-changes-predictions.jpg",
    },
  ];

  const [index, setindex] = useState(0);
  const [loading, setloading] = useState(false);
  const defaultWidth = Dimensions.get("screen").width / 5.5;
  const enlargedWidth = Dimensions.get("screen").width / 2;

  const widthValues = data.map(() => useSharedValue(defaultWidth));
  const opacityValues = data.map(() => useSharedValue(0.8));
  const transformValues = data.map(() => useSharedValue(1));

  const handlePress = (index: number) => {
    setindex((prev: any) => {
      if (prev !== index) {
        containerWidth.value = 0;
        widthValues.forEach((width, i) => {
          if (i === index) {
            width.value = withSpring(enlargedWidth);
            opacityValues[i].value = withSpring(1);
            transformValues[i].value = withSpring(0.9);
          } else {
            width.value = withSpring(defaultWidth);
            opacityValues[i].value = withSpring(0.8);
            transformValues[i].value = withSpring(0.6);
          }
        });
      }
      return index;
    });
  };

  const containerWidth = useSharedValue(0);

  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
      containerWidth.value = withSpring(Dimensions.get("screen").width);
    }, 300);
  }, [index]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFF5E0",
      }}
    >
      <Text
        style={{
          marginLeft: 10,
          fontSize: 20,
          color: "#141E46",
          fontWeight: "600",
        }}
      >
        Buy movie tickets
      </Text>
      <View
        style={{
          marginTop: 15,
          backgroundColor: "red",
        }}
      >
        <View
          style={{
            height: 150,
            backgroundColor: "#FFF5E0",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {data.map((x, i) => {
            const animatedStyle = useAnimatedStyle(() => {
              return {
                width: widthValues[i].value,
                transform: [{ scale: transformValues[i].value }],
              };
            });
            return (
              <Animated.View
                style={[{ height: "100%" }, animatedStyle]}
                key={i}
              >
                <Pressable onPress={() => handlePress(i)}>
                  <Animated.Image
                    source={{ uri: x.background }}
                    style={[
                      {
                        resizeMode: "cover",
                        height: "100%",
                        width: "100%",
                        borderRadius: 10,
                      },
                    ]}
                  />
                </Pressable>
              </Animated.View>
            );
          })}
        </View>
      </View>
      <View
        style={[
          {
            flex: 1,
            backgroundColor: "#141E46",
            marginTop: 10,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 20,
          },
          loading && { justifyContent: "center", alignItems: "center" },
        ]}
      >
        {loading ? (
          <ActivityIndicator size={25} color={"white"} />
        ) : (
          <ScrollView>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "500",
                  marginLeft: 10,
                }}
              >
                {data[index].title}
              </Text>
              <View
                style={{ flex: 1, alignItems: "flex-end", marginRight: 10 }}
              >
                <Pressable
                  style={{
                    height: 30,
                    width: 70,
                    backgroundColor: "#FF6969",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 6,
                  }}
                >
                  <Text style={{ color: "white" }}>Buy</Text>
                </Pressable>
              </View>
            </View>
            <Animated.Image
              style={{
                width: containerWidth,
                resizeMode: "cover",
                height: 180,
                borderRadius: 40,
                marginTop: 20,
              }}
              src={data[index].image}
              onLoad={() => console.log("Resim yüklendi")}
            />
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 20,
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    fontWeight: "500",
                  }}
                >
                  Date
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: 13,
                    fontWeight: "300",
                    marginTop: 5,
                  }}
                >
                  {data[index].date}
                </Text>
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    fontWeight: "500",
                  }}
                >
                  Time
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: 13,
                    fontWeight: "300",
                    marginTop: 5,
                  }}
                >
                  {data[index].time}
                </Text>
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    fontWeight: "500",
                  }}
                >
                  Price
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: 13,
                    fontWeight: "300",
                    marginTop: 5,
                  }}
                >
                  {data[index].price}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Animated.Image
                style={{
                  width: 260,
                  resizeMode: "cover",
                  height: 80,
                  borderRadius: 40,
                  marginTop: 20,
                }}
                src={"https://i.imgur.com/KCENtSb.png"}
              />
            </View>
            <Text
              style={{
                color: "white",
                marginTop: 15,
                fontSize: 12,
                fontWeight: "400",
              }}
            >
              {data[index].description}
            </Text>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default TestPage;
