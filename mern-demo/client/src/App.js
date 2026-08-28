import React, { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const API_URL = 'http://localhost:5000/api/students';

  const fetchStudents = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (Array.isArray(data)) setStudents(data);
    } catch (err) {
      console.error("Lỗi lấy dữ liệu:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !age) return;
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, age: Number(age) })
      });
      setName('');
      setAge('');
      fetchStudents();
    } catch (err) {
      console.error("Lỗi thêm sinh viên:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchStudents();
    } catch (err) {
      console.error("Lỗi xóa sinh viên:", err);
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Quản Lý Sinh Viên - MERN Stack</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Tên sinh viên" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <input 
          type="number" 
          placeholder="Tuổi" 
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 15px' }}>Thêm Sinh Viên</button>
      </form>

      <h3>Danh sách sinh viên (MongoDB Atlas):</h3>
      <ul>
        {students.map((s) => (
          <li key={s._id} style={{ marginBottom: '8px' }}>
            {s.name} - {s.age} tuổi 
            <button onClick={() => handleDelete(s._id)} style={{ marginLeft: '10px', color: 'red' }}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
