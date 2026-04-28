import AddProjectForm from './AddProjectForm';
import { deleteProject, renameProject } from '../actions/projects';

export default async function DashboardPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/projects`,
    { cache: 'no-store' }
  );

  const projects = await res.json();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>

      {/* ➕ Ajouter un projet */}
      <AddProjectForm />

      {/* 📋 Liste des projets */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {projects.map((p: any) => (
          <li
            key={p.id}
            style={{
              display: 'flex',
              gap: 10,
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            {/* 🎨 couleur */}
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: p.color,
                display: 'inline-block',
              }}
            />

            {/* 📛 nom + lien */}
            <a href={`/projects/${p.id}`} style={{ minWidth: 120 }}>
              {p.name}
            </a>

            {/* ✏️ RENOMMER */}
            <form action={renameProject} style={{ display: 'flex', gap: 4 }}>
              <input type="hidden" name="id" value={p.id} />
              <input type="hidden" name="color" value={p.color} />

              <input
                type="text"
                name="newName"
                placeholder="Nouveau nom"
                required
                style={{
                  padding: 4,
                  border: '1px solid #ccc',
                  borderRadius: 4,
                }}
              />

              <button type="submit" style={{ cursor: 'pointer' }}>
                ✏️
              </button>
            </form>

            {/* 🗑️ SUPPRIMER */}
            <form action={deleteProject}>
              <input type="hidden" name="id" value={p.id} />
              <button type="submit" style={{ cursor: 'pointer' }}>
                🗑️
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}