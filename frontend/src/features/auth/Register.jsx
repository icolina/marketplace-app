import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';
import AuthLayout from '../../layouts/AuthLayout';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function Register() {
  // const { register } = useAuthContext();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await register(form);
    navigate('/dashboard');
  };

  return (
    <AuthLayout title="Register">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          label="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Button type="submit">Register</Button>
      </form>
    </AuthLayout>
  );
}
