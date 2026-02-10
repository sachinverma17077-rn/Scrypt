// import React, { useEffect, useRef, useState } from 'react';
// import {
//   View,
//   StyleSheet,
//   ScrollView,
//   FlatList,
//   Text,
//   Platform,
//   TouchableOpacity,
//   Alert,
//   Modal,
//   Keyboard,
// } from 'react-native';
// import colors from '../../constants/colors';
// import icons from '../../constants/icons';
// import RangeSlider from '../Ui/RangeSlider';
// import Press from './Press';
// import Icon from '../Ui/Icon';
// import Typography from '../Ui/Typography';
// import BottomSheet from '../Ui/BottomSheet';
// import { useSelector } from 'react-redux';
// import {
//   PROPERTY_FILTER_DATA,
//   PROPERTY_SEARCH_MASTER,
// } from '../../Backend/api_routes';
// import { isDebug, POST_FORMDATA } from '../../Backend/Backend';
// import { heightPercentageToDP } from 'react-native-responsive-screen';
// import Fonts from '../../constants/Fonts';
// import localization from '../../constants/localization';
// import Input from '../Ui/Input';
// import FormContainer from './FormContainer';
// import { TextInput } from 'react-native-gesture-handler';
// import { KeyboardAvoidingView } from 'react-native';
// import { FULL_HEIGHT } from '../../constants/layout';

// const CustomBottomSheet = ({
//   isVisible,
//   filterData,
//   onClose = () => { },
//   height = '80%',
//   title,
//   onShowPress = () => { },
//   onClearAllPress,
//   filterSearchData = () => { },
// }) => {
//   const TabflatListRef = useRef(null);
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(0);
//   const [minAreaRange, setMinAreaRange] = useState(0);
//   const [maxAreaRange, setMaxAreaRange] = useState(0);
//   const [amenitiesList, setAmenitiesList] = useState([]);
//   const [selectedAmenities, setSelectedAmenities] = useState({});
//   const getDetails = useSelector(State => State?.userDetails);
//   const lang_code = useSelector(store => store.langCode);
//   const [property_type, setProperty_type] = useState([]);
//   const [amenities_group_url, setAmenities_group_url] = useState('');
//   const [facility_group_url, setfacility_group_url] = useState('');
//   const [features_group_url, setFeatures_group_url] = useState('');
//   const [features_url, setFeatures_url] = useState('');
//   const [amenities_url, setAmenities_url] = useState('');
//   const [facility_url, setfacility_url] = useState('');
//   const [property_min_max_price, setProperty_min_max_price] = useState({});
//   const [property_min_max_area, setProperty_min_max_area] = useState({});
//   const [facility_list, setFacility_list] = useState([]);
//   const [newId, setNewId] = useState({});
//   const options = [localization.customBottomSheet.any, 1, 2, 3, 4, 5, 6];
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [selectedOptionsNew, setSelectedOptionsNew] = useState({});
//   const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
//   const [propertyCode, setPropertyCode] = useState('');
//   const [property_name, setProperty_name] = useState('');
//   useEffect(() => {
//     property_search_master();
//   }, []);

//   const onFilter = value => {
//     filterSearchData({
//       min_price: minPrice,
//       max_price: maxPrice,
//       min_area: minAreaRange,
//       max_area: maxAreaRange,
//       facilities: selectedOptions ? selectedOptions : '',
//       amenities: newId ? newId : [],
//       property_code: propertyCode,
//       property_name: property_name,
//     });
//   };

//   const toggleAmenity = (groupId, amenityId) => {
//     setSelectedAmenities(prevState => {
//       const currentSelections = prevState[groupId] || [];
//       const isSelected = currentSelections.includes(amenityId);

//       const updatedGroupSelections = isSelected
//         ? currentSelections.filter(id => id !== amenityId)
//         : [...currentSelections, amenityId];

//       const updatedState = {
//         ...prevState,
//         [groupId]: updatedGroupSelections,
//       };

//       if (updatedGroupSelections.length === 0) {
//         const { [groupId]: omitted, ...rest } = updatedState;
//         return rest;
//       }

//       return updatedState;
//     });
//   };

//   const getAllInnerIds = () => {
//     const allIds = Object.values(selectedAmenities).flat();
//     // console.log('All Inner IDs:', allIds);
//     setNewId(allIds);
//     // setSelectedAmenities(allIds)
//   };

//   useEffect(() => {
//     getAllInnerIds();
//   }, [selectedAmenities]);

//   const renderAmenityItem = ({ item }) => {
//     const isSelected = selectedAmenities[item.groupId]?.includes(item._id);
//     return (
//       <FormContainer>
//         <Press onPress={() => toggleAmenity(item.groupId, item._id)}>
//           <View
//             style={{
//               marginTop: 12,
//               marginRight: heightPercentageToDP(5),
//               // padding: 10,
//               borderRadius: 8,
//             }}>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 padding: isSelected ? 0 : 2,
//                 alignItems: 'center',
//               }}>
//               <Icon
//                 source={isSelected ? icons?.checked_icon : icons?.ic_box}
//                 size={isSelected ? 30 : 25}
//                 tintColor={isSelected ? colors?.oregon : null}
//               />
//               <Typography
//                 size={15}
//                 marginLeft={10}
//                 type="Poppins_Regular"
//                 color={colors?.inputBorder}>
//                 {item.amenity_name}
//               </Typography>
//             </View>
//           </View>
//         </Press>
//       </FormContainer>
//     );
//   };

//   const property_search_master = () => {
//     const body = new FormData();
//     body.append(
//       'req',
//       JSON.stringify({
//         api_type: 'mobile',
//         method_name: 'getCityAndDirection',
//         device_token: 'fcmToken',
//         device_type: Platform.OS,
//         data: {
//           slug: getDetails?.slug,
//         },
//         lang_code: lang_code ? lang_code : 'en',
//       }),
//     );
//     body.append('debug_json_view', isDebug);

//     POST_FORMDATA(
//       PROPERTY_FILTER_DATA,
//       body,
//       success => {
//         console.log('==successsuccess====',success);
//         if (success.status === 'success') {
//           // setDestination_list(success?.destination_list);
//           setProperty_min_max_price(success?.property_min_max_price);
//           setProperty_min_max_area(success?.property_min_max_area);
//           setProperty_type(success?.property_type);
//           setMinPrice(success?.property_min_max_price?.min_price);
//           setMaxPrice(success?.property_min_max_price?.max_price);
//           setMaxAreaRange(success?.property_min_max_area?.max_area);
//           setMinAreaRange(success?.property_min_max_area?.min_area);
//           // setBooking_time_slot(success?.booking_time_slot);
//           // setproperty_type_image_url(success?.property_type_image_url);
//           // setRecent_search_property(success?.recent_search_property);
//           setAmenities_group_url(success?.amenities_group_url);
//           setfacility_group_url(success?.facility_group_url);
//           setFeatures_group_url(success?.features_group_url);
//           setFeatures_url(success?.features_url);
//           setAmenities_url(success?.amenities_url);
//           setfacility_url(success?.facility_url);
//           setAmenitiesList(success?.amenity_list || []);
//           setFacility_list(success?.facility_list);
//         } else {
//           console.log('======');
//         }
//       },
//       error => {
//         console.log('===error==', error);
//       },
//       fail => {
//         console.log('===fail==', fail);
//       },
//     );
//   };

//   const handleOptionPress = (facilityId, option) => {
//     if (option === 'Any') {
//       setSelectedOptionsNew(prevState => ({
//         ...prevState,
//         [facilityId]: option,
//       }));
//       setSelectedOptions(prevState => ({
//         ...prevState,
//         [facilityId]: 0,
//       }));
//     } else {
//       setSelectedOptions(prevState => ({
//         ...prevState,
//         [facilityId]: option,
//       }));
//       setSelectedOptionsNew(prevState => ({
//         ...prevState,
//         [facilityId]: option,
//       }));
//     }
//   };

//   const renderInputItem = ({ item }) => (
//     <View style={styles.facilityContainer}>
//       <Text style={styles.facilityName}>{item?.facility_name}</Text>
//       <View style={styles.optionsContainer}>
//         {renderOptionButtons(item._id)}
//       </View>
//       <View
//         style={{
//           height: 1,
//           backgroundColor: colors?.borderBottomClr,
//           marginVertical: 20,
//           // marginTop: 30,
//         }}
//       />
//     </View>
//   );
//   const renderOptionButtons = facilityId => (
//     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//       <View style={{ flexDirection: 'row' }}>
//         {options?.map((option, index) => (
//           <TouchableOpacity
//             key={index}
//             style={[
//               styles.optionButton,
//               selectedOptionsNew[facilityId] === option &&
//               styles.selectedOptionButton,
//             ]}
//             onPress={() => handleOptionPress(facilityId, option)}>
//             <Text
//               style={[
//                 styles.optionText,
//                 selectedOptionsNew[facilityId] === option &&
//                 styles.selectedOptionText,
//               ]}>
//               {option}
//               {option === 6 && '+'}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </ScrollView>
//   );

//   const handleCheckboxPress = id => {
//     setSelectedCheckboxes(prevState => {
//       const newState = { ...prevState };

//       if (newState[id]) {
//         // If the ID already exists, remove it
//         delete newState[id];
//       } else {
//         // Otherwise, add it with the value 1
//         newState[id] = 1;
//       }

//       return newState;
//     });
//   };

//   const renderCheckboxItem = ({ item }) => (
//     <View
//       style={{
//         // marginTop: 12,
//         marginRight: heightPercentageToDP(5),
//         // padding: 10,
//         borderRadius: 8,
//       }}>
//       <Typography
//         style={{
//           fontSize: 16,
//           marginBottom: 10,
//           fontFamily: Fonts.Poppins_Medium,
//           color: '#000',
//         }}>
//         {item.facility_name}
//       </Typography>
//       <Press
//         onPress={() => handleCheckboxPress(item._id)}
//         style={{
//           flexDirection: 'row',
//           padding: 2,
//         }}>
//         <Icon
//           source={
//             selectedCheckboxes[item._id] ? icons?.checked_icon : icons?.ic_box
//           }
//           size={25}
//           tintColor={selectedCheckboxes[item._id] ? '#DA4726' : 'gray'}
//         />

//         <Typography
//           size={15}
//           marginLeft={10}
//           type="Poppins_Regular"
//           color={colors?.inputBorder}>
//           {item.facility_name}
//         </Typography>
//       </Press>
//     </View>
//   );

//   const renderFacilityGroup = ({ item }) => {
//     return (
//       <View style={[styles.groupContainer]}>
//         <Text style={styles.groupTitle}>{item.facility_group_name}</Text>
//         {/* Render Input Facilities */}
//         {item.facility_list.input && (
//           <FlatList
//             style={{ marginHorizontal: 0 }}
//             data={item.facility_list.input}
//             renderItem={renderInputItem}
//             keyExtractor={inputItem => inputItem._id}
//           />
//         )}

//         {/* Render Checkbox Facilities */}
//         {item.facility_list.checkbox && (
//           <FlatList
//             data={item.facility_list.checkbox}
//             numColumns={2}
//             renderItem={renderCheckboxItem}
//             keyExtractor={checkboxItem => checkboxItem._id}
//           // horizontal={true}
//           />
//         )}
//       </View>
//     );
//   };
//   return (
//     <BottomSheet
//       containerStyle={{
//         height: FULL_HEIGHT,
//       }}
//       isVisible={isVisible} onClose={onClose} height={'100%'}>
//       <View style={{
//         height: FULL_HEIGHT,
//       }}>
//         <View
//           style={styles?.mainBottomView}
//           showsVerticalScrollIndicator={false}>
//           <View style={styles?.filteHead}>
//             <Typography
//               type={'Poppins_Bold'}
//               size={18}
//               color={colors?.inputBorder}>
//               {localization.customBottomSheet.filter}
//             </Typography>
//             <TouchableOpacity
//               style={{
//                 padding: 10,
//                 backgroundColor: colors.oregon,
//                 borderRadius: 100,
//               }}
//               onPress={() => {
//                 Keyboard?.dismiss();
//                 onClose();
//               }}>
//               <Icon
//                 size={15}
//                 tintColor={colors?.white}
//                 source={icons?.ic_closeIcon}
//               />
//             </TouchableOpacity>
//           </View>
//           <FormContainer
//             nestedScrollEnabled={true}
//             style={{
//               flex: 1,
//               backgroundColor: '#fff',
//               justifyContent: 'flex-end',
//             }}
//             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//             <View style={{ paddingHorizontal: 20 }}>
//               {/* <View style={styles?.bottomViewFrsLine} /> */}

//               <Typography
//                 style={{ marginTop: 25 }}
//                 type={'Poppins_SemiBold'}
//                 size={18}
//                 color={colors?.black}>
//                 {localization.customBottomSheet.priceRangge}
//               </Typography>

//               <Typography
//                 style={{ marginTop: 2 }}
//                 type="Poppins_Regular"
//                 szie={14}
//                 color={colors?.inputBorder}>
//                 {localization.customBottomSheet.nightlyPrice}
//               </Typography>

//               <View style={{ marginTop: 15 }}>
//                 <RangeSlider
//                   min={property_min_max_price?.min_price}
//                   max={property_min_max_price?.max_price}
//                   low={+minPrice}
//                   high={+maxPrice}
//                   minValue={minPrice}
//                   maxValue={maxPrice}
//                   onValueChanged={(low, high) => {
//                     setMinPrice(low);
//                     setMaxPrice(high);
//                   }}
//                 />

//                 <View style={styles?.minMax}>
//                   <View style={styles?.priceBox}>
//                     <Typography
//                       style={{ paddingLeft: 8, top: 5 }}
//                       color={colors?.inputBorder}
//                       size={14}
//                       type={'Poppins_Medium'}>
//                       {localization.customBottomSheet.minimum}
//                     </Typography>
//                     <View style={{ flexDirection: 'row', width: '70%' }}>
//                       <TextInput
//                         style={{
//                           paddingHorizontal: 8,
//                           paddingVertical: 4,
//                           fontSize: 18,
//                           color: colors?.inputBorder,
//                           fontFamily: 'Poppins_Medium',
//                           // backgroundColor:'red',
//                           bottom: 2
//                         }}
//                         keyboardType="numeric"
//                         value={minPrice.toString()}
//                         onChangeText={text => {
//                           const value = parseInt(text) || 0;
//                           setMinPrice(value);
//                         }}
//                       />
//                       <Typography
//                         type={'Poppins_Medium'}
//                         size={18}
//                         color={colors?.inputBorder}>
//                         {localization.customBottomSheet.sar}
//                       </Typography>
//                     </View>
//                     {/* <Typography
//                     type={'Poppins_Medium'}
//                     size={18}
//                     color={colors?.inputBorder}>
//                     {minPrice} {localization.customBottomSheet.sar}
//                   </Typography> */}
//                   </View>
//                   <View style={styles?.sepreator}>
//                     <Typography
//                       type={'Poppins_Medium'}
//                       size={18}
//                       color={colors?.inputBorder}>
//                       -
//                     </Typography>
//                   </View>
//                   <View style={styles?.priceBox}>
//                     <Typography
//                       style={{ paddingLeft: 8, top: 5 }}
//                       color={colors?.inputBorder}
//                       size={14}
//                       type={'Poppins_Medium'}>
//                       {localization.customBottomSheet.maximum}
//                     </Typography>
//                     <View style={{ flexDirection: 'row', width: '70%' }}>
//                       <TextInput
//                         style={{
//                           // paddingHorizontal: 8,
//                           // paddingVertical: 4,
//                           fontSize: 18,
//                           color: colors?.inputBorder,
//                           fontFamily: 'Poppins_Medium',

//                         }}
//                         keyboardType="numeric"
//                         value={maxPrice.toString()}
//                         onChangeText={text => {
//                           const value = parseInt(text) || 0;
//                           setMaxPrice(value);
//                         }}
//                       />
//                       <Typography
//                         type={'Poppins_Medium'}
//                         size={18}
//                         color={colors?.inputBorder}>
//                         {localization.customBottomSheet.sar}
//                       </Typography>
//                     </View>
//                     {/* <Typography
//                     type={'Poppins_Medium'}
//                     size={18}
//                     color={colors?.inputBorder}>
//                     {maxPrice} {localization.customBottomSheet.sar}
//                   </Typography> */}
//                   </View>
//                 </View>
//                 <View style={styles?.botommViewLine} />

//                 <Typography
//                   style={{}}
//                   type={'Poppins_SemiBold'}
//                   size={18}
//                   color={colors?.black}>
//                   {localization.customBottomSheet.areaRange}
//                 </Typography>

//                 <View style={{ marginTop: 15 }}>
//                   <RangeSlider
//                     min={property_min_max_area?.min_area}
//                     max={property_min_max_area?.max_area}
//                     low={+minAreaRange}
//                     high={+maxAreaRange}
//                     minValue={minAreaRange}
//                     maxValue={maxAreaRange}
//                     onValueChanged={(low, high) => {
//                       setMinAreaRange(low);
//                       setMaxAreaRange(high);
//                     }}
//                   />
//                   <View style={styles?.minMax}>
//                     <View style={styles?.priceBox}>
//                       <Typography
//                         style={{ paddingLeft: 8, top: 5 }}
//                         color={colors?.inputBorder}
//                         size={14}
//                         type={'Poppins_Medium'}>
//                         {localization.customBottomSheet.minimum}
//                       </Typography>

//                       <View style={{ flexDirection: 'row', width: '70%' }}>
//                         <TextInput
//                           style={{
//                             // paddingHorizontal: 8,
//                             paddingVertical: 4,
//                             fontSize: 18,
//                             color: colors?.inputBorder,
//                             fontFamily: 'Poppins_Medium',
//                             bottom: 2

//                           }}
//                           keyboardType="numeric"
//                           value={minAreaRange?.toString()}
//                           onChangeText={text => {
//                             const value = parseInt(text) || 0;
//                             setMinAreaRange(value);
//                           }}
//                         />
//                         <Typography
//                           type={'Poppins_Medium'}
//                           size={18}
//                           color={colors?.inputBorder}>
//                           {localization.customBottomSheet.sar}
//                         </Typography>
//                       </View>

//                       {/* <Typography
//                       type={'Poppins_Medium'}
//                       size={18}
//                       color={colors?.inputBorder}>
//                       {minAreaRange}
//                     </Typography> */}
//                     </View>
//                     <View style={styles?.sepreator}>
//                       <Typography
//                         type={'Poppins_Medium'}
//                         size={18}
//                         color={colors?.inputBorder}>
//                         -
//                       </Typography>
//                     </View>
//                     <View style={styles?.priceBox}>
//                       <Typography
//                         style={{ paddingLeft: 8, top: 5 }}
//                         color={colors?.inputBorder}
//                         size={14}
//                         type={'Poppins_Medium'}>
//                         {localization.customBottomSheet.maximum}
//                       </Typography>
//                       <View style={{ flexDirection: 'row', width: '70%' }}>
//                         <TextInput
//                           style={{
//                             // paddingHorizontal: 8,
//                             // paddingVertical: 4,
//                             fontSize: 18,
//                             color: colors?.inputBorder,
//                             fontFamily: 'Poppins_Medium',
//                           }}
//                           keyboardType="numeric"
//                           value={maxAreaRange?.toString()}
//                           onChangeText={text => {
//                             const value = parseInt(text) || 0;
//                             setMaxAreaRange(value);
//                           }}
//                         />
//                         <Typography
//                           type={'Poppins_Medium'}
//                           size={18}
//                           color={colors?.inputBorder}>
//                           {localization.customBottomSheet.sar}
//                         </Typography>
//                       </View>
//                       {/* <Typography
//                       type={'Poppins_Medium'}
//                       size={18}
//                       color={colors?.inputBorder}>
//                       {maxAreaRange}
//                     </Typography> */}
//                     </View>

//                     <View style={styles?.botommViewLine} />
//                   </View>
//                 </View>

//                 <View
//                   style={{
//                     height: 1,
//                     backgroundColor: colors?.borderBottomClr,
//                     marginVertical: 0,
//                     marginTop: 30,
//                   }}
//                 />
//               </View>

//               <View style={{ marginHorizontal: 0 }}>
//                 <Input
//                   labelTxt={localization.customBottomSheet.property_name}
//                   value={property_name}
//                   onChangeText={v => {
//                     setProperty_name(v);
//                   }}
//                   placeholder={localization.customBottomSheet.property_name}
//                   keyboardType="email-address"
//                 />

//                 <Input
//                   labelTxt={localization.customBottomSheet.PorpertyCode}
//                   value={propertyCode}
//                   onChangeText={v => {
//                     setPropertyCode(v);
//                   }}
//                   placeholder={localization.customBottomSheet.PorpertyCode}
//                   keyboardType="email-address"
//                 />
//               </View>

//               <View style={styles?.botommViewLine} />
//             </View>
//             <FlatList
//               style={{ marginHorizontal: 20 }}
//               data={facility_list}
//               renderItem={renderFacilityGroup}
//               keyExtractor={groupItem => groupItem?._id}
//             />

//             <View style={{ paddingHorizontal: 20 }}>
//               <View style={styles?.botommViewLine} />

//               <Typography
//                 type={'Poppins_SemiBold'}
//                 size={18}
//                 marginBottom={10}
//                 color={colors?.black}>
//                 {localization.customBottomSheet.amenities}
//               </Typography>

//               <FlatList
//                 data={amenitiesList}
//                 renderItem={({ item, index }) => {
//                   return (
//                     <View>
//                       <Typography
//                         type={'Poppins_SemiBold'}
//                         size={15}
//                         color={colors?.black}>
//                         {item.amenity_group}
//                       </Typography>

//                       <FlatList
//                         data={item.amenities.map(amenity => ({
//                           ...amenity,
//                           groupId: item._id,
//                         }))}
//                         numColumns={2}
//                         // horizontal
//                         keyExtractor={item => item._id}
//                         renderItem={renderAmenityItem}
//                       />
//                       <View style={styles?.botommViewLine} />
//                     </View>
//                   );
//                 }}
//               />


//               {Platform.OS === 'ios' && <View style={{ height: 100 }} />}
//             </View>
//             <View style={{ height: 100 }}></View>

//           </FormContainer>
//           <View style={styles?.clearAllView}>
//             <TouchableOpacity
//               onPress={() => {
//                 property_search_master();
//                 setSelectedOptions({});
//                 setNewId({});
//                 setSelectedCheckboxes([]);
//                 setSelectedAmenities({});
//                 setPropertyCode('');
//                 setProperty_name('');
//                 setSelectedOptionsNew({})
//               }}>
//               <Typography
//                 style={{ textDecorationLine: 'underline' }}
//                 type={'Poppins_SemiBold'}
//                 size={16}
//                 color={colors?.oregon}>
//                 {localization.customBottomSheet.clearAll}
//               </Typography>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => {
//                 onFilter();
//                 onShowPress();
//                 // setSelectedAmenities({});
//               }}
//               style={styles?.showView}>
//               <Typography
//                 color={colors?.white}
//                 type="Poppins_SemiBold"
//                 size={16}>
//                 {localization.customBottomSheet.show} 1000+{' '}
//                 {localization.customBottomSheet.places}
//               </Typography>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </BottomSheet>
//   );
// };

// const styles = StyleSheet.create({
//   mainBottomView: {
//     flex: 1,
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   filteHead: {
//     paddingHorizontal: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 10,
//     // marginTop: 20,
//     // backgroundColor:'red'
//   },
//   filterTabcss: {
//     backgroundColor: colors?.shadowWhite,
//     padding: 2,
//     marginTop: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     borderRadius: 25,
//     borderColor: colors?.filtertabboredr,
//     borderWidth: 1,
//     overflow: 'hidden',
//   },
//   firstTab: {
//     backgroundColor: colors?.oregon,
//     borderRadius: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 9,
//     paddingHorizontal: 14,
//   },
//   filterChip: {
//     paddingVertical: 5,
//     borderRadius: 16,
//     marginRight: 8,
//     paddingHorizontal: 18,
//     marginTop: 8,
//   },
//   filterChipText: {
//     fontSize: 16,
//     color: colors?.white,
//   },
//   toggleTab: {
//     paddingVertical: 9,
//     paddingHorizontal: 24,
//   },
//   bottomViewFrsLine: {
//     height: 1,
//     backgroundColor: colors?.borderBottomClr,
//     marginTop: 25,
//   },
//   minMax: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginTop: 20,
//   },
//   priceBox: {
//     width: '40%',
//     borderColor: colors?.filtertabboredr,
//     // padding: 8,
//     paddingLeft: 10,
//     borderRadius: 10,
//     borderWidth: 1,
//     // backgroundColor:'red'
//   },
//   sepreator: {
//     width: '20%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   botommViewLine: {
//     height: 1,
//     backgroundColor: colors?.borderBottomClr,
//     marginVertical: 20,
//     marginTop: 30,
//   },
//   amnetyView: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 20,
//   },

//   bookingListView: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 15,
//   },
//   proptypeView: {
//     borderColor: colors?.filtertabboredr,
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingLeft: 10,
//     paddingVertical: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 0.5,
//     margin: 0,
//   },
//   clearAllView: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     // marginTop: 20,
//     alignItems: 'center',
//     // backgroundColor:'red',
//     position: 'absolute',
//     zIndex: 999,
//     bottom: 30,
//     // top:-30,
//     height: 80,
//     width: '100%',
//     backgroundColor: '#fff',
//     paddingHorizontal: 10
//   },
//   showView: {
//     backgroundColor: colors?.black,
//     paddingVertical: 13,
//     paddingHorizontal: 18,
//     borderRadius: 80,
//   },
//   filterSecHead: {
//     marginTop: 12,
//     paddingLeft: 20,
//   },
//   filtersecList: {
//     height: 38,
//     justifyContent: 'center',
//     marginTop: 10,
//   },
//   filterSecContentCss: {
//     flexGrow: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 18,
//   },
//   filtersecPress: {
//     borderRadius: 20,
//     width: 50,
//     alignSelf: 'center',
//     paddingVertical: 5,
//     // height: 30,
//     justifyContent: 'center',
//   },
//   groupContainer: {
//     // marginBottom: 20,
//   },
//   groupTitle: {
//     fontSize: 18,
//     marginBottom: 10,
//     color: '#000',
//     fontFamily: Fonts.Poppins_SemiBold,
//   },
//   itemContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   image: {
//     width: 50,
//     height: 50,
//     marginRight: 10,
//   },

//   facilityContainer: {
//     // marginBottom: 20,
//     // flexDirection: 'row',
//   },
//   facilityName: {
//     fontSize: 16,
//     marginBottom: 10,
//     fontFamily: Fonts.Poppins_Medium,
//     color: '#000',
//   },
//   optionsContainer: {
//     flexDirection: 'row',
//     // flexWrap: 'wrap',
//     justifyContent: 'flex-start',
//   },
//   optionButton: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 20,
//     paddingVertical: 6,
//     paddingHorizontal: 18,
//     marginRight: 8,
//     marginBottom: 10,
//   },
//   selectedOptionButton: {
//     backgroundColor: '#E53935',
//     borderColor: '#E53935',
//   },
//   optionText: {
//     color: '#000',
//   },
//   selectedOptionText: {
//     color: '#fff',
//   },
//   selectedFacilityContainer: {
//     borderColor: 'blue',
//     backgroundColor: 'lightblue',
//   },

//   checkboxContainer: {
//     marginTop: 12,
//     marginRight: heightPercentageToDP(5),
//     padding: 10,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: 'gray',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   selectedCheckboxContainer: {
//     borderColor: 'blue', // Example color for selected state
//   },
//   iconContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   checkboxText: {
//     marginLeft: 10,
//     fontSize: 15,
//     color: 'black', // Default text color
//   },
//   selectedCheckboxText: {
//     color: 'blue', // Example color for selected state
//   },
// });

// export default CustomBottomSheet;
