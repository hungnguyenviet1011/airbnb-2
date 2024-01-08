'use client'

type Props = {
  onClick: () => void;
  label: string
}

const MenuItem = ({ label, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    >
      {label}
    </div>
  );
}

export default MenuItem;