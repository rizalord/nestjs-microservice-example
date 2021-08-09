const authConfig = () => ({
  accessToken: process.env.JWT_ACCESS_TOKEN_SECRET,
  refreshToken: process.env.JWT_REFRESH_TOKEN_SECRET,
});

export default authConfig;
