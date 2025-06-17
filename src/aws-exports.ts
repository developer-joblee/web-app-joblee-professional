export const config = {
  Auth: {
    Cognito: {
      identityPoolId: import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID,
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      userPoolWebClientId: import.meta.env.VITE_COGNITO_USER_POOL_WEB_CLIENT_ID,
      region: import.meta.env.VITE_COGNITO_REGION,
      identityPoolRegion: import.meta.env.VITE_COGNITO_REGION,
    },
  },
};
