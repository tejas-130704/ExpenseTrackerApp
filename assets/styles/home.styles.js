export const styles = {
     container: {
    flex: 1,
    backgroundColor: '#f7f3e3',
    padding: 20,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    marginLeft: 10,
  },
  welcomeText: {
    fontSize: 12,
    color: '#444',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f27c00',
  },
  button: {
    backgroundColor: '#f27c00',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  summaryContainer: {
    backgroundColor: '#fffaec',
    borderRadius: 15,
    padding: 20,
    paddingHorizontal: 25,
    marginVertical: 10,
    elevation: 4,
  },
  balanceText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',

    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
    
    // justifyContent: 'space-between',
  },
  incomeText: {
    color: '#43a047',
    fontWeight: '600',
  },
  expenseText: {
    color: '#e53935',
    fontWeight: '600',
  },
  secondHead: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    color: '#222',
  },
  transactionContainer: {
    gap: 10,
  },
  transactionList: {
    backgroundColor: '#fffef6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  transactionLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  transactionCategory: {
    fontSize: 12,
    color: '#999',
  },
  transactionDate: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
  positive: {
    color: '#43a047',
    fontWeight: '600',
    textAlign: 'right',
  },
  negative: {
    color: '#e53935',
    fontWeight: '600',
    textAlign: 'right',
  },
  transactionDetails:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // gap: 20,
  },
  transactionAmount:{
    borderColor: '#ccc',
    borderRightWidth: 1,
    paddingRight: 20,
  },
    dustbin: {
        marginLeft: 13,
        marginRight: 3,
        color: 'rgba(255,0,0,0.7)',

    },
}