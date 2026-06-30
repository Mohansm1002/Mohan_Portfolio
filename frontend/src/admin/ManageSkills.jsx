import { useEffect, useRef, useState } from 'react';
import {
  createAdminProfessionalSkill,
  createAdminSkill,
  deleteAdminProfessionalSkill,
  deleteAdminSkill,
  getProfessionalSkills,
  getSkills,
  updateAdminProfessionalSkill,
  updateAdminSkill,
} from '../api/portfolioApi.js';

const emptyTechnicalSkill = {
  name: '',
  level: 0,
  icon: '',
  imageKey: '',
  imageUrl: '',
  displayOrder: 0,
};

const emptyProfessionalSkill = {
  name: '',
  level: 0,
  displayOrder: 0,
};

const ManageSkills = () => {
  const technicalFormRef = useRef(null);
  const professionalFormRef = useRef(null);
  const [technicalSkills, setTechnicalSkills] = useState([]);
  const [professionalSkills, setProfessionalSkills] = useState([]);
  const [technicalForm, setTechnicalForm] = useState(emptyTechnicalSkill);
  const [professionalForm, setProfessionalForm] = useState(emptyProfessionalSkill);
  const [editingTechnicalId, setEditingTechnicalId] = useState(null);
  const [editingProfessionalId, setEditingProfessionalId] = useState(null);
  const [status, setStatus] = useState('Loading skills...');

  const loadSkills = async () => {
    setStatus('Loading skills...');
    try {
      const [technicalData, professionalData] = await Promise.all([
        getSkills(),
        getProfessionalSkills(),
      ]);
      setTechnicalSkills(technicalData);
      setProfessionalSkills(professionalData);
      setStatus('');
    } catch (error) {
      console.error(error);
      setStatus('Unable to load skills from backend.');
    }
  };

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      loadSkills();
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const focusForm = (formRef) => {
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      formRef.current?.querySelector('input[name="name"]')?.focus({ preventScroll: true });
    });
  };

  const handleTechnicalChange = (event) => {
    const { name, value } = event.target;
    setTechnicalForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfessionalChange = (event) => {
    const { name, value } = event.target;
    setProfessionalForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveTechnicalSkill = async (event) => {
    event.preventDefault();
    const payload = {
      ...technicalForm,
      level: Number(technicalForm.level),
      displayOrder: Number(technicalForm.displayOrder),
    };

    try {
      if (editingTechnicalId !== null) {
        await updateAdminSkill(editingTechnicalId, payload);
      } else {
        await createAdminSkill(payload);
      }
      setTechnicalForm(emptyTechnicalSkill);
      setEditingTechnicalId(null);
      await loadSkills();
    } catch (error) {
      console.error(error);
      setStatus('Unable to save technical skill.');
    }
  };

  const saveProfessionalSkill = async (event) => {
    event.preventDefault();
    const payload = {
      ...professionalForm,
      level: Number(professionalForm.level),
      displayOrder: Number(professionalForm.displayOrder),
    };

    try {
      if (editingProfessionalId !== null) {
        await updateAdminProfessionalSkill(editingProfessionalId, payload);
      } else {
        await createAdminProfessionalSkill(payload);
      }
      setProfessionalForm(emptyProfessionalSkill);
      setEditingProfessionalId(null);
      await loadSkills();
    } catch (error) {
      console.error(error);
      setStatus('Unable to save professional skill.');
    }
  };

  const editTechnicalSkill = (skill) => {
    setEditingTechnicalId(skill.id);
    setTechnicalForm({
      name: skill.name || '',
      level: skill.level || 0,
      icon: skill.icon || '',
      imageKey: skill.imageKey || '',
      imageUrl: skill.imageUrl || '',
      displayOrder: skill.displayOrder || 0,
    });
    setStatus(`Editing technical skill: ${skill.name}`);
    focusForm(technicalFormRef);
  };

  const editProfessionalSkill = (skill) => {
    setEditingProfessionalId(skill.id);
    setProfessionalForm({
      name: skill.name || '',
      level: skill.level || 0,
      displayOrder: skill.displayOrder || 0,
    });
    setStatus(`Editing professional skill: ${skill.name}`);
    focusForm(professionalFormRef);
  };

  const removeTechnicalSkill = async (id) => {
    try {
      await deleteAdminSkill(id);
      await loadSkills();
    } catch (error) {
      console.error(error);
      setStatus('Unable to delete technical skill.');
    }
  };

  const removeProfessionalSkill = async (id) => {
    try {
      await deleteAdminProfessionalSkill(id);
      await loadSkills();
    } catch (error) {
      console.error(error);
      setStatus('Unable to delete professional skill.');
    }
  };

  return (
    <section className="admin-panel">
      <div className="admin-panel-header">
        <div>
          <p className="admin-eyebrow">Content</p>
          <h1>Manage Skills</h1>
        </div>
      </div>
      {status && <p className="admin-status">{status}</p>}

      <div className="admin-two-column">
        <form className="admin-form" onSubmit={saveTechnicalSkill} ref={technicalFormRef}>
          <h2>
            Technical Skills
            {editingTechnicalId !== null && <span className="admin-editing-pill">Editing</span>}
          </h2>
          <label>Name<input name="name" value={technicalForm.name} onChange={handleTechnicalChange} required /></label>
          <label>Level %<input name="level" type="number" min="0" max="100" value={technicalForm.level} onChange={handleTechnicalChange} required /></label>
          <label>Icon Label<input name="icon" value={technicalForm.icon} onChange={handleTechnicalChange} /></label>
          <label>Image Key<input name="imageKey" value={technicalForm.imageKey} onChange={handleTechnicalChange} placeholder="java, html, css, python, sql, javascript, react" /></label>
          <label>Image URL<input name="imageUrl" value={technicalForm.imageUrl} onChange={handleTechnicalChange} /></label>
          <label>Display Order<input name="displayOrder" type="number" value={technicalForm.displayOrder} onChange={handleTechnicalChange} /></label>
          <div className="admin-form-actions">
            <button className="admin-primary-button" type="submit">{editingTechnicalId !== null ? 'Update Skill' : 'Add Skill'}</button>
            <button className="admin-secondary-button" type="button" onClick={() => { setEditingTechnicalId(null); setTechnicalForm(emptyTechnicalSkill); setStatus(''); }}>Clear</button>
          </div>
        </form>

        <form className="admin-form" onSubmit={saveProfessionalSkill} ref={professionalFormRef}>
          <h2>
            Professional Skills
            {editingProfessionalId !== null && <span className="admin-editing-pill">Editing</span>}
          </h2>
          <label>Name<input name="name" value={professionalForm.name} onChange={handleProfessionalChange} required /></label>
          <label>Level %<input name="level" type="number" min="0" max="100" value={professionalForm.level} onChange={handleProfessionalChange} required /></label>
          <label>Display Order<input name="displayOrder" type="number" value={professionalForm.displayOrder} onChange={handleProfessionalChange} /></label>
          <div className="admin-form-actions">
            <button className="admin-primary-button" type="submit">{editingProfessionalId !== null ? 'Update Skill' : 'Add Skill'}</button>
            <button className="admin-secondary-button" type="button" onClick={() => { setEditingProfessionalId(null); setProfessionalForm(emptyProfessionalSkill); setStatus(''); }}>Clear</button>
          </div>
        </form>
      </div>

      <div className="admin-table-wrap">
        <h2>Technical Skill List</h2>
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Level</th><th>Image Key</th><th>Order</th><th>Actions</th></tr></thead>
          <tbody>
            {technicalSkills.map((skill) => (
              <tr className={editingTechnicalId === skill.id ? 'is-editing' : ''} key={skill.id}>
                <td>{skill.name}</td>
                <td>{skill.level}%</td>
                <td>{skill.imageKey}</td>
                <td>{skill.displayOrder}</td>
                <td>
                  <button type="button" onClick={() => editTechnicalSkill(skill)}>Edit</button>
                  <button type="button" onClick={() => removeTechnicalSkill(skill.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="admin-table-wrap">
        <h2>Professional Skill List</h2>
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Level</th><th>Order</th><th>Actions</th></tr></thead>
          <tbody>
            {professionalSkills.map((skill) => (
              <tr className={editingProfessionalId === skill.id ? 'is-editing' : ''} key={skill.id}>
                <td>{skill.name}</td>
                <td>{skill.level}%</td>
                <td>{skill.displayOrder}</td>
                <td>
                  <button type="button" onClick={() => editProfessionalSkill(skill)}>Edit</button>
                  <button type="button" onClick={() => removeProfessionalSkill(skill.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageSkills;
