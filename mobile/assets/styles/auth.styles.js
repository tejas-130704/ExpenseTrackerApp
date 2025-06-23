import { FontDisplay } from "expo-font";

export const styles = {
    signupContainer: {
        flex: 1,
        // backgroundColor: '#253037',
        backgroundColor: '#0a2e2d',
        padding: 20,
        paddingTop: 50,
        color: '#E9F0FB',
    },
    signinContainer: {
        flex: 1,

        // backgroundColor: '#3a0f1f',
        backgroundColor: '#5b2323',
        // backgroundColor: '#2b0f0f',
        padding: 20,
        paddingTop: 50,
        color: '#E9F0FB',
    },


    logo: {
        width: 320,
        height: 320,
        alignSelf: 'center',
        marginBottom: 32,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 26,
        fontWeight: '600',
        marginBottom: 24,
        textAlign: 'center',
        color: 'rgba(249, 249, 249, 0.8)',
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 16,
        fontSize: 16,
        backgroundColor: '#F9F9F9',
        backgroundColor: 'rgba(227,211,183,255)', // Adjusted for transparency

    },
    button: {
        backgroundColor: '#b5461d',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 20,
    },
    buttonText: {
        color: 'rgba(249, 249, 249, 0.8)',
        fontSize: 16,
        fontWeight: '500',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footerText: {
        color: '#666666',
        fontSize: 14,
    },
    linkText: {
        color: '#f6f4e9',
        fontSize: 14,
        fontWeight: '500',
    },

    verifyContainer: {
        flex: 1,
        // backgroundColor: '#253037',
        backgroundColor: '#0d1d25',
        padding: 20,
        paddingTop: 50,
        color: '#E9F0FB',

    },

    buttonVerify: {
        backgroundColor: '#611912',
        paddingVertical: 15,
        borderRadius: 5,
        margin: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    error: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
    verifyText: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#E9F0FB',
        fontDisplay: 'uppercase',
    },
    verifyInput: {
        height: 50,
        borderColor: '#ccc',
        color: '#e6b9a0',
        fontWeight: 'bold',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        textAlign: 'center',
        margin: 20,
        fontSize: 16,
        backgroundColor: 'rgba(253, 204, 178, 0.1)', // Adjusted for transparency
    },
    verifyLogo: {
        width: 300,
        height: 330,
        resizeMode: 'contain',     // Corrected: 'ImageResizeMode' → 'resizeMode'
        alignSelf: 'center',
        marginBottom: 20,
        borderRadius: 20,        // Optional: adds a nice smooth round corner
    },
    loaderContainer: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fdecea',
        borderColor: '#f5c6cb',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
    },
    errorIcon: {
        marginRight: 8,
    },
    errorText: {
        flex: 1,
        color: '#721c24',
        fontSize: 14,
    },
    closeButton: {
        marginLeft: 8,
        padding: 4,
    },


};