import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const CustomModalNew = ({ visible, onClose,children ,modalContainerCss}) => {
	const translateY = useRef(new Animated.Value(height)).current;

	useEffect(() => {
		if (visible) {
			Animated.timing(translateY, {
				toValue: 0, 
				duration: 300,
				useNativeDriver: true,
			}).start();
		} else {
			Animated.timing(translateY, {
				toValue: height, 
				duration: 300,
				useNativeDriver: true,
			}).start();
		}
	}, [visible]);

	if (!visible) return null;

	return (
		<View style={styles.overlay}>
			<Animated.View style={[styles.modalContainer, modalContainerCss,{ transform: [{ translateY }] }]}>
				<View >{children}</View>
			</Animated.View>
		</View>
	);
};



const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	openButton: { backgroundColor: '#007BFF', padding: 5, borderRadius: 10 },
	buttonText: { color: '#fff', fontSize: 16 },
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	background: { backgroundColor: 'red' },
	modalContainer: {
		backgroundColor: 'white',
		borderRadius:10,
		elevation: 10,
		position: 'absolute',
		width: '95%',
		alignSelf:'center'
	},
});

export default CustomModalNew;
