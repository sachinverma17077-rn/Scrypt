import { Image, Keyboard, Platform, ScrollView, StyleSheet, TouchableOpacity, View, } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Colors } from '../../../Constants/colors';
import BgImageHeader from '../../../Component/UI/BgImageHeader'
import { Images } from '../../../Constants/Images';
import Typography from '../../../Component/UI/Typography';
import { Fonts } from '../../../Constants/Font';
import { FULL_HEIGHT, FULL_WIDTH } from '../../../Constants/Dimensions';
import localization from '../../../Constants/localization';
import icons from '../../../Constants/icons';
import CustomModal from '../../../Component/Modal/CustomModal';
import Input from '../../../Component/UI/Input';
import FormContainer from '../../../Component/UI/FormContainer';
import Button from '../../../Component/UI/Button';
import { isValidForm } from '../../../Backend/Utility';
import Press from '../../../Component/UI/Press';
import { validators } from '../../../Backend/validators';


const ComingSoon = ({
	text_style,
	style_button,
	title,
	body,
	onPress = () => { },
	showIcons,
	coming_soon
}) => {

	const [modalVisible, setModalVisible] = useState(false);
	const [clubCode, setClubCode] = useState('');
	const [error, setError] = useState({});

	const handleSubmit = () => {
		const errors = {
			clubCode: validators.checkRequire(localization.chatScreen.clubCode, clubCode),
		};
		setError(errors);
		if (isValidForm(errors)) {
			setModalVisible(false);
			setClubCode('');
		}
	};
	return (
		<View style={{ flex: 1, backgroundColor: Colors.White, paddingBottom: 0, }}>

			<View style={{
				flex: 1, borderTopLeftRadius: 30,
				borderTopRightRadius: 30,
				// bottom: 30,
				marginTop: 15
			}}>
				<View style={styles.bottomView}>
					<View style={{ height: 300, width: FULL_WIDTH, top: 0 }}>
						<Image
							resizeMode='contain'
							style={{ height: '100%', width: '70%', alignSelf: 'center', }}
							source={coming_soon}
						/>
						<Typography
							size={18}
							textAlign='center'
							color='#000'
							fontFamily={Fonts.Outfit_Medium}
							style={{}}
						>{localization.comingSoon.soon}</Typography>
					</View>
				</View>

			</View>
		</View>
	)
}

export default ComingSoon

const styles = StyleSheet.create({
	bottomView: {
		backgroundColor: Colors.White,
		height: FULL_HEIGHT,

	},
	user_Image: {
		height: 100,
		width: 100,
		alignSelf: "center",
	},
	single_line: {
		borderWidth: 1,
		borderColor: Colors.outline,
	}
});



// import { Image, Keyboard, Platform, ScrollView, StyleSheet, TouchableOpacity, View, } from 'react-native';
// import React, { useState, useEffect, useRef } from 'react';
// import { Colors } from '../../../Constants/colors';
// import BgImageHeader from '../../../Component/UI/BgImageHeader'
// import { Images } from '../../../Constants/Images';
// import Typography from '../../../Component/UI/Typography';
// import { Fonts } from '../../../Constants/Font';
// import { FULL_HEIGHT, FULL_WIDTH } from '../../../Constants/Dimensions';
// import localization from '../../../Constants/localization';
// import icons from '../../../Constants/icons';
// import CustomModal from '../../../Component/Modal/CustomModal';
// import Input from '../../../Component/UI/Input';
// import FormContainer from '../../../Component/UI/FormContainer';
// import Button from '../../../Component/UI/Button';
// import { isValidForm } from '../../../Backend/Utility';
// import Press from '../../../Component/UI/Press';
// import { validators } from '../../../Backend/validators';


// const ComingSoon = ({
// 	text_style,
//     style_button,
//     title,
//     body,
//     onPress = () => { },
//     showIcons,
// 	coming_soon
// }) => {

// 	const [modalVisible, setModalVisible] = useState(false);
// 	const [clubCode, setClubCode] = useState('');
// 	const [error, setError] = useState({});

// 	const handleSubmit = () => {
// 		const errors = {
// 			clubCode: validators.checkRequire(localization.chatScreen.clubCode, clubCode),
// 		};
// 		setError(errors);
// 		if (isValidForm(errors)) {
// 			setModalVisible(false);
// 			setClubCode('');
// 		}
// 	};
// 	return (
// 		<View style={{ flex: 1, backgroundColor: Colors.White, paddingBottom: 0, }}>

// 			<View style={{
// 				flex: 1, borderTopLeftRadius: 30,
// 				borderTopRightRadius: 30,
// 				bottom: 30,
// 			}}>
// 				<View style={styles.bottomView}>
// 					<View style={{ height: 300, width: FULL_WIDTH, top: 20 }}>
// 						<Image
// 							resizeMode='contain'
// 							style={{ height: '100%', width: '70%', alignSelf: 'center', }}
// 							source={coming_soon}
// 						/>
// 						<Typography
// 							size={18}
// 							textAlign='center'
// 							color='#000'
// 							fontFamily={Fonts.Outfit_Medium}
// 							style={{}}
// 						>{localization.comingSoon.soon}</Typography>
// 					</View>
// 				</View>

// 			</View>
// 		</View>
// 	)
// }

// export default ComingSoon

// const styles = StyleSheet.create({
// 	bottomView: {
// 		backgroundColor: Colors.White,
// 		// padding: 20,
// 		borderTopLeftRadius: 30,
// 		borderTopRightRadius: 30,
// 		height: FULL_HEIGHT,
// 		// justifyContent: 'center',
// 		// marginTop: -25,
// 	},
// 	user_Image: {
// 		height: 100,
// 		width: 100,
// 		alignSelf: "center",
// 	},
// 	single_line: {
// 		borderWidth: 1,
// 		borderColor: Colors.outline,
// 		marginVertical: 25,
// 	}
// });
