export default function generateUniqueId(): string {
    const timestamp = Date.now().toString(36); // Convert timestamp to base 36 string
    const randomNum = Math.random().toString(36).substr(2, 5); // Generate random number and convert to base 36 string
    const uniqueId = timestamp + randomNum; // Combine timestamp and random number

    return uniqueId;
}