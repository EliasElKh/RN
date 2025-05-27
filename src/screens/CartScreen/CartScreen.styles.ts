import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 18,
    left: 12,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  heading: {
    marginLeft: 40,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#222',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 10,
    elevation: 2,
  },
  itemTitle: {
    fontWeight: 'bold',
    flex: 1,
    color: '#222',
  },
  itemPrice: {
    marginHorizontal: 8,
    color: '#444',
  },
  qtyButton: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#dff0d8',
    marginHorizontal: 2,
    minWidth: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontSize: 22,
    color: '#27ae60',
    fontWeight: 'bold',
  },
  itemQuantity: {
    marginHorizontal: 8,
    fontSize: 16,
    color: '#222',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
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
    padding: 12,
    marginTop: 20,
    borderRadius: 4,
  },
  clearText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyLabel: {
    textAlign: 'center',
    marginTop: 40,
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