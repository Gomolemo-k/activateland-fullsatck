// Clerk SSO Key
// Test
export const REACT_APP_CLERK_PUBLISHABLE_KEY = 'pk_test_Y2l2aWwtYmVkYnVnLTkyLmNsZXJrLmFjY291bnRzLmRldiQ';
// Production
// export const REACT_APP_CLERK_PUBLISHABLE_KEY = 'pk_live_Y2xlcmsuYWN0aXZhdGVsYW5kLmNvbSQ';
// Get public key
export function getPublicKey() {
    console.log('Init PublicKey')
    if (!REACT_APP_CLERK_PUBLISHABLE_KEY) {
        throw new Error("Missing Publishable Key")
    }
    return REACT_APP_CLERK_PUBLISHABLE_KEY;
}
