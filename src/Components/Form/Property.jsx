export function Property({ datos, value, setPropiedad }) {
  const handleChange = (e) => {
    setPropiedad(e.target.value);
  };

  return (
    <div>
      <label htmlFor="propiedad">Selecciona el tipo de propiedad</label>
      <select id="propiedad" value={value} onChange={handleChange}>
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

export default Property;
