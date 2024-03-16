import React, { useState } from "react";
import {
  Alert,
  Button,
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  ImageBackgroundBase,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Header from "../components/Header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useGlobalState } from "./../GlobalContextState";
import { languages } from "../languages";
import { firebase } from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

const DiseaseDetection = ({ navigation }) => {
  const { state } = useGlobalState();
  const [selectedImage, setSelectedImage] = useState("");
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [disease, setDisease] = useState();
  const remedies={
    "Apple___Apple_scab": [
        "Prune affected areas: Remove and destroy any infected leaves, twigs, or fruit. Pruning infected parts can help prevent the spread of the disease to healthy areas of the tree.",
        "Fungicide treatment: Apply a fungicide specifically labeled for controlling apple scab according to the manufacturer's instructions. Fungicides containing active ingredients like captan, mancozeb, or sulfur can be effective in managing apple scab. Apply the fungicide during the dormant season and continue as directed throughout the growing season to protect new growth from infection."
    ],
    "Apple___Black_rot": [
        "Prune affected branches: Remove any infected branches or leaves to prevent the spread of the disease. Make clean cuts to remove all infected tissue and dispose of it properly.",
        "Fungicide application: Apply a fungicide recommended for controlling black rot according to the manufacturer's instructions. Fungicides containing active ingredients like captan or thiophanate-methyl are commonly used to manage black rot in apple trees. Follow the recommended application schedule to protect the trees from further infection."
    ],
    "Apple___Cedar_apple_rust": [
        "Prune infected branches: Remove any branches or leaves showing signs of cedar apple rust to prevent the spread of the disease. Make sure to prune during dry weather to minimize the risk of further infection. Dispose of the infected plant material properly.",
        "Fungicide treatment: Apply fungicides labeled for cedar apple rust control, such as those containing active ingredients like myclobutanil or triadimefon. Follow the manufacturer's instructions for proper application timing and dosage. Fungicide applications may need to be repeated at specific intervals to effectively manage the disease."
    ],
    "Apple___healthy": [
        "",
        ""
    ],
    "Blueberry___healthy": [
        "",
        ""
    ],
    "Cherry_(including_sour)___Powdery_mildew": [
        "Neem Oil Spray: A common remedy for combating powdery mildew is the application of neem oil, which possesses natural antifungal properties. To prepare this spray, one can mix 1 tablespoon of neem oil with 1 teaspoon of liquid soap and dilute the mixture in 1 liter of water. The solution should be evenly sprayed on the affected cherry plants, ensuring thorough coverage on both sides of the leaves. This application can be repeated every 7-14 days, with the frequency adjusted based on the severity of the infection.",
        "Baking Soda Spray: Another effective remedy involves using a baking soda spray, which helps alter the pH of the leaf surface, creating an environment inhospitable to fungal growth. To prepare the spray, one can mix 1 tablespoon of baking soda with 1 liter of water and add a few drops of liquid soap to enhance adherence to the leaves. The solution should be applied to the cherry plants, focusing on the areas affected by powdery mildew. This treatment can be repeated every 7-10 days until the symptoms subside."
    ],
    "Cherry_(including_sour)___healthy": [
        "",
        ""
    ],
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": [
        "Crop Rotation and Sanitation: Crop rotation is a cultural practice that involves planting different crops in the same area each season to disrupt the life cycle of pathogens and reduce disease pressure. Rotating maize with non-host crops can help break the cycle of Cercospora leaf spot and gray leaf spot. Additionally, practicing good sanitation by removing and destroying crop residues after harvest can help reduce inoculum levels and prevent the spread of the disease to subsequent crops.",
        "Fungicidal Sprays: In severe cases of Cercospora leaf spot and gray leaf spot, fungicidal sprays may be necessary to manage the disease. Fungicides containing active ingredients such as azoxystrobin, chlorothalonil, or maneb can provide effective control when applied preventatively or at the first sign of disease development. It's essential to follow label instructions carefully, including proper application timing, rates, and safety precautions, to ensure maximum efficacy and minimize the risk of resistance development."
    ],
    "Corn_(maize)___Common_rust_": [
        "Resistant Varieties: Planting corn varieties that are resistant to common rust is an effective strategy for disease management. Many maize hybrids have been developed with genetic resistance to common rust, which can significantly reduce the severity of the disease. When selecting corn varieties for planting, farmers should choose those with known resistance to common rust and other prevalent diseases in their region. Resistant varieties can help minimize yield losses and reduce the need for fungicidal sprays.",
        "Fungicidal Sprays: In cases where resistant varieties are not available or insufficient to control common rust, fungicidal sprays can be used as a supplementary management tactic. Fungicides containing active ingredients such as triazoles, strobilurins, or multi-site inhibitors can provide effective control of common rust when applied preventatively or at the first sign of disease development. It's essential to follow label instructions carefully, including proper application timing, rates, and safety precautions, to ensure maximum efficacy and minimize the risk of resistance development."
    ],
    "Corn_(maize)___Northern_Leaf_Blight": [
        "Crop Rotation and Tillage: Implementing crop rotation practices can help break the disease cycle and reduce the incidence of Northern Leaf Blight. Rotating corn with non-host crops such as soybeans or small grains can help decrease the pathogen's population in the soil. Additionally, tillage practices such as plowing can bury infected crop residue, reducing inoculum levels and limiting disease spread. However, it's essential to balance tillage with soil conservation practices to prevent soil erosion and maintain soil health.",
        "Fungicidal Treatments: Fungicides can be used to manage Northern Leaf Blight in corn fields, especially in cases where cultural practices alone may not provide sufficient control. Fungicides containing active ingredients such as azoles, strobilurins, or triazoles can effectively suppress the development of the disease when applied preventatively or at the onset of symptoms. Timing of fungicide application is critical, and treatments should be applied according to local disease forecasting models or scouting observations to optimize efficacy."
    ],
    "Corn_(maize)___healthy": [
        "",
        ""
    ],
    "Grape___Black_rot": [
        "Fungicidal Sprays: Fungicides are an essential component of managing Grape Black Rot. Several fungicides are available for controlling the disease, including those containing active ingredients such as triazoles, strobilurins, or benzimidazoles. These fungicides should be applied preventatively during critical periods of grapevine growth, such as during bloom, fruit set, and veraison, to protect susceptible plant tissues from infection. Regular fungicide applications, as recommended by local agricultural extension services or vineyard consultants, can help suppress the spread of Black Rot and reduce yield losses.",
        "Sanitation and Canopy Management: Cultural practices aimed at reducing sources of inoculum and creating unfavorable conditions for disease development can complement fungicidal treatments. Pruning grapevines to improve air circulation within the canopy can help reduce humidity and promote faster drying of plant tissues, which can inhibit the growth and spread of Black Rot fungi. Additionally, removing and disposing of infected plant material, such as mummified fruit and diseased leaves, from the vineyard can help reduce the pathogen's overwintering potential and limit disease recurrence in subsequent growing seasons. Regular vineyard sanitation practices, combined with effective canopy management techniques, can contribute to long-term Black Rot management and sustainably maintain grapevine health."
    ],
    "Grape___Esca_(Black_Measles)": [
        "Pruning and Vineyard Sanitation: Pruning is an essential cultural practice for managing Grape Black Measles. Infected grapevines should be pruned to remove and dispose of diseased wood, canes, and leaves. This helps to reduce the inoculum source and prevent the spread of the disease within the vineyard. Proper disposal of pruned material, such as burning or burying, is crucial to prevent spore dispersal. Additionally, maintaining good vineyard sanitation practices, such as removing fallen leaves and grape bunches, can further reduce the disease's spread by eliminating potential sources of inoculum.",
        "Fungicidal Treatments: Fungicides are commonly used to control Grape Black Measles and suppress disease development. Various fungicides with active ingredients such as azoxystrobin, fludioxonil, and fosetyl-aluminum are effective against the pathogens responsible for Esca. These fungicides are typically applied preventatively during critical periods of grapevine growth, such as bud break and veraison, to protect the vines from infection. Regular fungicide applications, following recommended spray schedules and dosage rates provided by agricultural extension services or vineyard consultants, can help manage Grape Black Measles and minimize yield losses."
    ],
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": [
        "Fungicidal Sprays: Fungicides play a crucial role in managing Grape Leaf Blight. Various fungicides containing active ingredients such as azoxystrobin, cyprodinil, or boscalid can effectively control the disease. These fungicides should be applied preventatively or at the first signs of disease occurrence, following label instructions and local agricultural extension recommendations. Regular application of fungicides during critical periods of grapevine growth, such as before and during flowering, can help protect susceptible foliage from infection and minimize disease spread. A carefully planned fungicide spray program, integrated with other disease management practices, is essential for effective Grape Leaf Blight control.",
        "Cultural Practices: Cultural practices that promote vineyard hygiene and reduce environmental conditions favorable for disease development can complement fungicidal treatments. Practices such as pruning to improve air circulation within the canopy, trellising to reduce humidity, and weed management to minimize disease reservoirs can help create less conducive conditions for Isariopsis Leaf Spot. Additionally, removing and disposing of infected plant debris and fallen leaves from the vineyard can reduce the inoculum source and limit disease recurrence in subsequent seasons. Integrated pest management strategies that combine chemical control with cultural practices are crucial for sustainable Grape Leaf Blight management and preserving vineyard health."
    ],
    "Grape___healthy": [
        "",
        ""
    ],
    "Orange___Haunglongbing_(Citrus_greening)": [
        "Use of Disease-Resistant Varieties: Planting disease-resistant citrus varieties is an effective strategy to manage Citrus Greening. Researchers and breeders are continuously developing citrus cultivars with improved resistance or tolerance to HLB. These resistant varieties exhibit reduced susceptibility to the disease and can help mitigate its impact on citrus orchards. Growers should consult with agricultural experts or extension services to identify and select suitable disease-resistant citrus varieties that are adapted to their growing conditions. By incorporating resistant cultivars into orchard management practices, growers can enhance the long-term sustainability and productivity of citrus production while minimizing the spread of HLB.",
        "Integrated Pest Management (IPM) Practices: Implementing integrated pest management strategies is crucial for managing Citrus Greening and reducing its spread in citrus orchards. IPM involves a holistic approach that combines various control tactics, including cultural, biological, and chemical methods, to effectively manage pest and disease populations while minimizing environmental impact. Key IPM practices for HLB management include regular monitoring for disease symptoms, early detection of infected trees, removal and destruction of infected plant material, control of psyllid vectors through insecticide applications or biological control agents, and maintenance of orchard hygiene. Integrated pest management programs tailored to specific citrus-growing regions and orchard conditions can help mitigate the impact of Citrus Greening and sustain citrus production in affected areas."
    ],
    "Peach___Bacterial_spot": [
        "Copper-Based Sprays: Copper-based fungicides are commonly used to manage bacterial spot in peach trees. Copper compounds, such as copper hydroxide or copper sulfate, are effective in suppressing bacterial populations and reducing disease severity. These sprays should be applied preventatively during the dormant season and throughout the growing season according to a recommended schedule. Copper-based products provide protection against bacterial spot infection by inhibiting bacterial growth on the tree's surface and reducing the spread of the pathogen within the orchard. Proper application timing and coverage are essential for maximizing the efficacy of copper sprays in controlling bacterial spot and protecting peach fruit and foliage from infection.",
        "Sanitation Practices: Implementing good sanitation practices in the orchard is critical for managing bacterial spot in peach trees. Remove and destroy infected plant material, such as diseased leaves, twigs, and fruit, to reduce the inoculum source and prevent the spread of the bacterium within the orchard. Prune peach trees to improve air circulation and sunlight penetration, which helps to create unfavorable conditions for bacterial growth and minimize disease development. Avoid overhead irrigation and reduce leaf wetness duration to minimize the risk of bacterial spot infection. By incorporating proper sanitation measures into orchard management practices, growers can effectively reduce the incidence and severity of bacterial spot in peach trees and maintain orchard health and productivity."
    ],
    "Peach___healthy": [
        "",
        ""
    ],
    "Pepper,_bell___Bacterial_spot": [
        "Copper-Based Fungicides: Copper-based fungicides are commonly used to manage bacterial spot in pepper plants. Copper compounds, such as copper hydroxide or copper sulfate, have bactericidal properties that can suppress bacterial populations and reduce disease severity. These fungicides should be applied preventatively and according to a recommended schedule to protect pepper plants from bacterial spot infection. Copper sprays form a protective barrier on the plant surface, inhibiting bacterial growth and preventing the spread of the pathogen within the field. Proper application timing and coverage are crucial for maximizing the efficacy of copper-based fungicides in controlling bacterial spot and preserving pepper yield and quality.",
        "Crop Rotation and Sanitation: Crop rotation and sanitation practices are essential components of integrated disease management for bacterial spot in pepper crops. Rotate pepper plants with non-host crops to disrupt the disease cycle and reduce pathogen survival in the soil. Remove and destroy infected plant debris, including diseased leaves, stems, and fruit, to reduce inoculum sources and prevent disease spread. Prune pepper plants to improve air circulation and sunlight penetration, which helps create unfavorable conditions for bacterial growth and minimize disease development. Additionally, avoid overhead irrigation and reduce leaf wetness duration to minimize the risk of bacterial spot infection. By incorporating crop rotation and sanitation practices into pepper production systems, growers can effectively manage bacterial spot and sustain crop health and productivity."
    ],
    "Pepper,_bell___healthy": [
        "",
        ""
    ],
    "Potato___Early_blight": [
        "Fungicidal Sprays: Fungicidal sprays are commonly used to manage early blight in potato crops. Various fungicides, including those containing chlorothalonil, mancozeb, or copper-based compounds, are effective in controlling the early blight pathogen, Alternaria solani. These fungicides should be applied preventatively or at the first sign of disease symptoms to protect potato foliage from infection and limit disease spread. Proper application timing and coverage are critical for achieving optimal control. Follow label instructions carefully and adhere to recommended spray intervals to minimize the risk of fungicide resistance development and maximize efficacy in managing early blight. Additionally, rotating between fungicide classes with different modes of action can help delay the onset of resistance and maintain fungicide effectiveness over time.",
        "Cultural Practices: Implementing cultural practices can help reduce the severity of early blight in potato fields. Practices such as crop rotation, sanitation, and proper plant spacing can help minimize disease pressure and limit pathogen survival and spread. Rotate potato crops with non-host crops to break the disease cycle and reduce inoculum buildup in the soil. Remove and destroy infected plant debris, including diseased leaves and stems, to reduce overwintering sites for the early blight pathogen. Ensure adequate spacing between potato plants to promote air circulation and reduce leaf wetness, which can create favorable conditions for disease development. Mulching with organic materials can also help suppress weed growth and minimize soil splash, further reducing the risk of early blight infection."
    ],
    "Potato___Late_blight": [
        "Fungicidal Sprays: Fungicidal sprays are a primary method for managing late blight in potato crops. Various fungicides, including those containing chlorothalonil, mancozeb, or metalaxyl, are effective in controlling the late blight pathogen, Phytophthora infestans. These fungicides should be applied preventatively or at the first sign of disease symptoms to protect potato foliage from infection and limit disease spread. Proper application timing and coverage are critical for achieving optimal control. Follow label instructions carefully and adhere to recommended spray intervals to minimize the risk of fungicide resistance development and maximize efficacy in managing late blight. Additionally, rotating between fungicide classes with different modes of action can help delay the onset of resistance and maintain fungicide effectiveness over time.",
        "Cultural Practices: Implementing cultural practices can help reduce the severity of late blight in potato fields. Practices such as crop rotation, sanitation, and proper irrigation management can help minimize disease pressure and limit pathogen survival and spread. Rotate potato crops with non-host crops to break the disease cycle and reduce inoculum buildup in the soil. Remove and destroy infected plant debris, including diseased leaves and stems, to reduce overwintering sites for the late blight pathogen. Avoid overhead irrigation and irrigate early in the day to promote foliage drying and reduce leaf wetness, which can create favorable conditions for disease development."
    ],
    "Potato___healthy": [
        "",
        ""
    ],
    "Raspberry___healthy": [
        "",
        ""
    ],
    "Soybean___healthy": [
        "",
        ""
    ],
    "Squash___Powdery_mildew": [
        "Fungicidal Sprays: Fungicidal sprays are commonly used to manage powdery mildew in squash plants. Various fungicides, such as sulfur-based products, potassium bicarbonate, and neem oil, are effective in controlling powdery mildew infections. These fungicides should be applied preventatively or at the first signs of disease symptoms to protect squash foliage from infection and limit disease spread. Proper application timing and coverage are crucial for achieving optimal control. Follow label instructions carefully and adhere to recommended spray intervals to minimize the risk of fungicide resistance development and maximize efficacy in managing powdery mildew. Additionally, rotating between fungicide classes with different modes of action can help delay the onset of resistance and maintain fungicide effectiveness over time.",
        "Cultural Practices: Implementing cultural practices can help reduce the severity of powdery mildew in squash crops. Practices such as spacing plants adequately to promote air circulation, avoiding overhead irrigation, and reducing plant stress through proper fertilization and watering can help create less favorable conditions for powdery mildew development. Remove and destroy infected plant parts, such as leaves showing symptoms of powdery mildew, to reduce inoculum buildup and limit disease spread within the crop. Additionally, planting resistant squash varieties can help reduce the risk of powdery mildew infection and minimize the need for chemical control measures."
    ],
    "Strawberry___Leaf_scorch": [
        "Cultural Practices: Implementing cultural practices is an important component of managing strawberry leaf scorch. Practices such as proper spacing between plants to promote air circulation, adequate irrigation to maintain soil moisture levels, and timely removal of infected plant debris can help reduce the incidence and severity of leaf scorch. Avoid overhead irrigation, as wet foliage can promote disease spread. Additionally, providing sufficient nutrients through balanced fertilization and maintaining optimal pH levels in the soil can enhance plant vigor and resilience against diseases.",
        "Chemical Control: Fungicides can be used as part of an integrated disease management approach to control strawberry leaf scorch. Selective fungicides labeled for use against leaf scorch pathogens can be applied preventatively or at the first signs of disease development. Copper-based fungicides are commonly used for controlling fungal diseases in strawberries and can help suppress leaf scorch when applied according to label instructions. Follow recommended application rates and timings to ensure effective disease control while minimizing environmental impact and risk of fungicide resistance development."
    ],
    "Strawberry___healthy": [
        "",
        ""
    ],
    "Tomato___Bacterial_spot": [
        "Copper-Based Fungicides: Copper-based fungicides are commonly used to manage bacterial spot in tomatoes. These fungicides are applied preventatively or at the first signs of disease development. Copper compounds such as copper hydroxide or copper oxychloride are effective against bacterial spot pathogens and help reduce disease severity. Follow the manufacturer's instructions regarding application rates and timings to ensure optimal disease control while minimizing phytotoxicity risks. Regular application of copper-based fungicides throughout the growing season can help suppress bacterial spot and protect tomato plants from infection.",
        "Crop Rotation and Sanitation: Implementing crop rotation practices and maintaining good sanitation in the garden can help manage bacterial spot in tomatoes. Avoid planting tomatoes or other susceptible crops in the same location year after year to reduce the buildup of bacterial pathogens in the soil. Rotate tomatoes with non-host crops to break the disease cycle and minimize pathogen survival. Remove and destroy infected plant debris promptly to prevent the spread of bacteria to healthy plants. Prune tomato plants to improve air circulation and reduce humidity levels, which can create unfavorable conditions for bacterial spot development."
    ],
    "Tomato___Early_blight": [
        "Fungicidal Sprays: Fungicidal sprays are commonly used to manage early blight in tomatoes. Several fungicides are effective against the causal agent of early blight, Alternaria solani. Fungicides containing active ingredients such as chlorothalonil, mancozeb, or copper-based compounds can help control the disease when applied preventatively or at the first signs of infection. Follow the manufacturer's recommendations regarding application rates, timings, and safety precautions. Apply fungicides evenly to ensure thorough coverage of foliage, stems, and fruits. Rotate fungicides with different modes of action to reduce the risk of fungicide resistance development in the pathogen population.",
        "Cultural Practices: Implementing cultural practices can help reduce the severity of early blight and minimize its impact on tomato crops. Practices such as crop rotation, proper spacing between plants, and removal of infected plant debris can disrupt the disease cycle and reduce inoculum levels in the field. Avoid overhead irrigation, as wet foliage promotes disease development. Instead, use drip irrigation or water plants at the base to keep foliage dry. Mulching around tomato plants with organic materials can help conserve soil moisture and prevent soil splashing, which can spread fungal spores. Prune tomato plants to improve air circulation and reduce humidity levels, creating less favorable conditions for early blight development."
    ],
    "Tomato___Late_blight": [
        "Fungicidal Sprays: Fungicidal sprays are a key component of late blight management in tomato crops. Several fungicides are effective against the causal agent of late blight, Phytophthora infestans. Fungicides containing active ingredients such as chlorothalonil, mancozeb, metalaxyl, or copper-based compounds can provide control when applied preventatively or at the first signs of disease. It's essential to follow label instructions regarding application rates, timings, and safety precautions. Apply fungicides uniformly to ensure thorough coverage of foliage, stems, and fruits. Rotate fungicides with different modes of action to mitigate the risk of fungicide resistance development in the pathogen population.",
        "Cultural Practices: Implementing cultural practices can help reduce the severity of late blight and minimize its impact on tomato crops. Practices such as crop rotation, proper spacing between plants, and removal of infected plant debris can disrupt the disease cycle and lower inoculum levels in the field. Avoid overhead irrigation, as wet foliage creates favorable conditions for disease development. Instead, use drip irrigation or water plants at the base to keep foliage dry. Mulching around tomato plants with organic materials can help conserve soil moisture and prevent soil splashing, which can spread fungal spores. Pruning tomato plants to improve air circulation and reduce humidity levels can create less favorable conditions for late blight development."
    ],
    "Tomato___Leaf_Mold": [
        "Improving Air Circulation: Adequate air circulation around tomato plants is essential for preventing leaf mold. Prune the lower branches of tomato plants to improve airflow and reduce humidity levels within the canopy. This practice helps to create an environment that is less favorable for the development and spread of fungal pathogens. Additionally, avoid overcrowding plants by maintaining proper spacing between them, as this can further enhance air movement and reduce moisture retention on foliage.",
        "Fungicidal Treatments: Applying fungicidal treatments can help control and manage leaf mold in tomato plants. Fungicides containing active ingredients such as chlorothalonil, mancozeb, or copper-based compounds are commonly used for managing fungal diseases like leaf mold. Follow the manufacturer's instructions and recommended application rates when using fungicides. Begin fungicide applications preventatively before symptoms appear or at the earliest signs of disease development. Apply fungicides uniformly to ensure thorough coverage of all plant parts, especially the undersides of leaves where fungal spores may accumulate."
    ],
    "Tomato___Septoria_leaf_spot": [
        "Fungal Spray: Use a fungicidal spray to manage and prevent the spread of Septoria leaf spot. Fungicides containing active ingredients such as chlorothalonil, mancozeb, or copper-based compounds are effective against fungal diseases like Septoria leaf spot. Follow the manufacturer's instructions regarding application rates and frequency. Begin spraying preventatively before symptoms appear or at the earliest signs of disease development. Apply the fungicide uniformly, ensuring thorough coverage of all plant parts, including the undersides of leaves where fungal spores may accumulate.",
        "Crop Rotation and Sanitation: Practice crop rotation to reduce the build-up of fungal pathogens in the soil. Avoid planting tomatoes in the same location year after year to minimize the risk of disease recurrence. Additionally, practice good garden sanitation by removing and disposing of infected plant debris promptly. This helps reduce the source of inoculum for future infections. Remove and destroy any affected leaves or plant parts to prevent the spread of spores to healthy plants. Keep the garden area clean and free from weeds, as weeds can harbor fungal pathogens and contribute to disease spread."
    ],
    "Tomato___Spider_mites Two-spotted_spider_mite": [
        "Horticultural Oil Spray: Use horticultural oil sprays to control two-spotted spider mites on tomato plants. Horticultural oils, such as neem oil or insecticidal soap, suffocate and disrupt the feeding behavior of spider mites. Dilute the oil according to the manufacturer's instructions and spray it directly onto the affected tomato plants, covering both the upper and lower leaf surfaces where spider mites are present. Repeat the application as necessary, following the recommended interval between treatments. Horticultural oil sprays are effective against spider mites while minimizing harm to beneficial insects and the environment.",
        "Biological Control with Predatory Mites: Introduce predatory mites, such as Phytoseiulus persimilis or Neoseiulus californicus, to the tomato garden as a natural enemy of spider mites. These beneficial mites feed on spider mite eggs, nymphs, and adults, helping to reduce spider mite populations and prevent further damage to tomato plants. Release predatory mites early in the season when spider mite populations are low to establish a resident population that can provide ongoing control. Monitor mite populations regularly and introduce additional predatory mites as needed to maintain effective biological control."
    ],
    "Tomato___Target_Spot": [
        "Fungicide Application: Apply fungicides to manage target spot on tomato plants. Fungicides containing active ingredients such as chlorothalonil, mancozeb, or copper-based compounds can help control fungal pathogens responsible for target spot disease. Follow the manufacturer's instructions for dilution rates and application frequencies. Apply fungicides preventatively before symptoms appear or at the first sign of disease to protect healthy foliage and prevent further spread. Ensure thorough coverage of tomato plants, including both upper and lower leaf surfaces, with the fungicide spray. Repeat applications as necessary throughout the growing season, especially during periods of wet or humid weather favorable for disease development.",
        "Cultural Practices: Implement cultural practices to reduce the risk of target spot infection and minimize disease pressure on tomato plants. Practices such as crop rotation, spacing plants adequately to promote air circulation, and avoiding overhead irrigation can help reduce humidity levels and create less favorable conditions for fungal growth. Remove and destroy infected plant debris promptly to prevent spore dispersal and overwintering of fungal pathogens. Prune tomato plants to improve airflow and reduce leaf wetness, which can contribute to disease spread. Mulching around tomato plants can also help prevent soil splash onto foliage, reducing the likelihood of fungal infection."
    ],
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": [
        "Resistant Tomato Varieties: Plant tomato varieties that are resistant to Tomato Yellow Leaf Curl Virus (TYLCV) whenever possible. Some tomato cultivars have been bred to exhibit resistance or tolerance to TYLCV, which can help reduce the severity of the disease in affected plants. Resistant varieties typically show fewer symptoms and maintain better productivity even in the presence of the virus. Consult with local agricultural extension services or seed suppliers to identify suitable TYLCV-resistant tomato cultivars that are adapted to your growing region and production needs.",
        "Vector Control Measures: Implement vector control measures to manage the spread of TYLCV by its insect vectors, particularly whiteflies (Bemisia tabaci). Since whiteflies are responsible for transmitting TYLCV from infected to healthy tomato plants, controlling their populations can help reduce disease transmission. Use insecticides, insecticidal soaps, or botanical extracts to suppress whitefly populations in tomato fields. Additionally, employ physical barriers such as row covers or insect-proof netting to exclude whiteflies from accessing tomato plants. Regular monitoring of whitefly populations and timely intervention with appropriate control measures can help minimize TYLCV transmission and protect tomato crops from infection."
    ],
    "Tomato___Tomato_mosaic_virus": [
        "Crop Rotation and Sanitation: Implement crop rotation practices to reduce the buildup of Tomato Mosaic Virus in soil and prevent reinfection of tomato plants. Avoid planting tomatoes or other susceptible solanaceous crops in the same area where infected plants were grown previously. Rotate with non-solanaceous crops to break the disease cycle and reduce pathogen populations in the soil. Additionally, practice good sanitation measures by removing and destroying infected plant debris promptly. Proper disposal of infected plant materials helps prevent the spread of ToMV to healthy plants and minimizes inoculum sources for future infections.",
        "Vector Management: Manage insect vectors that can transmit Tomato Mosaic Virus among tomato plants. Aphids (such as Myzus persicae) are common vectors of ToMV and can introduce the virus into healthy plants during feeding. Implement insect control measures to suppress aphid populations in tomato fields, such as the application of insecticides, reflective mulches, or physical barriers like insect netting. Regular scouting and monitoring of aphid populations, particularly during periods of high activity, can help detect early infestations and facilitate timely intervention to reduce virus transmission."
    ],
    "Tomato___healthy": [
        "",
        ""
    ]
}
  const [isLoading,setIsLoading]=useState(false)
  const takePhoto = async () => {
    console.log("hello");
    try {
      const cameraResp = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });

      if (!cameraResp.canceled) {
        const { uri } = cameraResp.assets[0];

        makePrediction(uri);
        setSelectedImage(uri);
      }
    } catch (e) {
      Alert.alert("Error Uploading Image " + e.message);
      console.log(e.message);
    }
  };

  const openImagePicker = async () => {
    console.log("Hi");
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });

      // console.log(result);

      if (!result.canceled) {
        setIsLoading(true)
        makePrediction(result.assets[0].uri);
        setSelectedImage(result.assets[0].uri);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const makePrediction = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage(firebase);
    const storageRef = ref(storage, `images/hello.jpg`);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    let imgUrl;
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      }
    );

    await uploadTask;
    imgUrl = await getDownloadURL(ref(storage, `images/hello.jpg`));
    console.log(imgUrl);
    
    try {
      const response = await fetch('http://192.168.29.61:8082/disease/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: imgUrl }),
      });
      const responseData = await response.json();
      console.log(responseData)
      setDisease({
        Name: responseData["prediction"],
        Accuracy:responseData["accuracy"],
        Solution1: remedies[responseData["prediction"]][0],
        Solution2: remedies[responseData["prediction"]][1],
      });
      setIsLoading(false)
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        screen={languages[state.globalVariable].text11}
        navigation={navigation}
      />
      <ScrollView style={style.cont1}>
        <View style={style.cont2}>
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={style.imageCont}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require("./../assets/icon.png")}
              style={style.imageCont}
              resizeMode="contain"
            />
          )}
        </View>
        <View style={style.cont3}>
          <TouchableOpacity
            style={{ padding: 10 }}
            onPress={() => {
              takePhoto();
            }}
          >
            <MaterialCommunityIcons
              name="camera-plus-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10 }} onPress={openImagePicker}>
            <MaterialIcons name="add-photo-alternate" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {
          (!isLoading)?<View style={style.cont2}>
          {disease && (
            <View style={style.cont4}>
              <ImageBackground
                source={require("../assets/gradient.png")}
                resizeMode="cover"
                style={{
                  justifyContent: "center",
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                <View style={{ alignItems: "center", paddingTop: 10 }}>
                  <Text style={[style.text1, { paddingBottom: 10 }]}>
                    {disease.Name}-{disease.Accuracy}
                  </Text>
                  <Text style={style.text1}>Solution</Text>
                </View>
                <Text style={style.text2}>
                  <Entypo name="dot-single" size={24} color="black" />
                  {disease.Solution1}
                </Text>
                <Text style={style.text2}>
                  <Entypo name="dot-single" size={24} color="black" />
                  {disease.Solution2}
                </Text>
              </ImageBackground>
            </View>
          )}
        </View>:
        <View>
          <ActivityIndicator size="large"/>
        </View>
        }
      </ScrollView>
    </View>
  );
};

export default DiseaseDetection;

const style = StyleSheet.create({
  cont1: {
    backgroundColor: "rgb(236,236,236)",
  },
  cont2: {
    width: "100%",
    alignItems: "center",
    padding: 30,
  },
  imageCont: {
    width: 300,
    height: 300,
    borderWidth: 5,
    borderColor: "#0250a3",
  },
  cont3: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: "30%",
  },
  cont4: {
    width: "90%",
    borderRadius: 5,
    height: "auto",
  },
  text1: {
    fontSize: 22,
    fontWeight: "600",
  },
  text2: {
    fontSize: 17,
    fontWeight: "400",
    padding: 5,
  },
});
