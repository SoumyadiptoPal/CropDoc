import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useGlobalState } from "./../GlobalContextState";
import { languages } from "../languages";

const NewsScreen = ({ navigation }) => {
  const { state } = useGlobalState();
  const [news, setNews] = useState([
    {
      article_id: "80adb3be92ec0e39d268a8ed44fdbd39",
      title: "BRS: CM should take immediate action on drought, save crops",
      link: "https://www.thehansindia.com/telangana/brs-cm-should-take-immediate-action-on-drought-save-crops-863998",
      keywords: ["telangana,today newspaper,news,cities,state,hyderabad"],
      creator: ["The Hans India"],
      video_url: null,
      description:
        "The BRS leaders on Sunday demanded Chief Minister A Revanth Reddy take immediate action on the prevailing drought conditions in the State and agriculture.",
      content: "ONLY AVAILABLE IN PAID PLANS",
      pubDate: "2024-03-11 04:00:25",
      image_url:
        "https://assets.thehansindia.com/h-upload/2023/10/22/1391621-jagadish-reddy.webp",
      source_id: "thehansindia",
      source_url: "http://www.thehansindia.com",
      source_icon: "https://i.bytvi.com/domain_icons/thehansindia.png",
      source_priority: 58957,
      country: ["india"],
      category: ["top"],
      language: "english",
      ai_tag: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment_stats: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      ai_region: "ONLY AVAILABLE IN CORPORATE PLANS",
    },
    {
      article_id: "c1a8779de79facdbe8df670c50ffed8c",
      title:
        "Cauvery: Karnataka BJP accuses Cong of ‘adjustment politics’ with TN",
      link: "https://www.newindianexpress.com/states/karnataka/2024/Mar/11/cauvery-karnataka-bjp-accuses-cong-of-adjustment-politics-with-tn",
      keywords: ["karnataka"],
      creator: ["Express News Service"],
      video_url: null,
      description: null,
      content: "ONLY AVAILABLE IN PAID PLANS",
      pubDate: "2024-03-11 03:15:17",
      image_url:
        "https://media.assettype.com/newindianexpress/2024-02/31dc517c-343d-4992-bde5-ab30a2e031e8/DRTH_SHT.jpg",
      source_id: "newindianexpress",
      source_url: "https://www.newindianexpress.com/nation",
      source_icon: null,
      source_priority: 15406,
      country: ["india"],
      category: ["top"],
      language: "english",
      ai_tag: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment_stats: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      ai_region: "ONLY AVAILABLE IN CORPORATE PLANS",
    },
    {
      article_id: "29f80ccedc4ae770338fbbbad0aa884d",
      title:
        "Trust deficit between farm unions once again comes to fore during Rail Roko stir - Hindustan Times",
      link: "https://news.google.com/rss/articles/CBMimwFodHRwczovL3d3dy5oaW5kdXN0YW50aW1lcy5jb20vY2l0aWVzL2NoYW5kaWdhcmgtbmV3cy90cnVzdC1kZWZpY2l0LWJldHdlZW4tZmFybS11bmlvbnMtb25jZS1hZ2Fpbi1jb21lcy10by1mb3JlLWR1cmluZy1yYWlsLXJva28tc3Rpci0xMDE3MTAwOTgzNDU0MzAuaHRtbNIBnwFodHRwczovL3d3dy5oaW5kdXN0YW50aW1lcy5jb20vY2l0aWVzL2NoYW5kaWdhcmgtbmV3cy90cnVzdC1kZWZpY2l0LWJldHdlZW4tZmFybS11bmlvbnMtb25jZS1hZ2Fpbi1jb21lcy10by1mb3JlLWR1cmluZy1yYWlsLXJva28tc3Rpci0xMDE3MTAwOTgzNDU0MzAtYW1wLmh0bWw?oc=5",
      keywords: null,
      creator: null,
      video_url: null,
      description:
        "Trust deficit between farm unions once again comes to fore during Rail Roko stir Hindustan TimesRail Roko: Train movements hit in Punjab as farmers squat on tracks The New Indian ExpressFarmers' 4-Hour 'Rail Roko' Today In Protest For Safety Net On Crop Prices NDTVRail traffic disrupted across states, central govt should not limit struggle to Punjab, Haryana: Farmers The Times of IndiaSeveral trains affected as farmers squat on tracks in Punjab Hindustan Times",
      content: "ONLY AVAILABLE IN PAID PLANS",
      pubDate: "2024-03-11 03:01:12",
      image_url: null,
      source_id: "google",
      source_url: "https://news.google.com",
      source_icon: null,
      source_priority: 14,
      country: ["india"],
      category: ["top"],
      language: "english",
      ai_tag: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment_stats: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      ai_region: "ONLY AVAILABLE IN CORPORATE PLANS",
    },
    {
      article_id: "782dddb87624d91b4b8ef7678dd08341",
      title: "Worst summer ahead for Central Karnataka",
      link: "https://www.newindianexpress.com/states/karnataka/2024/Mar/11/worst-summer-ahead-for-central-karnataka",
      keywords: ["karnataka"],
      creator: ["G Subhash Chandra"],
      video_url: null,
      description: null,
      content: "ONLY AVAILABLE IN PAID PLANS",
      pubDate: "2024-03-11 02:55:27",
      image_url:
        "https://media.assettype.com/newindianexpress/2024-03/811d8270-3a91-4322-ad2b-f3b22dd94d69/C_32_1_CH1219_58572713.jpg",
      source_id: "newindianexpress",
      source_url: "https://www.newindianexpress.com/nation",
      source_icon: null,
      source_priority: 15406,
      country: ["india"],
      category: ["top"],
      language: "english",
      ai_tag: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment_stats: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      ai_region: "ONLY AVAILABLE IN CORPORATE PLANS",
    },
    {
      article_id: "ab730ca50e1eaa38248c6261cc1cbecc",
      title: "Underground water depletion harms farmers in Karnataka",
      link: "https://www.newindianexpress.com/states/karnataka/2024/Mar/11/underground-water-depletion-harms-farmers-in-karnataka",
      keywords: ["karnataka"],
      creator: ["Prajna GR"],
      video_url: null,
      description: null,
      content: "ONLY AVAILABLE IN PAID PLANS",
      pubDate: "2024-03-11 02:24:05",
      image_url:
        "https://media.assettype.com/newindianexpress/2024-03/f7be87ed-3bf6-4421-831a-30b0b836b898/TYDN_DJ.jpg",
      source_id: "newindianexpress",
      source_url: "https://www.newindianexpress.com/nation",
      source_icon: null,
      source_priority: 15406,
      country: ["india"],
      category: ["top"],
      language: "english",
      ai_tag: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment_stats: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      ai_region: "ONLY AVAILABLE IN CORPORATE PLANS",
    },
    {
      article_id: "bc96cd6311d923d1cddcbe0fec62b890",
      title:
        "Awareness campaign promotes cashew cultivation expansion in state",
      link: "https://thehillstimes.in/assam/awareness-campaign-promotes-cashew-cultivation-expansion-in-state",
      keywords: ["assam"],
      creator: ["The Hills Times"],
      video_url: null,
      description:
        "HT Bureau GUWAHATI, March 10: An awareness campaign on the expansion of cashew cultivation was successfully conducted by AAU-Zonal Research Station, Diphu in collaboration with ICAR-Directorate Cashew Research, Puttur, Karnataka at Langsoliet and Bokolia on Saturday and Sunday. The program aimed to popularise cashew cultivation and encourage area expansion, given the crop’s suitability for the […]",
      content: "ONLY AVAILABLE IN PAID PLANS",
      pubDate: "2024-03-11 00:45:23",
      image_url:
        "https://thehillstimes.in/wp-content/uploads/2024/03/Awareness-campaign-promotes-cashew-cultivation-expansion-in-state-1068x614.jpeg",
      source_id: "thehillstimes",
      source_url: "https://thehillstimes.in",
      source_icon: "https://i.bytvi.com/domain_icons/thehillstimes.png",
      source_priority: 4168182,
      country: ["india"],
      category: ["top"],
      language: "english",
      ai_tag: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment_stats: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      ai_region: "ONLY AVAILABLE IN CORPORATE PLANS",
    },
    {
      article_id: "b30b775564fd9830eb932cbb6cb5d78c",
      title:
        "‘Roja’ for biz, ‘Rani’ for pickle: Farmer saves 2 chilli varieties",
      link: "https://timesofindia.indiatimes.com/city/guwahati/roja-farmer-bijoy-lakhi-pame-preserves-indigenous-chilli-varieties-roja-and-rani-for-business-and-pickles/articleshow/108377550.cms",
      keywords: null,
      creator: null,
      video_url: null,
      description: null,
      content: "ONLY AVAILABLE IN PAID PLANS",
      pubDate: "2024-03-11 00:35:51",
      image_url:
        "https://static.toiimg.com/photo/msid-108377549,imgsize-25748.cms",
      source_id: "toi",
      source_url: "https://timesofindia.indiatimes.com",
      source_icon: "https://i.bytvi.com/domain_icons/toi.png",
      source_priority: 391,
      country: ["india"],
      category: ["top"],
      language: "english",
      ai_tag: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment_stats: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      ai_region: "ONLY AVAILABLE IN CORPORATE PLANS",
    },
    {
      article_id: "b4f7e99f13917a681c510de1a7cb02ba",
      title: "Rail roko: Train stops near protest on Shambhu tracks",
      link: "https://timesofindia.indiatimes.com/city/chandigarh/rail-roko-protest-train-stops-dangerously-close-to-farmers-on-shambhu-tracks/articleshow/108377520.cms",
      keywords: null,
      creator: null,
      video_url: null,
      description: null,
      content: "ONLY AVAILABLE IN PAID PLANS",
      pubDate: "2024-03-11 00:31:58",
      image_url:
        "https://static.toiimg.com/photo/msid-108377519,imgsize-64284.cms",
      source_id: "toi",
      source_url: "https://timesofindia.indiatimes.com",
      source_icon: "https://i.bytvi.com/domain_icons/toi.png",
      source_priority: 391,
      country: ["india"],
      category: ["top"],
      language: "english",
      ai_tag: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment_stats: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      ai_region: "ONLY AVAILABLE IN CORPORATE PLANS",
    },
    {
      article_id: "de9e349d52cfff51fa9b3837d97bfaea",
      title: "Vande Bharat, Shatabdi delayed due to ‘rail roko’",
      link: "https://timesofindia.indiatimes.com/city/chandigarh/vande-bharat-and-shatabdi-trains-delayed-due-to-rail-roko-agitation/articleshow/108377252.cms",
      keywords: null,
      creator: ["Barinderjit Saluja"],
      video_url: null,
      description: null,
      content: "ONLY AVAILABLE IN PAID PLANS",
      pubDate: "2024-03-11 00:07:09",
      image_url:
        "https://static.toiimg.com/photo/msid-108377251,imgsize-288502.cms",
      source_id: "toi",
      source_url: "https://timesofindia.indiatimes.com",
      source_icon: "https://i.bytvi.com/domain_icons/toi.png",
      source_priority: 391,
      country: ["india"],
      category: ["top"],
      language: "english",
      ai_tag: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment_stats: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      ai_region: "ONLY AVAILABLE IN CORPORATE PLANS",
    },
    {
      article_id: "2d36e31e98ee65f88635230aa78050c9",
      title: "Drought forces labourers to migrate in search of work",
      link: "https://timesofindia.indiatimes.com/city/hubballi/drought-forces-labourers-to-migrate-in-search-of-work/articleshow/108377170.cms",
      keywords: null,
      creator: null,
      video_url: null,
      description: null,
      content: "ONLY AVAILABLE IN PAID PLANS",
      pubDate: "2024-03-11 00:00:22",
      image_url:
        "https://static.toiimg.com/photo/msid-108377168,imgsize-12584.cms",
      source_id: "toi",
      source_url: "https://timesofindia.indiatimes.com",
      source_icon: "https://i.bytvi.com/domain_icons/toi.png",
      source_priority: 391,
      country: ["india"],
      category: ["top"],
      language: "english",
      ai_tag: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment_stats: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      ai_region: "ONLY AVAILABLE IN CORPORATE PLANS",
    },
  ]);
  baseURL = process.env.EXPO_PUBLIC_URL;
  apiKey = process.env.EXPO_PUBLIC_API_KEY;

  useEffect(() => {
    const fetchData = async (query) => {
      let params = {
        apikey: apiKey,
        q: query,
        language: "en",
        country: "us",
      };
      if(state.globalVariable !== "English")
      {
        params.language="hi"
      }

      const queryString = Object.keys(params)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
        )
        .join("&");

      console.log(queryString);
      try {
        const response = await fetch(`${baseURL}?${queryString}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setNews(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    };
    //due to limited API requests News data is hardcoded
    // fetchData("farmers,crops")
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header screen={languages[state.globalVariable].text24} navigation={navigation} />
      <ScrollView style={styles.cont1}>
        {news &&
          news.map((data, index) => <NewsItem data={data} key={index} />)}
      </ScrollView>
    </View>
  );
};

const NewsItem = ({ data }) => {
  const handlePress = () => {
    Linking.openURL(data.link);
  };
  return (
    <TouchableOpacity style={{ width: "100%" }} onPress={handlePress}>
      <View style={styles.cont2} elevation={5}>
        <View style={{ marginRight: 10 }}>
          {data.image_url ? (
            <Image
              source={{ uri: data.image_url }}
              style={{ width: 80, height: 80 }}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require("../assets/BlankNews.png")}
              style={{ width: 80, height: 80 }}
              resizeMode="contain"
            />
          )}
        </View>
        <View style={{ width: 200, alignItems: "center" }}>
          <Text style={{ textAlign: "center", fontWeight: "500" }}>
            {data.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cont1: {
    backgroundColor: "rgb(236,236,236)",
  },
  cont2: {
    width: "90%",
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
  },
});
export default NewsScreen;
