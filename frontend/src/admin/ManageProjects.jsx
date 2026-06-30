import { useEffect, useRef, useState } from 'react';
import {
  createAdminProject,
  deleteAdminProject,
  getProjects,
  updateAdminProject,
} from '../api/portfolioApi.js';

const emptyProject = {
  title: '',
  stack: '',
  type: '',
  accent: '',
  imageKey: '',
  imageUrl: '',
  description: '',
  technologiesText: '',
  highlightsText: '',
  displayOrder: 0,
};

const projectToForm = (project = emptyProject) => ({
  title: project.title || '',
  stack: project.stack || '',
  type: project.type || '',
  accent: project.accent || '',
  imageKey: project.imageKey || '',
  imageUrl: project.imageUrl || '',
  description: project.description || '',
  technologiesText: (project.technologies || [])
    .map((tech) => [tech.name, tech.imageKey, tech.className].filter(Boolean).join('|'))
    .join('\n'),
  highlightsText: (project.highlights || []).join('\n'),
  displayOrder: project.displayOrder || 0,
});

const formToProject = (form) => ({
  title: form.title,
  stack: form.stack,
  type: form.type,
  accent: form.accent,
  imageKey: form.imageKey,
  imageUrl: form.imageUrl,
  description: form.description,
  technologies: form.technologiesText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, imageKey, className] = line.split('|').map((part) => part.trim());
      return { name, imageKey, className };
    }),
  highlights: form.highlightsText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean),
  displayOrder: Number(form.displayOrder),
});

const ManageProjects = () => {
  const formRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState(emptyProject);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState('Loading projects...');

  const loadProjects = async () => {
    setStatus('Loading projects...');
    try {
      const data = await getProjects();
      setProjects(data);
      setStatus('');
    } catch (error) {
      console.error(error);
      setStatus('Unable to load projects from backend.');
    }
  };

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      loadProjects();
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

    try {
      const payload = formToProject(formData);
      if (editingId !== null) {
        await updateAdminProject(editingId, payload);
      } else {
        await createAdminProject(payload);
      }
      setEditingId(null);
      setFormData(emptyProject);
      await loadProjects();
    } catch (error) {
      console.error(error);
      setStatus('Unable to save project.');
    }
  };

  const editProject = (project) => {
    setEditingId(project.id);
    setFormData(projectToForm(project));
    setStatus(`Editing project: ${project.title}`);
    focusForm();
  };

  const removeProject = async (id) => {
    try {
      await deleteAdminProject(id);
      await loadProjects();
    } catch (error) {
      console.error(error);
      setStatus('Unable to delete project.');
    }
  };

  return (
    <section className="admin-panel">
      <div className="admin-panel-header">
        <div>
          <p className="admin-eyebrow">Content</p>
          <h1>Manage Projects</h1>
        </div>
      </div>
      {status && <p className="admin-status">{status}</p>}

      <form className="admin-form admin-wide-form" onSubmit={handleSubmit} ref={formRef}>
        <label>Title<input name="title" value={formData.title} onChange={handleChange} required /></label>
        <label>Stack<input name="stack" value={formData.stack} onChange={handleChange} /></label>
        <label>Type<input name="type" value={formData.type} onChange={handleChange} /></label>
        <label>Accent<input name="accent" value={formData.accent} onChange={handleChange} placeholder="food, train, laptop" /></label>
        <label>Image Key<input name="imageKey" value={formData.imageKey} onChange={handleChange} placeholder="food_delivery, train_ticket, laptop_price" /></label>
        <label>Image URL<input name="imageUrl" value={formData.imageUrl} onChange={handleChange} /></label>
        <label>Description<textarea name="description" value={formData.description} onChange={handleChange} /></label>
        <label>Technologies<textarea name="technologiesText" value={formData.technologiesText} onChange={handleChange} placeholder="HTML|html|html" /></label>
        <label>Highlights<textarea name="highlightsText" value={formData.highlightsText} onChange={handleChange} /></label>
        <label>Display Order<input name="displayOrder" type="number" value={formData.displayOrder} onChange={handleChange} /></label>
        <div className="admin-form-actions">
          <button className="admin-primary-button" type="submit">{editingId !== null ? 'Update Project' : 'Add Project'}</button>
          <button className="admin-secondary-button" type="button" onClick={() => { setEditingId(null); setFormData(emptyProject); setStatus(''); }}>Clear</button>
        </div>
      </form>

      <div className="admin-list">
        {projects.map((project) => (
          <article className={`admin-list-item ${editingId === project.id ? 'is-editing' : ''}`} key={project.id}>
            <div>
              <h2>{project.title}</h2>
              <p>{project.type} | {project.stack}</p>
            </div>
            <div className="admin-row-actions">
              <button type="button" onClick={() => editProject(project)}>Edit</button>
              <button type="button" onClick={() => removeProject(project.id)}>Delete</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ManageProjects;
