
export const TESTING_MODE = true;

const testUsers = [
  { username: "admin", password: "123" },
  { username: "zubair", password: "123" },
];

export function mockLogin(username, password) {
  if (!TESTING_MODE) return null;

  const user = testUsers.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    // Generate a dummy JWT (purely for frontend usage)
    const FAKE_JWT ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiJhZG1pbjEyMyIsImlhdCI6MTc0NDE1NzkyNiwiZXhwIjoxNzQ0MTYyOTI2fQ.U-gVS_c2GhxkT6ZMo0yaLqp38SsQ47Cyt3CYC4N5qMk"
return FAKE_JWT; // as token is coming directly from backend 
    return  {
      token: FAKE_JWT,
    };
  }

  return null;
}
