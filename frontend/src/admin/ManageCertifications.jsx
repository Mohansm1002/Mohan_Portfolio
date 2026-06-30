import { useEffect, useRef, useState } from 'react';
import {
  createAdminCertification,
  deleteAdminCertification,
  getCertifications,
  updateAdminCertification,
} from '../api/portfolioApi.js';

const emptyCertification = {
  title: '',
  issuer: '',
  date: '',
  score: '',
  duration: '',
  roll: '',
  credits: '',
  imageKey: '',
  imageUrl: '',
  description: '',
  displayOrder: 0,
};

const ManageCertifications = () => {
  const formRef = useRef(null);
  const [certifications, setCertifications] = useState([]);
  const [formData, setFormData] = useState(emptyCertification);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState('Loading certifications...');

  const loadCertifications = async () => {
    setStatus('Loading certifications...');
    try {
      const data = await getCertifications();
      setCertifications(data);
      setStatus('');
    } catch (error) {
      console.error(error);
      setStatus('Unable to load certifications from backend.');
    }
  };

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      loadCertifications();
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const focusForm = () => {
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      formRef.current?.querySelector('input[name="title"]')?.focus({ preventScroll: true });
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { ...formData, displayOrder: Number(formData.displayOrder) };

    try {
      if (editingId !== null) {
        await updateAdminCertification(editingId, payload);
      } else {
        await createAdminCertification(payload);
      }
      setEditingId(null);
      setFormData(emptyCertification);
      await loadCertifications();
    } catch (error) {
      console.error(error);
      setStatus('Unable to save certification.');
    }
  };

  const editCertification = (certification) => {
    setEditingId(certification.id);
    setFormData({
      title: certification.title || '',
      issuer: certification.issuer || '',
      date: certification.date || '',
      score: certification.score || '',
      duration: certification.duration || '',
      roll: certification.roll || '',
      credits: certification.credits || '',
      imageKey: certification.imageKey || '',
      imageUrl: certification.imageUrl || '',
      description: certification.description || '',
      displayOrder: certification.displayOrder || 0,
    });
    setStatus(`Editing certification: ${certification.title}`);
    focusForm();
  };

  const removeCertification = async (id) => {
    try {
      await deleteAdminCertification(id);
      await loadCertifications();
    } catch (error) {
      console.error(error);
      setStatus('Unable to delete certification.');
    }
  };

  return (
    <section className="admin-panel">
      <div className="admin-panel-header">
        <div>
          <p className="admin-eyebrow">Content</p>
          <h1>Manage Certifications</h1>
        </div>
      </div>
      {status && <p className="admin-status">{status}</p>}

      <form className="admin-form admin-wide-form" onSubmit={handleSubmit} ref={formRef}>
        <label>Title<input name="title" value={formData.title} onChange={handleChange} required /></label>
        <label>Issuer<input name="issuer" value={formData.issuer} onChange={handleChange} /></label>
        <label>Date<input name="date" value={formData.date} onChange={handleChange} /></label>
        <label>Score<input name="score" value={formData.score} onChange={handleChange} /></label>
        <label>Duration<input name="duration" value={formData.duration} onChange={handleChange} /></label>
        <label>Roll Number<input name="roll" value={formData.roll} onChange={handleChange} /></label>
        <label>Credits<input name="credits" value={formData.credits} onChange={handleChange} /></label>
        <label>Image Key<input name="imageKey" value={formData.imageKey} onChange={handleChange} placeholder="nptel_pyt_cer, java_c, python_c" /></label>
        <label>Image URL<input name="imageUrl" value={formData.imageUrl} onChange={handleChange} /></label>
        <label>Description<textarea name="description" value={formData.description} onChange={handleChange} /></label>
        <label>Display Order<input name="displayOrder" type="number" value={formData.displayOrder} onChange={handleChange} /></label>
        <div className="admin-form-actions">
          <button className="admin-primary-button" type="submit">{editingId !== null ? 'Update Certification' : 'Add Certification'}</button>
          <button className="admin-secondary-button" type="button" onClick={() => { setEditingId(null); setFormData(emptyCertification); setStatus(''); }}>Clear</button>
        </div>
      </form>

      <div className="admin-list">
        {certifications.map((certification) => (
          <article className={`admin-list-item ${editingId === certification.id ? 'is-editing' : ''}`} key={certification.id}>
            <div>
              <h2>{certification.title}</h2>
              <p>{certification.issuer} | {certification.date}</p>
            </div>
            <div className="admin-row-actions">
              <button type="button" onClick={() => editCertification(certification)}>Edit</button>
              <button type="button" onClick={() => removeCertification(certification.id)}>Delete</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ManageCertifications;
