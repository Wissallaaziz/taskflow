import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

interface SidebarProps {
  projects: Array<{ id: string; name: string; color: string }>;
}

export default function Sidebar({ projects }: SidebarProps) {
  return (
	<>
	  {projects.map(p => (
<li key={p.id}>
<NavLink
to={`/projects/${p.id}`}
className={({ isActive }) =>
`${styles.item} ${isActive ? styles.active : ''}`
}
>
<span className={styles.dot} style={{ background: p.color }} />
{p.name}
	  </NavLink>
	  </li>
	  ))}
	</>
  );
}