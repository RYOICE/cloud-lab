import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ studentId: '', name: '', email: '' });

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/students');
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/students', form);
      setForm({ studentId: '', name: '', email: '' });
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Quan Ly Sinh Vien MERN </h1>
      
      {/* Component Form  */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input placeholder="MSSV" value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })} required />
        <input placeholder="Ho Ten" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <button type="submit">Them Sinh Vien</button>
      </form>

      {/* Component Bảng dữ liệu (Câu 46) */}
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>MSSV</th>
            <th>Ho Ten</th>
            <th>Email</th>
            <th>Thao Tac</th>
          </tr>
        </thead>
        <tbody>
          {students.map((st) => (
            <tr key={st._id}>
              <td>{st.studentId}</td>
              <td>{st.name}</td>
              <td>{st.email}</td>
              <td><button onClick={() => handleDelete(st._id)}>Xoa</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
