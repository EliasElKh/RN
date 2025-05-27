import { StyleSheet } from 'react-native';
import { moderateScale } from '../../../utils/scalingUtils';
import { scaleFont } from '../../../utils/fontScaling';
export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(8),
    padding: moderateScale(10),
    marginBottom: moderateScale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),
    elevation: moderateScale(3),
  },
  swiper: {
    height: moderateScale(300),
  },

  title: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    marginTop: moderateScale(10),
    fontFamily: 'ComicRelief-Regular',
  },
  description: {
    marginTop: moderateScale(5),
    color: '#666',
    fontFamily: 'ComicRelief-Regular',
  },
  price: {
    marginTop: moderateScale(5),
    fontWeight: 'bold',
    fontFamily: 'ComicRelief-Regular',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(10),
  },
  editButton: {
    flex: 1,
    backgroundColor: '#3498db',
    padding: moderateScale(8),
    borderRadius: moderateScale(4),
    marginRight: moderateScale(5),
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#e74c3c',
    padding: moderateScale(8),
    borderRadius: moderateScale(4),
    marginLeft: moderateScale(5),
    alignItems: 'center',
  },
  addCartButton:{
    backgroundColor: '#2ecc71',
    borderRadius: moderateScale(4),
    padding: moderateScale(12),
    alignItems: 'center',
    marginTop: moderateScale(16),
    marginBottom: moderateScale(16),
  },
  shareButton: {
    flex: 1,
    marginLeft: moderateScale(10),
    backgroundColor: '#2196F3',
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    alignItems: 'center',
  },
});

export const darkCardStyles = StyleSheet.create({
  card: {
    backgroundColor: '#333',
    borderRadius: moderateScale(8),
    padding: moderateScale(10),
    marginBottom: moderateScale(10),
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),
    elevation: moderateScale(3),
  },
  title: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    marginTop: moderateScale(10),
    color: '#ecf0f1',
    fontFamily: 'ComicRelief-Regular',
  },
  swiper: {
    height: moderateScale(300),
  },
  description: {
    marginTop: moderateScale(5),
    color: '#ecf0f1',
    fontFamily: 'ComicRelief-Regular',
  },
  price: {
    marginTop: moderateScale(5),
    fontWeight: 'bold',
    color: '#ecf0f1',
    fontFamily: 'ComicRelief-Regular',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(10),
  },
  editButton: {
    flex: 1,
    backgroundColor: '#2980b9',
    padding: moderateScale(8),
    borderRadius: moderateScale(4),
    marginRight: moderateScale(5),
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#c0392b',
    padding: moderateScale(8),
    borderRadius: moderateScale(4),
    marginLeft: moderateScale(5),
    alignItems: 'center',
  },
  addCartButton:{
    backgroundColor: '#2ecc71',
    borderRadius: moderateScale(4),
    padding: moderateScale(12),
    alignItems: 'center',
    marginTop: moderateScale(16),
    marginBottom: moderateScale(16),
  },
  shareButton: {
    flex: 1,
    marginLeft: moderateScale(10),
    backgroundColor: '#1976D2',
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    alignItems: 'center',
  },
});

