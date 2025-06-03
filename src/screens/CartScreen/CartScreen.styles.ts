import { StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/scalingUtils';
import { scaleFont } from '../../utils/fontScaling';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(16),
    paddingTop: moderateScale(40),
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: moderateScale(18),
    left: moderateScale(12),
    zIndex:Math.round(moderateScale(10)),
    backgroundColor: 'transparent',
  },
  heading: {
    marginLeft: moderateScale(40),
    fontSize: scaleFont(22),
    fontFamily: 'ComicRelief-Regular',
    fontWeight: 'bold',
    marginBottom: moderateScale(16),
    color: '#222',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(12),
    backgroundColor: '#fff',
    borderRadius: moderateScale(6),
    marginBottom: moderateScale(10),
    elevation: moderateScale(2),
  },
  itemTitle: {
    fontWeight: 'bold',
    fontFamily: 'ComicRelief-Regular',
    flex: 1,
    color: '#222',
  },
  itemPrice: {
    marginHorizontal: moderateScale(8),
    color: '#444',
  },
  qtyButton: {
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(2),
    borderRadius: moderateScale(4),
    marginHorizontal: moderateScale(2),
    minWidth: moderateScale(28),
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontSize: scaleFont(22),
    fontFamily: 'ComicRelief-Regular',
    color: '#27ae60',
    fontWeight: 'bold',
  },
  itemQuantity: {
    marginHorizontal: moderateScale(8),
    fontSize: scaleFont(16),
    fontFamily: 'ComicRelief-Regular',
    color: '#222',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(80),
    height: '100%',
    borderRadius: 0,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#e67e22',
    alignItems: 'center',
    padding: moderateScale(12),
    marginTop: moderateScale(20),
    borderRadius: moderateScale(4),
  },
  clearText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyLabel: {
    textAlign: 'center',
    marginTop: moderateScale(40),
    color: '#888',
  },
});

// Example dark mode
export const darkStyles = StyleSheet.create({
  ...styles,
  container: {
    ...styles.container,
    backgroundColor: '#222',
  },
  heading: {
    ...styles.heading,
    color: '#fff',
  },
  cartItem: {
    ...styles.cartItem,
    backgroundColor: '#333',
  },
  itemTitle: {
    ...styles.itemTitle,
    color: '#fff',
  },
  itemPrice: {
    ...styles.itemPrice,
    color: '#ecf0f1',
  },
  itemQuantity: {
    ...styles.itemQuantity,
    color: '#fff',
  },
  emptyLabel: {
    ...styles.emptyLabel,
    color: '#bbb',
  },
});
