import { PageHeader } from '@components/PageHeader';

import './styles.css';

export function MyProfile() {
  return (
    <div id="page-my-profile" className="page-container">
      <PageHeader
        title="Meu perfil"
      >
        <strong>Seu nome</strong>
      </PageHeader>
    </div>
  );
}
