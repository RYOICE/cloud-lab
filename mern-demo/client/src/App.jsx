import { useState, useEffect } from 'react';

export default function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ studentId: '', name: '', email: '' });

  const loadData = () => fetch('/api/students').then(r => r.json()).then(setStudents);
  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/students', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(form) });
    setForm({ studentId: '', name: '', email: '' });
    loadData();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Quản Lý Sinh Viên</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="MSSV" value={form.studentId} onChange={e => setForm({...form, studentId: e.target.value})} required />
        <input placeholder="Họ tên" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
        <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
        <button type="submit">Thêm</button>
      </form>
      <ul>
        {students.map(s => <li key={s._id}>{s.studentId} - {s.name} ({s.email})</li>)}
      </ul>
    </div>
  );
}
