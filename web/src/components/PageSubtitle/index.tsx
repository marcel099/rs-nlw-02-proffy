import './styles.css';

interface PageSubtitleProps {
  subtitle: string;
}

export function PageSubtitle({ subtitle }: PageSubtitleProps) {
  return (
    <strong className="page-subtitle">{subtitle}</strong>
  );
}
