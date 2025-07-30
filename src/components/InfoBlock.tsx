type InfoBlockProps = {
  title: string
  value: string
  size?: '2xl' | '3xl' | '4xl'
  statusColor?: 'green' | 'red'
}

export default function InfoBlock({ title, value, size = '2xl', statusColor }: InfoBlockProps) {
  const textSize = {
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
  }[size]

  return (
    <div className="bg-white border-4 border-black p-6 shadow-md">
      <h2 className="text-2xl font-bold text-black mb-4 uppercase tracking-wider">{title}</h2>
      <p
        className={`font-black leading-tight ${
          statusColor ? `bg-${statusColor}-500 text-white px-3 py-2 inline-block` : 'text-black'
        } ${textSize}`}
      >
        {value}
      </p>
    </div>
  )
}
