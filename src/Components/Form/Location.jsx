export function Location({ datos, value, setUbicacion }) {
  const handleChange = (e) => {
    setUbicacion(e.target.value);
  };
  return (
    <div>
      <label htmlFor="ubicacion">Selecciona su ubicación</label>
      <select id="ubicacion" value={value} onChange={handleChange}>
        <option value="..." disabled>
          ...
        </option>
        {datos.map((item) => (
          <option key={item.tipo} value={item.tipo}>
            {item.tipo}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Location;
