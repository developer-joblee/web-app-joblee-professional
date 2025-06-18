export const config = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID,
      region: import.meta.env.VITE_COGNITO_REGION,
      identityPoolId: import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID,
      authenticationFlowType: 'USER_PASSWORD_AUTH',
      clientSecret: '11sofj170fmpdujvdvovan11e8dqsqfb9c8oe1a6i4bma8dif1mo',
    },
  },
};
