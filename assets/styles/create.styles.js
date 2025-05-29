import { StyleSheet } from 'react-native';
const narutoOrange = '#f27c00';
const narutoEarth = '#5b2323';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f3e3',
    padding: 10,
    paddingHorizontal: 15,
    paddingTop: 30,

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: narutoEarth,
  },
  saveText: {
    color: narutoOrange,
    fontWeight: 'bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    
    overflow: 'hidden',
    marginBottom: 20,
    gap:10,
   
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    // backgroundColor: '#f4e3d3',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(134, 102, 85, 0.31)',

    
  },
  toggleText: {
    color: narutoEarth,
    fontWeight: 'bold',
  },
  activeExpense: {
    backgroundColor: narutoOrange,
  },
  activeIncome: {
    backgroundColor: '#45B26B',
  },
  activeText: {
    color: '#fff',
  },
  amount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: narutoEarth,
    marginBottom: 2,
    width: '90%',
    textAlign: 'left',
   
  },
  amountIcon:{
    fontSize: 36,
    fontWeight: 'bold',
    color: narutoEarth,
    marginBottom: 2,
  },
  input: {
    fontSize: 16,
    color: narutoEarth,
    width: '100%',
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: narutoEarth,
    
  },
  categoryScroll: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,

  },
  categoryBtn: {

    height: 40,
    // backgroundColor: narutoOrange,
    paddingHorizontal: 10,

    paddingVertical: 8,
    // borderColor: 'rgba(134, 102, 85, 0.31)',
    // // borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: narutoOrange,
  },
  categoryText: {
    marginLeft: 5,
     color: 'black',

  },
  amountContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  formContainer:{
    flex: 1,
    backgroundColor: 'rgba(255, 247, 231, 0.93)',
    padding: 15,
    paddingTop: 25,
    borderRadius: 20,
        height:'auto',
    marginBottom: 20,
  },
  titleContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,  
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,

    marginBottom: 20,
  },

});