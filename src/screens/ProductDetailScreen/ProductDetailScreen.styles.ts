import { StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/scalingUtils';
import { scaleFont } from '../../utils/fontScaling';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: moderateScale(16),
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginBottom: moderateScale(16),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(20),
  },
  cartButton: {
    flex: 1,
    marginRight: moderateScale(10),
    backgroundColor: '#4CAF50',
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    alignItems: 'center',
  },
  shareButton: {
    flex: 1,
    marginLeft: moderateScale(10),
    backgroundColor: '#2196F3',
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    alignItems: 'center',
  },
  title: {
    fontSize: scaleFont(24),
    fontWeight: 'bold',
    marginBottom: moderateScale(8),
    fontFamily: 'ComicRelief-Regular',
  },
  price: {
    fontSize: scaleFont(20),
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: moderateScale(12),
    fontFamily: 'ComicRelief-Regular',
  },
  description: {
    fontSize: scaleFont(16),
    color: '#333',
    lineHeight: moderateScale(24),
    fontFamily: 'ComicRelief-Regular',
  },
  swiper: {
    height: moderateScale(300),
     marginTop: moderateScale(70),
  },
  goBack:{
    padding: moderateScale(10),
                    position: 'absolute',
                    top: moderateScale(10),
                    left: moderateScale(10),
                    zIndex: 1,
  },
  cardImage:{
    width: moderateScale(100), height: moderateScale(100), borderRadius: moderateScale(50), marginTop: moderateScale(10),
  },
  map: {
  height: moderateScale(200),
  marginVertical: moderateScale(10),
},
contactText: {
  color: 'blue',
  marginTop: moderateScale(10),
  fontSize: scaleFont(14),
  fontFamily: 'ComicRelief-Regular',
},
loadingIndicator: {
  marginTop: moderateScale(10),
},
ownerContainer: {
  marginTop: moderateScale(10),
},
ownerName: {
  fontWeight: 'bold',
  fontSize: scaleFont(16),
  fontFamily: 'ComicRelief-Regular',
  color: '#000',
},
ownerJoined: {
  fontSize: scaleFont(14),
  fontFamily: 'ComicRelief-Regular',
  color: '#333',
},
  });

  export const darkScreenStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1c1c1c',
      padding: moderateScale(16),
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      marginBottom: moderateScale(16),
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: moderateScale(20),
    },
    cartButton: {
      flex: 1,
      marginRight: moderateScale(10),
      backgroundColor: '#388E3C',
      padding: moderateScale(12),
      borderRadius: moderateScale(8),
      alignItems: 'center',
    },
    shareButton: {
      flex: 1,
      marginLeft: moderateScale(10),
      backgroundColor: '#1976D2',
      padding: moderateScale(12),
      borderRadius: moderateScale(8),
      alignItems: 'center',
    },
    title: {
      fontSize: scaleFont(24),
      fontWeight: 'bold',
      color: '#f5f5f5',
      marginBottom: moderateScale(8),
      fontFamily: 'ComicRelief-Regular',
    },
    price: {
      fontSize: scaleFont(20),
      color: '#4DA6FF',
      fontWeight: '600',
      marginBottom: moderateScale(12),
      fontFamily: 'ComicRelief-Regular',
    },
    description: {
      fontSize: scaleFont(16),
      color: '#ddd',
      lineHeight: moderateScale(24),
      fontFamily: 'ComicRelief-Regular',
    },
    swiper: {
    height: moderateScale(300),
     marginTop: moderateScale(70),
  },
  goBack:{
    padding: moderateScale(10),
                    position: 'absolute',
                    top: moderateScale(10),
                    left: moderateScale(10),
                    zIndex: 1,
  },
  cardImage:{
    width: moderateScale(100), height: moderateScale(100), borderRadius: moderateScale(50), marginTop: moderateScale(10),
  },
  map: {
  height: moderateScale(200),
  marginVertical: moderateScale(10),
},
contactText: {
  color: 'white',
  marginTop: moderateScale(10),
  fontSize: scaleFont(14),
  fontFamily: 'ComicRelief-Regular',
},
loadingIndicator: {
  marginTop: moderateScale(10),
},
ownerContainer: {
  marginTop: moderateScale(10),
},
ownerName: {
  fontWeight: 'bold',
  fontSize: scaleFont(16),
  fontFamily: 'ComicRelief-Regular',
  color: 'white',
},
ownerJoined: {
  fontSize: scaleFont(14),
  fontFamily: 'ComicRelief-Regular',
  color: 'white',
},

  });
