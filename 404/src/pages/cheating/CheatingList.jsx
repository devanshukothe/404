import React, { useState, useEffect } from "react";

const CheatingList = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("https://your-api-url.com/cheating-students");
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">Cheated Students</h2>
      {selectedStudent ? (
        <div className="border p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">{selectedStudent.collegeRegNo}</h3>
          <p><strong>Reason:</strong> {selectedStudent.reason}</p>
          <p><strong>Proof:</strong> <a href={selectedStudent.proofUrl} target="_blank" rel="noopener noreferrer">View Proof</a></p>
          <p><strong>Date:</strong> {selectedStudent.date}</p>
          <p><strong>Examination:</strong> {selectedStudent.examination}</p>
          <p><strong>Invigilator ID:</strong> {selectedStudent.invigilatorCollegeId}</p>
          <p><strong>Subject:</strong> {selectedStudent.subject}</p>
          <p><strong>Semester:</strong> {selectedStudent.semester}</p>
          <button onClick={() => setSelectedStudent(null)} className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">Back</button>
        </div>
      ) : (
        <ul className="space-y-2">
          {students.map((student) => (
            <li key={student.collegeRegNo} className="border p-2 rounded cursor-pointer hover:bg-gray-100" onClick={() => setSelectedStudent(student)}>
              {student.collegeRegNo}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CheatingList;