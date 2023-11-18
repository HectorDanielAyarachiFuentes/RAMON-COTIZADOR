import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

export function Historial() {
  const [cotizaciones, setcotizaciones] = useState([]);
  const navigate = useNavigate(); // Obtiene la función navigate

  useEffect(() => {
    // Recupera los datos del LocalStorage
    const cotizacionesGuardadas =
      JSON.parse(localStorage.getItem("cotizacion")) || [];
    setcotizaciones(cotizacionesGuardadas);
  }, []);

  const eliminarCotizacion = (index) => {
    const nuevasCotizaciones = [...cotizaciones];
    nuevasCotizaciones.splice(index, 1);
    setcotizaciones(nuevasCotizaciones);
    localStorage.setItem("cotizacion", JSON.stringify(nuevasCotizaciones));
  };

  const vaciarHistorial = () => {
    setcotizaciones([]);
    localStorage.removeItem("cotizacion");
  };

  return (
    <div>
      <h1 className="center separador">
        Ver Historial{" "}
        <span id="botonEmoji" onClick={() => navigate(-1)}>
          📋
        </span>
      </h1>
      <div className=" center div-cotizador">
        <table>
          <thead>
            <tr>
              <th>Fecha de cotización</th>
              <th>Propiedad</th>
              <th>Ubicación</th>
              <th>Metros cuadrados</th>
              <th>Póliza mensual</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cotizaciones.map(
              ({ fecha, propiedad, ubicacion, mts2, poliza }, index) => (
                <tr key={index}>
                  <td>{fecha}</td>
                  <td>{propiedad}</td>
                  <td>{ubicacion}</td>
                  <td>{mts2}</td>
                  <td>{poliza}</td>
                  <td>
                    <span
                      className="eliminaritem"
                      onClick={() => eliminarCotizacion(index)}>
                      ❌
                    </span>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <div className="center separador">
          <button
            onClick={vaciarHistorial}
            className="button button-outline"
            id="botoneshistorial">
            🗑️
          </button>
          <span style={{ margin: "0 10px" }} />
          <button
            onClick={() => navigate(-1)} /* Navega atrás */
            className="button button-outline"
            id="botoneshistorial">
            VOLVER
          </button>
        </div>
      </div>
    </div>
  );
}

export default Historial;
