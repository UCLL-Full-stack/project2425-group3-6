const getAllLecturers = async () => {
  const response = await fetch(`http://localhost:3000/lecturers`, {
  });

  if (!response.ok) {
      throw new Error(`Failed to fetch lecturer. Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

const getLecturerById = async (id :string) => {
  const response = await fetch(`http://localhost:3000/lecturers/${id}`);
  if (!response.ok) {
      throw new Error('Failed to fetch lecturer');
  }
  return await response.json();
};

const LecturerService = {
  getAllLecturers,
  getLecturerById
};

export default LecturerService;
