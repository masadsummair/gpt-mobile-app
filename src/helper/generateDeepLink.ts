import dynamicLinks from '@react-native-firebase/dynamic-links';

export const generateDeepLink = async (): Promise<string | null> => {
    try {
        const link = await dynamicLinks().buildShortLink({
            link: 'https://lenania.com', // Replace with your web app confirmation URL
            domainUriPrefix: 'https://lenania.page.link', // Replace with your Firebase Dynamic Links domain URI prefix
            android: {
                packageName: 'com.lenania', // Replace with your Android app package name
            },
        });

        return link;
    } catch (error) {
        console.error('Error generating deep link:', error);
        return null;
    }
};