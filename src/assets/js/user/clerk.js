// Clerk SSO Key
export const REACT_APP_CLERK_PUBLISHABLE_KEY = 'pk_test_Y2l2aWwtYmVkYnVnLTkyLmNsZXJrLmFjY291bnRzLmRldiQ';
// Get public key
export function getPublicKey() {
    console.log('Init PublicKey')
    if (!REACT_APP_CLERK_PUBLISHABLE_KEY) {
        throw new Error("Missing Publishable Key")
    }
    return REACT_APP_CLERK_PUBLISHABLE_KEY;
}
