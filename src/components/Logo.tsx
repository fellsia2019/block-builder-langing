interface LogoProps {
  className?: string;
  size?: number;
  variant?: 'default' | 'inverse';
}

export default function Logo({ className = '', size = 40, variant = 'inverse' }: LogoProps) {
  const logoSrc = variant === 'inverse' ? '/logo-inverse.svg' : '/logo-default.svg';

  return (
    <img
      src={logoSrc}
      alt="BlockBuilder Logo"
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size }}
    />
  );
}

