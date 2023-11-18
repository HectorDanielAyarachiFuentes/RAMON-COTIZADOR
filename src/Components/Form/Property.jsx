export function Property({ datos, setPropiedad }) {
  const handleChange = (e) => {
    setPropiedad(e.target.value);
  };

  return (
    <div>
      <label htmlFor="propiedad">Selecciona el tipo de propiedad</label>
      <select id="propiedad" onChange={handleChange}>
        <option selected disabled>
          ...
        </option>
        {datos.map((item, index) => (
          <option key={index} value={item.tipo}>
            {item.tipo}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Property;
