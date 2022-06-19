export const medic = async (event) => {
  const mockMedic = [{ name: "Juan", lastname: "Perez" }];
  return {
    statusCode: 200,
    body: JSON.stringify(mockMedic),
  };
};
