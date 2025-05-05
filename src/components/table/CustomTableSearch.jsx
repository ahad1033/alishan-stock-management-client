export function CustomTableSearch({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="p-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded-md"
      />
    </div>
  );
}
